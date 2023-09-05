export interface CrossOriginResourcePolicyOptions {
  policy?: 'same-origin' | 'same-site' | 'cross-origin';
}

type CrossOriginResourcePolicy = (options?: Readonly<CrossOriginResourcePolicyOptions>) => readonly [string, string];

const ALLOWED_POLICIES = new Set(['same-origin', 'same-site', 'cross-origin']);

const getHeaderValueFromOptions = ({ policy = 'same-origin' }: Readonly<CrossOriginResourcePolicyOptions>): string => {
  if (ALLOWED_POLICIES.has(policy)) return policy;
  throw new Error(`Cross-Origin-Resource-Policy does not support the ${JSON.stringify(policy)} policy`);
};

export const crossOriginResourcePolicy: CrossOriginResourcePolicy = (options = {}) => {
  const headerValue = getHeaderValueFromOptions(options);
  return ['Cross-Origin-Resource-Policy', headerValue] as const;
};
