import { readdir } from 'node:fs/promises';
import { Dirent } from 'node:fs';
interface Tree {
  files: string[];
  folders: string[];
}

const getTree = async (dir: string): Promise<Tree> => {
  let tree: Tree = {
    files: [],
    folders: [],
  };

  const getPath = async (dir: string): Promise<Tree> => {
    let dirs: Dirent[] = await readdir(dir, { withFileTypes: true });

    for (let file of dirs) {
      let newdir: string = dir + file.name + "/";

      if (file.isDirectory()) {
        tree.folders.push(newdir);
        await getPath(newdir);
      } else {
        tree.files.push(newdir);
      }
    }

    return tree;
  };

  let result: Tree = await getPath(dir);
  console.log(result);
  return result;
};

const dirArg: string = process.argv[2];

getTree(dirArg);

export default getTree;