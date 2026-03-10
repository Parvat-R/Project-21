# Required Deployment Notes: Azure Container + Image Loading

## Scope
You are deploying:
- Backend container image to Azure Container Registry (ACR)
- Frontend container image to Azure Container Registry (ACR)
- Running both in Azure Container Service (for example Azure Container Apps or AKS)

Important distinction:
- Container images (backend/frontend) are app artifacts in ACR.
- Event photos uploaded by users must be stored in external durable storage (Azure Blob Storage), not container filesystem.

## Recommended Architecture
1. Build and push backend and frontend Docker images to ACR.
2. Deploy both services from ACR to Azure Container Service.
3. Store uploaded event images in Azure Blob Storage container.
4. Save only the blob URL in database (`imageUrl` column).
5. Frontend renders images from `imageUrl`.

## Why Not Store Uploaded Images in Container Filesystem
- Container local storage is ephemeral.
- Restart/redeploy can delete files.
- Multiple replicas will not share local files.
- Scale-out causes missing/inconsistent images.

## End-to-End Image Flow
1. User uploads image from frontend form.
2. Backend upload API receives file.
3. Backend uploads file to Azure Blob container.
4. Backend returns `imageUrl` (blob URL or SAS URL).
5. Event create/edit API stores `imageUrl` in DB.
6. Dashboard/details fetch event and display using `<img src={imageUrl}>`.

## Required Environment Variables

### Backend
- `AZURE_STORAGE_CONNECTION_STRING` or managed identity setup
- `AZURE_STORAGE_CONTAINER` (example: `event-images`)
- `NEXT_PUBLIC_API_BASE_URL` (backend public base URL if used in route responses)

### Frontend
- `NEXT_PUBLIC_API_BASE_URL` set to backend public domain
  - Example: `https://api.yourdomain.com`

## CORS Requirements

### Backend API CORS
Allow frontend production domain in backend CORS headers.
Do not keep localhost-only CORS in production.

### Azure Blob CORS
If images are loaded directly by browser from blob URL:
- Allowed origins: frontend domain(s)
- Allowed methods: `GET`, `HEAD`, `OPTIONS`
- Allowed headers: `*` (or restrict as needed)

## Public vs Private Blob Container

### Public Container (simpler)
- Blob URL directly used in `imageUrl`.
- Frontend loads image directly.

### Private Container (more secure)
- Backend returns short-lived SAS URL for read.
- Store blob key/path in DB, generate SAS on read, or proxy through backend.

## Deployment Checklist
1. Push backend image to ACR.
2. Push frontend image to ACR.
3. Deploy backend from ACR.
4. Deploy frontend from ACR.
5. Configure backend env vars for Blob.
6. Configure frontend `NEXT_PUBLIC_API_BASE_URL`.
7. Configure backend CORS for frontend domain.
8. Configure Blob CORS for frontend domain.
9. Upload one test image and verify URL stored in DB.
10. Verify image displays in:
   - Organiser dashboard cards
   - Internal/Public event cards
   - Event detail pages

## Production Note
ACR stores your app containers only. It is not a replacement for user-uploaded image storage.
Use Azure Blob Storage (recommended) or Azure Files + proxy (more complex) for persistent event images.
