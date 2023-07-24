
const getPath = (element) => {

try {

    let selectors = `#${element.id}`; // querySelectorAll имеет возможность поиска по id элемента, указываем его в начале

    while (element) { // присваиваем в element родительский элемент, добавляем его тег в начало строки, пока не дойдем до BODY
        
        element = element.parentNode;
        if (element.tagName) {
            selectors = `${element.tagName}>` + selectors
         }
        if (element && element.tagName == "BODY") {

    
            return selectors.toLowerCase()


           }
             
    
    }

}  catch (e)  {
    return `${e.message}`  //отдаем сообщеине об ошибке в виде текста 
 
}
}  
    

module.exports = { getPath };








