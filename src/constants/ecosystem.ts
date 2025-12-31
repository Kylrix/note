export interface EcosystemApp {
  id: string;
  label: string;
  subdomain: string;
  type: 'app' | 'accounts' | 'support';
  icon?: string;
}

export const NEXT_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'whisperrnote.app';

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  { id: 'note', label: 'Note', subdomain: 'app', type: 'app', icon: '📝' },
  { id: 'keep', label: 'Keep', subdomain: 'keep', type: 'app', icon: '🔐' },
  { id: 'flow', label: 'Flow', subdomain: 'flow', type: 'app', icon: '🚀' },
  { id: 'connect', label: 'Connect', subdomain: 'connect', type: 'app', icon: '💬' },
  { id: 'accounts', label: 'Identity', subdomain: 'accounts', type: 'accounts', icon: '🛡️' },
];

export const DEFAULT_ECOSYSTEM_LOGO = '/logo/rall.svg';

export function getEcosystemUrl(subdomain: string) {
  if (!subdomain) {
    return '#';
  }
  return `https://${subdomain}.${NEXT_PUBLIC_DOMAIN}`;
}
