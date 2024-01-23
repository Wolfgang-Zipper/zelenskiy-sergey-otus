import { readdir } from "node:fs/promises";

const getTree = async (dir) => {
  let tree = {
    files: [],
    folders: [],
  };

  const getPath = async (dir) => {
    //ожиаем промис от функции readdir в асинхронной функции getPath

    let dirs = await readdir(dir, { withFileTypes: true });
    //используем чтение дирректории из fs с опцией withFileTypes, в таком режиме отдается промис с обьектами Dirent,

    for (let file of dirs) {
      let newdir = dir + file.name + "/"; //строим новый путь на основании имени полученного элемента из директории

      if (file.isDirectory()) {
        // используем собственную функцию isDirectory для определния, что это директория, а не файл
        tree.folders.push(newdir); //пушим в подготовленный массив директорию
        await getPath(newdir); //инициируем функцию getPath с новой директорией
      } else {
        tree.files.push(newdir); //пушим в подготовленный массив путь до файла
      }
    }

    return tree; //отдаем модифицированный в цикле массив
  };
  let result = await getPath(dir);
  console.log(result);
  return result;
};
const dirArg = process.argv[2]; //присваиваем второй аргумент, путь до директории

getTree(dirArg);

export default getTree;
