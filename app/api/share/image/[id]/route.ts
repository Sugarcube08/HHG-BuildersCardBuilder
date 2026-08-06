import fs from 'fs';
import path from 'path';
import { memoryImageStore } from '../../upload/route';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'public, max-age=31536000, immutable',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const rawId = resolvedParams.id || '';
    const cleanId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

    if (!cleanId) {
      return new Response('Image ID required', { status: 400, headers: corsHeaders });
    }

    // 1. Check in-memory store first
    let imageBuffer = memoryImageStore.get(cleanId);

    // 2. Fall back to disk if not in memory
    if (!imageBuffer) {
      const filePath = path.join(process.cwd(), 'tmp', 'builder-images', `${cleanId}.png`);
      if (fs.existsSync(filePath)) {
        imageBuffer = fs.readFileSync(filePath);
      }
    }

    if (!imageBuffer) {
      return new Response('Image not found', { status: 404, headers: corsHeaders });
    }

    return new NextResponse(new Uint8Array(imageBuffer), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length.toString(),
      },
    });
  } catch (err) {
    return new Response('Failed to retrieve image', { status: 500, headers: corsHeaders });
  }
}
