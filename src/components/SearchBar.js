import { Input, Radio } from "antd";

import { config } from "../constants";
import { useState } from "react";

const { Search } = Input;
const SearchBar = (props) => {
  const [searchType, setSearchType] = useState(config.SEARCH_KEY.all);
  const [error, setError] = useState("");

  const changeSearchType = (e) => {
    const searchType = e.target.value;
    setSearchType(searchType);
    setError("");
    if (searchType === config.SEARCH_KEY.all) {
      props.handleSearch({ type: searchType, keyword: "" });
    }
  };

  const handleSearch = (value) => {
    if (searchType !== config.SEARCH_KEY.all && value === "") {
      setError("Please input your search keyword!");
      return;
    }
    setError("");
    props.handleSearch({ type: searchType, keyword: value });
  };

  return (
    <div className="search-bar">
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        disabled={searchType === config.SEARCH_KEY.all}
      />
      <p className="error-msg">{error}</p>

      <Radio.Group
        onChange={changeSearchType}
        value={searchType}
        className="search-type-group"
      >
        <Radio value={config.SEARCH_KEY.all}>All</Radio>
        <Radio value={config.SEARCH_KEY.keyword}>Keyword</Radio>
        <Radio value={config.SEARCH_KEY.user}>User</Radio>
      </Radio.Group>
    </div>
  );
};

export default SearchBar;
