export const xContentTypeOptions: () => readonly [string, string] = () => {
  return ['X-Content-Type-Options', 'nosniff'] as const;
};
