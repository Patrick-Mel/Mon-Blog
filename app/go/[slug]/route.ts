import { NextResponse } from 'next/server';
import { trackAffiliateClick } from '../../../lib/services/blog';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const targetUrl = await trackAffiliateClick(slug);

  return NextResponse.redirect(targetUrl, 302);
}
