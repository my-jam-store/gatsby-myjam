class DataObject {
  get data() {
    const data = {}

    Object.getOwnPropertyNames(this).forEach(property => {
      data[property.replace(/^_/, '')] = this[property]
    })

    return data
  }

  set data(data) {
    for (const property in data) {
      this[property] = data[property]
    }

    return this
  }
}

module.exports = DataObject
