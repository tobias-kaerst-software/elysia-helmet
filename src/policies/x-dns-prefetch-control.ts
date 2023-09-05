export interface XDnsPrefetchControlOptions {
  allow?: boolean;
}

type XDnsPrefetchControl = (options?: Readonly<XDnsPrefetchControlOptions>) => readonly [string, string];

export const xDnsPrefetchControl: XDnsPrefetchControl = (options = {}) => {
  const headerValue = options.allow ? 'on' : 'off';
  return ['X-DNS-Prefetch-Control', headerValue] as const;
};
