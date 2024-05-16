import prisma from "../../lib/prisma"
import { NextResponse } from 'next/server'
const bcrypt = require('bcrypt');

export async function GET(req) {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({ message: 'OK', users })
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 400 })
    }
}

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        if (!user) {
            return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
        }
        return NextResponse.json({ message: 'Usuário autenticado com sucesso', user });
    } catch (error) {
        return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
    }
}