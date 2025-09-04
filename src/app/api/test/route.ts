import { NextResponse } from 'next/server';
import { cloudflare } from '@/lib/cloudflare';

export async function GET() {
  try {
    const projects = await cloudflare.query('SELECT COUNT(*) as count FROM projects');
    const categories = await cloudflare.query('SELECT COUNT(*) as count FROM categories');
    
    return NextResponse.json({ 
      message: '🚀 ProjectBlox database connected successfully!',
      projects_count: projects[0]?.count || 0,
      categories_count: categories[0]?.count || 0,
      database_id: process.env.CLOUDFLARE_DATABASE_ID,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({ 
      error: 'Database connection failed', 
      details: error.message 
    }, { status: 500 });
  }
}

