const BATCH_SIZE = 5

$(() => {
  let stopped = true

  const $bucket = $('.photo-bucket')
  const draw = img => $bucket.append(img)
  const drawCurrentBatch = batch => batch.forEach(image => draw(image))

  // NOTE: The height and width variables can be changed to fetch different sized images.
  const getImageUrl = id =>
    `https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/rotate=deg:0/resize=width:30,height:30,fit:crop/output=format:jpg,quality:95/compress/${id}`

  const asyncDownloader = new AsyncDownloader(BATCH_SIZE, getImageUrl)

  const startLoading = () => {
    stopped = false
    let batches = []

    while (IMAGE_IDS.length > 0 && !stopped) {
      const currentBatch = IMAGE_IDS.splice(0, BATCH_SIZE)
      batches.push(currentBatch)
    }

    // synchronously draw each batch in the list of batchs
    return batches.reduce((batchQueue, currentBatch) => {
      drawCurrentBatch(currentBatch)
    })
  }

  const stopLoading = () => {
    // TODO: Implement me.
    console.log('Stop!')
    stopped = true
  }

  $('button.start').on('click', startLoading)
  $('button.stop').on('click', stopLoading)
})
