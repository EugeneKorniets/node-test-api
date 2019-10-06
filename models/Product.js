// импорт dependencies
const mongoose = require('mongoose')

// инициализация конструктора Schema для формирования модели
const Schema = mongoose.Schema

// инициализация схемы текущей модели
const userSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  vendorCode: {
    type: String,
    required: true
  },
  prices: {
    type: Array,
    required: false
  }
})

// экспорт наружу текущей модели
module.exports = mongoose.model('product', userSchema)
