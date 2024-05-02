import { NextResponse } from "next/server";
import { deletePickup } from "../../apiUtils";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deletePickup(params.id);
  } catch (err) {
    console.error(err);
    return new NextResponse("Error", { status: 500 });
  }

  return new NextResponse("Success", { status: 200 });
}
