class HttpError extends Error {
  constructor(code, ...params) {
    super(...params)

    this.name = this.constructor.name
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError)
    }
  }
}

module.exports = HttpError
