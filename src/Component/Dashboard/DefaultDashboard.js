import React, { Component } from 'react'
import DefaultStatics from '../Stats/DefaultStatics'


// react bootstrap 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container';
import DoughnutChart from '../Stats/DoughnutChart'
import DefaultPost from '../Post/DefaultPost'

import style from './DefaultDashboard.module.scss'
import BarChart from '../Stats/BarChart';

export default class DefaultDashboard extends Component {
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
                      20
                                            </Card.Text>
                  </Card.Body>
                </Card>
                <Card className={style.cardBg}>
                  <Card.Body className='text-center'>
                    <Card.Title className={style.cardheadTitle}>Total Txs</Card.Title>
                    <Card.Text className={style.cardheadText}>
                      50
                                          </Card.Text>
                  </Card.Body>
                </Card>
                <Card className={style.cardBg}>
                  <Card.Body className='text-center'>
                    <Card.Title className={style.cardheadTitle} >Total Users</Card.Title>
                    <Card.Text className={style.cardheadText}>
                      569
                                          </Card.Text>
                  </Card.Body>
                </Card>
                <Card className={style.cardBg}>
                  <Card.Body className='text-center' >
                    <Card.Title className={style.cardheadTitle}>Unique Users</Card.Title>
                    <Card.Text className={style.cardheadText}>
                      89
                                          </Card.Text>
                  </Card.Body>
                </Card>

              </CardDeck>

            </Col>

            <Col sm={12} xl={8} xs={12} md={8} lg={8} className='mb-2'>

              {/* Start the second col  for stats */}

              <BarChart />

            </Col>

            <Col sm={12} xl={4} xs={12} md={4} lg={4}>

              {/* start the third col */}
              <DoughnutChart />
            </Col>

            <Col sm={12} xl={12} xs={12} md={12} lg={12} >

              {/* start the fourth col */}
              <DefaultPost />
              {/* ===== End the fourth col=== */}
            </Col>

            {/*  === End Row === */}
          </Row>

        </Container>
      </>
    )
  }
}
