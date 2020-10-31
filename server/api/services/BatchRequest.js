function PromisifyBatchRequest(web3) {
    this.batch = new web3.eth.BatchRequest();
    this.requests = [];
}

PromisifyBatchRequest.prototype.add = function (_request, ...params) {
    let that = this;
    let request = new Promise((resolve, reject) => {
        that.batch.add(_request.call(null, ...params, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        }));
    });
    this.requests.push(request);
};

PromisifyBatchRequest.prototype.execute = async function () {
    this.batch.execute();
    return await Promise.all(this.requests);
};

module.exports = PromisifyBatchRequest;
