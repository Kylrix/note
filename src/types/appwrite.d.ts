import type { Models } from 'node-appwrite';

export enum Status {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}

export enum TargetType {
    NOTE = "note",
    COMMENT = "comment"
}

export type Permission = 'read' | 'write' | 'admin';

export enum Cause {
    MANUAL = "manual",
    AI = "ai",
    COLLAB = "collab"
}

export enum Plan {
    FREE = "free",
    PRO = "pro",
    ORG = "org"
}

export interface Row extends Models.Row {
    $tableId?: string;
}

export type Users = Models.User<any> & Partial<Row> & {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    walletAddress?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    prefs?: any;
    emailVerification?: boolean;
    profilePicId?: string | null;
    publicProfile?: boolean;
    deletedAt?: string | null;
}

export type Notes = Models.Document & {
    id?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    userId?: string | null;
    isPublic?: boolean | null;
    status?: Status | null;
    parentNoteId?: string | null;
    title?: string | null;
    content?: string | null;
    tags?: string[] | null;
    comments?: string[] | null;
    extensions?: string[] | null;
    collaborators?: string[] | null;
    metadata?: string | null;
    format?: string | null;
    attachments?: string | null | string[];
    updated_at?: string;
    sharedPermission?: string;
    sharedAt?: string;
}

export type Tags = Models.Document & {
    id?: string | null;
    name?: string | null;
    notes?: string[] | null;
    createdAt?: string | null;
    color?: string | null;
    description?: string | null;
    usageCount?: number | null;
    userId?: string | null;
    nameLower?: string | null;
}

export type ApiKeys = Models.Document & {
    id?: string | null;
    key?: string | null;
    name?: string | null;
    userId?: string | null;
    createdAt?: string | null;
    lastUsed?: string | null;
    expiresAt?: string | null;
    scopes?: string[] | null;
    lastUsedIp?: string | null;
    keyHash?: string | null;
}

export type Comments = Models.Document & {
    noteId?: string;
    userId?: string;
    content?: string;
    createdAt?: string;
    parentCommentId?: string | null;
}

export type Reactions = Models.Document & {
    targetType?: TargetType;
    emoji?: string;
    createdAt?: string;
    targetId?: string;
    userId?: string;
}

export type Collaborators = Models.Document & {
    noteId?: string;
    userId?: string;
    permission?: Permission;
    collaborationId?: string;
    invitedAt?: string;
    accepted?: boolean;
}

export type ActivityLog = Models.Document & {
    userId?: string;
    action?: string;
    details?: string | null;
    createdAt?: string;
    ipAddress?: string | null;
}

export type Settings = Models.Document & {
    userId?: string;
    theme?: string | null;
    notifications?: boolean | null;
    language?: string | null;
    updatedAt?: string | null;
    settings?: any;
}

export type Extensions = Models.Document & {
    id?: string;
    name?: string;
    description?: string;
    enabled?: boolean;
    config?: string | null;
}
