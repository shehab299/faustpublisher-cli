import fs from 'fs'
import { Errors } from '@oclif/core';

function removeComments(data) {

    const singleLineComment = /\/\/.*$/gm;
    const multiLineComment = /\/\*[\s\S]*?\*\//gm;
  
    // Remove comments from the data
    data = data.replace(singleLineComment, '');
    data = data.replace(multiLineComment, '');
  
    return data;
}


function checkCode(filePath) {

    try 
    {
        let code = fs.readFileSync(filePath, 'utf8');        

        code = removeComments(code);

        let pattern = /(import|library)\s*\(\s*["']([^"'\s]*?)["']\s*\)\s*;/g;
        let patternGroups = /(import|library)\s*\(\s*["']([^"'\s]*?)["']\s*\)\s*;/;
        const pkgRegex = /^pkg:faust(?:\/([_a-zA-Z]\w*))?\/([_a-zA-Z]\w*\.lib)@((?:\d+)(?:\.(?:\d+)(?:\.(?:\d+))?)?)$/;
        

        const array = [...code.match(pattern)];
                
        for(let i = 0; i < array.length; i++){
            const groups  = array[i].match(patternGroups);

            if(!pkgRegex.test(groups[2])){
                return false;
            }
        }

        return true;
    }
    catch(err)
    {
        throw new Errors.CLIError("Error while trying to read the file");
    }
}


export default checkCode;



