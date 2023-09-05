export interface ContentSecurityPolicyOptions {
  useDefaults?: boolean;
  directives?: Record<string, null | string[]>;
  reportOnly?: boolean;
}

type NormalizedDirectives = Map<string, string[]>;

type ContentSecurityPolicy = (options?: Readonly<ContentSecurityPolicyOptions>) => readonly [string, string];

const DEFAULT_DIRECTIVES: Record<string, string[]> = {
  'default-src': ["'self'"],
  'base-uri': ["'self'"],
  'font-src': ["'self'", 'https:', 'data:'],
  'form-action': ["'self'"],
  'frame-ancestors': ["'self'"],
  'img-src': ["'self'", 'data:'],
  'object-src': ["'none'"],
  'script-src': ["'self'"],
  'script-src-attr': ["'none'"],
  'style-src': ["'self'", 'https:', "'unsafe-inline'"],
  'upgrade-insecure-requests': [],
};

export const dashify = (str: string): string =>
  str.replace(/[A-Z]/g, (capitalLetter) => `-${capitalLetter.toLowerCase()}`);

export const isDirectiveValueInvalid = (directiveValue: string): boolean => /;|,/.test(directiveValue);

export const has = (obj: Readonly<object>, key: string): boolean => Object.prototype.hasOwnProperty.call(obj, key);

export const getDefaultDirectives: () => Record<string, string[]> = () => ({ ...DEFAULT_DIRECTIVES });

const normalizeDirectives = (options: Readonly<ContentSecurityPolicyOptions>): NormalizedDirectives => {
  const defaultDirectives = getDefaultDirectives();
  const { useDefaults = true, directives: rawDirectives = defaultDirectives } = options;

  const result: NormalizedDirectives = new Map();
  const directiveNamesSeen = new Set<string>();
  const directivesExplicitlyDisabled = new Set<string>();

  for (const rawDirectiveName in rawDirectives) {
    if (!has(rawDirectives, rawDirectiveName)) continue;

    if (rawDirectiveName.length === 0 || /[^a-zA-Z0-9-]/.test(rawDirectiveName)) {
      throw new Error(`Content-Security-Policy received an invalid directive name ${JSON.stringify(rawDirectiveName)}`);
    }

    const directiveName = dashify(rawDirectiveName);

    if (directiveNamesSeen.has(directiveName)) {
      throw new Error(`Content-Security-Policy received a duplicate directive ${JSON.stringify(directiveName)}`);
    }
    directiveNamesSeen.add(directiveName);

    const rawDirectiveValue = rawDirectives[rawDirectiveName];

    if (rawDirectiveValue === null) {
      if (directiveName === 'default-src') {
        throw new Error('Content-Security-Policy needs a default-src but it was set to `null`.');
      }
      directivesExplicitlyDisabled.add(directiveName);
      continue;
    }

    if (!rawDirectiveValue) {
      throw new Error(
        `Content-Security-Policy received an invalid directive value for ${JSON.stringify(directiveName)}`
      );
    }

    const directiveValue = typeof rawDirectiveValue === 'string' ? [rawDirectiveValue] : rawDirectiveValue;

    for (const element of directiveValue) {
      if (typeof element === 'string' && isDirectiveValueInvalid(element)) {
        throw new Error(
          `Content-Security-Policy received an invalid directive value for ${JSON.stringify(directiveName)}`
        );
      }
    }

    result.set(directiveName, directiveValue);
  }

  if (useDefaults) {
    Object.entries(defaultDirectives).forEach(([defaultDirectiveName, defaultDirectiveValue]) => {
      if (!result.has(defaultDirectiveName) && !directivesExplicitlyDisabled.has(defaultDirectiveName)) {
        result.set(defaultDirectiveName, defaultDirectiveValue);
      }
    });
  }

  if (!result.size) {
    throw new Error('Content-Security-Policy has no directives. Either set some or disable the header');
  }

  return result;
};

const getHeaderValue = (directives: Readonly<NormalizedDirectives>) => {
  let err: undefined | Error;
  const result: string[] = [];

  directives.forEach((rawDirectiveValue, directiveName) => {
    const directiveValue = rawDirectiveValue.reduce((prev, curr) => `${prev} ${curr}`, '');

    if (!directiveValue) {
      result.push(directiveName);
    } else if (isDirectiveValueInvalid(directiveValue)) {
      err = new Error(
        `Content-Security-Policy received an invalid directive value for ${JSON.stringify(directiveName)}`
      );
    } else {
      result.push(`${directiveName}${directiveValue}`);
    }
  });

  return err || result.join(';');
};

export const contentSecurityPolicy: ContentSecurityPolicy = (options = {}) => {
  const headerName = options.reportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy';

  const normalizedDirectives = normalizeDirectives(options);
  const result = getHeaderValue(normalizedDirectives);

  if (result instanceof Error) throw result;
  return [headerName, result] as const;
};
