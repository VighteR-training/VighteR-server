process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let History = require('../models/History')
let User = require('../models/Users')
let Move = require('../models/Move')
let movementModel = require('../models/Movement')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../MockServer')
let should = chai.should()

chai.use(chaiHttp)

describe('Move and movement', () => {

  beforeEach((done) => {
    movementModel.remove({}, (err) => {
      done()
    })
  })


  describe('/POST should return success Move post', () => {
    it('should return success Move post', (done) => {
      let mockId = new movementModel({ name: 'jab' })

      let move = new Move({ x: 1, y: 2, z: 9, power: 9999 })
      mockId.save((err, mock) => {
        chai.request(server)
          .post(`/movements/${mock.id}/addMove`)
          .send(move)
          .end((err, res) => {
            console.log('ini id yg dicari', mock.id)
            console.log('ini move', move)
            console.log('ini mock', mock)
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('movementUpdated')
            done()
          })
      })
    })
  })



  describe('/DELETE/:id should deleted gyro data with matching id', () => {
    it('should deleted gyro data with matching id', (done) => {
      let gyro = new movementModel({ name: 'hook' })
      gyro.save((err, gyro) => {
        chai.request(server)
          .delete('/movements/' + gyro.id + '/deleteMovement')
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('status').eql('deleted ok')
            done()
          })
      })
    })
  })


  describe('/POST/moveandmovement should not POST withot x fields', () => {
    it('should not POST withot x fields', (done) => {
      let mockId = new movementModel({ name: 'jab' })
      let move = new Move({ y: 2, z: 2, power: 999 })
      mockId.save((err, mock) => {
        chai.request(server)
          .post(`/movements/${mock.id}/addMove`)
          .send(move)
          .end((err, res) => {
            res.should.have.status(500)
            res.body.should.be.a('object')
            done()
          })
      })
    })
  })

  describe('/POST/moveandmovement should not POST withot y fields', () => {
    it('should not POST withot y fields', (done) => {
      let mockId = new movementModel({ name: 'jab' })
      let move = new Move({ x: 2, z: 2, power: 999 })
      mockId.save((err, mock) => {
        chai.request(server)
          .post(`/movements/${mock.id}/addMove`)
          .send(move)
          .end((err, res) => {
            res.should.have.status(500)
            res.body.should.be.a('object')
            done()
          })
      })
    })
  })

  describe('/POST/moveandmovement should not POST withot z fields', () => {
    it('should not POST withot z fields', (done) => {
      let mockId = new movementModel({ name: 'jab' })
      let move = new Move({ x: 2, y: 2, power: 999 })
      mockId.save((err, mock) => {
        chai.request(server)
          .post(`/movements/${mock.id}/addMove`)
          .send(move)
          .end((err, res) => {
            res.should.have.status(500)
            res.body.should.be.a('object')
            done()
          })
      })
    })
  })

  describe('/POST/moveandmovement should not POST withot power fields', () => {
    it('should not POST withot power fields', (done) => {
      let mockId = new movementModel({ name: 'jab' })
      let move = new Move({ x: 2, y: 2, z: 999 })
      mockId.save((err, mock) => {
        chai.request(server)
          .post(`/movements/${mock.id}/addMove`)
          .send(move)
          .end((err, res) => {
            res.should.have.status(500)
            res.body.should.be.a('object')
            done()
          })
      })
    })
  })

  describe('/POST/moveandmovement add movement name should success', () => {
    it('should success', (done) => {
      let movement = new movementModel({name:'jab'})
      chai.request(server)
        .post('/movements')
        .send(movement)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })
  })

  describe('/GET/moveandmovement it should return all of gyroscopes', () => {
    it('it should return all of gyroscopes', (done) => {
      chai.request(server)
        .get('/movements')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.movements.should.be.a('array')
          done()
        })
    })
  })


})