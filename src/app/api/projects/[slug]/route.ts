import { NextRequest, NextResponse } from 'next/server';
import { cloudflare } from '@/lib/cloudflare';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const project = await cloudflare.getProjectBySlug(slug);
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch project', 
      details: error.message 
    }, { status: 500 });
  }
}
