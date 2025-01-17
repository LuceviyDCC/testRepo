import { IPoolDetail, IPoolInfo } from "../../types/dex";
import request from "./";

export const getTrendingList = (networkId: string) => {
  return request.get<unknown, Array<IPoolInfo>>(
    `/networks/${networkId}/trending_pools`,
  );
};

export const getNewList = (networkId: string) => {
  return request.get<unknown, Array<IPoolInfo>>(
    `/networks/${networkId}/new_pools`,
  );
};

export const getTokenDetail = (networkId: string, tokenList: string[]) => {
  return request.get<unknown, Array<IPoolDetail>>(
    `/networks/${networkId}/tokens/multi/${tokenList.join(",")}`,
  );
};
