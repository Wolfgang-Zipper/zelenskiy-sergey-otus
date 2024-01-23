let sum = (firstNum) => {

    let addNum = (nextNum) => {

        if (nextNum === undefined) {
            return firstNum; //возвращаем значение при получении undefined в функцию
        }

        firstNum += nextNum; //прибавляем последующее значение к предыдущему

        return addNum;

    }

    return addNum;  

}


console.log(sum(2)(3)(12)(212)(1)(12)(2)())