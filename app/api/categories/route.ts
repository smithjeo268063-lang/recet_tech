import { NextResponse } from "next/server";
import { getCatalogCategories } from "@/lib/catalog-data";

export async function GET() {
  const categories = await getCatalogCategories();
  return NextResponse.json({ categories });
}