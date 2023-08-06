const getNthChild = element => {
	let parNodeCh = element.parentNode.children //находим соседние элементы, получив все дочерние у родителького элемента

	if (parNodeCh.length > 1) {
		const index = Array.prototype.indexOf.call(parNodeCh, element) // достаем из глобального массива прототип, используем поиск числа элемента среди дочерних

		return `:nth-child(${index + 1})` //возвращаем псевдокласс, для определения позиции среди группы соседних эжлементов
	}
	return '' //возвращаем пустую строку, во измежание ошибки
}
const getPath = element => {
	try {
		let selectors = [] // querySelectorAll имеет возможность поиска по id элемента, указываем его в начале

		while (element) {
			// присваиваем в element родительский элемент, добавляем при наличии класс, либо тег, с псевдоклассом, пока не дойдем до BODY

			if (element.className) {
				selectors.unshift(`.${element.className}${getNthChild(element)}`)
			} else if (element.tagName) {
				selectors.unshift(`${element.tagName}${getNthChild(element)}`)
			}

			if (element && element.tagName === 'BODY') {
				let uniselector = selectors
					.toString()
					.toLowerCase()
					.replace(/,/g, ' > ') // обьект в строку, в нижний регистр, заменяем запятые на >
				return uniselector
			}
			element = element.parentNode
		}
	} catch (e) {
		return `${e.message}` //отдаем сообщеине об ошибке в виде текста
	}
}

module.exports = { getPath }
