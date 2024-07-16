import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = {
    A: path.join(__dirname, '../files/A.txt'),
    B: path.join(__dirname, '../files/B.txt'),
    C: path.join(__dirname, '../files/C.txt'),
    D: path.join(__dirname, '../files/D.txt'),
};

// Initialize files if they don't exist
for (let key in files) {
    if (!fs.existsSync(files[key])) {
        fs.writeFileSync(files[key], '');
    }
}

const checkAllFilesPopulated = () => {
    return Object.values(files).every(file => {
        const data = fs.readFileSync(file, 'utf-8');
        return data.trim().length > 0;
    });
};

export const processNumber = (number) => {
    if (checkAllFilesPopulated()) {
        throw new Error('All files have been populated.');
    }

    if (number < 1 || number > 25) {
        throw new Error('Number must be between 1 and 25.');
    }

    const result = number * 7;
    let fileToWrite;
    let outputFile;

    if (result > 140) {
        fileToWrite = files.A;
        outputFile = 'A';
    } else if (result > 100) {
        fileToWrite = files.B;
        outputFile = 'B';
    } else if (result > 60) {
        fileToWrite = files.C;
        outputFile = 'C';
    } else {
        fileToWrite = files.D;
        outputFile = 'D';
    }

    fs.appendFileSync(fileToWrite, result + '\n');
    return {storedNumber : result, outputFile};
};

export const listNumbers = () => {
    const fileContents = {};
    
    for (let key in files) {
        fileContents[key] = fs.readFileSync(files[key], 'utf-8').trim().split('\n').filter(line => line.length > 0);
    }

    return fileContents;
};
