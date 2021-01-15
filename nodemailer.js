// загружаем модуль nodemailer
const nodemailer = require("nodemailer")
const smtp = require('./config');

// настройки smtp транспортера
let transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    // secure: false, // порт безопасного соединения, true для 465, false для остальных
    auth: {
        user: smtp.user, // логин от почтового сервиса
        pass: smtp.pass, // пароль от почтового сервиса
    }
},
    {
        from: `"Письмо от " <${smtp.from}>`, // От кого
    }
)

// модуль передачи сообщения
const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err)
        console.log('Email отправлен:', info)
    })
}

// экспорт подуля mailer
module.exports = mailer