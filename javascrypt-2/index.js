var fn1 = () => {
  console.log('fn1')
  return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
  console.log('fn2')

  setTimeout(() => resolve(2), 1000)
})

async function promiseReduce (asyncFunctions, reduce, initialValue) {
  let result = 0; 
  for (func of asyncFunctions) { //перебираем массив функций, forEach не подошел, так как не возвращает промисы
      await func().then(res => { //ждем выпонления функции в цикле, после выполнения (.then), значение, возвращаемое функциями в массиве, обрабатываем в функции reduce и назначем переменной result, которую отдает promiseReduce
        result = reduce(res, initialValue)
      })
  }

  return result

}

promiseReduce([fn1, fn2],
  function (memo, value) {
      console.log('reduce')

      return memo * value
  },
  1
)
  .then(console.log)
