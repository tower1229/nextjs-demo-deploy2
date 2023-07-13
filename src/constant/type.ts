export interface Metadata {
  imageOriginal: string;
}

export interface Collection {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface Token {
  contract: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  imageSmall: string;
  imageLarge: string;
  metadata: Metadata;
  media?: any;
  kind: string;
  isFlagged: boolean;
  lastFlagUpdate: string;
  lastFlagChange?: any;
  supply: string;
  remainingSupply: string;
  rarity: number;
  rarityRank: number;
  collection: Collection;
  owner: string;
}

export interface Currency {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Amount {
  raw: string;
  decimal: number;
  usd: number;
  native: number;
}

export interface Price {
  currency: Currency;
  amount: Amount;
}

export interface Source {
  id: string;
  domain: string;
  name: string;
  icon: string;
  url: string;
}

export interface FloorAsk {
  id: string;
  price: Price;
  maker: string;
  validFrom: number;
  validUntil: number;
  source: Source;
}

export interface Market {
  floorAsk: FloorAsk;
}

export interface NFTInfo {
  token: Token;
  market: Market;
}
