import {PrismaClient} from "@prisma/client";
import { NextResponse } from "next/server";

const prisma =new PrismaClient({});

export async function POST(request){
    const {email,password}= await request.json();

    const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if(existingUser!==null){
        return NextResponse.json({message : "Please login you already have an account!"})
      }
      else{
    const user =await prisma.user.create({
       data:{
        email,
        password
       },
    });

    return NextResponse.json({message : "user created successfully",user})
}
}

