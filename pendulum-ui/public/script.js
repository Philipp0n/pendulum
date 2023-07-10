const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const barWidth = 700;
const barHeight = 10;
const pivotX = canvas.width / 2
const pivotY = 100
const pendulumLength = 200
let angle = Math.PI / 4
let angularVelocity = 0

function updatePendulum () {
  const gravity = 0.9
  const timeStep = 0.1

  const angularAcceleration = (-gravity / pendulumLength) * Math.sin(angle)
  angularVelocity = angularVelocity + angularAcceleration * timeStep
  angle = angle + angularVelocity * timeStep

  drawPendulum()
  requestAnimationFrame(updatePendulum)
}

function drawPendulum () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw the top bar
  ctx.fillStyle = '#000000';
  ctx.fillRect(pivotX - barWidth / 2, pivotY, barWidth, barHeight);

  const bobX = pivotX + pendulumLength * Math.sin(angle)
  const bobY = pivotY + pendulumLength * Math.cos(angle)

  // Draw the pendulum rod
  ctx.beginPath()
  ctx.moveTo(pivotX, pivotY)
  ctx.lineTo(bobX, bobY)
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 2
  ctx.stroke()

  // Draw the pendulum bob
  const bobRadius = 20
  ctx.beginPath()
  ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2)
  ctx.fillStyle = '#FF0000'
  ctx.fill()
}

updatePendulum()
