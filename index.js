// загружаем модули
const express = require('express')
const bodyParser = require('body-parser')
const mailer = require('./nodemailer')
const smtp = require('./config');

// инициализируем node приложение
const app = express()

// инициализация порта и отчёта об отправки
const PORT = 3001
let order = undefined

// редирект для файлов стилей расположенных в node_modules
// app.use('/css', express.static(__dirname + `node_modules/bootstrap/dist/css`))

// настрой обработчика запроса
app.use(bodyParser.urlencoded({ extended: false }))
// отправка формы
app.post('/feedbackForm', (req, res) => {
    // проверка заполнения обязательных полей
    if(!req.body.name || !req.body.phone) return res.sendStatus(400)
    const message = {
        to: req.body.email, // Кому (для нескольких адресатов используйте запятую)
        subject: "Hello ✔", // Тема письма
        text: `
        Новая заявка!
        Имя: ${req.body.name}
        Телефон: ${req.body.phone}

        `, // Содержимое письма
        html: "<b>Хорошего дня!</b>", // html код письма
      }
    mailer(message)
    order = req.body
    // редирект для предотвращения повторной отправки
    res.redirect('/feedbackForm')

})
// возврат к исходному состоянию
app.get('/feedbackForm', (req,res) => {
    if(typeof order !== 'object') return res.sendFile(__dirname + '/index.html')
    res.send('Заявка успешно принята!')
    order = undefined
})

// прослушивание локального сервера
app.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}/feedbackForm`))