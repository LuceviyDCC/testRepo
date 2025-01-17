import React from "react";

import UserIcon from '@/assets/images/avatar.png';

const SearchPanel: React.FC = () => {
  return (
    <>
      <div className="pt-2 pl-2.5 pb-1.5 pr-1 flex items-center justify-between">
        <div className="flex items-center justify-center w-8 h-8">
          <img className="w-6 h-6" src={UserIcon} />
        </div>

        <div className="flex items-center justify-center rounded-lg bg-neutral-100">
          
        </div>
      </div>
    </>
  );
}
export default SearchPanel;
