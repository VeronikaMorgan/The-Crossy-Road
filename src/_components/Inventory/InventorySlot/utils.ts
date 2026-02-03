export const getEffectTimeLeft = (expiresAt: number): number => {
  const left = expiresAt - Date.now();
  return Math.max(0, Math.ceil(left / 1000));
};
