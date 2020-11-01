/**
 * BlockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var PromisifyBatchRequest = require('../services/BatchRequest')
const Web3 = require('web3')
const _ = require('lodash')
const { chunk } = require('lodash')

// let PromisifyBatchRequest = new helpers.PromisifyBatchRequest();

module.exports = {
  index: async function (req, res) {
    res.json({ msg: 'Ethereum Testnet Explorer' })
  },

  search: async function (req, res) {
    let query = req.param('q');
    let detail = req.param('detail');
    Block.native(function (err, collection) {
      if (err) return res.serverError(err)

      collection
        .find({
          $or: [
            { 'payload.number': { $regex: new RegExp(req.param('q'), 'i') } },
            {
              'payload.transactions': {
                $elemMatch: {
                  transactionHash: { $regex: new RegExp(req.param('q'), 'i') },
                },
              },
            },
          ],
        })
        .toArray(async function (err, results) {
          if(detail) return res.json(results);

          if (!results.length) return res.json(results);
          let type = query.includes('x')
          //Refining the search
          if (!type) {
            //means  this might be block
            var p = results.map((item, index) => {
              return {
                blockNumber: item.payload.number,
                TotalTxn: item.payload.transactions.length,
              }
            })

            let final = await Promise.all(p)
            return res.json(final)
          } else {
            var p = results.map(async (item, index) => {
              txns = _.map(item.payload.transactions, (i) =>
                _.pick(i, 'transactionHash', 'blockNumber'),
              )
              return txns;
            })

            let final = await Promise.all(p)
            return res.json(final)
          }
        })
    })
  },

  fetch: function (req, res) {
    let per_page = 10
    let current_page = req.param('page_no')
    if (typeof current_page !== 'undefined') {
      Block.find()
        .paginate({ page: current_page, limit: per_page })
        .sort('createdAt DESC')
        .exec(function (err, blocks) {
          res.json(blocks) // should return paginated 10 record
        })
    } else {
      Block.find()
        .sort('createdAt DESC')
        .limit(per_page)
        .exec(function (err, blocks) {
          res.json(blocks) // should return 10 record (last 10)
        })
    }
  },

  sync: async function (req, res) {
    let payload = []
    console.log('Initiating Fetching the blocks from Ethereum Ropsten Testnet')

    // Initializing Web3 Environment
    let web3 = new Web3(
      'https://ropsten.infura.io/v3/60968ff3b2f84a0ebdff7a993f4d080b',
    )
    const latest = await web3.eth.getBlockNumber()

    const blockNumbers = _.range(req.param('from'), req.param('to'), 1)

    // Create Batch Request For Blocks to avoid n API calls
    let batch = new PromisifyBatchRequest(web3)

    const chunkPromises = blockNumbers.map(async (blockNumber) => {
      var check = await Block.find({ 'payload.number': blockNumber }).meta({
        enableExperimentalDeepTargets: true,
      })

      if (!check.length) {
        console.log('Block Number: ', blockNumber)
        batch.add(web3.eth.getBlock.request, blockNumber)
      } else console.log('Block already exist in DB')
    })

    await Promise.all(chunkPromises)

    let receipts = await batch.execute()

    /**
     *
     * Structuring the data for DB insertion
     * Fetchin Transaction Detials from Erhereum Testnet
     *
     */

    const promises = receipts.map(async (element, index1) => {
      let Txnbatch = new PromisifyBatchRequest(web3)

      console.log(element, element.transactions)
      const TxnPromises = element.transactions.map((txn, txnindex) => {
        // console.log("web3.eth.getTransactionReceipt.request", txn);
        Txnbatch.add(web3.eth.getTransactionReceipt.request, txn)
      })

      await Promise.all(TxnPromises)
      // console.log('TxnReceipts', await Txnbatch.getRequest());

      let TxnReceipts = await Txnbatch.execute()

      // console.log('TxnReceipts'. TxnReceipts);
      element.transactions = TxnReceipts
      element.number = element.number.toString()
      payload.push({ payload: element })
      console.log(`Iteration for block ${element.number} is ended`)
    })

    await Promise.all(promises)

    // Inserting Bulk into DB

    // return res.json(payload);

    await Block.createEach(payload)
      .then(function (_contact) {
        console.log(`Blocks are inserted successfully`)
      })
      .catch(function (err) {
        console.error('Error on Fetching the block from ethrereum')
        console.error(err)
        console.error(JSON.stringify(err))
      })

    return res.json(`All Blocks are inserted successfully `)
  },
}
