
let numbers = []

let sum = (firstNum) => {

    numbers.push(firstNum) //пушим первое число в массив

    let addNum = (nextNum) => {

        if (nextNum === undefined) { //если число undefined, то проходимся циклом for of по массиву чисел, складывая их

            let mumbersSum = 0;

            for (let num of numbers) {
                mumbersSum += num
            }

            return mumbersSum;

        }

        numbers.push(nextNum) //пушим последующее число в массив


        return addNum;

    }

    return addNum;

}



console.log(sum(2)(3)(12)(212)(1)(12)(2)())