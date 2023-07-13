import type { NextApiRequest, NextApiResponse } from "next";
import { getTokensByCollection, getTokenMetadata } from "./util";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;
  // query.collection
  // query.tokenId

  switch (method) {
    case "GET":
      if (
        !query.collection ||
        Array.isArray(query.collection) ||
        !query.tokenId ||
        Array.isArray(query.tokenId)
      ) {
        res.status(400).end(`Params error`);
      } else {
        const tokens = await getTokensByCollection(query.collection);

        const theToken = tokens.find((item) => item.token.tokenId);
        if (!theToken) {
          res.status(200).json({});
        } else {
          // get metadata
          const metadata = await getTokenMetadata(
            theToken.token.contract,
            query.tokenId
          );
          res.status(200).json({
            success: true,
            data: metadata || "Not support metadata address",
          });
        }
      }

      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
