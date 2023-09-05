export const xXssProtection: () => readonly [string, string] = () => {
  return ['X-XSS-Protection', '0'] as const;
};
