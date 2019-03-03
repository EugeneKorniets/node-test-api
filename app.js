const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// импорт роутов сущностей из соответствующих модулей
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')

// импорт ключей из конфига
const keys = require('./config/keys')

// создание экземпляра приложения
const app = express()

// подключение к БД
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
  .then(function() {
    console.log('MongoDB connected')
  })
  .catch(function (error) {
    console.log(error)
  })

// логирование сервера
app.use(morgan('dev'))

// подключение плагина bodyParser для защиты url от запрещенных символов и парсинга json
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

// регистрация роутов в приложении
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)

module.exports = app