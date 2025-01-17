export const enum TIME_FILTER {
  M5 = 'm5',
  M15 = 'm15',
  M30 = 'm30',
  H1 = 'h1',
  H24= 'h24',
}

export interface IPoolInfoAttribute {
  name: string;
  address: string;
  base_token_price_usd: string;
  quote_token_price_usd: string;
  base_token_price_native_currency: string;
  quote_token_price_native_currency: string;
  base_token_price_quote_token: string;
  quote_token_price_base_token: string;
  pool_created_at: string;
  reserve_in_usd: string;
  fdv_usd: string;
  market_cap_usd: string;
  price_change_percentage: Record<TIME_FILTER, string>;
  transactions: Record<
    TIME_FILTER,
    {
      buys: number;
      sells: number;
      buyers: number;
      sellers: number;
    }
  >;
  volume_usd: Record<TIME_FILTER, string>;
}

export interface IPoolInfo {
  id: string;
  attributes: IPoolInfoAttribute;
  relationships: {
    base_token: {
      data: {
        id: string;
      };
    };
    quote_token: {
      data: {
        id: string;
      }
    },
    dex: {
      data: {
        id: string;
      }
    }
  };
}

export interface IPoolDetailAttribute {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  coingecko_coin_id: string;
  image_url: string;
  websites: string[];
  description: string;
  discord_url: string;
  telegram_handle: string;
  twitter_handle: string;
  categories: string[];
  gt_category_ids: string[];
  gt_score: number;
  metadata_updated_at: string;
}

export interface IPoolDetail {
  id: string;
  attributes: IPoolDetailAttribute;
}

export interface IPoolItem {
  baseToken: {
    address: string;
    name: string;
    symbol: string;
    logo: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
    logo: string;
  };
  logo: string;
  chainId: string;
  dexId: string;
  dexVersion: string;
  priceUsd: string;
  priceNative: string;
  marketCapUsd: string;
  fdv: string;
  volume: Record<TIME_FILTER, string>;
  txns: {
    m5: {
      buys: number;
      sells: number;
      buyers: number;
      sellers: number;
    };
    m15: {
      buys: number;
      sells: number;
      buyers: number;
      sellers: number;
    };
    m30: {
      buys: number;
      sells: number;
      buyers: number;
      sellers: number;
    };
    h1: {
      buys: number;
      sells: number;
      buyers: number;
      sellers: number;
    };
    h24: {
      buys: number;
      sells: number;
      buyers: number;
      sellers: number;
    };
  };
  priceChange: Record<TIME_FILTER, string>;
  pairCreatedAt: number;
  pairAddress: string;
}
