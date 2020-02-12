'use strict';

const db = require('./db.js')
const qs = require('querystring')

const Model = {
  table: null,
  foreign_id: null,
  hateoas: function (item) {
    return {}
  },
  where: function (conditions) {
    return conditions.map(({ column, operator, value }) => {
      return `${column} ${operator} '${value}'`
    }).join(', ')
  },
  find: function (conditions, result) {
    let sql = `SELECT * FROM ${this.table}`

    if (Object.keys(conditions).length) {
      sql += ` WHERE ${this.where(
        Object.keys(conditions).map(key => {
          return {
            column: key,
            operator: '=',
            value: conditions[key]
          }
        })
      )}`
    }

    db.query(sql, (err, results) => {
      if (err) {
        result(err, null)
      }
      result(
        null,
        results.map(item => {
          return {
            ...item,
            ...this.hateoas(item)
          }
        })
      )
    })
  },
  create: function (data, result) {
    let sql = `INSERT INTO ${this.table} (${Object.keys(data).join()}) VALUES (${Object.values(data).map(item => `'${item}'`).join()})`

    db.query(sql, (err, results) => {
      if (err) {
        result(err, null)
      }
      result(null, results)
    })
  },
  update: function (id, data, result) {
    let sql = `UPDATE ${this.table} SET ${qs.encode(data, ',')} WHERE id = ${id}`

    db.query(sql, (err, results) => {
      if (err) {
        result(err, null)
      }
      result(null, results)
    })
  },
  delete: function (id, result) {
    let sql = `DELETE FROM ${this.table} WHERE id = ${id}`

    db.query(sql, (err, results) => {
      if (err) {
        result(err, null)
      }
      result(null, results)
    })
  }
}

module.exports = Model