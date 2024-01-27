import getTree from "../index";
import assert from "assert";
import mockFs from "mock-fs";
const dir = './directory-two/';
mockFs({
    './directory-two/': {
        'directory-one': {
            '1.js': '',
            '2.js': '',
            '3.js': '',
            '4.js': '',
            'test-directory-1': {
                '10.js': '',
                '11.js': '',
                '12.js': '',
                '9.js': ''
            },
            'test-directory-1.s': {
                '5.js': '',
                '6.js': '',
                '7.js': '',
                '8.js': ''
            }
        }
    }
});
describe("getTree", () => {
    let result;
    beforeEach(async () => {
        result = {}; // обнуляем переменную tree перед каждым тестом
        result = await getTree(dir);
    });
    afterEach(() => {
        mockFs.restore();
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
