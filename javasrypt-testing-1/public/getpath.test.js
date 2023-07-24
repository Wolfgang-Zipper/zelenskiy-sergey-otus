const jsdom = require('jsdom');
const { getPath } = require('./getpath.js');
const { getElemByPath } = require('./getelembypath.js');

const { JSDOM } = jsdom;

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

<script src="getpath.js"></script>
<script src="getelembypath.js"></script>

</html>`);

global.document = dom.window.document;

let elembyId = document.getElementById("demo")

let elembyIdNonEx = document.getElementById("non-existent") // id, отсутствующий в html


console.log(elembyIdNonEx)


test('проверяет, что найденный по уникальному селектору элемент равен изначальному элементу', () => {
  expect(getElemByPath(elembyId)[0]).toBe(elembyId);

});

test('отдается ли ответ строкой, при передаче null (несуществующего ID) в функцию ', () => { 
  expect(typeof getPath(elembyIdNonEx)).toBe("string");
});

test('отдается ли ответ строкой, при передаче null (несуществующего ID) в функцию ', () => {
  expect(typeof getElemByPath(elembyIdNonEx)[0]).toBe("string");
});

