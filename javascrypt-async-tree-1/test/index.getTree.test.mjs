import getTree from "../index.mjs";
import assert from "assert";

describe("getTree", () => {
  let dir = "./directory-two/";
  let result;

  beforeEach(async () => {
    result = {}; // обнуляем переменную tree перед каждым тестом

    result = await getTree(dir);
  });

  it("отдает количество файлов = 12 ", function () {
    assert.equal(countProperties(result.files), 12);
  });
  it("отдает количество folders = 3 ", function () {
    assert.equal(countProperties(result.folders), 3);
  });

  function countProperties(obj) {
    //функция подсчета обьектов в массиве
    return Object.keys(obj).length;
  }
});
