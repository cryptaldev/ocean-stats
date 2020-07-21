import React, { Component } from 'react';
import Info from './Info'
import Pagination from './Pagination'
import { LinkContainer } from 'react-router-bootstrap';
import Share from './Share'

import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'


//scss
import style from "./DefaultPost.module.scss";

//data for post
import data from './postData.json'

export default class DefaultPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: data,
            show: false,
            jumbotronShow: false
        }
    }

    onDelecthander = (e) => {
        console.log(this.state.postData, e, " data")
        this.state.postData.splice(e, 1)
    }

    shareShowHandler = () => {
        this.setState({
            show: !this.state.show
        })
    }

    jumbotronClickHandler = () => {
        if (this.state.show) {
            this.setState({
                show: false
            })
        }
    }

    render() {
        return (
            <>
                <div className={style.tableBg}>
                    <div className='d-flex m-2 mb-3'>
                        <h2 className={style.title}>All Apps</h2>

                    </div>
                    <Table className={style.table} responsive>
                        <thead className={style.thead}>
                            <tr>
                                <th>App Name</th>
                                <th>Users </th>
                                <th>Total Txs</th>
                                <th>Homepage</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={style.tbody}>

                            {/* data is json file */}

                            {this.state.postData.map(
                                (data, i) => {
                                    return (
                                        <tr key={data.userId}>
                                            <td>{data.write}</td>
                                            <td>{data.date}</td>
                                            <td>{data.time}</td>
                                            <td className={style.tdIcon}>
                                                <div>
                                                    <Info info={data.item} Id={i} modelShow={this.shareShowHandler} checkClick={this.onDelecthander} />
                                                </div>

                                            </td>
                                        </tr>
                                    )
                                }
                            )}

                        </tbody>
                    </Table>

                    <Pagination />

                </div>
                {this.state.show ? <Share checkShow={this.jumbotronClickHandler} /> : ''}
            </>
        )
    }
}




