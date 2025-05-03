import { TemplateService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

const templateService = new TemplateService();

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token');
  const data = await templateService.getTemplates(token?.value);
  return NextResponse.json({ success: data.success, data: data.data }, { status: data.status });
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get('token');
  const body = await req.json();
  const data = await templateService.updateTemplate(body.id, body, token?.value);
  return NextResponse.json({ success: data.success, data: data.data }, { status: data.status });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token');
  const body = await req.json();

  const data = await templateService.createTemplate(body, token?.value);
  return NextResponse.json({ success: data.success, data: data.data }, { status: data.status });
}
