import logo from './logo.svg';
import './App.css';
import records from './records.json';
import styled from 'styled-components'

function App() {
  const InferenceData = records.map(item => item.inferenceanalytics);
  const filterdata = []
  const listOfModels = ["ObjectDetection", "FaceAnalytics", "FaceRecognition", "AudioDetection"];
  for (let inferobj of InferenceData) {
    if (listOfModels.indexOf(Object.keys(inferobj)[0]) > -1) {
      filterdata.push({ key: Object.keys(inferobj)[0], value: Object.values(inferobj)[0] });  
    }
  }
  console.log(filterdata)
   


  return (
    <div>
      <h2>Object Detection Data:</h2>
    </div>
  );
};

export default App;
