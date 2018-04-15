const BATCH_SIZE = 5

$(() => {
  let stopped = true
  let startedPreviously = false

  const $bucket = $('.curated-photos-container')
  const draw = img =>
    $bucket.append(`
  <div class="post">
    <img src="${img.src}" />
    <p class="relative-time">1 minute ago</p>
    <div class="post-details">
      <p class="brandname">Fear of Jerry</p>
      <p class="size">M</p>
    </div>
    <p class="title">Oversize Striped Tee</p>
    <p class="price">$240</p>
  </div>`)
  const drawCurrentBatch = batch => batch.forEach(image => draw(image))

  // NOTE: The height and width variables can be changed to fetch different sized images.
  const getImageUrl = id =>
    `https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/rotate=deg:0/resize=width:235,height:381,fit:crop/output=format:jpg,quality:95/compress/${id}`

  const asyncDownloader = new AsyncDownloader(BATCH_SIZE, getImageUrl)

  const startLoading = () => {
    stopped = false
    let batches = []

    if (!startedPreviously) {
      startedPreviously = true
      while (IMAGE_IDS.length > 0 && !stopped) {
        const currentBatch = IMAGE_IDS.splice(0, BATCH_SIZE)
        batches.push(
          asyncDownloader.downloadBatch(currentBatch, (isImage = true))
        )
      }
    } else {
      resumedBatches = asyncDownloader.batchedReqs
      while (resumedBatches.length > 0 && !stopped) {
        const currentBatch = resumedBatches.splice(0, 1)[0]
        batches.push(
          asyncDownloader.downloadBatch(
            currentBatch,
            (isImage = true),
            (isRetry = true)
          )
        )
      }
    }

    // synchronously draw each batch in the list of batches
    console.log(batches)
    return batches
      .reduce(
        (batchQueue, currentBatch) =>
          batchQueue.then(previousRun =>
            currentBatch.then(batch => {
              drawCurrentBatch(batch)
              return [...previousRun, batch]
            })
          ),
        // the initial value of the accumulator is a resolved empty promise, this
        // will be populated by the batches in the reduce()
        Promise.resolve([])
      )
      .then(batches =>
        console.log(
          `Load successful - ${
            batches.length
          } batches of images were loaded with a batch size of ${BATCH_SIZE}`
        )
      )
  }

  const stopLoading = () => {
    console.log('Stop!')
    stopped = true
    window.stop()
  }

  $('button.start').on('click', startLoading)
  $('button.stop').on('click', stopLoading)
})
