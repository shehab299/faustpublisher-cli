import { Errors } from "@oclif/core";
import { Octokit } from "@octokit/core";
import { promises } from "dns";
import fs from 'fs/promises';

async function checkToken(filepath) : Promise<boolean>
{

    let user = await parseFile(filepath);
    let valid = false;

    if (user.token || user.token !== '') {
        valid = await validateToken(user.token);;
    }

    return valid;
}


export async function getToken(filepath) : Promise<string>
{
    if(!await checkToken(filepath))
        throw new Errors.CLIError("You are not logged in, please login first");

    let user = await parseFile(filepath);
    return user.token;
}


async function parseFile(filepath: string): Promise<{ token: string }> {
    try {
        return JSON.parse(await fs.readFile(filepath, 'utf8'));
    } catch (e) {
        return { token: '' };
    }
}



async function validateToken(token: string): Promise<boolean> {
    try {
        const octokit = new Octokit({
            auth: token
        });

        await octokit.request('HEAD /user');
        return true;
    } catch (e) {
        return false;
    }
}

export default checkToken;