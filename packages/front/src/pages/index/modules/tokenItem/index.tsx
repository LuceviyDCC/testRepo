import React from "react";

import { IPoolItem, TIME_FILTER } from '@fe-app/api';

interface TokenItemCompProps {
  poolInfo: IPoolItem;
  timeFilter: TIME_FILTER;
}

const TokenItem: React.FC<TokenItemCompProps> = ({
  poolInfo,
  timeFilter,
}) => {
  return (
    <div className="flex item-middle justify-center px-[15px] py-3">
      <div className="w-[30px] h-[30px] mr-3 flex item-middle justify-center rounded-full overflow-hidden relative">
        <img className="w-full h-full" src={poolInfo.baseToken.logo} />

        <div className="w-[15px] h-[30px] -right-1 -bottom-0.5 p-px back bg-white rounded-full overflow-hidden flex item-middle justify-center">
          <img className="w-full h-full" src={poolInfo.quoteToken.logo} />
        </div>
      </div>

      <div className="flex-1 mr-3 text-sm font-bold font-primary">
        {poolInfo.baseToken.symbol}
      </div>

      <div className="mr-6 text-right font-primary">
        <div className="font-medium leading-5 text-normal">
          ${poolInfo.priceUsd}
        </div>
        <div className="leading-4 text-light">
          ${poolInfo.fdv}
        </div>
      </div>

      <div className=""></div>
    </div>
  );
}
export default TokenItem;
