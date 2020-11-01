import React from 'react'
import { Link } from 'react-router-dom'


export default function Transaction({ blocks }) {
  var transactions = blocks
    .map((item, index) => {
      let tr = item.payload.transactions;
      tr.timestamp = item.timestamp;
      return tr;

    })
    .flat()

  return (
    <div className="col-lg-6">
      <div className="card h-100">
        <div className="card-header">
          <h2 className="card-header-title">Latest Transactions</h2>
        </div>
        <div
          className="card-body"
          style={{  height: 400, position: 'relative', overflow: 'visible' }}
        >
          <div
            id="mCSB_2"
            className="mCS-minimal-dark mCSB_vertical mCSB_outside"
            tabIndex={0}
            style={{ height: "100%", overflow:'scroll' }}
          >
            <div
              id="mCSB_2_container"
              className="mCSB_container"
              style={{ position: 'relative', top: 0, left: 0 }}
              dir="ltr"
            >
              {transactions.map((item, index) => {
                return (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="media align-items-sm-center mr-4 mb-1 mb-sm-0">
                          <div className="d-none d-sm-flex mr-2">
                            <span className="btn btn-icon btn-soft-secondary rounded-circle">
                              <span className="btn-icon__inner text-dark">
                                Tx
                              </span>
                            </span>
                          </div>
                          <div className="media-body">
                            <span className="d-inline-block d-sm-none mr-1">
                              TX#
                            </span>
                            <a
                              className="hash-tag hash-tag--xs hash-tag-xs-down--md text-truncate"
                              href="#"
                            >
                              { item.transactionHash}
                            </a>
                            <span className="d-none d-sm-block small text-secondary">
                              { item.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="d-sm-flex justify-content-between">
                          <div className="text-nowrap mr-4 mb-1 mb-sm-0">
                            <span>
                              From: {' '}
                              <a
                                className="hash-tag text-truncate"
                                href="#"
                              >
                                { item.from}
                              </a>
                            </span>
                            <span className="d-sm-block">
                              To: {' '}
                              <a
                                href="#"
                                className="hash-tag text-truncate"
                              >
                                { item.to}
                              </a>
                            </span>
                          </div>
                          <div>
                            <span
                              className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                              data-toggle="tooltip"
                              title
                              data-original-title="Amount"
                            >
                                BK: {item.blockNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="hr-space" />
                  </React.Fragment>
                )
              })}
            </div>
          </div>
          <div
            id="mCSB_2_scrollbar_vertical"
            className="mCSB_scrollTools mCSB_2_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical"
            style={{ display: 'block' }}
          >
            <div className="mCSB_draggerContainer">
              <div
                id="mCSB_2_dragger_vertical"
                className="mCSB_dragger"
                style={{
                  position: 'absolute',
                  minHeight: 50,
                  display: 'block',
                  height: 224,
                  maxHeight: 366,
                  top: 0,
                }}
              >
                <div className="mCSB_dragger_bar" style={{ lineHeight: 50 }} />
              </div>
              <div className="mCSB_draggerRail" />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <Link className="btn btn-xs btn-block btn-soft-primary" to="/transactions">
            View all transactions
          </Link>

        </div>
      </div>
    </div>
  )
}
