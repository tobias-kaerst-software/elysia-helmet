export interface CrossOriginOpenerPolicyOptions {
  policy?: 'same-origin' | 'same-origin-allow-popups' | 'unsafe-none';
}

type CrossOriginOpenerPolicy = (options?: Readonly<CrossOriginOpenerPolicyOptions>) => readonly [string, string];

const ALLOWED_POLICIES = new Set(['same-origin', 'same-origin-allow-popups', 'unsafe-none']);

const getHeaderValueFromOptions = ({ policy = 'same-origin' }: Readonly<CrossOriginOpenerPolicyOptions>): string => {
  if (ALLOWED_POLICIES.has(policy)) return policy;
  throw new Error(`Cross-Origin-Opener-Policy does not support the ${JSON.stringify(policy)} policy`);
};

export const crossOriginOpenerPolicy: CrossOriginOpenerPolicy = (options = {}) => {
  const headerValue = getHeaderValueFromOptions(options);
  return ['Cross-Origin-Opener-Policy', headerValue] as const;
};
