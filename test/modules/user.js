// подключение dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = 'http://localhost:3030/api'
const expect = chai.expect

chai.use(chaiHttp)

const data = {
  createdUserId: null,
  newUser: {
    'firstName': 'Иван',
    'lastName': 'Грозный',
    'middleName': 'Васильевич',
    'position': 'Царь'
  },
  updatedUser: {
    'firstName': 'Не Иван',
    'lastName': 'Не Грозный',
    'middleName': 'Не Васильевич',
    'position': 'Не Царь'
  }
}

describe('USER endpoint', () => {
  describe('/GET users', () => {
    it('Запрос списка пользователей (GET)', (done) => {
      chai.request(server)
        .get('/user')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('array')
          done()
        })
    })
  })

  describe('/POST user', () => {
    it('Создание нового пользователя (POST)', (done) => {
      chai.request(server)
        .post('/user')
        .type('form')
        .send(data.newUser)
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('_id')
          data.createdUserId = res.body._id
          expect(res.body).to.have.property('firstName')
          expect(res.body).to.have.property('lastName')
          expect(res.body).to.have.property('middleName')
          expect(res.body).to.have.property('position')
          done()
        })
    })
  })

  describe('/GET user by id', () => {
    it('Получение пользователя по ID (GET)', (done) => {
      chai.request(server)
        .get('/user/' + data.createdUserId)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('firstName').which.equal(data.newUser.firstName)
          expect(res.body).to.have.property('lastName').which.equal(data.newUser.lastName)
          expect(res.body).to.have.property('middleName').which.equal(data.newUser.middleName)
          expect(res.body).to.have.property('position').which.equal(data.newUser.position)
          done()
        })
    })
  })

  describe('/PATCH user by id', () => {
    it('Обновление полей пользователя по ID (PATCH)', (done) => {
      chai.request(server)
        .patch('/user/' + data.createdUserId)
        .type('form')
        .send(data.updatedUser)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('firstName').which.equal(data.updatedUser.firstName)
          expect(res.body).to.have.property('lastName').which.equal(data.updatedUser.lastName)
          expect(res.body).to.have.property('middleName').which.equal(data.updatedUser.middleName)
          expect(res.body).to.have.property('position').which.equal(data.updatedUser.position)
          done()
        })
    })
  })

  describe('/DELETE user by id', () => {
    it('Удаление пользователя по ID (DELETE)', (done) => {
      chai.request(server)
        .delete('/user/' + data.createdUserId)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('message')
          done()
        })
    })
  })
})
