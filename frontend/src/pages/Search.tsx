import React from "react";
import { useSearchContext } from "../context/SearchContext";

const Search = () => {
  const search = useSearchContext();
  console.log(search);

  return <div>Search page</div>;
};

export default Search;
