const fs = require('fs');
const { Transform } = require('stream');

// Проверяю, были ли переданы аргументы в строку
// if (process.argv.length < 4) {
//   console.error('Используй последовательность: node indexText.js inputFile outputFile');
//   process.exit(1);
// }

// const inputFile = process.argv[2];
// const outputFile = process.argv[3];

// wordCounts для хранения количества вхождений каждого слова




function readFromFile(input, output) {
  const wordCounts = {};

  // Поток для индексации слов
const indexStream = new Transform({
  // Функция transform вызывается для каждого чанка
  transform(chunk, encoding, callback) {
    // Для преобразования буфера в строку, без знаков препинания и нижний регистр
    const text = chunk.toString().toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    // Разделяю текст на слова
    const words = text.split(/\s/);

    // Подсчет количества каждого слова
    words.forEach(word => {
      if (word) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
    callback();
  },
  flush(callback) {
    // Сортировка уникальных слов в массив
    const uniqueWords = Object.keys(wordCounts).sort();
    const indexArray = uniqueWords.map(word => wordCounts[word]);
    // Пушим строка в результирующий поток
    this.push(JSON.stringify(indexArray) + '\n');
    callback();
  }
});

// Получение данных из входного файла
fs.createReadStream(input, { encoding: 'utf-8' })
  .pipe(indexStream)
  .pipe(fs.createWriteStream(output))
  .on('finish', () => console.log(`Индексация файла '${input}' завершена. Результат в файле '${output}'.`)); 

}

module.exports = readFromFile;