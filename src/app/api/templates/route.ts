import { TemplateService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

const templateService = new TemplateService();

export async function GET(req: NextRequest) {
  const data = await templateService.getTemplates();
  return NextResponse.json({ success: data.success, data: data.data }, { status: data.status });
}
