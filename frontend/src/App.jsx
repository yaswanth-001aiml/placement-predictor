import { useState } from "react";
import api from "./api";

function App() {

  const [cgpa, setCgpa] = useState("");
  const [iq, setIq] = useState("");
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);

  const predict = async () => {

    try {

      const response = await api.post("/predict", {
        cgpa: Number(cgpa),
        iq: Number(iq)
      });

      setResult(response.data.prediction);

      setConfidence(response.data.confidence);
    } catch (error) {

      console.log(error);

    }

  };

  return (

<div className="container">

  <div className="card">

    <h1>
      Student Placement Predictor
    </h1>


    <input
      type="number"
      placeholder="Enter CGPA"
      value={cgpa}
      onChange={(e)=>setCgpa(e.target.value)}
    />


    <input
      type="number"
      placeholder="Enter IQ"
      value={iq}
      onChange={(e)=>setIq(e.target.value)}
    />


    <button onClick={predict}>
      {
        loading ? "Predicting..." : "Predict"
      }
    </button>


    {
      result &&

      <div className={
result==="Placed" 
? "result success" 
: "result danger"
}>

        <h2>
          {result}
        </h2>

        <p>
          Confidence:
          <b>{confidence}%</b>
        </p>

          <div className="progress">

    <div 
      className="bar"
      style={{width:`${confidence}%`}}
    >

    </div>

  </div>


      </div>

    }


  </div>

</div>

);
}

export default App;