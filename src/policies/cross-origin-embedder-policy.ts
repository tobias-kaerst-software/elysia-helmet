export interface CrossOriginEmbedderPolicyOptions {
  policy?: 'require-corp' | 'credentialless';
}

type CrossOriginEmbedderPolicy = (options?: Readonly<CrossOriginEmbedderPolicyOptions>) => readonly [string, string];

const ALLOWED_POLICIES = new Set(['require-corp', 'credentialless']);

const getHeaderValueFromOptions = ({ policy = 'require-corp' }: Readonly<CrossOriginEmbedderPolicyOptions>): string => {
  if (ALLOWED_POLICIES.has(policy)) return policy;
  throw new Error(`Cross-Origin-Embedder-Policy does not support the ${JSON.stringify(policy)} policy`);
};

export const crossOriginEmbedderPolicy: CrossOriginEmbedderPolicy = (options = {}) => {
  const headerValue = getHeaderValueFromOptions(options);
  return ['Cross-Origin-Embedder-Policy', headerValue] as const;
};
