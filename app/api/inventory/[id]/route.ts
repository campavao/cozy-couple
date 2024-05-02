import { NextResponse } from "next/server";
import { deleteInventory } from "../../apiUtils";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteInventory(params.id);
  } catch (err) {
    console.error(err);
    return new NextResponse("Error", { status: 500 });
  }

  return new NextResponse("Success", { status: 200 });
}
