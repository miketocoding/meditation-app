const app = () => {
  // Document method querySelector() returns the first Element within the document that matches the specified selector, or group of selectors.
  const song = document.querySelector('.song')
  const play = document.querySelector('.play')
  // get the outline of the circle inside the svg
  const outline = document.querySelector('.moving-outline circle')
  // get the video that is inside the vid-container
  const video = document.querySelector('.vid-container video')

  // sounds - select all the sounds, use querySelectorAll and get all buttons
  const sounds = document.querySelectorAll('.sound-picker button')
  // time display - modify the h3 for time-display class
  const timeDisplay = document.querySelector('.time-display')
  // timeSelect - get all the buttons from time-select
  const timeSelect = document.querySelectorAll('.time-select button')
  // get the length of the outline of the circle because we want to animate it
  // getTotalLength is a function. Gives us length of path
  const outlineLength = outline.getTotalLength()
  // duration - when duration expires, song will stop
  let fakeDuration = 600

  // strokeDasharray - presentation attribute defining the pattern of dashes and gaps used to paint the outline of a shape
  // start with completely empty
  outline.style.strokeDasharray = outlineLength
  // strokeDashoffset - will leave empty space
  outline.style.strokeDashoffset = outlineLength

  // play sound
  // play icon, click
  play.addEventListener('click', () => {
    checkPlaying(song)
  })

  // select sound
  timeSelect.forEach(option => {
    console.log('I am in time.select.forEach function')
    // use normal function here so we can use 'this'
    option.addEventListener('click', function() {
      // this will update the fake duration
      fakeDuration = this.getAttribute('data-time')
      // this will update the text content
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
    })
  })

  // create a function specific to stop and play the sounds
  // paused is a property on song attribute
  const checkPlaying = song => {
    console.log('i am in checkPlaying function')
    if(song.paused){
      song.play()
      video.play()
      play.src = './svg/pause.svg'
    } else {
      song.pause()
      video.pause()
      play.src = './svg/play.svg'
    }
  }

  // we can animate the circle
  // every time the song plays the time updates
  song.ontimeupdate = () => {
    console.log('i am in ontimeupdate function')
    // starts from 0 and increments until the song finishes
    let currentTime = song.currentTime
    let elapsed = fakeDuration - currentTime
    // when elapsed time gets to 60 will restart at 0
    let seconds = Math.floor(elapsed % 60)
    let minutes = Math.floor(elapsed / 60)

    // animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
    outline.style.strokeDashoffset = progress

    // animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`
  }
}

app()