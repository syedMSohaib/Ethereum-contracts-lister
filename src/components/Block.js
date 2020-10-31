import React from 'react'

export default function Block({ blocks }) {
  return (
    <div className="col-lg-6 mb-4 mb-lg-0">
      <div className="card h-100">
        <div className="card-header">
          <h2 className="card-header-title">Latest Blocks</h2>
        </div>
        <div
          className="js-scrollbar card-body overflow-hidden mCustomScrollbar _mCS_1 mCS-autoHide"
          style={{ minHeight: 400, position: 'relative', overflow: 'visible' }}
        >
          <div
            id="mCSB_1"
            className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside"
            style={{ maxHeight: 'none' }}
            tabIndex={0}
          >
            <div
              id="mCSB_1_container"
              className="mCSB_container"
              style={{ position: 'relative', top: 0, left: 0 }}
              dir="ltr"
            >
              {blocks.map((item, index) => {
                return (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="media align-items-sm-center mr-4 mb-1 mb-sm-0">
                          <div className="d-none d-sm-flex mr-2">
                            <span className="btn btn-icon btn-soft-secondary">
                              <span className="btn-icon__inner text-dark">
                                Bk
                              </span>
                            </span>
                          </div>
                          <div className="media-body">
                            <span className="d-inline-block d-sm-none">
                              Block
                            </span>
                            <a href="#">{ item.payload.number}</a>
                            <span className="d-sm-block small text-secondary ml-1 ml-sm-0 text-nowrap">
                              { item.payload.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="d-flex justify-content-between">
                          <div className="text-nowrap">
                            <span className="d-block mb-1 mb-sm-0">
                              Miner
                              <a
                                className="hash-tag text-truncate"
                                href="#"
                              >
                                { item.miner}
                              </a>
                            </span>
                            <a
                              href="#"
                              data-toggle="tooltip"
                              title
                              data-original-title="Transactions in this Block"
                            >
                              { item.payload.transactions.length} txns
                            </a>
                            <span className="d-inline-block d-sm-none">
                              <span
                                className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                                data-toggle="tooltip"
                                title
                                data-original-title="Block Reward"
                              >
                                2<b>.</b>23669 Eth
                              </span>
                            </span>
                          </div>
                          <div className="d-none d-sm-block">
                            <span
                              className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                              data-toggle="tooltip"
                              title
                              data-original-title="Block Reward"
                            >
                              Size: <b>{item.payload.size}</b> Byte
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
            id="mCSB_1_scrollbar_vertical"
            className="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical"
            style={{ display: 'block' }}
          >
            <div className="mCSB_draggerContainer">
              <div
                id="mCSB_1_dragger_vertical"
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
          <a className="btn btn-xs btn-block btn-soft-primary" href="/blocks">
            View all blocks
          </a>
        </div>
      </div>
    </div>
  )
}
