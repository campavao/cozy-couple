import { NextResponse } from "next/server";
import { upsertInventory } from "../apiUtils";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    await upsertInventory(body);
  } catch (err) {
    return new NextResponse("Error", { status: 403 });
  }

  revalidatePath("/inventory");

  return new NextResponse("Success", { status: 200 });
}
