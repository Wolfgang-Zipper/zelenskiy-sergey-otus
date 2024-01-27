const { getPath } = require('./getpath.js')

const getElemByPath = elem => {
	try {
		let uniSelector = getPath(elem)

		let elemBySelector = global.document.querySelectorAll(uniSelector)[0]

		return elemBySelector ? elemBySelector : 'Элемент не найден' //результат поиска по полученному уникальному селектору
	} catch (e) {
		return `${e.message}` //отдаем сообщеине об ошибке в виде текста
	}
}

module.exports = { getElemByPath }
