import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/views/Header/Header";
import SingleProductCard from "./components/views/SingleProductCard/SingleProductCard";


// import Input from "./components/views/Input/Input";

import "./index.scss";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
  
      <Header/>

      <SingleProductCard/>
      
      
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
