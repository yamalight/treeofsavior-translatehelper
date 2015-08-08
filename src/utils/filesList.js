import fs from 'fs';

export default (path) => {
    if (!path) {
        return [];
    }
    // get local tsv files
    return fs.readdirSync(path)
        .filter(f => f.endsWith('_kor.tsv'))
        .map((file) => {
            return {
                name: file.replace('_kor.tsv', ''),
                korean: file,
                english: file.replace('_kor.tsv', '.tsv'),
            };
        });
};
