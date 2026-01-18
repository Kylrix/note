import { NextResponse, NextRequest } from 'next/server';
import { Client, Databases, Query } from 'node-appwrite';
import { createRateLimiter } from '@/lib/rate-limit-middleware';
import { TargetType } from '@/types/appwrite';

const rateLimiter = createRateLimiter({
  max: 20,
  windowMs: 60 * 1000,
});

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? 'https://fra.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '67fe9627001d97e37ef3';
const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const APPWRITE_TABLE_ID_REACTIONS = process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID_REACTIONS!;

export async function GET(req: NextRequest, { params }: { params: Promise<{ noteid: string }> }) {
  const { noteid } = await params;
  const { allowed, retryAfter } = rateLimiter(req);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter?.toString() || '60',
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const targetId = searchParams.get('targetId') || noteid;
  const targetType = searchParams.get('targetType') || TargetType.NOTE;

  try {
    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    
    // Optionally use API key if available
    if (process.env.APPWRITE_API_KEY) {
      client.setKey(process.env.APPWRITE_API_KEY);
    }

    const databases = new Databases(client);

    // 1. Verify note is public
    const note = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID_NOTES!,
      noteid
    );

    if (!note || !note.isPublic) {
      return NextResponse.json({ error: 'Note not found or not public' }, { status: 404 });
    }

    // 2. Fetch reactions for the specific target
    const res = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_TABLE_ID_REACTIONS,
      [
        Query.equal('targetType', targetType),
        Query.equal('targetId', targetId),
        Query.orderAsc('createdAt'),
        Query.limit(500),
      ]
    );

    return NextResponse.json({ documents: res.documents });
  } catch (error) {
    console.error('Error fetching shared reactions:', error);
    return NextResponse.json({ error: 'Failed to fetch reactions' }, { status: 500 });
  }
}