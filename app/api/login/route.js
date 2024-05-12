import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req){
    const prisma = new PrismaClient()
    try{
        const users = await prisma.user.findMany();
        return NextResponse.json({message: 'OK', users})
    }catch(err){
        return NextResponse.json({message: "Error", err}, {status: 400})
    }
   
}