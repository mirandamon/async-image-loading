$(() => {
  const $bucket = $('.photo-bucket')
  const draw = img => $bucket.append(img)

  let currentIndex = 0

  // NOTE: The height and width variables can be changed to fetch different sized images.
  const getImageUrl = id =>
    `https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/rotate=deg:0/resize=width:30,height:30,fit:crop/output=format:jpg,quality:95/compress/${id}`

  const startLoading = () => {
    // TODO: Implement me.
    // while (currentIndex <= IMAGE_IDS.length) {
    for (currentIndex; currentIndex <= IMAGE_IDS.length; currentIndex += 5) {
      const loadedImages = []
      const currentBatch = IMAGE_IDS.slice(currentIndex, currentIndex + 5)
      currentBatch.forEach(imageId => {
        const currentImage = new Image()
        currentImage.onload = () => loadedImages.push(currentImage)
        currentImage.src = getImageUrl(imageId)
      })
      console.log(currentIndex)
      console.log(loadedImages[0])
      loadedImages.forEach(loadedImage => {
        console.log('hihihihihi')
        draw(loadedImage)
      })
    }
  }

  const stopLoading = () => {
    // TODO: Implement me.
    console.log('Stop!')
  }

  $('button.start').on('click', startLoading)
  $('button.stop').on('click', stopLoading)
})
