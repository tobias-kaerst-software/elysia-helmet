export interface XFrameOptionsOptions {
  action?: 'deny' | 'sameorigin';
}

type XFrameOptions = (options?: Readonly<XFrameOptionsOptions>) => readonly [string, string];

const getHeaderValueFromOptions = ({ action = 'sameorigin' }: Readonly<XFrameOptionsOptions>): string => {
  const normalizedAction = typeof action === 'string' ? action.toUpperCase() : action;

  switch (normalizedAction) {
    case 'SAME-ORIGIN':
      return 'SAMEORIGIN';
    case 'DENY':
    case 'SAMEORIGIN':
      return normalizedAction;
    default:
      throw new Error(`X-Frame-Options received an invalid action ${JSON.stringify(action)}`);
  }
};

export const xFrameOptions: XFrameOptions = (options = {}) => {
  const headerValue = getHeaderValueFromOptions(options);
  return ['X-Frame-Options', headerValue] as const;
};
