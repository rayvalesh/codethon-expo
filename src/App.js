
import React , {useEffect, useState } from "react";
import './App.css';
import data from './records.json';
import styled from 'styled-components';

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  var validdata = false;

  const fetchData = () => {
    // fetch("https://expo-data.free.beeceptor.com/getdata")
    // .then(response => {
    //   return response.json()
    // })
    // .then(data => {
      var filterdata = []
      // const listOfModels = ["ObjectDetection", "FaceAnalytics", "FaceRecognition", "AudioDetection"];

      const InferenceData = data.map(item => item.inferenceanalytics);
      for (let inferobj of InferenceData) {
        
        if (analyticsData.length === 0) {
          
          filterdata.push({ key: inferobj.TimeStamp, value: Object.values(inferobj) });
          validdata = true;
          
        } else if (analyticsData.slice(-1)[0]['key'] !== inferobj.TimeStamp) {
          
          filterdata.push({ key: inferobj.TimeStamp, value: Object.values(inferobj) });
          validdata = true;
        }
      }
      

      if (validdata === true) {

        const wrapValues = filterdata[0]["value"].slice(0,-2).reduce((result, dictionary) => {
          Object.entries(dictionary).forEach(([key, value]) => {
            result[key] = (result[key] || 0) + value;
          });
          return result;
        }, {});

        if (analyticsData.length === 0) {
          filterdata[0]["value"] = wrapValues;
        } else {
          let temp = wrapValues;
          for (const [key, value] of Object.entries(temp)) {
            console.log(key, value);
            if (key in analyticsData.slice(-1)[0]['value']) {
              if ([temp[key], analyticsData.slice(-1)[0]['value'][key]].some((val) => val == null)) {
                if (temp[key] == null) {
                  diff = analyticsData.slice(-1)[0]['value'][key];
                } else {
                  diff = temp[key]
                }
              
              } else {
                var diff = temp[key] - analyticsData.slice(-1)[0]['value'][key]
              }
              
              if ( diff >= 0) {
                temp[key] = diff
              } else {
                temp[key] = value
              }
            } else {
              temp[key] = null
            }
          }
          filterdata[0]["value"] = temp;
          }
        
        setAnalyticsData(prevdata => [...prevdata, filterdata[0]]);
        validdata = false;
      }      
    }
    
  useEffect(() => {
    console.log(analyticsData.length,analyticsData);
  },[analyticsData])  
  

  useEffect(() => {
    
    const interval= setInterval(()=>{
      fetchData();
    },5000);

    return() => clearInterval(interval);
  },[fetchData])

  return (
    <div>
      <h2>Object Detection Data:</h2>
    </div>
  );
};

export default App;
