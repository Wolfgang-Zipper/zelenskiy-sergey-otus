const expect = require('chai').expect;
const fs = require('fs');

const readFromFile = require('../index.js');

describe('Стрим преобразования слов', function () {
  it('должен правильно подсчитать количество слов', function (done) {
    readFromFile("./test/input_test.txt", "./test/outputFile_test.json")

      // Проверяем подсчитанные слова
      const content = fs.readFileSync("./test/outputFile_test.json").toString();
      expect(content).to.equal('[1,1,1,2,1,1,1,1]\n'); // Предполагая, что слово 'good' встречается 2 раза в потоке по этому '[1,1,1,2,1,1,1,1]\n'
      done();

  });

});