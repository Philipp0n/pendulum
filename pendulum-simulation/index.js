const express = require('express')
const cors = require('cors')
const app = express()
let port = 0

const tickRate = 120 // in Hz
let mass = 1
let stringLength = 100
let angularVelocity = 0
let angle = Math.PI / 4

if (hasFlag('--port')) {
  port = getFlagValue('--port')
} else {
  throw new Error('No port provided, please provide it with the --port flag')
}

// Check if a flag exists in the command line arguments
function hasFlag (flag) {
  const index = process.argv.indexOf(flag)
  return index !== -1
}

// Get the value of a flag
function getFlagValue (flag) {
  const index = process.argv.indexOf(flag)
  if (index !== -1 && index + 1 < process.argv.length) {
    return process.argv[index + 1]
  }
  return null
}

function updatePendulum () {
  const gravity = 0.9
  const timeStep = 0.5

  const momentOfInertia = (mass * stringLength * stringLength) / 10000
  const angularAcceleration =
    ((-gravity / stringLength) * Math.sin(angle)) / momentOfInertia
  angularVelocity = angularVelocity + angularAcceleration * timeStep
  angle = angle + angularVelocity * timeStep
  console.log('Current pendulum angle is ' + angle)
}

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)

app.use(express.json())

// Endpoint to get the current angle value
app.get('/angle', (req, res) => {
  res.json({ angle: angle })
})

app.post('/initialization', (req, res) => {
  ;({ angle, mass, stringLength } = req.body)
  // Convert degree to radian
  angle = angle * (Math.PI/180);

  // Start the loop at 120 times per second
  var interval = setInterval(updatePendulum, (1 / tickRate) * 1000) // Simulate at a fixed tick rate

  // Send a response back to the client
  res.sendStatus(204)
})

// Start the server application
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
