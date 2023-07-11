const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const serverBaseURL = 'http://localhost:'

const pendulumCount = 5
const pendulumColors = []
const scalingFactor = 15 // Scaling factor for the bob radius
const bobRadius = []
const barWidth = 800
const barHeight = 10
const canvasCenter = canvas.width / 2
const pivotY = 100
const pivotX = [
  canvasCenter - 400,
  canvasCenter - 200,
  canvasCenter,
  canvasCenter + 200,
  canvasCenter + 400
]
let bobX = new Array(pendulumCount);
let bobY = new Array(pendulumCount);
const pendulumPorts = []
let playing = false

function updatePendulum () {
  if (playing) {
    // Fetch each bob coordinates from servers
    for (let i = 0; i < pendulumCount; i++) {
      let url = serverBaseURL + pendulumPorts[i] + '/coordinates'
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Error retrieving value')
          }
        })
        .then(data => {
          bobX[i] = data.bobX
          bobY[i] = data.bobY
        })
        .catch(error => {
          console.error('Error:', error.message)
        })
    }

    drawPendulums()
  }
  requestAnimationFrame(updatePendulum)
}

function drawPendulums () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw the top bar
  ctx.fillStyle = 'black'
  ctx.fillRect(canvasCenter - barWidth / 2, pivotY, barWidth, barHeight)

  for (let i = 0; i < pendulumCount; i++) {

    // Draw the pendulum rod
    ctx.beginPath()
    ctx.moveTo(pivotX[i], pivotY)
    ctx.lineTo(bobX[i], bobY[i])
    ctx.strokeStyle = pendulumColors[i]
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw the pendulum bob
    ctx.beginPath()
    ctx.arc(bobX[i], bobY[i], bobRadius[i], 0, Math.PI * 2)
    ctx.fillStyle = pendulumColors[i]
    ctx.fill()
  }
}

function togglePlayPause () {
  var button = document.getElementById('toggleButton')
  if (button.classList.contains('play')) {
    button.classList.remove('play')
    button.classList.add('pause')
    playing = true
  } else {
    playing = false
    button.classList.remove('pause')
    button.classList.add('play')
  }
}

function stopPlayback () {
  var button = document.getElementById('toggleButton')
  button.classList.remove('pause')
  button.classList.add('play')
}

function updateSliderValue (sliderId) {
  const slider = document.getElementById(sliderId)
  const sliderValueDisplay = document.getElementById(`${sliderId}Value`)

  sliderValueDisplay.textContent = slider.value
}

function initialiseSimulation () {
  for (let i = 0; i < pendulumCount; i++) {
    // Collect start menu values
    angle = document.getElementById(`angleSlider${i + 1}`).value
    mass = document.getElementById(`massSlider${i + 1}`).value
    stringLength = document.getElementById(`stringLength${i + 1}`).value
    color = document.getElementById(`color${i + 1}`).value
    port = document.getElementById(`port${i + 1}`).value
    const pendulum_data = {
      angle: angle,
      mass: mass,
      stringLength: stringLength,
      pivotX: pivotX[i],
      pivotY: pivotY
    }
    // Local values
    pendulumColors.push(color)
    pendulumPorts.push(port)
    // Calculate the radius based on the bob's mass
    bobRadius.push(Math.sqrt(mass) * scalingFactor)
    // Send pendulum configuration to server
    let url = serverBaseURL + pendulumPorts[i] + '/initialization'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pendulum_data)
    }).catch(error => {
      console.error('Error:', error)
    })
  }
  // Hide the start menu and show the canvas
  let simulationContainer = document.getElementById('simulation-container')
  let startMenuContainer = document.getElementById('start-menu-container')
  let hidden = simulationContainer.getAttribute('hidden')
  if (hidden) {
    simulationContainer.removeAttribute('hidden')
    startMenuContainer.setAttribute('hidden', 'hidden')
  }
  playing = true
}

window.onload = function () {
  const sliders = document.getElementsByClassName('slider')

  for (let i = 0; i < sliders.length; i++) {
    const sliderId = sliders[i].id
    updateSliderValue(sliderId)
  }
}

updatePendulum()
