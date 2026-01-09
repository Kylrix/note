export const AUTO_TITLE_CONFIG = {
  baseCharLimit: 32,
  minCharLength: 18,
  avgWordThreshold: 6,
  extraPerLongWord: 2,
  maxExtraCharLimit: 24,
  maxWords: 8
};

export const buildAutoTitleFromContent = (content: string): string => {
  if (!content) return 'Untitled Note';
  const plainText = content.replace(/[#*`_~]/g, '').trim();
  if (!plainText) return 'Untitled Note';
  const firstLine = plainText.split('\n')[0].trim();
  return firstLine.slice(0, 50);
};
