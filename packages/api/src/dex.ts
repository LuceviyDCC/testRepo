import _ from "lodash";
import dayjs from "dayjs";

import { getNewList, getTokenDetail, getTrendingList } from "./request/dex";
import { IPoolInfo, IPoolItem } from "../types/dex";

const STORAGE_KEY = "__dex-pool-info-storage";

export async function getIndexTrendingList(networkId: string) {
  const poolList = await getTrendingList(networkId);

  return fillTokenInfo(networkId, poolList);
}

export async function getIndexNewList(networkId: string) {
  const poolList = await getNewList(networkId);

  return fillTokenInfo(networkId, poolList);
}

export async function fillTokenInfo(networkId: string, tokenList: IPoolInfo[]) {
  const baseTokens = tokenList.map((v) =>
    v.relationships.base_token.data.id.replace(`${networkId}_`, ""),
  );
  const quoteTokens = tokenList.map((v) =>
    v.relationships.quote_token.data.id.replace(`${networkId}_`, ""),
  );

  const mergedTokens: string[] = _.union(quoteTokens, baseTokens);

  const mergedTokensInfo: Record<
    string,
    {
      address: string;
      chain: string;
      name: string;
      symbol: string;
      decimals: number;
      logo?: string;
    }
  > = {};
  const mergedTokensNeedGet: string[] = [];
  const getGlobalTokenTasks = [];
  for (let index = 0; index < mergedTokens.length; index++) {
    const tokenAddress = mergedTokens[index];
    const tokenInfoTask = getGlobalTokenInfo(networkId, tokenAddress);
    getGlobalTokenTasks.push(tokenInfoTask);
  }

  const globalTokensData = await Promise.all(getGlobalTokenTasks);

  for (let index = 0; index < globalTokensData.length; index++) {
    const tokenAddress = mergedTokens[index];
    const tokenInfo = globalTokensData[index];
    if (
      tokenInfo &&
      tokenInfo.logo &&
      tokenInfo.logo.trim() != "" &&
      tokenInfo.logo != "missing.png"
    ) {
      mergedTokensInfo[tokenAddress] = tokenInfo;
    } else {
      mergedTokensNeedGet.push(tokenAddress);
    }
  }

  const batchSize = 15; // 每批次更新的数量
  const batchTasks = [];
  for (let i = 0; i < mergedTokensNeedGet.length; i += batchSize) {
    const batch = mergedTokensNeedGet.slice(i, i + batchSize);
    batchTasks.push(getTokenDetail(networkId, batch));
  }

  const batchResults = await Promise.all(batchTasks);
  for (let index = 0; index < batchResults.length; index++) {
    const data = batchResults[index];

    data.forEach((v) => {
      mergedTokensInfo[v.attributes.address] = {
        address: v.attributes.address,
        chain: networkId,
        name: v.attributes.name,
        symbol: v.attributes.symbol,
        decimals: v.attributes.decimals,
        logo:
          v.attributes.image_url.trim() != "" &&
          v.attributes.image_url != "missing.png"
            ? v.attributes.image_url
            : "",
      };
    });
  }

  setGlobalTokenInfoFromList(networkId, Object.values(mergedTokensInfo));

  return tokenList
    .map((v) => formatPairInfoFromDexGrecko(v, networkId, mergedTokensInfo))
    .filter((v) => v);
}

async function getGlobalTokenInfo(networkId: string, tokenId: string) {
  try {
    const storage = localStorage.getItem(STORAGE_KEY) || "";
    const storageData: Record<
      string,
      {
        address: string;
        chain: string;
        name: string;
        symbol: string;
        decimals: number;
        logo?: string;
      }
    > = JSON.parse(storage) || {};

    return storageData[`${networkId}_${tokenId}`];
  } catch (e) {}

  return undefined;
}

async function setGlobalTokenInfoFromList(
  networkId: string,
  tokenInfoList: Array<{
    address: string;
    chain: string;
    name: string;
    symbol: string;
    decimals: number;
    logo?: string;
  }>,
) {
  try {
    const storage = localStorage.getItem(STORAGE_KEY) || "";
    const storageData: Record<
      string,
      {
        address: string;
        chain: string;
        name: string;
        symbol: string;
        decimals: number;
        logo?: string;
      }
    > = JSON.parse(storage) || {};

    tokenInfoList.forEach((tokenInfo) => {
      storageData[`${networkId}_${tokenInfo.address}`] = tokenInfo;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  } catch (e) {}
}

function formatPairInfoFromDexGrecko(
  poolInfo: IPoolInfo,
  networkId: string,
  tokenInfo: Record<
    string,
    {
      address: string;
      chain: string;
      name: string;
      symbol: string;
      decimals: number;
      logo?: string;
    }
  >,
): IPoolItem {
  const names = poolInfo.attributes.name.split("/").map((item) => item.trim());

  // if (names.length < 2) return undefined;
  let baseToken = {
    address: poolInfo.relationships.base_token.data.id.replace(
      `${networkId}_`,
      "",
    ),
    name: names[0].replace(/\s+\d+(\.\d+)?%$/, "").replace("WETH", "ETH"),
    symbol: names[0].replace(/\s+\d+(\.\d+)?%$/, "").replace("WETH", "ETH"),
    logo: "",
  };
  let quoteToken = {
    address: poolInfo.relationships.quote_token.data.id.replace(
      `${networkId}_`,
      "",
    ),
    name: names[1].replace(/\s+\d+(\.\d+)?%$/, "").replace("WETH", "ETH"),
    symbol: names[1].replace(/\s+\d+(\.\d+)?%$/, "").replace("WETH", "ETH"),
    logo: "",
  };
  let dexId = poolInfo.relationships.dex.data.id;
  const dexArrs = dexId.split("-");
  let dexVersion = dexArrs[0];

  if (dexArrs.length > 1) {
    dexId = dexArrs[0];
    dexVersion = dexArrs[1];
  }
  let logo = "";
  if (tokenInfo) {
    const filledBaseToken = tokenInfo[baseToken.address];
    if (filledBaseToken) {
      baseToken = {
        address: filledBaseToken.address,
        name: filledBaseToken.name
          .replace(/\s+\d+(\.\d+)?%$/, "")
          .replace("WETH", "ETH"),
        symbol: filledBaseToken.symbol.replace("WETH", "ETH"),
        logo: filledBaseToken.logo ?? "",
      };
      logo = filledBaseToken.logo ?? "";
    }

    const filledQuoteToken = tokenInfo[quoteToken.address];
    if (filledQuoteToken) {
      quoteToken = {
        address: filledQuoteToken.address,
        name: filledQuoteToken.name
          .replace(/\s+\d+(\.\d+)?%$/, "")
          .replace("WETH", "ETH"),
        symbol: filledQuoteToken.symbol.replace("WETH", "ETH"),
        logo: filledQuoteToken.logo ?? "",
      };
    }
  }

  return {
    baseToken,
    quoteToken,
    logo,
    chainId: networkId,
    dexId: dexId as string,
    dexVersion: dexVersion,
    priceUsd: poolInfo.attributes.base_token_price_usd,
    priceNative: poolInfo.attributes.base_token_price_quote_token,
    marketCapUsd: poolInfo.attributes.market_cap_usd ?? "_",
    fdv: poolInfo.attributes.fdv_usd,
    volume: { ...poolInfo.attributes.volume_usd },
    txns: {
      m5: { ...poolInfo.attributes.transactions.m5 },
      m15: { ...poolInfo.attributes.transactions.m15 },
      m30: { ...poolInfo.attributes.transactions.m30 },
      h1: { ...poolInfo.attributes.transactions.h1 },
      h24: { ...poolInfo.attributes.transactions.h24 },
    },
    priceChange: { ...poolInfo.attributes.price_change_percentage },
    pairCreatedAt: dayjs(poolInfo.attributes.pool_created_at).valueOf(),
    pairAddress: poolInfo.id.replace(`${networkId}_`, ""),
  };
}
