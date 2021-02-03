const aes = require('aes-js')
const argon2 = require('argon2')
const crypto = require('crypto')
const cryptoJs = require('crypto-js')

async function encrypt(text) {
  const salt = crypto.randomBytes(16)
  const ctrCounter = crypto.randomBytes(16)
  const key = await ctrKey(salt)

  const textBytes = aes.utils.utf8.toBytes(text)
  const encryptedBytes = ctr(key, ctrCounter).encrypt(textBytes)

  const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes)
  const hmac = cryptoJs.HmacSHA256(text, key.toString('hex'))

  const encryptedData = [
    encryptedHex,
    hmac.toString(),
    salt.toString('hex'),
    ctrCounter.toString('hex')
  ].join(':')

  return Buffer.from(encryptedData).toString('base64')
}

async function decrypt(encryptedData) {
  const [encryptedBytes, textMac, salt, ctrCounter] = Buffer.from(encryptedData, 'base64')
    .toString()
    .split(':')
    .map(item => Buffer.from(item, 'hex'))

  const key = await ctrKey(salt)
  const decryptedBytes = ctr(key, ctrCounter).decrypt(encryptedBytes)

  const decryptedText = aes.utils.utf8.fromBytes(decryptedBytes)
  const hmac = cryptoJs.HmacSHA256(decryptedText, key.toString('hex'))

  if (hmac != textMac.toString('hex')) {
    throw new Error('Wrong password')
  }

  return decryptedText
}

function ctr(key, ctrCounter) {
  return new aes.ModeOfOperation.ctr(key, new aes.Counter(ctrCounter))
}

async function ctrKey(salt) {
  return await argon2.hash(process.env.CRYPTO_PASSWORD, hashSettings(salt))
}

function hashSettings(salt) {
  return {
    type: argon2.argon2di,
    raw: true,
    timeCost: 8,
    memoryCost: 2 ** 15,
    parallelism: 2,
    hashLength: 32,
    salt: salt
  }
}

module.exports = {
  encrypt,
  decrypt
}
