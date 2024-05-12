import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const bcrypt = require('bcrypt');

export async function POST(req){
    const prisma = new PrismaClient()
    try{
        const {firstName, lastName, email, password} = await req.json()
        const existingUserByEmail = await prisma.user.findUnique({
            where: {email: email}
        })

        if(existingUserByEmail){
            return NextResponse.json({message: "Usuário com esse e-mail já existe!"}, {status: 409})
        }

        // Hash da senha
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (saltError, salt) => {
                if(saltError){
                    reject({message: "Salt error!"})
                }else{
                    bcrypt.hash(password, salt, (hashError, hash) => {
                        if(hashError){
                            reject({message: "Hash error!"})
                        }
                        resolve(hash);
                    })
                }
            })
        });

        // Criação do usuário com a senha hashada
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword 
            }
        })

        return NextResponse.json({user: newUser, message: 'Usuário criado com sucesso!'})
    }catch(err){
        return NextResponse.json({message: "Erro!", err})
    }
}
