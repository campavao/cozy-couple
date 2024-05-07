import { deleteImage } from "@/app/utils/utils";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteImage(params.id);
  } catch (err) {
    console.error(err);
    return new NextResponse("Error", { status: 500 });
  }

  return new NextResponse("Success", { status: 200 });
}
