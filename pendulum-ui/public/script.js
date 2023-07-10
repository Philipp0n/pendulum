const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const pendulumCount = 5
const pendulumColors = [
  'rgb(30,144,255)',
  'rgb(255,165,0)',
  'rgb(255,255,0)',
  'rgb(0,128,0)',
  'rgb(138,43,226)'
]
const bobMasses = [2, 5, 6, 20, 6]
const scalingFactor = 15 // Scaling factor for the bob radius
const barWidth = 800
const barHeight = 10
const pivotX = canvas.width / 2
const pivotY = 100
const pendulumOffsets = [-400, -200, 0, 200, 400]
const pendulumLengths = [100, 200, 400, 600, 50]

let angles = [Math.PI / 4, Math.PI / 4, Math.PI / 4, Math.PI / 4, Math.PI / 4]
let angularVelocities = [0, 0, 0, 0, 0]

function updatePendulum () {
  const gravity = 0.9
  const timeStep = 0.5

  for (let i = 0; i < pendulumCount; i++) {
    const momentOfInertia =
      (bobMasses[i] * pendulumLengths[i] * pendulumLengths[i]) / 10000
    const angularAcceleration =
      ((-gravity / pendulumLengths[i]) * Math.sin(angles[i])) / momentOfInertia
    angularVelocities[i] = angularVelocities[i] + angularAcceleration * timeStep
    angles[i] = angles[i] + angularVelocities[i] * timeStep
  }

  drawPendulums()
  requestAnimationFrame(updatePendulum)
}

function drawPendulums () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw the top bar
  ctx.fillStyle = 'black'
  ctx.fillRect(pivotX - barWidth / 2, pivotY, barWidth, barHeight)

  for (let i = 0; i < pendulumCount; i++) {
    currentPivotX = pivotX + pendulumOffsets[i]
    const bobX = currentPivotX + pendulumLengths[i] * Math.sin(angles[i])
    const bobY = pivotY + pendulumLengths[i] * Math.cos(angles[i])

    // Draw the pendulum rod
    ctx.beginPath()
    ctx.moveTo(currentPivotX, pivotY)
    ctx.lineTo(bobX, bobY)
    ctx.strokeStyle = pendulumColors[i]
    ctx.lineWidth = 2
    ctx.stroke()

    // Calculate the radius based on the mass of the pendulum
    const bobRadius = Math.sqrt(bobMasses[i]) * scalingFactor

    // Draw the pendulum bob
    ctx.beginPath()
    ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2)
    ctx.fillStyle = pendulumColors[i]
    ctx.fill()
  }
}

function togglePlayPause () {
  var button = document.getElementById('toggleButton')
  if (button.classList.contains('play')) {
    button.classList.remove('play')
    button.classList.add('pause')
  } else {
    button.classList.remove('pause')
    button.classList.add('play')
  }
}

function stopPlayback () {
  var button = document.getElementById('toggleButton')
  button.classList.remove('pause')
  button.classList.add('play')
}

updatePendulum()
