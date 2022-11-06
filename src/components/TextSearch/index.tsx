import React from "react";
import { Space } from "antd";
import SearchInput from "./SearchInput";
import SearchQuery from "./SearchQuery";
import useLocalStorageState from "use-local-storage-state";

function TextSearch() {
  const [query] = useLocalStorageState("text_search", {
    defaultValue: "",
  });
  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <SearchInput />
      {query && <SearchQuery />}
    </Space>
  );
}

export default TextSearch;
