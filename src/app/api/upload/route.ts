// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  if (!file)
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const stream = Readable.from(buffer);

  const uploadWithTimeout = (stream: Readable, timeout = 10000) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error('Upload timeout')),
        timeout
      );

      const cloudinaryStream = cloudinary.uploader.upload_stream(
        { folder: 'meumeu' },
        (error, result) => {
          clearTimeout(timer);
          if (error || !result) reject(error);
          else resolve(result);
        }
      );

      stream.pipe(cloudinaryStream);
    });
  };

  try {
    const uploadResult = await uploadWithTimeout(stream);
    return NextResponse.json(uploadResult);
  } catch (err) {
    return NextResponse.json(
      { error: 'Upload failed', details: err },
      { status: 500 }
    );
  }
}
