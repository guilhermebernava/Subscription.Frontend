import { AuthService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

const authService = new AuthService();

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;

  switch (query.get('action')) {
    case 'test': {
      const data = await authService.test();
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
        try {
          const data = await authService.login({
            email: body.email,
            password: body.password,
          });

          return NextResponse.json(data.data);
        } catch (err: any) {
          return NextResponse.json(err?.response?.data || err.message);
        }
      }
      case 'createUser': {
        try {
          const data = await authService.createUser({
            email: body.email,
            password: body.password,
          });
          return NextResponse.json(data.data);
        } catch (err: any) {
          return NextResponse.json(err?.response?.data || err.message);
        }
      }
      case 'confirmUser': {
        try {
          const data = await authService.confirmUser({
            email: body.email,
            password: body.password,
            confirmationCode: body.confirmationCode,
          });
          return NextResponse.json(data.data);
        } catch (err: any) {
          return NextResponse.json(err?.response?.data || err.message);
        }
      }
      case 'resetPassword': {
        try {
          const data = await authService.resetPassword({
            email: body.email,
            oldPassword: body.oldPassword,
            newPassword: body.newPassword,
          });
          return NextResponse.json(data.data);
        } catch (err: any) {
          return NextResponse.json(err?.response?.data || err.message);
        }
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
