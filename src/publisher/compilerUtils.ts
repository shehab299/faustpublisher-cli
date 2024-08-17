import { spawn } from 'child_process';
import path from 'path';
import { isPath } from '../utils/files.util.js';
import fs from 'fs/promises'
import { Errors } from '@oclif/core';

class FaustCompiler
{

    faustPath

    constructor(filePath = "faust"){
        this.faustPath = filePath; 
    }

    compileAsync(file, toJson, entry_point) : Promise<string> {

        return new Promise((resolve, reject) => {

            let options = [file, '-po', '-pn', entry_point];
            
            if(toJson){
                options.push("-json")
            }

            const faust = spawn(this.faustPath, options);

            faust.stderr.on('data', (data) => {
                reject("The package didn't compile successfully!")
            });

            faust.on("error", (err) => {
                reject("Can't Find Faust Compiler");
            });

            faust.on('close', (code) => {
                if(code === 0){
                    resolve("Testing Completed Successfully");
                }else{
                    reject("The package didn't compile successfully!");
                }
            });
        });
    }

};


async function getVersion(file) : Promise<string> {

    let version = '';

    const data = await fs.readFile(file, 'utf-8');
    const d = JSON.parse(data);

    d.meta?.forEach((ob) => {
        if(ob.version)
            version = ob.version;
    })

    return version;
}

async function compilePackage(pkgFolder, packageName) {
    
    const compiler = new FaustCompiler();
    const mainfilePath = path.join(pkgFolder, packageName);
    const jsonFilePath = path.join(pkgFolder, packageName + ".json");

    // extract the file library name and remove extenstion

    const regex = /^(.*)\.lib$/;
    const match = packageName.match(regex);
    const entry_point = match[1] + "_test";

    if (!isPath(mainfilePath)) {
        throw new Errors.CLIError("The package you are trying to publish doesn't have a main file");
    }

    try{
        await compiler.compileAsync(mainfilePath, true, entry_point);
    }catch(error){
        throw new Errors.CLIError(error);
    }
    
    let version = await getVersion(jsonFilePath);

    if(!version || version === ''){
        throw new Errors.CLIError("The Package Doesn't Hava A Declared Version");
    }
    
    await fs.rm(jsonFilePath);

    return {
        mainfilePath,
        version
    }
}

export {compilePackage};


