// импорт dependencies
const mongoose = require('mongoose')

// инициализация конструктора Schema для формирования модели
const Schema = mongoose.Schema

// инициализация схемы текущей модели
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  }
})

// экспорт наружу текущей модели
module.exports = mongoose.model('user', userSchema)