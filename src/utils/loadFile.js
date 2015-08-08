import fs from 'fs';
import path from 'path';

export default (folder, file) => {
    // get local tsv files
    return fs.readFileSync(path.join(folder, file))
        .toString()
        .split('\n')
        .filter((l) => l.trim().length > 0)
        .map((line, index) => {
            const split = line.split('\t');
            const obj = {
                index,
                id: split[0],
                value: split[1],
                broken: split.length !== 2,
            };
            return obj;
        });
};
