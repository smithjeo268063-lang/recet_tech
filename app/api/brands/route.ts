import { NextResponse } from "next/server";
import { getCatalogBrands } from "@/lib/catalog-data";

export async function GET() {
  const brands = await getCatalogBrands();
  return NextResponse.json({ brands });
}