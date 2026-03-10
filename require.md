# Image Storage Improvement Requirements

## Context
Current implementation stores event images in database as `Bytes` (`imageData`). This causes slow list APIs when many records include image payloads.

Example observed:
- `GET /api/event?creatorId=<id>&includeImage=true&take=50` takes multiple seconds due to large binary serialization and transfer.

## Goal
Move image storage out of DB binary field and use URL-based image references for fast, scalable API responses.

## Proposed Target Architecture
1. Upload image to storage (local for dev or cloud blob/object storage for prod).
2. Persist only image reference (`imageUrl`) in DB.
3. Event list/detail APIs return image URL, not image bytes.
4. Frontend directly renders image from URL.

## Recommended Storage Options
### Option A: Local filesystem (dev only)
- Save files under static/public directory.
- Store relative URL/path in DB.
- Easy setup, not production-safe for scaling/serverless.

### Option B: Cloud blob/object storage (production recommended)
- Azure Blob / S3 / Cloudinary.
- Store object URL or storage key in DB.
- Better scalability, caching/CDN compatibility, lower API payload size.

## Required Backend Changes
1. Prisma schema
- Add `imageUrl String?` to `Event` model.
- Keep `imageData` temporarily for migration period, then remove.

2. API updates
- Update event create flow to accept/store `imageUrl`.
- Add upload endpoint for image file handling (multipart/form-data).
- Ensure event list APIs do not return binary image payload.

3. Migration
- Generate and apply Prisma migration for new field.
- Optional data backfill strategy from old `imageData` to storage URL.

## Required Frontend Changes
1. Event creation form
- Upload selected file via upload endpoint.
- Use returned URL in create-event payload.

2. Dashboard/cards
- Render with `imageUrl` in `<img src="...">`.
- Remove byte/base64 conversion logic.

## Non-Functional Requirements
1. Performance
- Event list endpoint target: low-latency response under normal load.
- Avoid large binary payloads in list APIs.

2. Scalability
- Support increasing event/image volume without significant API slowdown.

3. Reliability
- Image URLs should remain valid and accessible.
- Handle missing/broken URLs with fallback image.

4. Security
- Validate file type and size on upload.
- Restrict allowed mime types (e.g., image/jpeg, image/png, image/webp).

## Suggested Execution Order
1. Add `imageUrl` to schema + migration.
2. Implement upload endpoint.
3. Update create-event endpoint to use URL.
4. Update frontend form upload flow.
5. Update dashboard/event cards to use URL.
6. Remove old `imageData` usage after verification.

## Acceptance Criteria
1. Creating an event with image works successfully.
2. Organiser dashboard shows images via URL.
3. Event list API no longer returns large binary image data.
4. API response time improves compared to current byte-based approach.
