import { deleteImage } from "@/app/utils/utils";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { _itemId: string; imageId: string } }
) {
  // for some reason id contains both the itemId and id, which makes things stupid
  try {
    await deleteImage(params.imageId);
  } catch (err) {
    console.error(err);
    return new NextResponse("Error", { status: 500 });
  }

  return new NextResponse("Success", { status: 200 });
}
