import { Octokit } from "@octokit/core";
import { Errors } from "@oclif/core";

async function getUser(token:string) : Promise<string> {
    try{
        let octokit = new Octokit({
            auth: token
        });
    
        const { data: user } = await octokit.request('GET /user');
        return user.login;
    }catch(e){
        throw new Errors.CLIError('Error while trying to get user data');
    }   
}


export default getUser;