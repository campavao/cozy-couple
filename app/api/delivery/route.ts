import { NextResponse } from "next/server";
import { upsertDelivery } from "../apiUtils";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    await upsertDelivery(body);
  } catch (err) {
    return new NextResponse("Error", { status: 403 });
  }

  revalidatePath("/deliveries");

  return new NextResponse("Success", { status: 200 });
}
