import crypto from 'crypto'
import fs from 'fs'

const hmacKey = crypto.randomBytes(32).toString('hex')

if (fs.existsSync('.env.local')) {
  const envFile = fs.readFileSync('.env.local', 'utf8')
  // Double-check it's not already set
  if (!envFile.includes('ALTCHA_SECRETKEY')) {
    fs.appendFileSync('.env.local', `\nALTCHA_SECRETKEY=${hmacKey}`)
  }
  console.log(`Successfully wrote ALTCHA_SECRETKEY to .env.local`)
} else if (fs.existsSync('.env')) {
  const envFile = fs.readFileSync('.env', 'utf8')
  // Double-check it's not already set
  if (!envFile.includes('ALTCHA_SECRETKEY')) {
    fs.appendFileSync('.env', `\nALTCHA_SECRETKEY=${hmacKey}`)
  }
  console.log(`Successfully wrote ALTCHA_SECRETKEY to .env`)
} else {
  console.error('No .env/.env.local file found, please create one first.')
}