import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,

) {

  return NextResponse.json(
    { success: true, message: "API WORKING v1" },
    { status: 200 }
  );
}
