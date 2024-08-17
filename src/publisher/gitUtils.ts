import { execSync } from 'child_process';
import { isPath, mkPath, clearDirectory } from '../utils/files.util.js';
import { Errors } from '@oclif/core';

function run(command) {
    try {
        execSync(command);
    } catch (error) {
        console.error(error);
        throw new Errors.CLIError(`Error while trying to publish`);
    }
}


function getRegistryDefaultBranch(git) {
    return process.env.DEFAULT_BRANCH || 'main';
}

function gitCmd(registryPath) {
    return `git -C ${registryPath}`;
}

function updateRegistry(git, registryPath, registryUrl) {
    
    if (!isPath(registryPath)) {
        run(`git clone -q --depth=1 ${registryUrl} ${registryPath}`);
    } else {
        run(`${git} config remote.origin.url ${registryUrl}`);

        const registryDefBranch = getRegistryDefaultBranch(git);

        run(`${git} clean -fd`);
        run(`${git} checkout -q -f ${registryDefBranch}`);
        run(`${git} pull origin ${registryDefBranch} --rebase`);
    }
}

function resetRegistry(git, registryPath) {
    run(`${git} reset --hard HEAD`);
}

function publishPackage(git, newVersion, branchName) {
    run(`${git} add .`);
    run(`${git} commit -m "Publish version ${newVersion}"`);
    run(`${git} push origin ${branchName}`);
}


function switchToNewBranch(git, branchName) {
    run(`${git} checkout -b ${branchName}`);
}

function downloadPackage(pkgRepo, packageName, downloadsFolder) {

    if(isPath(downloadsFolder))
        clearDirectory(downloadsFolder);

    mkPath(downloadsFolder);
    
    const pkgFolder = `${downloadsFolder}/${packageName}`;

    run(`git clone --depth=1 ${pkgRepo} ${pkgFolder}`);
    return pkgFolder;
}

export { run, getRegistryDefaultBranch, gitCmd, updateRegistry, publishPackage, downloadPackage, resetRegistry, switchToNewBranch };
