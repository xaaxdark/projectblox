import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    account_id: process.env.CLOUDFLARE_ACCOUNT_ID ? 'SET' : 'MISSING',
    database_id: process.env.CLOUDFLARE_DATABASE_ID ? 'SET' : 'MISSING', 
    api_token: process.env.CLOUDFLARE_API_TOKEN ? 'SET' : 'MISSING',
    env_loaded: !!process.env.CLOUDFLARE_ACCOUNT_ID
  });
}
