import prisma from "@/lib/prisma";


interface Register{
    userId : string
}


export async function GET(request: Request,{ params }: { params: { id: string } }) {

    const { id } = await params

    const data = await prisma.registration.findMany({
        include:{
            user:true
        },
        where:{eventId : id}
    })
    return Response.json(data)
        
}

export async function POST(request: Request,{ params }: { params: { id: string } }) {
    try
    {const body:Register = await request.json()
    const { id: eventId } = await params
    console.log(body.userId)
    console.log(eventId)
    await prisma.registration.create({
        data:{
                userId : body.userId,
                eventId : eventId
        }
    })
    return Response.json({message : "Registered Successfully",acknowledgement : true})
    }
    catch(error){
        console.error(error)
        return Response.json({message : "Registration Failed",acknowledgement : false})
    }
}

export async function DELETE(request: Request,{ params }: { params: { id: string } }) {
    try{
    const body = await request.json()
    const { id: eventId } = await params
    console.log(body.id)
    console.log(eventId)

    const deleted = await prisma.registration.deleteMany({
        where:{
            id : body.id,
            eventId : eventId
        }
    })
    
    if(deleted.count === 0){
        return Response.json({message : "Registration not found",acknowledgement : false}, {status: 404})
    }
    return Response.json({message : "Deregistered Successfully",acknowledgement : true})
    }
    catch(error){
        console.error(error)
        return Response.json({message : "Deregistration Failed",acknowledgement : false})
    }
}
