import "./App.css";
import logo from "./logo.svg";
import React from "react";
import { getDataFromAPI } from "./utils/get-data-from-api";
import { handleTransformData } from "./utils/transform-data";
import { postDataToAPI } from "./utils/post-data-to-api";

function App() {
  const handleData = async () => {
    const data = await getDataFromAPI();
    const transformedData = handleTransformData(data.partners);
    console.log("POSTING THIS: ", transformedData);
    await postDataToAPI(transformedData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={async () => await handleData()}>Start</button>
      </header>
    </div>
  );
}

export default App;
