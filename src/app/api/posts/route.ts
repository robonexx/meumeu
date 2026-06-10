import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type ApiError = { error: string };

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message } satisfies ApiError, { status });
}

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get('category') || undefined;

    const posts = await prisma.post.findMany({
      where: category ? { category } : {},
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('[api/posts][GET]', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const { title, content, category, author } = body ?? {};

    if (!content || !category || !author) {
      return errorResponse('Missing required fields', 400);
    }

    const post = await prisma.post.create({
      data: {
        title: title || null,
        content,
        category,
        author,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('[api/posts][POST]', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const { id, title, content } = body ?? {};

    if (!id || (title === undefined && content === undefined)) {
      return errorResponse('Missing required fields', 400);
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(content !== undefined ? { content } : {}),
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('[api/posts][PATCH]', error);
    return errorResponse('Internal server error', 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const { id } = body ?? {};

    if (!id) {
      return errorResponse('Missing id', 400);
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[api/posts][DELETE]', error);
    return errorResponse('Internal server error', 500);
  }
}
