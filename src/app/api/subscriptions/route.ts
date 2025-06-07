import { SubscriptionService } from '@/services';
import { NextRequest, NextResponse } from 'next/server';

const subscriptionService = new SubscriptionService();

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token');
  const data = await subscriptionService.getSubscriptions(token?.value);
  return NextResponse.json({ success: data.success, data: data.data }, { status: data.status });
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get('token');
  const body = await req.json();
  const data = await subscriptionService.updateSubscription(body.id, body, token?.value);
  return NextResponse.json({ success: data.success, data: data.data }, { status: data.status });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token');
  const body = await req.json();
  const data = await subscriptionService.createSubscription(body, token?.value);
  return NextResponse.json({ success: data.success, data: data.data }, { status: data.status });
}
