export interface XPermittedCrossDomainPoliciesOptions {
  permittedPolicies?: 'none' | 'master-only' | 'by-content-type' | 'all';
}

type XPermittedCrossDomainPolicies = (
  options?: Readonly<XPermittedCrossDomainPoliciesOptions>
) => readonly [string, string];

const ALLOWED_PERMITTED_POLICIES = new Set(['none', 'master-only', 'by-content-type', 'all']);

const getHeaderValueFromOptions = ({
  permittedPolicies = 'none',
}: Readonly<XPermittedCrossDomainPoliciesOptions>): string => {
  if (ALLOWED_PERMITTED_POLICIES.has(permittedPolicies)) return permittedPolicies;
  throw new Error(`X-Permitted-Cross-Domain-Policies does not support ${JSON.stringify(permittedPolicies)}`);
};

export const xPermittedCrossDomainPolicies: XPermittedCrossDomainPolicies = (options = {}) => {
  const headerValue = getHeaderValueFromOptions(options);
  return ['X-Permitted-Cross-Domain-Policies', headerValue] as const;
};
