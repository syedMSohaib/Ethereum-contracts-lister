/**
 * BlockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var PromisifyBatchRequest = require("../services/BatchRequest");
const Web3 = require('web3');
const _ = require('lodash');

// let PromisifyBatchRequest = new helpers.PromisifyBatchRequest();

module.exports = {
    index: function(req, res){
        return res.json("API v.1.0.0 - Ethereum Ropsten Testnet");
    },

    fetch: function(req, res){
        Block.find()
        .sort('createdAt DESC')
        .limit(10)
        .exec(function(err, prices){
            res.json(prices);   // should return 10 record (last 10)
        });
    },
    
    sync : async function(req, res) {
        let payload = [];

        console.log("Initiating Fetching the blocks from Ethereum Ropsten Testnet");

        // Initializing Web3 Environment
        let web3 = new Web3('https://ropsten.infura.io/v3/2843d357465246c6896168dfa1eb8b8e');
        const latest = await web3.eth.getBlockNumber();
        const blockNumbers = _.range(latest - 2, latest + 1, 1)

        // Create Batch Request For Blocks
        let batch = new PromisifyBatchRequest(web3);

        blockNumbers.forEach((blockNumber) => {
            console.log("Block Number: ", blockNumber);
            batch.add(web3.eth.getBlock.request, blockNumber)
        });

        let receipts = await batch.execute();

        /**        
         * 
         * Structuring the data for DB insertion
         * Fetchin Transaction Detials from Erhereum Testnet
         * 
         */

        const promises = receipts.map(async (element, index) => {
            let Txnbatch = new PromisifyBatchRequest(web3);
            element.transactions.forEach((txn) => {
                Txnbatch.add(web3.eth.getTransactionReceipt.request, txn);
            });
            let TxnReceipts = await Txnbatch.execute();
            element.transactions = TxnReceipts;
            payload.push({ payload: element });
            console.log(`Iteration for block ${element.number} is ended`);
        });

        await Promise.all(promises);

        // Inserting into DB
        return Block.createEach(payload).then(function (_contact) {
            console.log(`${receipts.length} Blocks are inserted successfully `);
            return res.json(`${receipts.length} Blocks are inserted successfully `);
        }).catch(function (err) {
            console.error("Error on Fetching the block from ethrereum");
            console.error(err);
            console.error(JSON.stringify(err));
            return res.json({
                err: err,
                status: 'Error',
                statusDescription: "Error on Fetching the block from ethrereum",
                title: '"Error on Fetching the block from ethrereum"'
            });
        });
        
    }
    
};

