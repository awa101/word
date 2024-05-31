import React, { useContext } from "react";
import WordContext from "../components/WordContext"; 

function SearchResults() {
    const { searchResults } = useContext(WordContext);
    // ... 나머지 코드
}

export default SearchResults;
