import { NextResponse } from "next/server";
import { getUserId } from "../apiUtils";

export async function GET() {
  const userId = await getUserId();
  return NextResponse.json({ id: userId }, { status: 200 });
}
