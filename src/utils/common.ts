export function shortenAddress(
  address: string,
  prefixLength = 2,
  suffixLength = 4
): string {
  return `${address.substring(0, prefixLength)}...${address.substring(
    address.length - suffixLength
  )}`;
}
