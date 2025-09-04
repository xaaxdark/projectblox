import { NextResponse } from 'next/server';
import { cloudflare } from '@/lib/cloudflare';

export async function GET() {
  try {
    const categories = await cloudflare.getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
