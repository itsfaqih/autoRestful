const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()

app.use(bodyParser.json())

const routes = require('./routes.js')

routes.forEach(({ endpoint, controller }) => {
  app.route(`${endpoint}`).get(controller.index).post(controller.store)
  app.route(`${endpoint}/:id`).get(controller.show).put(controller.update).delete(controller.destroy)
})

app.listen('3000', () => {
  console.log('Server started on port 3000')
})