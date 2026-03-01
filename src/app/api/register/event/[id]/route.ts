import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

const registerSchema = z.object({
    userId: z.string().min(1, "userId is required")
});

const deregisterSchema = z.object({
    id: z.string().min(1, "id is required")
});

interface Register{
    userId : string
}

// GET /api/register/event/[id] - Get all registrations for an event
export async function GET(request: Request,{ params }: { params: { id: string } }) {

    const { id } = await params

    const data = await prisma.registration.findMany({
        include:{
            user:true
        },
        where:{eventId : id}
    })

    return NextResponse.json(data)
        
}

// POST /api/register/event/[id] - Register a user for an event
// body : { userId : string }
export async function POST(request: Request,{ params }: { params: { id: string } }) {
    try{

        const body:Register = await request.json()
        const { id: eventId } = await params

        const availability = await prisma.event.findFirst({
            where:{
                id : eventId,}})

        console.log(availability)
        
        await prisma.registration.create({
            data:{
                    userId : body.userId,
                    eventId : eventId
            }
        })

        return NextResponse.json({message : "Registered Successfully",acknowledgement : true})
    }
    catch(error){

        console.error(error)
        return NextResponse.json({message : "Registration Failed",acknowledgement : false})
    }
}

// DELETE /api/register/event/[id] - Deregister a user from an event
// body : { id : string } (registration id)
export async function DELETE(request: Request,{ params }: { params: { id: string } }) {
    try{
    const body = await request.json()
    const { id: eventId } = await params
    

    const deleted = await prisma.registration.deleteMany({
        where:{
            id : body.id,
            eventId : eventId
        }
    })
    
    if(deleted.count === 0){
        return NextResponse.json({message : "Registration not found",acknowledgement : false}, {status: 404})
    }
    return NextResponse.json({message : "Deregistered Successfully",acknowledgement : true})

    }
    catch(error){
        console.error(error)
        return NextResponse.json({message : "Deregistration Failed",acknowledgement : false})
    }
}
