import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import Plot from 'react-plotly.js';

  const Newplot = () => {
    const xArray = ["python","reactjs","java","karate framework"];
    const yArray = [50, 20, 20, 10];
    const data = [
        {
          labels: xArray,
          values: yArray,
          type: 'pie',
        },
      ];
    const layout = { width: 300, height: 300, title: 'Pie Chart' }
    const data3d = [{
      x: [1, 2, 3, 4, 5],
      y: [10, 11, 12, 13, 14],
      z: [100, 120, 140, 160, 180],
      mode: 'markers',
      type: 'scatter3d',
      marker: {
        size: 8,
        color: 'rgb(255,0,0)',
      }
    }];
    
    const layout3d = {
      scene: {
        xaxis: { title: 'X-axis' },
        yaxis: { title: 'Y-axis' },
        zaxis: { title: 'Z-axis' },
      },
    };


    return (
        <div>
        <Plot 
            data={data}
            layout={layout}
        />
        <Plot 
            data={[{x: xArray, y: yArray,type: "bar"}]}
            layout={layout}
        />
        {/* <Plot
            data={[{x: a}]}
        /> */}
        <Plot
          data = {data3d}
          layout={layout3d}
        />
      </div>
    );
  }
export default Newplot;