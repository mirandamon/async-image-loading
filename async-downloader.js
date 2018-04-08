function AsyncDownloader(batchSize, downloadFn) {
  this.BATCH_SIZE = batchSize
  this.downloadFn = downloadFn
  this.batchedReqs = []
}

AsyncDownloader.prototype.downloadImage = function(id, callback) {
  const image = new Image()
  const url = this.downloadFn(id)
  return new Promise((resolve, reject) => {
    image.onload = () => {
      callback(image)
      resolve(image)
    }
    image.onerror = () => reject(image)
    image.src = url
  }).catch(error => console.log(error))
}

AsyncDownloader.prototype.downloadBatch = function(batch, isImage, isRetry) {
  return new Promise((resolve, reject) => {
    let downloadedData = []
    !isRetry && this.batchedReqs.push(batch)
    for (let data of batch) {
      if (isImage) {
        this.downloadImage(data, data => {
          downloadedData.push(data)
          if (downloadedData.length === this.BATCH_SIZE) {
            this.batchedReqs.shift()
            resolve(downloadedData)
          }
        })
      }
    }
  }).catch(error => console.log(error))
}
