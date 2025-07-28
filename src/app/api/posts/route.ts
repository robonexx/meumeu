// src/app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') || undefined

  const posts = await prisma.post.findMany({
    where: category ? { category } : {},
    orderBy: { date: 'desc' }
  })

  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const { title, content, category, author } = await request.json()

  if (!content || !category || !author) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const post = await prisma.post.create({
    data: {
      title: title || null,
      content,
      category,
      author
    }
  })

  return NextResponse.json(post)
}

// PATCH: Update post by id
export async function PATCH(request: Request) {
  const { id, title, content } = await request.json()

  if (!id || (!title && !content)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...(title !== undefined ? { title } : {}),
      ...(content !== undefined ? { content } : {}),
    }
  })

  return NextResponse.json(post)
}

// DELETE: Delete post by id
export async function DELETE(request: Request) {
  const { id } = await request.json()
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  await prisma.post.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
