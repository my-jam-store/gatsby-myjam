require('dotenv').config()
const airtable = require('airtable')

const bulkActionRecordsLimit = 10
const bulkActionChunkDelay = 1000 // In milliseconds.
const base = baseInit()

function baseInit() {
  return new airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    .base(process.env.AIRTABLE_ORDER_BASE_ID)
}

async function createRecord(table, data, callback = defaultCallback) {
  if (!isBulkActionRecordsAboveLimit(data)) {
    return base(table).create(data, callback)
  }

  const chunks = bulkActionRecordsChunks(data)

  for (let i = 0; i < chunks.length; i++) {
    base(table).create(chunks[i], callback)

    if (chunks[i + 1]) {
      await setBulkActionChunkDelay()
    }
  }
}

async function list(table, selectParams = {}) {
  return await tableSelect(table, selectParams).all()
}

async function updateRecord(table, recordId, data, callback = defaultCallback) {
  if (!isBulkActionRecordsAboveLimit(data)) {
    return base(table).update(recordId, data, callback)
  }

  const chunks = bulkActionRecordsChunks(data)

  for (let i = 0; i < chunks.length; i++) {
    base(table).update(recordId, chunks[i], callback)

    if (chunks[i + 1]) {
      await setBulkActionChunkDelay()
    }
  }
}

async function deleteRecords(table, recordsIds) {
  if (!isBulkActionRecordsAboveLimit(recordsIds)) {
    return await destroySync(table, recordsIds)
  }

  const chunks = bulkActionRecordsChunks(recordsIds)

  for (let i = 0; i < chunks.length; i++) {
    await destroySync(table, chunks[i])

    if (chunks[i + 1]) {
      await setBulkActionChunkDelay()
    }
  }
}

function destroySync(table, recordsIds) {
  return new Promise((resolve, reject) => {
    base(table).destroy(
      recordsIds,
      (err, record) => {
        if (err) {
          console.error(err)
          reject(err)
        }

        resolve(record)
      }
    )
  })
}

function bulkActionRecordsChunks(array) {
  const chunks = []
  const chunkSize = bulkActionRecordsLimit < 1 ? 1 : bulkActionRecordsLimit

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }

  return chunks
}

function isBulkActionRecordsAboveLimit(data) {
  return Array.isArray(data) && data.length > bulkActionRecordsLimit
}

function setBulkActionChunkDelay() {
  return new Promise(resolve => {
    setTimeout(resolve, bulkActionChunkDelay)
  })
}

function defaultCallback(err) {
  if (err) {
    console.error(err)
  }
}

function tableSelect(table, params = {}) {
  const selectParams = {}

  if (params.view) {
    selectParams.view = params.view
  }

  if (params.fields) {
    selectParams.fields = params.fields
  }

  if (params.filter) {
    selectParams.filterByFormula = params.filter
  }

  if (params.maxRecords) {
    selectParams.maxRecords = params.maxRecords
  }

  if (params.pageSize) {
    selectParams.pageSize = params.pageSize
  }

  return base(table).select(selectParams)
}

module.exports = {
  createRecord,
  list,
  updateRecord,
  deleteRecords
}
