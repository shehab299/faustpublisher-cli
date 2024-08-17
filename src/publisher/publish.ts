import { updateRegistry, publishPackage, downloadPackage, gitCmd, switchToNewBranch, getRegistryDefaultBranch } from './gitUtils.js';
import { compilePackage } from './compilerUtils.js';
import { isPath, mkPath } from '../utils/files.util.js';
import checkCode from './checkImports.js';
import path from 'path'
import { Errors } from '@oclif/core';
import fs from 'fs';
import getRegistryLink from '../utils/getRegistryLink.js';


async function  checkVersion(version, registryPath, author, packageName){

    const p = path.join(registryPath, author, packageName, version);

    if(isPath(p)){
        return false;
    }

    return true;
}

function checkVersionFormat(version) : boolean {
    const regex = new RegExp('^(\\d+)\\.(\\d+)\\.(\\d+)$');
    return regex.test(version);    
}

function copyPackageToRegistry(mainfilePath, registryPath, owner, packageName, newVersion) {
    const registryPackagePath = path.join(registryPath, owner, packageName, newVersion);
    mkPath(registryPackagePath);
    fs.copyFileSync(mainfilePath, path.join(registryPackagePath, packageName));
}

function getRepoName(link) : string{

    let url = new URL(link);
    const parts = url.pathname.split("/");
    const repo = parts[2];

    return repo;
}

function validateRepoName(repo : string) : void {

    if(repo.endsWith('.lib')){
        return;
    }

    throw new Errors.CLIError('Invalid Repository Name');
}

async function publish(pkgRepo, author, faustPath) : Promise<void>{


    let registryPath : string = path.join(faustPath, '.reg');
    let downloadsFolder : string = path.join(faustPath, '.downloads');
    let registryUrl : string = getRegistryLink();

    const git = gitCmd(registryPath);


    updateRegistry(git, registryPath, registryUrl);

    const packageName = getRepoName(pkgRepo);
    validateRepoName(packageName);


    const pkgFolder = downloadPackage(pkgRepo, packageName, downloadsFolder);

    const { mainfilePath, version} = await compilePackage(pkgFolder, packageName);

    
    if(!checkCode(mainfilePath)){
        throw new Errors.CLIError("You Are Using Non package imports which is not allowed");
    }


    if(!checkVersionFormat(version)){
        throw new Errors.CLIError("Invalid Declared Version Format. Make sure to stick to the semver format");
    }


    if(! await checkVersion(version, registryPath, author, packageName))
    {
        throw new Errors.CLIError("The Version you are trying to publish already exists");
    }

    try{
        copyPackageToRegistry(mainfilePath, registryPath, author, packageName, version);
    }catch(err){
        throw new Errors.CLIError("Unexpected Error happened! please try again");
    }

    publishPackage(git, version, getRegistryDefaultBranch(git));
}




export default publish;
