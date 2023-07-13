import { NFTInfo } from "../../constant/type";
import { ERC721abi } from "../../constant/abi";

const { Web3, Contract } = require("web3");
const httpProvider = new Web3.providers.HttpProvider(
  "https://eth-mainnet.g.alchemy.com/v2/K5QwFUhwqnz7fziTcnqGroFxJXpNlDMB"
);
const web3 = new Web3(httpProvider);

// TODO: sync to database
const TokenStore: Record<string, NFTInfo[]> = {};

export const getTokensByCollection: (
  collection: string
) => Promise<NFTInfo[]> = async (collection: string) => {
  if (TokenStore[collection]) {
    return TokenStore[collection];
  }
  const options = {
    method: "GET",
    headers: { accept: "*/*", "x-api-key": "demo-api-key" },
  };

  const res = await fetch(
    `https://api.reservoir.tools/tokens/v6?collection=${collection}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
  //   console.log("tokens res: ", res);
  if (Array.isArray(res?.tokens)) {
    TokenStore[collection] = res.tokens;
  }
  return Array.isArray(res?.tokens) ? res.tokens : [];
};

const metadataStore: Record<string, any> = {};

export const getTokenMetadata = async (
  contractAddress: string,
  tokenId: string
) => {
  console.log("getTokenMetadata: ", contractAddress, tokenId);
  if (metadataStore[tokenId]) {
    return metadataStore[tokenId];
  }
  const contract = new Contract(ERC721abi, contractAddress, web3);
  const tokenUri = await contract.methods.tokenURI(tokenId).call();
  const metadata = await fetchMetadata(tokenUri);
  if (metadata) {
    metadataStore[tokenId] = metadata;
  }
  return metadata;
};

export const fetchMetadata = async (url: string) => {
  if (url.indexOf("http") === 0) {
    return await fetch(url)
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
};
