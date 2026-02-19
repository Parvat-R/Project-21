import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import bcrypt from "bcryptjs";

export async function GET(){
    try{
      const users = await prisma.user.findMany();
      return NextResponse.json(users);
    }catch(error){
       return NextResponse.json({error: "Failed to fetch users"},{status: 500})
    }
}

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {name,email,password} = body;

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
     return NextResponse.json(newUser, { status: 201 });
    }catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}