import os from 'os';
import path from 'path';
import { mkPath } from './files.util.js';


function getDefaultPath() : string {

    let defaultPath = '';

    if (os.platform() === 'win32') {
        defaultPath = path.join(process.env.APPDATA, 'Faust');
    } else if (os.platform() === 'darwin') {
        defaultPath = path.join(process.env.HOME, 'Library', 'Faust');
    } else {
        defaultPath = path.join(process.env.HOME, '.faust');
    }

    return defaultPath
}

function createFaustDir() : void {

    if(!process.env.FAUST_PATH) {
        process.env.FAUST_PATH = getDefaultPath();
    }

    mkPath(process.env.FAUST_PATH);
}


function getCreditsPath(){
    return path.join(process.env.FAUST_PATH, 'user.json');
}

function getFaustPath(){
    return process.env.FAUST_PATH;
}


export default getCreditsPath;

export { createFaustDir, getFaustPath };