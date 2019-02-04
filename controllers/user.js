// импорт сущностей
const User = require('../models/User')

// импорт унифицированного обработчика ошибок
const errorHandler = require('../utils/errorHandler')

// экспорт наружу логики endpoints
module.exports.getAll = async function (request, response) {
  try {
    const users = await User.find()
    response.status(200).json(users)
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.getByUserId = async function (request, response) {
  try {
    const user = await User.findById(request.params.id)
    response.status(200).json(user)
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.create = async function (request, response) {
  const user = new User({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    middleName: request.body.middleName,
    position: request.body.position
  })
  try {
    await user.save()
    response.status(201).json(user)
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.update = async function (request, response) {
  try {
    const user = await User.findOneAndUpdate(
      // первый параметр - условие по которому происходит поиск
      {_id: request.params.id},
      // второй параметр - ключ изменяемого поля
      {$set:request.body},
      // третий параметр указывает на необходимость вернуть измененную запись
      {new: true}
    )
    response.status(200).json(user)
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.remove = async function (request, response) {
  try {
    await User.remove({
      _id: request.params.id
    })
    response.status(200).json({
      message: 'Пользователь удален'
    })
  } catch (error) {
    errorHandler(response, error)
  }
}