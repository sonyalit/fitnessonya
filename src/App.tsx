import './App.css';
import React, { useState, useEffect } from "react";
import Calculator from './Calculator/Calculator';
import CollectData from './CollectData/CollectData';
export interface IBody{
  age?:number;
  height?:number;
  weight?:number;
  gender?:string;
  activity?:number;
  goal?:string;
  neck?:number;
  waist?:number;
  hip?:number;
  date?:Date;
}
function App():JSX.Element {
  
  const [bodyInfo, setBodyInfo] = useState<IBody>({})
 
  return (
    <div className="App">
      <header className="App-header">
           <CollectData bodyInfo={bodyInfo} setBodyInfo={setBodyInfo} />
           <Calculator bodyInfo={bodyInfo} setBodyInfo={setBodyInfo}/>
      </header>
    </div>
  );
}

export default App;