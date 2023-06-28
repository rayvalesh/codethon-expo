import logo from './logo.svg';
import './App.css';
import records from './records.json';
import styled from 'styled-components'

function App() {
  const objectDetectionData = records.map(item => item.inferenceanalytics.ObjectDetection);
  const keys = []
  const values = []
  for (let eachobj of objectDetectionData) {
    keys.push(Object.keys(eachobj));
    values.push(Object.values(eachobj));
  }

  return (
    <div>
      <h2>Object Detection Data:</h2>
      <strong>Object</strong>
      <strong>Count</strong>
      {keys.map((key, index) => (
        <div key={index}>
           {key}
           {values[index]}<br/>
        </div>
      ))}
    </div>
  );
};

export default App;


const Box = styled.div`
  height: 20px;
  width: 20px;
  color: red;
`