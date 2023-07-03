
import React , {useEffect, useState } from "react";
import './App.css';
import records from './records.json';
import styled from 'styled-components';

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  var validdata = false;

  const fetchData = () => {
    fetch("https://54a2b259-63bd-4307-89a4-9b7413ce4338.mock.pstmn.io/getdata")
    .then(response => {
      return response.json()
    })
    .then(data => {
      const filterdata = []
      // const listOfModels = ["ObjectDetection", "FaceAnalytics", "FaceRecognition", "AudioDetection"];

      const InferenceData = data.map(item => item.inferenceanalytics);
      //console.log(InferenceData)
      for (let inferobj of InferenceData) {
        //console.log(inferobj)
        //console.log(inferobj.TimeStamp);
        if (analyticsData.length == 0) {
          filterdata.push({ key: inferobj.TimeStamp, value: Object.values(inferobj) });
          validdata = true;
        } else if (analyticsData.slice(-1)[0]['key'] !== inferobj.TimeStamp) {
          filterdata.push({ key: inferobj.TimeStamp, value: Object.values(inferobj) });
          validdata = true;
        } else {
          validdata = false;
        }
      }
      

      if (validdata == true) {
        const wrapValues = filterdata[0]["value"].slice(0,-2).reduce((result, dictionary) => {
          Object.entries(dictionary).forEach(([key, value]) => {
            result[key] = (result[key] || 0) + value;
          });
          return result;
        }, {});

        filterdata[0]["value"] = wrapValues;
        setAnalyticsData(filterdata);
        validdata = false;
      }
      
    })
    
  }
  console.log(analyticsData);

  useEffect(() => {
    const interval= setInterval(()=>{
      fetchData();
    },3000);

    return() => clearInterval(interval);
  },[])

  return (
    <div>
      <h2>Object Detection Data:</h2>
    </div>
  );
};

export default App;
