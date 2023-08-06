import getTree from "../index.mjs";
import assert from "assert";

describe("getTree", () => {
  let dir = "./directory-two/";
    let result;

  beforeEach(async () =>{
    result = await getTree(dir);
  });

    it("отдает количество файлов = 12 ",  function () {
      assert.equal(countProperties(result.files), 12);
    });

  function countProperties(obj) {
    return Object.keys(obj).length;
  }
});
