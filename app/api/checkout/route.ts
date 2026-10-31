import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();
  const orderRef = `REC-${Date.now()}`;
  return NextResponse.json({ ok: true, message: "Checkout request accepted for Paystack processing.", orderRef, payload });
}