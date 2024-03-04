import React from 'react';
import Chart from 'react-apexcharts';
import '../css/Piechart.css'



class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['MALE', ' FEMALE','TRANSGENDER'],
        colors:['#07BE1F', '#0C4491', '#FF0000'],
        dataLabels:{colors:['White','White','White'
      ]},
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      series: [146872, 154009,5059]
    };
  }

  render() {
    return (
      <div id='piechart1'>
        <div><div className='p1'><h2>Total Voters<label id='btn1'>3,00,940</label></h2> <hr id = "pie1"/></div></div>
        <Chart options={this.state.options} series={this.state.series} type="pie" width={380} />
      </div>
    );
  }
}

export default Logout;