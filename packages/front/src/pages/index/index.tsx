import React from "react";
import SearchPanel from "./modules/searchPanel";
import IndexTabs from "./modules/tabs";

const IndexPage: React.FC = () => {
  return (
    <>
      <SearchPanel />

      <IndexTabs />
    </>
  );
}
export default IndexPage;
