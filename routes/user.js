const express = require('express')

const controller = require('../controllers/user')

// создание экземпляра объекта router
const router = express.Router()

// создание роутов с передачей коллбека обработки реквестов
router.get('/', controller.getAll)
router.get('/:id', controller.getByUserId)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

// экспорт наружу router из текущего модуля
module.exports = router
