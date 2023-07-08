
let numbers = []

let sum = (firstNum) => {

    numbers.push(firstNum)

    let addNum = (nextNum) => {

        if (nextNum === undefined) {

            let mumbersSum = 0;

            for (let num of numbers) {
                mumbersSum += num
            }

            return mumbersSum;

        }

        numbers.push(nextNum)

        return addNum;

    }

    return addNum;

}



console.log(sum(2)(3)(12)(212)(1)(12)(2)())