const express = require('express')

const controller = require('../controllers/product')

// создание экземпляра объекта router
const router = express.Router()

// создание роутов с передачей коллбека обработки реквестов
router.get('/', controller.getAll)
router.get('/:id', controller.getByProductId)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

// экспорт наружу router из текущего модуля
module.exports = router
