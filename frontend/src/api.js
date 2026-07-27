import axios from "axios";

const predict = async () => {
    if(!cgpa || !iq){
    alert("Please enter all values");
    return;
}
  setLoading(true);
  
    try{

        const response = await api.post("/predict",{
            cgpa:Number(cgpa),
            iq:Number(iq)
        });

        setResult(response.data.prediction);
        setConfidence(response.data.confidence);

    }

    catch(error){

        console.log(error);

    }
    finally{

    setLoading(false);
    }

}

const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export default api;