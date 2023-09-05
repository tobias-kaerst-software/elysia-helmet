import { ContentSecurityPolicyOptions, contentSecurityPolicy } from './policies/content-security-policy';
import { CrossOriginEmbedderPolicyOptions, crossOriginEmbedderPolicy } from './policies/cross-origin-embedder-policy';
import { CrossOriginOpenerPolicyOptions, crossOriginOpenerPolicy } from './policies/cross-origin-opener-policy';
import { CrossOriginResourcePolicyOptions, crossOriginResourcePolicy } from './policies/cross-origin-resource-policy';
import { originAgentCluster } from './policies/origin-agent-cluster';
import { ReferrerPolicyOptions, referrerPolicy } from './policies/referrer-policy';
import { StrictTransportSecurityOptions, strictTransportSecurity } from './policies/strict-transport-security';
import { xContentTypeOptions } from './policies/x-content-type-options';
import { XDnsPrefetchControlOptions, xDnsPrefetchControl } from './policies/x-dns-prefetch-control';
import { xDownloadOptions } from './policies/x-download-options';
import { XFrameOptionsOptions, xFrameOptions } from './policies/x-frame-options';
import {
  XPermittedCrossDomainPoliciesOptions,
  xPermittedCrossDomainPolicies,
} from './policies/x-permitted-cross-domain-policies';
import { xXssProtection } from './policies/x-xss-protection';

type SetHeaderFunction = (header: readonly [string, string]) => void;
type RemoveHeaderFunction = (name: string) => void;

export type HelmetOptions = {
  contentSecurityPolicy?: ContentSecurityPolicyOptions | boolean;
  crossOriginEmbedderPolicy?: CrossOriginEmbedderPolicyOptions | boolean;
  crossOriginOpenerPolicy?: CrossOriginOpenerPolicyOptions | boolean;
  crossOriginResourcePolicy?: CrossOriginResourcePolicyOptions | boolean;
  originAgentCluster?: boolean;
  referrerPolicy?: ReferrerPolicyOptions | boolean;
} & (
  | {
      strictTransportSecurity?: StrictTransportSecurityOptions | boolean;
      hsts?: never;
    }
  | {
      hsts?: StrictTransportSecurityOptions | boolean;
      strictTransportSecurity?: never;
    }
) &
  ({ xContentTypeOptions?: boolean; noSniff?: never } | { noSniff?: boolean; xContentTypeOptions?: never }) &
  (
    | {
        xDnsPrefetchControl?: XDnsPrefetchControlOptions | boolean;
        dnsPrefetchControl?: never;
      }
    | {
        dnsPrefetchControl?: XDnsPrefetchControlOptions | boolean;
        xDnsPrefetchControl?: never;
      }
  ) &
  ({ xDownloadOptions?: boolean; ieNoOpen?: never } | { ieNoOpen?: boolean; xDownloadOptions?: never }) &
  (
    | { xFrameOptions?: XFrameOptionsOptions | boolean; frameguard?: never }
    | { frameguard?: XFrameOptionsOptions | boolean; xFrameOptions?: never }
  ) &
  (
    | {
        xPermittedCrossDomainPolicies?: XPermittedCrossDomainPoliciesOptions | boolean;
        permittedCrossDomainPolicies?: never;
      }
    | {
        permittedCrossDomainPolicies?: XPermittedCrossDomainPoliciesOptions | boolean;
        xPermittedCrossDomainPolicies?: never;
      }
  ) &
  ({ xPoweredBy?: boolean; hidePoweredBy?: never } | { hidePoweredBy?: boolean; xPoweredBy?: never }) &
  ({ xXssProtection?: boolean; xssFilter?: never } | { xssFilter?: boolean; xXssProtection?: never });

type SetHelmetHeaders = (
  setHeader: SetHeaderFunction,
  removeHeader: RemoveHeaderFunction,
  options: Readonly<HelmetOptions>
) => void;

export const setHelmetHeaders: SetHelmetHeaders = (setHeader, removeHeader, options) => {
  switch (options.contentSecurityPolicy) {
    case undefined:
    case true:
      setHeader(contentSecurityPolicy());
      break;
    case false:
      break;
    default:
      setHeader(contentSecurityPolicy(options.contentSecurityPolicy));
      break;
  }

  switch (options.crossOriginEmbedderPolicy) {
    case undefined:
    case false:
      break;
    case true:
      setHeader(crossOriginEmbedderPolicy());
      break;
    default:
      setHeader(crossOriginEmbedderPolicy(options.crossOriginEmbedderPolicy));
      break;
  }

  switch (options.crossOriginOpenerPolicy) {
    case undefined:
    case true:
      setHeader(crossOriginOpenerPolicy());
      break;
    case false:
      break;
    default:
      setHeader(crossOriginOpenerPolicy(options.crossOriginOpenerPolicy));
      break;
  }

  switch (options.crossOriginResourcePolicy) {
    case undefined:
    case true:
      setHeader(crossOriginResourcePolicy());
      break;
    case false:
      break;
    default:
      setHeader(crossOriginResourcePolicy(options.crossOriginResourcePolicy));
      break;
  }

  switch (options.originAgentCluster) {
    case undefined:
    case true:
      setHeader(originAgentCluster());
      break;
    case false:
      break;
    default:
      setHeader(originAgentCluster());
      break;
  }

  switch (options.referrerPolicy) {
    case undefined:
    case true:
      setHeader(referrerPolicy());
      break;
    case false:
      break;
    default:
      setHeader(referrerPolicy(options.referrerPolicy));
      break;
  }

  if ('strictTransportSecurity' in options && 'hsts' in options) {
    throw new Error('Strict-Transport-Security option was specified twice. Remove `hsts` to silence this warning.');
  }
  const strictTransportSecurityOption = options.strictTransportSecurity ?? options.hsts;
  switch (strictTransportSecurityOption) {
    case undefined:
    case true:
      setHeader(strictTransportSecurity());
      break;
    case false:
      break;
    default:
      setHeader(strictTransportSecurity(strictTransportSecurityOption));
      break;
  }

  if ('xContentTypeOptions' in options && 'noSniff' in options) {
    throw new Error('X-Content-Type-Options option was specified twice. Remove `noSniff` to silence this warning.');
  }
  const xContentTypeOptionsOption = options.xContentTypeOptions ?? options.noSniff;
  switch (xContentTypeOptionsOption) {
    case undefined:
    case true:
      setHeader(xContentTypeOptions());
      break;
    case false:
      break;
    default:
      setHeader(xContentTypeOptions());
      break;
  }

  if ('xDnsPrefetchControl' in options && 'dnsPrefetchControl' in options) {
    throw new Error(
      'X-DNS-Prefetch-Control option was specified twice. Remove `dnsPrefetchControl` to silence this warning.'
    );
  }
  const xDnsPrefetchControlOption = options.xDnsPrefetchControl ?? options.dnsPrefetchControl;
  switch (xDnsPrefetchControlOption) {
    case undefined:
    case true:
      setHeader(xDnsPrefetchControl());
      break;
    case false:
      break;
    default:
      setHeader(xDnsPrefetchControl(xDnsPrefetchControlOption));
      break;
  }

  if ('xDownloadOptions' in options && 'ieNoOpen' in options) {
    throw new Error('X-Download-Options option was specified twice. Remove `ieNoOpen` to silence this warning.');
  }
  const xDownloadOptionsOption = options.xDownloadOptions ?? options.ieNoOpen;
  switch (xDownloadOptionsOption) {
    case undefined:
    case true:
      setHeader(xDownloadOptions());
      break;
    case false:
      break;
    default:
      setHeader(xDownloadOptions());
      break;
  }

  if ('xFrameOptions' in options && 'frameguard' in options) {
    throw new Error('X-Frame-Options option was specified twice. Remove `frameguard` to silence this warning.');
  }
  const xFrameOptionsOption = options.xFrameOptions ?? options.frameguard;
  switch (xFrameOptionsOption) {
    case undefined:
    case true:
      setHeader(xFrameOptions());
      break;
    case false:
      break;
    default:
      setHeader(xFrameOptions(xFrameOptionsOption));
      break;
  }

  if ('xPermittedCrossDomainPolicies' in options && 'permittedCrossDomainPolicies' in options) {
    throw new Error(
      'X-Permitted-Cross-Domain-Policies option was specified twice. Remove `permittedCrossDomainPolicies` to silence this warning.'
    );
  }
  const xPermittedCrossDomainPoliciesOption =
    options.xPermittedCrossDomainPolicies ?? options.permittedCrossDomainPolicies;
  switch (xPermittedCrossDomainPoliciesOption) {
    case undefined:
    case true:
      setHeader(xPermittedCrossDomainPolicies());
      break;
    case false:
      break;
    default:
      setHeader(xPermittedCrossDomainPolicies(xPermittedCrossDomainPoliciesOption));
      break;
  }

  if ('xPoweredBy' in options && 'hidePoweredBy' in options) {
    throw new Error('X-Powered-By option was specified twice. Remove `hidePoweredBy` to silence this warning.');
  }
  const xPoweredByOption = options.xPoweredBy ?? options.hidePoweredBy;
  switch (xPoweredByOption) {
    case undefined:
    case true:
      removeHeader('X-Powered-By');
      break;
    case false:
      break;
    default:
      removeHeader('X-Powered-By');
      break;
  }

  if ('xXssProtection' in options && 'xssFilter' in options) {
    throw new Error('X-XSS-Protection option was specified twice. Remove `xssFilter` to silence this warning.');
  }
  const xXssProtectionOption = options.xXssProtection ?? options.xssFilter;
  switch (xXssProtectionOption) {
    case undefined:
    case true:
      setHeader(xXssProtection());
      break;
    case false:
      break;
    default:
      setHeader(xXssProtection());
      break;
  }
};
