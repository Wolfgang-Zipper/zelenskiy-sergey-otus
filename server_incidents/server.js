const express = require('express');
const fs = require("fs");
const {
    test_tlm_chat_id,
    test_time_hook } = require('./config')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');


const PORT = process.env.PORT || 80;

const app = express();



app.use(express.json())


app.listen(PORT, () => console.log(`Server run at port ${PORT}`) )

app.use(express.static(__dirname + "/public"));


app.post('/test-incident', function (request, res) {

    const message = request.body.message;
    const tlg = request.body.tlg;
    const time = request.body.time;

    const raw = JSON.stringify({
        text: message,
    });

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
    };

    if (
        typeof tlg === "boolean" &&
        typeof time === "boolean" &&
        typeof message === "string"
    ) {
        let fetchPromises = [];

        if (tlg) {
            fetchPromises.push(
                fetch(
                    encodeURI(
                        `https://api.telegram.org/${bot_token}/sendMessage?chat_id=${test_tlm_chat_id}&text=${message}`
                    )
                )
            );
        }
        if (time) {
            fetchPromises.push(
                fetch(`https://time.tinkoff.ru/hooks/${test_time_hook}`, requestOptions)
            );
        }

        Promise.all(fetchPromises)
            .then((responses) => Promise.all(responses.map((res) => res.json())))
            .then((responses) => {

                const [tlgResponse, timeResponse] = responses;
                let tlgOk = tlgResponse && tlgResponse.ok;
                let timeOk = timeResponse && timeResponse.status_code === 200;

                if (tlgOk || timeOk) {
                    res.json({
                        message: "Отправка инцидента завершена",
                        sentToTelegram: tlgOk,
                        sentToTime: timeOk
                    });
                } else {
                    res.status(500).send("Ошибка при отправке инцидента. Не отправлено ни в одно место");
                }
            })
            .catch(() => res.status(500).send("Ошибка при отправке инцидента"));

    } else {
        res.status(400).send("Неверные типы данных");
    }
})