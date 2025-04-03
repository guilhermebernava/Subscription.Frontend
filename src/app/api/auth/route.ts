import { AuthService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

const authService = new AuthService();

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;

  switch (query.get('action')) {
    case 'test': {
      const { data } = await authService.test();
      NextResponse.json({ message: 'POST request received', data });
    }
    default:
      return NextResponse.json({ error: 'Action not found' }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    switch (body.action) {
      case 'login': {
        const { data } = await authService.login({
          email: body.email,
          password: body.password,
        });
        console.log('data', data);
        return NextResponse.json({ message: 'Login request received', data, status: 200 });
      }
      case 'createUser': {
        const { data } = await authService.createUser({
          email: body.email,
          password: body.password,
        });
        return NextResponse.json({ message: 'User has been created', data, status: 201 });
      }
      case 'confirmUser': {
        const { data } = await authService.confirmUser({
          email: body.email,
          password: body.password,
        });
        return NextResponse.json({ message: 'User has been confirmed', data, status: 200 });
      }
      case 'resetPassword': {
        const { data } = await authService.resetPassword({
          email: body.email,
          password: body.password,
          newPassword: body.newPassword,
        });
        return NextResponse.json({ message: 'Password has been reset', data, status: 200 });
      }
      default: {
        return NextResponse.json({ error: 'Action not found' }, { status: 404 });
      }
    }
  } catch (error) {
    console.error('Error parsing JSON body:', error);
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}
