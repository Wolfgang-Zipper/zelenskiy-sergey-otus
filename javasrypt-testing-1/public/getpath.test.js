const jsdom = require('jsdom')
const { getPath } = require('./getpath.js')
const { getElemByPath } = require('./getelembypath.js')
const { JSDOM } = jsdom

const dom = new JSDOM(`<html>
<head>
</head>
<body>
    <div>
        <div>
            <li>
                <p id="test">
                    <div>
                        <div>
                            <ul class="ru">
                                <li>
                                    <p class="ru" id="demo">Привет, мир!</p>
                                </li>
                                <li>
                                    <p class="en">Hello world!</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </p>
                <button class="test" type="button" onclick="myFunction()">Кликни меня</button>
            </li>
        </div>
    </div>
</body>
</html>`)

global.document = dom.window.document

let elembyId = global.document.getElementById('demo')
let elemwithoutId = global.document.querySelectorAll(
	'body:nth-child(2) > div > div > li > div:nth-child(2) > div'
)[0]
let elembyIdNonEx = global.document.getElementById('non-existent') // id, отсутствующий в html

console.log(getElemByPath(elembyId))
console.log(getElemByPath(elemwithoutId))

console.log(getElemByPath(elembyIdNonEx))

test('проверяет, что найденный по уникальному селектору элемент равен изначальному элементу', () => {
	expect(getElemByPath(elembyId)).toBe(elembyId)
})

test('проверяет, что найденный по уникальному селектору элемент равен изначальному элементу без ID', () => {
	expect(getElemByPath(elemwithoutId)).toBe(elemwithoutId)
})

test('отдается ли ответ строкой, при передаче null (несуществующего ID) в функцию', () => {
	expect(typeof getElemByPath(elembyIdNonEx)).toBe('string')
})
