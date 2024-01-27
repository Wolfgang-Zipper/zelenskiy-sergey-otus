import { readdir } from 'node:fs/promises';
const getTree = async (dir) => {
    let tree = {
        files: [],
        folders: [],
    };
    const getPath = async (dir) => {
        let dirs = await readdir(dir, { withFileTypes: true });
        for (let file of dirs) {
            let newdir = dir + file.name + "/";
            if (file.isDirectory()) {
                tree.folders.push(newdir);
                await getPath(newdir);
            }
            else {
                tree.files.push(newdir);
            }
        }
        return tree;
    };
    let result = await getPath(dir);
    console.log(result);
    return result;
};
const dirArg = process.argv[2];
getTree(dirArg);
export default getTree;
