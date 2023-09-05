export const xDownloadOptions: () => readonly [string, string] = () => {
  return ['X-Download-Options', 'noopen'] as const;
};
