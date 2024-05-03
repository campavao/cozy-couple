import { NextResponse } from "next/server";
import { upsertPickup } from "../apiUtils";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    await upsertPickup(body);
  } catch (err) {
    return new NextResponse("Error", { status: 403 });
  }

  revalidatePath("/pickups");

  return new NextResponse("Success", { status: 200 });
}
