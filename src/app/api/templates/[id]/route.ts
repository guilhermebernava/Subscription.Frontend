import { TemplateService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

const templateService = new TemplateService();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await templateService.getOneTemplates(params.id);
  return NextResponse.json({ success: data.success, data: data.data }, { status: data.status });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const data = await templateService.updateTemplate(body.id, body);
  return NextResponse.json({ success: data.success, data: data.data }, { status: data.status });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await templateService.deleteTemplate(params.id);
  return NextResponse.json({ success: data.success, data: data.data });
}
