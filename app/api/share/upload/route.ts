import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// In-memory fallback map for environments with ephemeral/read-only filesystems
const memoryImageStore = new Map<string, Buffer>();

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let imageBuffer: Buffer | null = null;

    if (contentType.includes('application/json')) {
      const body = await request.json();
      if (body.image && typeof body.image === 'string') {
        const base64Data = body.image.replace(/^data:image\/\w+;base64,/, '');
        imageBuffer = Buffer.from(base64Data, 'base64');
      }
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        imageBuffer = Buffer.from(arrayBuffer);
      }
    }

    if (!imageBuffer || imageBuffer.length === 0) {
      return NextResponse.json(
        { error: 'No valid image data provided' },
        { status: 400, headers: corsHeaders }
      );
    }

    const imageId = `img_${crypto.randomBytes(8).toString('hex')}`;

    // Store in in-memory map
    memoryImageStore.set(imageId, imageBuffer);

    // Also attempt disk write to tmp/builder-images if filesystem permits
    try {
      const tmpDir = path.join(process.cwd(), 'tmp', 'builder-images');
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
      fs.writeFileSync(path.join(tmpDir, `${imageId}.png`), imageBuffer);
    } catch {
      // Ignore disk write errors on ephemeral runtimes
    }

    return NextResponse.json({ imageId }, { status: 200, headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to upload image', details: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export { memoryImageStore };
