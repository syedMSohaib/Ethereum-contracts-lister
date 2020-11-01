import React, { Component } from 'react'
import { TableSimple } from 'react-pagination-table';
import axios from 'axios';
import utils from "../Utils";
import hdate from "human-date";

export default class TxnDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            detailData: props.detailData,
            data: [],
            data1: [],
        }
    }

    componentDidMount(){
        this.fetchBlocks();    
    }

    setBlockData = async (data) => {
        const promise = data.map((item, index) => {
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
    }

    setTxnData = async(data) => {
        var transactions = data.map(async(item, index) => {

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

        this.setState({ data1: result1 });
    }

    fetchBlocks = () => {
        axios
        .get(`${utils.BASE_URL}/blocks/search?q=${this.props.detailData.blockNumber}&detail=1`)
        .then((response) => {
            this.setBlockData(response.data);
            this.setTxnData(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }    

    render() {
        const Header = ["Block", "Age", "Txn", "Miner", "Gas Used", "Gas Limit"];
        const Header1 = ["Block", "Txn", "Age", "From", "To", "Gas Used"];
        const { detailData } = this.state;
        return (
            <div className="container m-5">
                <TableSimple
                    title={"Block # " + detailData.blockNumber}
                    subTitle={''}
                    data={ this.state.data }
                    headers={ Header }
                    // perPageItemCount={ 5 }
                    totalCount={ this.state.data.length }
                    //Tell the component what order you wanna render.
                    columns={Header.join(".")}
                    arrayOption={ [["size", 'all', ', ']] }
                />      
                <div className="table-responsive">
                    <TableSimple
                        title={"All Transactions of Block #" + detailData.blockNumber}
                        subTitle={''}
                        data={ this.state.data1 }
                        headers={ Header1 }
                        // perPageItemCount={ 5 }
                        totalCount={ this.state.data1.length }
                        //Tell the component what order you wanna render.
                        columns={Header1.join(".")}
                        arrayOption={ [["size", 'all', ', ']] }
                    />                              
                </div>

            </div>

        )
    }
}
