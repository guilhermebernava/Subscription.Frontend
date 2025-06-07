import { SubscriptionService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

const subscriptionService = new SubscriptionService();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get('token');
  const { id: userId } = await context.params;

  const data = await subscriptionService.getOneSubscriptions(userId ?? '', token?.value);
  return NextResponse.json({ success: data.success, data: data.data }, { status: data.status });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const token = req.cookies.get('token');

  const data = await subscriptionService.updateSubscription(body.id, body, token?.value);
  return NextResponse.json({ success: data.success, data: data.data }, { status: data.status });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get('token');

  const data = await subscriptionService.deleteSubscription(params.id, token?.value);
  return NextResponse.json({ success: data.success, data: data.data });
}
