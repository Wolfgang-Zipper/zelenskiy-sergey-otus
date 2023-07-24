const { getPath } = require('./getpath.js');



const getElemByPath = (elem) => {
    try {

let uniSelector = getPath(elem);

let elemBySelector = document.querySelectorAll(uniSelector)


    return elemBySelector  //результат поиска по полученному уникальному селектору


}  catch (e)  {
    return `${e.message}`  //отдаем сообщеине об ошибке в виде текста 

}

}


module.exports = { getElemByPath };
