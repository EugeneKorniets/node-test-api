const app = require('./app')

const port = process.env.PORT || 3030

app.listen(port, function () {
  console.log(`Server has been started on http://localhost:${port}`)
})
