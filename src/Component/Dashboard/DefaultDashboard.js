import React, { Component } from 'react'
import DefaultStatics from '../Stats/DefaultStatics'
import { getStats } from '../../stats-builder'


// react bootstrap 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Container from 'react-bootstrap/Container';
import DoughnutChart from '../Stats/DoughnutChart'
import DefaultPost from '../Post/DefaultPost'

import style from './DefaultDashboard.module.scss'
import BarChart from '../Stats/BarChart';

export default class DefaultDashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      totalApps: '-',
      totalTxs: '-',
      totalUsers: '-',
      uniqueUsers: '-',
      dataPie: "",
      legendPie: "",
      txChartData: "",
      apps: null,
      txs: '-',
      inProgress: true
    }
  }

  async componentDidMount() {
    let stats = await getStats()
    console.log(stats)
    stats.apps.sort((a, b) => (a.txs < b.txs) ? 1 : -1)

    let top1 = (stats.apps[0].txs / stats.totalTxs) * 100,
      top2 = (stats.apps[1].txs / stats.totalTxs) * 100,
      top3 = (stats.apps[2].txs / stats.totalTxs) * 100

    let newDataPie = {
      labels: [stats.apps[0].name, stats.apps[1].name, stats.apps[2].name],
      series: [Math.round(top1), Math.round(top2), Math.round(top3)]
    };

    this.setState({
      totalApps: stats.totalApps,
      inProgress: false,
      apps: stats.apps.slice(),
      totalTxs: stats.totalTxs,
      totalUsers: stats.totalUsers,
      uniqueUsers: stats.uniqueUsers,
      txChartData: stats.txChartData,
      dataPie: newDataPie

    })
  }

  render() {

    return (
      <>
        <Container fluid={true}  >

          <Row className={style.containerBg} >
            {/* Start Row  */}
            <Col sm={12} xl={12} xs={12} md={12} lg={12}>

              {/* start the first col  */}

              <CardDeck id={style.bg} className='card-deck mb-3 ml-2 mr-2 mt-2 mt-3 p-5'>

                <Card className={style.cardBg} >
                  <Card.Body className='text-center'>
                    <Card.Title className={style.cardheadTitle} >Total Apps</Card.Title>
                    <Card.Text className={style.cardheadText} >
                      {this.state.totalApps}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className={style.cardBg}>
                  <Card.Body className='text-center'>
                    <Card.Title className={style.cardheadTitle}>Total Txs</Card.Title>
                    <Card.Text className={style.cardheadText}>
                      {this.state.totalTxs}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className={style.cardBg}>
                  <Card.Body className='text-center'>
                    <Card.Title className={style.cardheadTitle} >Total Users</Card.Title>
                    <Card.Text className={style.cardheadText}>
                      {this.state.totalUsers}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className={style.cardBg}>
                  <Card.Body className='text-center' >
                    <Card.Title className={style.cardheadTitle}>Unique Users</Card.Title>
                    <Card.Text className={style.cardheadText}>
                      {this.state.uniqueUsers}
                    </Card.Text>
                  </Card.Body>
                </Card>

              </CardDeck>

            </Col>

            <Col sm={12} xl={8} xs={12} md={8} lg={8} className='mb-2'>

              {/* Start the second col  for stats */}

              <BarChart data={this.state.txChartData} />

            </Col>

            <Col sm={12} xl={4} xs={12} md={4} lg={4}>

              {/* start the third col */}
              <DoughnutChart data={this.state.dataPie} />
            </Col>

            <Col sm={12} xl={12} xs={12} md={12} lg={12} >

              {/* start the fourth col */}
              <DefaultPost data={this.state.apps} />
              {/* ===== End the fourth col=== */}
            </Col>

            {/*  === End Row === */}
          </Row>

        </Container>
      </>
    )
  }
}
