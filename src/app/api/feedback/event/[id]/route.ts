import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params:  Promise<{id:string}>  }
) {
  try {

    const {id}= await params;

    const feedbacks = await prisma.feedback.findMany({
      where: {
        registration: {
          eventId: id, 
        },
      },

      include: {
        registration: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      
      orderBy: {
        id: "desc",
      },
    });

  
    return NextResponse.json(
      { success: true, data: feedbacks },
      { status: 200 }
    );

  } catch (error) {
    console.error("[GET /api/feedback/event/[id]]", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
