export const convertUnixTimestamp = (timestamp: string | number): string => {
  return new Date(Number(timestamp) * 1000).toISOString();
};
