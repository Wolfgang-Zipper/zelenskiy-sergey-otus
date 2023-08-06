import fs from "fs";


let tree = {
  files: [],
  folders: [],
};

const getTree = async (dir) => { //асинхронная функция отдает промис c колбеками
  return new Promise((resolve, reject) => {
    fs.readdir(dir, { withFileTypes: true }, async (err,data) => { //используем чтение дирректории из fs с опцией withFileTypes, в таком режиме отдается массив с обьектами Dirent, 
        if (err) {
            reject(err)      
            return
        }
        for ( let file of data) {
            let newdir = dir+file.name+'/' //строим новый путь на основании имени полученного элемента из директории

            if (file.isDirectory()) { // используем собственную функцию isDirectory для определния что это директория, а не файл 
                tree.folders.push(newdir) //пушим в подготовленный массив директорию
                await getTree(newdir) //инициируем функцию getTree с новлй директорией
            } else {
                tree.files.push(newdir)  //пушим в подготовленный массив путь до файла

            }

        }

        resolve(tree) //отдаем в колбек промиса модифицированный в цикле массив

    });
  });
};



export default getTree
