import { APPWRITE_CONFIG } from "@/lib/appwrite/config";

export interface EcosystemApp {
  id: string;
  label: string;
  subdomain: string;
  type: 'app' | 'accounts' | 'support';
  icon: string;
  color: string;
  description: string;
}

export const NEXT_PUBLIC_DOMAIN = APPWRITE_CONFIG.SYSTEM.DOMAIN || 'kylrix.space';

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  { id: 'note', label: 'Note', subdomain: 'note', type: 'app', icon: 'file-text', color: '#00F5FF', description: 'Cognitive extension and smart notes.' },
  { id: 'vault', label: 'Vault', subdomain: 'vault', type: 'app', icon: 'shield', color: '#8b5cf6', description: 'Secure vault and identity vault.' },
  { id: 'flow', label: 'Flow', subdomain: 'flow', type: 'app', icon: 'zap', color: '#10b981', description: 'Intelligent task orchestration.' },
  { id: 'connect', label: 'Connect', subdomain: 'connect', type: 'app', icon: 'waypoints', color: '#ec4899', description: 'Secure bridge for communication.' },
  { id: 'id', label: 'Identity', subdomain: 'accounts', type: 'accounts', icon: 'fingerprint', color: '#ef4444', description: 'Sovereign identity management.' },
];

export const DEFAULT_ECOSYSTEM_LOGO = '/logo/rall.svg';

export function getEcosystemUrl(subdomain: string) {
  if (!subdomain) {
    return '#';
  }

  if (typeof window === 'undefined') {
    return `https://${subdomain}.kylrix.space`;
  }

  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isKylrixDomain = hostname.endsWith('kylrix.space');

  if (isLocalhost) {
    const ports: Record<string, number> = {
      accounts: 3000,
      note: 3001,
      vault: 3002,
      flow: 3003,
      connect: 3004
    };
    // Map some common subdomains to their logical app IDs if they differ
    const subdomainToAppId: Record<string, string> = {
      app: 'note',
      id: 'accounts',
      keep: 'vault'
    };
    const appId = subdomainToAppId[subdomain] || subdomain;
    return `http://localhost:${ports[appId] || 3000}`;
  }

  if (isKylrixDomain) {
    return `https://${subdomain}.kylrix.space`;
  }

  // For other domains (e.g. Vercel previews), we usually want to stay on the same domain
  // but if we are trying to jump to another app, we might just use the production URL
  // as a fallback or return a relative path if it's a monorepo-style deployment.
  // Given the requirement, we'll just return the production URL.
  return `https://${subdomain}.kylrix.space`;
}
