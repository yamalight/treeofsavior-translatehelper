import fs from 'fs';
import path from 'path';

export default (folder, file) => {
    // get local tsv files
    return fs.readFileSync(path.join(folder, file))
        .toString()
        .split('\n')
        .map((line) => {
            const split = line.split('\t');
            const obj = {
                id: split[0],
                value: split[1],
            };
            return obj;
        });
};
