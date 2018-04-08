function AsyncDownloader(batchSize, downloadFn) {
  this.BATCH_SIZE = batchSize
  this.downloadFn = downloadFn
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
  })
}

AsyncDownloader.prototype.downloadBatch = function(batch, isImage) {
  return new Promise((resolve, reject) => {
    let downloadedData = []
    for (let data of batch) {
      if (isImage) {
        this.downloadImage(data, data => {
          downloadedData.push(data)
          if (downloadedData.length === this.BATCH_SIZE) {
            resolve(downloadedData)
          }
        })
      }
    }
  })
}
