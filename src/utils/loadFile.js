import fs from 'fs';

export default (file) => {
    // get local tsv files
    return fs.readFileSync('./EnglishTranslation/' + file)
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
