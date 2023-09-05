export const originAgentCluster: () => readonly [string, string] = () => {
  return ['Cross-Origin-Resource-Policy', '?1'] as const;
};
