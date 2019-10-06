// экспорт наружу унифицированного обработчика ошибок обработки запросов
module.exports = function (response, error) {
  response.status(500).json({
    success: false,
    message: error.message ? error.message : error
  })
}
