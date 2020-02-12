'use strict';

const Controller = function (Model) {
  return {
    index: function (req, res) {
      Model.find(req.query, function (err, results) {
        if (err) res.send({ status: 400, data: err })
        res.send({ status: 200, data: results })
      })
    },
    store: function (req, res) {
      Model.create(
        req.body,
        function (err, results) {
          if (err) res.send({ status: 400, data: err })
          res.send({ status: 201, data: { insertedId: results.insertId } })
        }
      )
    },
    show: function (req, res) {
      let condition = { id: req.params.id }

      Model.find(condition, function (err, results) {
        if (err) res.send({ status: 400, data: err })
        res.send({ status: 200, data: results })
      })
    },
    update: function (req, res) {
      let data = {}
      Object.keys(req.body).forEach(key => {
        data[key] = `'${req.body[key]}'`
      })

      Model.update(
        req.params.id,
        data,
        function (err, results) {
          if (err) res.send({ status: 400, data: err })
          res.send({ status: 200, data: { success: results.changedRows == 1 } })
        }
      )
    },
    destroy: function (req, res) {
      Model.delete(
        req.params.id,
        function (err, results) {
          if (err) res.send({ status: 400, data: err })
          res.send({ status: 200, data: { success: results.affectedRows == 1 } })
        }
      )
    }
  }
}

module.exports = Controller