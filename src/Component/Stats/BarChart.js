import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2';
import Jumbotron from 'react-bootstrap/Jumbotron'

//scss
import style from './DefaultStatics.module.scss';

export default class BarChart extends Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      barData: {
        labels: [
          "3:00AM",
          "6:00AM",
          "9:00AM",
          "12:00AM",
          "3:00PM",
          "6:00PM",
          "9:00PM",
          "12:00PM"
        ],
        datasets: [
          {
            label: 'Transaction History (24 hours)',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [30, 50, 40, 60, 10, 30, 10, 20]
          }
        ]
      }
    }
  }

  componentWillReceiveProps(props) {
    console.log(props)
    this.setState({
      barData: {
        labels: props.data.labels,
        datasets: [
          {
            label: 'Transaction History (24 hours)',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: props.data.series[0]
          }
        ]
      }
    })
  }


  render() {
    return (
      <>
        <Jumbotron className={style.statsBg} >
          <Bar
            data={this.state.barData}
            height={500}
            options={{
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "Transaction History",
                fontSize: 18,

                fontColor: '#23273a',

              },


              legend: {
                display: true,
                position: 'top',
                fontColor: '#23273a',
                padding: 20,
                align: 'end',
              }
            }}
          />
        </Jumbotron >
      </>
    )
  }

}
