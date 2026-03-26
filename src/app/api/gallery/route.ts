import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const resources = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'meumeu/',
      max_results: 100,
    });
    return NextResponse.json(resources.resources);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch images', details: err }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { public_id } = await request.json();
    await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete image', details: err }, { status: 500 });
  }
}
