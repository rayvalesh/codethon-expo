
import React , {useEffect, useState, useRef } from "react";
import './App.css';
import data from './records.json';
import styled from 'styled-components';
import CrowdDetection from "./components/CrowdDetection";
import AgeStats from "./components/AgeState";

window.wrapValues = null;

function App() {
  const [records, setRecords] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);
  
  var validdata = false;

  const fetchData = () => {
      var filterdata = []
      // const listOfModels = ["ObjectDetection", "FaceAnalytics", "FaceRecognition", "AudioDetection"];

      const InferenceData = records.map(item => item.inferenceanalytics);
      console.log(InferenceData);
      for (let inferobj of InferenceData) {
        
        if (analyticsData.length === 0) {
          console.log("ACC EMPTY",analyticsData);
          filterdata.push({ key: inferobj.TimeStamp, value: Object.values(inferobj) });
          validdata = true;
          
        } else if (analyticsData.slice(-1)[0]['key'] !== inferobj.TimeStamp) {
          console.log("DATA PRESENT",analyticsData.slice(-1)[0]['key'],inferobj.TimeStamp);
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
          let diff = 0;
          for (const [key, value] of Object.entries(temp)) {
            if (key in analyticsData.slice(-1)[0]['value']) {
              if ([temp[key], analyticsData.slice(-1)[0]['value'][key]].some((val) => val == null)) {
                if (temp[key] == null) {
                  diff = analyticsData.slice(-1)[0]['value'][key];
                } else {
                    diff = temp[key]
                }
              
              } else {
                  diff = temp[key] - analyticsData.slice(-1)[0]['value'][key]
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
    
    let subscribed = true;
    const interval= setInterval(()=>{
      fetch("https://expo-data.free.beeceptor.com/getdata")
        .then(response => {
          return response.json()
        })
        .then((data) => {
          if (subscribed) {
            setRecords(data);
            fetchData();
            console.log("Analytics",analyticsData.length,analyticsData);
          }
        });
      
    },30000);

    return() => {
      clearInterval(interval);
      subscribed = false;
    }
  },[analyticsData])

  const mockData = {
		ageGroups: [
			{ range: "Below 10", count: 20 },
			{ range: "10 - 20", count: 35 },
			{ range: "20 - 35", count: 45 },
			{ range: "35 - 50", count: 25 },
			{ range: "50 and above", count: 15 },
		],
	};

  return (
    <div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Crowd Detection</h1>
			{analyticsData && <CrowdDetection males={records[0].FaceAnalytics.Female} females={records[0].FaceAnalytics.Male} />}
			<h1 className="text-2xl font-bold mt-8 mb-4 ">Age Stats</h1>
			<AgeStats ageGroups={mockData.ageGroups} />
		</div>
  );
};

export default App;
