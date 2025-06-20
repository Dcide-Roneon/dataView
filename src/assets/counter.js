import React, {useState} from "react";
const [resultsCount, setResultsCount] = useState(0);

const counter = (tableRows) => {
    setResultsCount(resultsCount + 1);
}



