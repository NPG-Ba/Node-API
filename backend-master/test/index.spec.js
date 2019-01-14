import { describe, it, before } from 'mocha'
import { expect, assert } from 'chai'
import * as sequelizeFixtures from 'sequelize-fixtures'
import model from '../src/db/models'
let server = require('../src/bin/www')
const request = require('supertest')

describe('Person API Testing', function () {
  before(function () {
  })

  it('Testing load more person', function (done) {
    model.sequelize.sync()
    sequelizeFixtures.loadFile('./test/fixtures/search.json', model).then(() => {
      request(server)
        .get('/person')
        .end(function (_err, res) {
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          assert(res.body.length === 3, 'invalid length return')
          done()
        })
    })
  })
})
