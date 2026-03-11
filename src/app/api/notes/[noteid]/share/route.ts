import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases, Permission, Role } from 'node-appwrite';
import { APPWRITE_CONFIG } from '@/lib/appwrite/config';
import { getCurrentUserFromRequest } from '@/lib/appwrite';

const APPWRITE_ENDPOINT = APPWRITE_CONFIG.ENDPOINT;
const APPWRITE_PROJECT_ID = APPWRITE_CONFIG.PROJECT_ID;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;

const APPWRITE_DATABASE_ID = APPWRITE_CONFIG.DATABASES.NOTE;
const APPWRITE_TABLE_ID_NOTES = APPWRITE_CONFIG.TABLES.NOTE.NOTES;

function initAdminClient() {
  if (!APPWRITE_API_KEY) {
    throw new Error('Server misconfiguration: APPWRITE_API_KEY is missing');
  }
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);
  
  return new Databases(client);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ noteid: string }> }) {
  try {
    const { noteid } = await params;
    const { targetUserId, permission } = await req.json();

    if (!targetUserId) {
      return NextResponse.json({ error: 'targetUserId is required' }, { status: 400 });
    }

    // Verify authentication
    const user = await getCurrentUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const databases = initAdminClient();
    
    // Fetch the note as admin
    const note = await databases.getDocument(APPWRITE_DATABASE_ID, APPWRITE_TABLE_ID_NOTES, noteid);
    
    // Verify ownership
    if (note.userId !== user.$id) {
      return NextResponse.json({ error: 'Only the note owner can share this note' }, { status: 403 });
    }

    let currentPermissions = note.$permissions || [];

    // Remove any existing permissions for this user to prevent duplicates
    currentPermissions = currentPermissions.filter((p: string) => !p.includes(`user:${targetUserId}`));

    // Add new permissions
    currentPermissions.push(Permission.read(Role.user(targetUserId)));
    
    if (permission === 'write' || permission === 'admin') {
      currentPermissions.push(Permission.update(Role.user(targetUserId)));
    }
    if (permission === 'admin') {
      currentPermissions.push(Permission.delete(Role.user(targetUserId)));
    }

    // Update the note's permissions directly via Server SDK
    await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_TABLE_ID_NOTES,
      noteid,
      {}, // no data changes
      currentPermissions
    );

    return NextResponse.json({ success: true, message: 'Note shared successfully' });
  } catch (error: any) {
    console.error('API share note error:', error);
    return NextResponse.json({ error: error.message || 'Failed to share note' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ noteid: string }> }) {
  try {
    const { noteid } = await params;
    const url = new URL(req.url);
    const targetUserId = url.searchParams.get('targetUserId');

    if (!targetUserId) {
      return NextResponse.json({ error: 'targetUserId is required' }, { status: 400 });
    }

    const user = await getCurrentUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const databases = initAdminClient();
    
    const note = await databases.getDocument(APPWRITE_DATABASE_ID, APPWRITE_TABLE_ID_NOTES, noteid);
    
    if (note.userId !== user.$id) {
      return NextResponse.json({ error: 'Only the note owner can unshare this note' }, { status: 403 });
    }

    const currentPermissions = note.$permissions || [];

    // Filter out all permissions related to the target user
    const newPermissions = currentPermissions.filter((p: string) => !p.includes(`user:${targetUserId}`));

    await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_TABLE_ID_NOTES,
      noteid,
      {},
      newPermissions
    );

    return NextResponse.json({ success: true, message: 'Sharing removed successfully' });
  } catch (error: any) {
    console.error('API remove share error:', error);
    return NextResponse.json({ error: error.message || 'Failed to remove sharing' }, { status: 500 });
  }
}
