'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"https://easy-mock.com/mock/5c9c5d7a1a7ab91a34f14d53/example"',
})
