import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
      return new NextResponse('Missing info', {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log(hashedPassword, hashedPassword2);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (e: any) {
    console.log(e, 'register_error');
    return new NextResponse('Interal Error', { status: 500 });
  }
}
