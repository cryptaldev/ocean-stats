
import React, { Component } from 'react';


//scss
import style from "./Pagination.module.scss";

export default class Pagination extends Component {

    render() {


        return (
            <>
                <div className={style.Pagination}>
                    <div className='d-flex  align-items-start'>
                        <h2 className={style.paginationTitle} > Rows par page:</h2>
                        <select className={style.paginationSelect}>
                            <option className={style.paginationOption}>50</option>
                            <option className={style.paginationOption}>100</option>
                            <option className={style.paginationOption}>150</option>
                            <option className={style.paginationOption}>200</option>
                        </select>
                    </div>
                    <div className='d-flex   align-items-start'>
                        <h2 className={style.paginationTitle}>
                            <span className='mr-2'>1</span>
                            <span id={style.paginationIcon} className='mr-2'>&#10094;  </span>
                            <span id={style.paginationIcon}> &#10095; </span>
                        </h2>
                    </div>
                </div>
            </>
        )
    }
}


