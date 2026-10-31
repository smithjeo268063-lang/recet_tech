import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, requireAdmin, isSameOriginRequest } from "@/lib/admin-api";
import { createAdminClient } from "@/lib/supabase/admin";

const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    }
    const extension = allowedTypes.get(file.type);
    if (!extension) {
      return NextResponse.json({ error: "Use a JPG, PNG, WebP, or AVIF image." }, { status: 415 });
    }
    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Images must be between 1 byte and 5 MB." }, { status: 413 });
    }

    const path = `${randomUUID()}.${extension}`;
    const supabase = createAdminClient();
    const { data, error } = await supabase.storage
      .from("catalog-images")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("catalog-images")
      .getPublicUrl(data.path);
    return NextResponse.json({ url: publicUrl.publicUrl }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
