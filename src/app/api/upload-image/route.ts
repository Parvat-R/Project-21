import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function getExtension(fileName: string, mimeType: string) {
  const fromName = path.extname(fileName).replace(".", "").toLowerCase();
  if (fromName) return fromName;

  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/gif") return "gif";
  return "jpg";
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const maybeFile = formData.get("file");

    if (!(maybeFile instanceof File)) {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    if (!ALLOWED_IMAGE_TYPES.has(maybeFile.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, WEBP, and GIF are allowed." }, { status: 400 });
    }

    if (maybeFile.size > MAX_IMAGE_SIZE_BYTES) {
      return NextResponse.json({ error: "Image must be 5MB or smaller." }, { status: 400 });
    }

    const extension = getExtension(maybeFile.name, maybeFile.type);
    const fileName = `${Date.now()}-${randomUUID()}.${extension}`;
    const imagesDir = path.join(process.cwd(), "public", "images");
    const filePath = path.join(imagesDir, fileName);

    await mkdir(imagesDir, { recursive: true });

    const arrayBuffer = await maybeFile.arrayBuffer();
    await writeFile(filePath, Buffer.from(arrayBuffer));

    const configuredBase = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
    const baseUrl = configuredBase || new URL(req.url).origin;
    const imageUrl = `${baseUrl}/images/${fileName}`;

    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}
