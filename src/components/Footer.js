import React from 'react'

export default function Footer() {
    return (
<footer
  className="bg-gray-750 py-4"
  style={{
    backgroundImage: "url(https://ropsten.etherscan.io//images/svg/components/abstract-shapes-20.svg?v=1)"
  }}
>
  <div className="container">
    <div className="row justify-content-sm-between align-items-center">
      <div className="col-sm-6 mb-3 mb-sm-0">
        <div className="d-flex align-items-center">
          <img
            width={15}
            src="https://ropsten.etherscan.io/images/svg/brands/ethereum.svg?v=1.3"
            alt="Ethereum Logo"
          />
          <span className="h5 text-white mb-0 ml-3">Powered by Ethereum</span>
        </div>
      </div>
    </div>
    <hr className="opacity-md" />
    <div className="row justify-content-between align-items-center font-size-1">
      <div className="col-md-6 mb-2 mb-md-0 d-flex">
        <p className="mb-0 text-white">
          Ethereum Contract Lister © 2020 (Ropsten|Testnet) &nbsp; | &nbsp;
          <i className="fas fa-heart text-danger" />
        </p>
      </div>
      <div className="col-md-6 text-md-right">
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a
              className="btn btn-sm btn-icon btn-soft-light btn-pill"
              href="https://www.reddit.com/r/etherscan/"
              rel="nofollow noopener"
              target="_blank"
              data-toggle="tooltip"
              data-placement="top"
              title
              data-original-title="Reddit"
            >
              <i className="fab fa-reddit-alien btn-icon__inner" />
            </a>
          </li>
          <li className="list-inline-item">
            <a className="white" href="#">
                Made with ❤ by Syed M Sohaib
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>

    )
}
