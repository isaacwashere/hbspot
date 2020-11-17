import "./App.css";
import logo from "./logo.svg";
import React, { useState } from "react";
import { getDataFromAPI } from "./utils/get-data-from-api";
import { handleTransformData } from "./utils/transform-data";
import { postDataToAPI } from "./utils/post-data-to-api";

function App() {
  const [data, setData] = useState<any[]>([]);

  const handleData = async () => {
    const data = await getDataFromAPI();
    console.log("DATA IS: ", data.partners);
    const transformedData = handleTransformData(data.partners);
    console.log("POSTING DATA: ", transformedData);
    const f = {
      countries: transformedData,
    };
    const v = JSON.stringify(f);
    console.log(v);
    await postDataToAPI(v);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {data &&
          data.map((dataPoint: any, index: number) => {
            return (
              <div key={index}>
                <h2>{dataPoint}</h2>
              </div>
            );
          })}
        <button onClick={async () => await handleData()}>Start</button>
      </header>
    </div>
  );
}

export default App;
