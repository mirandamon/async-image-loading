const CHUNK_SIZE = 5

$(() => {
  let stopped = true

  const $bucket = $('.photo-bucket')
  const draw = img => $bucket.append(img)
  const drawCurrentChunk = chunk => chunk.forEach(image => draw(image))

  // NOTE: The height and width variables can be changed to fetch different sized images.
  const getImageUrl = id =>
    `https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/rotate=deg:0/resize=width:30,height:30,fit:crop/output=format:jpg,quality:95/compress/${id}`

  const startLoading = () => {
    stopped = false
    let chunks = []

    while (IMAGE_IDS.length > 0 && !stopped) {
      const currentChunk = IMAGE_IDS.splice(0, CHUNK_SIZE)
      chunks.push(currentChunk)
    }

    // synchronously draw each chunk in the list of chunks
    return chunks.reduce((chunkQueue, currentChunk) => {
      drawCurrentChunk(currentChunk)
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
