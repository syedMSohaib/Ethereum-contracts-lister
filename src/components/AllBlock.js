import React, { Component } from 'react'
import { TableSimple } from 'react-pagination-table';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import utils from "../Utils";
import hdate from "human-date";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(config.url.indexOf('search') < 0)
        document.body.classList.add('loading-indicator');

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    document.body.classList.remove('loading-indicator');
    return response;
}, function (error) {
    document.body.classList.remove('loading-indicator');
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

const Header = ["Block", "Age", "Txn", "Miner", "Gas Used", "Gas Limit"];

export default class AllBlock extends Component {
    constructor(props){
        super(props);
        this.state = {
            offset: 1,
            data: []
        }
    }

    componentDidMount(){
        this.fetchBlocks();
    }

    fetchBlocks = () => {
        axios
        .get(`${utils.BASE_URL}/blocks/fetch?page_no=${this.state.offset}`)
        .then(async (response) => {
            const promise = response.data.map((item, index) => {
                let payload = item.payload;
                let p = {
                    "Block": payload.number,
                    // "Age": payload.timestamp,
                    "Age": hdate.relativeTime(new Date(payload.timestamp * 1000)),
                    "Txn": payload.transactions.length,
                    "Size": payload.size + " Bytes",
                    "Miner": payload.miner,
                    "Gas Used": payload.gasUsed,
                    "Gas Limit": payload.gasLimit,
                };  
                return p;

            })
            let result = await Promise.all(promise);
            this.setState({ data: result })
        })
        .catch((error) => {
            console.log(error)
        })
    }


    handlePageClick = (data) => {
        let offset = data.selected+1;    
        this.setState({ offset: offset }, () => {
          this.fetchBlocks();
        });
    }

    render() {
        return (
            <div className="container m-5">
                <TableSimple
                    title="Blocks"
                    subTitle={''}
                    data={ this.state.data }
                    headers={ Header }
                    // perPageItemCount={ 5 }
                    totalCount={ this.state.data.length }
                    //Tell the component what order you wanna render.
                    columns={Header.join(".")}
                    arrayOption={ [["size", 'all', ', ']] }
                />         
                <div className="clear-fix mt-5"></div>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    disabledClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    previousLinkClassName={'page-link'}
                    activeClassName={'active'}
                />                       
            </div>
        )
    }
}
