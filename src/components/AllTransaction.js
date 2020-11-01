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

const Header = ["Block", "Txn", "Age", "From", "To", "Gas Used"];

export default class AllTransaction extends Component {
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
            var transactions = response.data.map(async(item, index) => {

                let tr = item.payload.transactions;
 
                var tr_result = tr.map(function(el) {
                    var o = Object.assign({}, el);
                    o.timestamp = hdate.relativeTime(new Date(item.payload.timestamp * 1000));
                    return o;
                });
                  
 
                return tr_result;

            })

            let result = (await Promise.all(transactions)).flat();

            const final = result.map((payload, index) => {
                let p = {
                    "Block": payload.blockNumber,
                    "Txn": payload.transactionHash,
                    "Age": payload.timestamp,
                    "From": payload.from,
                    "To": payload.to,
                    "Gas Used": payload.gasUsed,
                };  
                return p;

            });

            // return;
            let result1 = await Promise.all(final);

            this.setState({ data: result1 })
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
                <div className="table-responsive">
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
                </div>       
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
