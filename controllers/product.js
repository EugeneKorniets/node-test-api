// импорт сущностей
const Product = require('../models/Product')

// импорт унифицированного обработчика ошибок
const errorHandler = require('../utils/errorHandler')

// экспорт наружу логики endpoints
module.exports.getAll = async function (request, response) {
  try {
    const products = await Product.find()
    response.status(200).json(products)
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.getByProductId = async function (request, response) {
  try {
    const product = await Product.findById(request.params.id)
    response.status(200).json(product)
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.create = async function (request, response) {
  const product = new Product({
    productName: request.body.productName,
		vendorCode: request.body.vendorCode,
		prices: request.body.prices
  })
  try {
    await product.save()
    response.status(201).json(product)
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.update = async function (request, response) {
  try {
    const product = await Product.findOneAndUpdate(
      // первый параметр - условие по которому происходит поиск
      {_id: request.params.id},
      // второй параметр - ключ изменяемого поля
      {$set:request.body},
      // третий параметр указывает на необходимость вернуть измененную запись
      {new: true}
    )
    response.status(200).json(product)
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.remove = async function (request, response) {
  try {
    await Product.remove({
      _id: request.params.id
    })
    response.status(200).json({
      message: 'Продукт удален'
    })
  } catch (error) {
    errorHandler(response, error)
  }
}