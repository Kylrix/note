/**
 * Custom link component for ReactMarkdown that styles links in green
 * Used for post-render formatting of markdown links
 */
export function LinkComponent({ href, children }: { href?: string; children?: React.ReactNode }) {
  if (!href) return <span>{children}</span>;
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-600 dark:text-green-400 underline hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200"
    >
      {children}
    </a>
  );
}
