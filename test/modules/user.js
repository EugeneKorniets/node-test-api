// подключение dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = 'http://localhost:3030/api'
const should = chai.should();

chai.use(chaiHttp)

const data = {}

describe('USER endpoint', () => {
  /*
   * Запрос списка пользователей (GET)
   * Статус 200
   * Request.body [Array]
   */
  describe('/GET users', () => {
    it('Запрос списка пользователей (GET)', (done) => {
      chai.request(server)
        .get('/user')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })
  
  /*
   * Создание нового пользователя (POST)
   * Статус 201
   * Request.body [Object}
   * Request.body has properties {_id, firstName, lastName, middleName, position}
   */
  describe('/POST user', () => {
    it('Создание нового пользователя (POST)', (done) => {
      chai.request(server)
        .post('/user')
        .type('form')
        .send({
          'firstName': 'Иван',
          'lastName': 'Грозный',
          'middleName': 'Васильевич',
          'position': 'Царь'
        })
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.hasOwnProperty('_id')
          data.createdUserId = res.body._id
          res.body.hasOwnProperty('firstName')
          res.body.hasOwnProperty('lastName')
          res.body.hasOwnProperty('middleName')
          res.body.hasOwnProperty('position')
          done()
        })
    })
  })
  
  /*
   * Получение пользователя по ID (GET)
   * Статус 200
   * Request.body [Object}
   * Request.body has properties {firstName, lastName, middleName, position}
   */
  // TODO Реализовать проверку полей, отправленных в предыдущем тесте создания пользователя
  describe('/GET user by id', () => {
    it('Получение пользователя по ID (GET)', (done) => {
      chai.request(server)
        .get('/user/' + data.createdUserId)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.hasOwnProperty('firstName')
          res.body.hasOwnProperty('lastName')
          res.body.hasOwnProperty('middleName')
          res.body.hasOwnProperty('position')
          done()
        })
    })
  })
  
  /*
   * Обновление полей пользователя по ID (PATCH)
   * Статус 200
   * Request.body [Object}
   * Request.body has properties {firstName, lastName, middleName, position}
   */
  describe('/PATCH user by id', () => {
    it('Обновление полей пользователя по ID (PATCH)', (done) => {
      chai.request(server)
        .patch('/user/' + data.createdUserId)
        .type('form')
        .send({
          'firstName': 'Не Иван',
          'lastName': 'Не Грозный',
          'middleName': 'Не Васильевич',
          'position': 'Не Царь'
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.hasOwnProperty('firstName')
          res.body.hasOwnProperty('lastName')
          res.body.hasOwnProperty('middleName')
          res.body.hasOwnProperty('position')
          done()
        })
    })
  })
  
  /*
   * Удаление пользователя по ID (DELETE)
   * Статус 200
   * Request.body [Object}
   * Request.body has properties {message}
   */
  describe('/DELETE user by id', () => {
    it('Удаление пользователя по ID (DELETE)', (done) => {
      chai.request(server)
        .delete('/user/' + data.createdUserId)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.hasOwnProperty('message')
          done()
        })
    })
  })
})