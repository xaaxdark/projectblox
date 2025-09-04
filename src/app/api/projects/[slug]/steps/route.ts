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

    const steps = await cloudflare.getProjectSteps(project.id);
    
    const stepsWithParsedData = steps.map((step: any) => ({
      ...step,
      tips: JSON.parse(step.tips || '[]'),
      commonMistakes: JSON.parse(step.common_mistakes || '[]')
    }));

    return NextResponse.json(stepsWithParsedData);
  } catch (error) {
    console.error('Error fetching project steps:', error);
    return NextResponse.json({ error: 'Failed to fetch project steps' }, { status: 500 });
  }
}
