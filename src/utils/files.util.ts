import fs from 'fs';
import path from 'path';


export function isPath(directory) : boolean {
    return fs.existsSync(directory);
}

export function mkPath(directory) {
    fs.mkdirSync(directory, { recursive: true });
}

export function clearDirectory(directory) {
    fs.rmSync(directory, { recursive: true });
}

export function deleteFile(file) {
    fs.rmSync(file);
}