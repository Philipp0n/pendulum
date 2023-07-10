const express = require('express')
const app = express()
let port = 0

if (hasFlag('--port')) {
  port = getFlagValue('--port');
} else {
  throw new Error("No port provided, please provide it with the --port flag");
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
  const timeStep = 0.1

  const angularAcceleration = (-gravity / pendulumLength) * Math.sin(angle)
  angularVelocity = angularVelocity + angularAcceleration * timeStep
  angle = angle + angularVelocity * timeStep
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
