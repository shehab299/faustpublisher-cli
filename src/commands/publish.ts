import { Args, Command } from "@oclif/core";
import getCreditsPath, { createFaustDir, getFaustPath } from "../utils/credits_path.util.js";
import {getToken} from "../utils/checkToken.util.js";
import getUser from "../utils/getUser.util.js";
import checkCollaborators from "../utils/checkCollabs.js";
import publish from "../publisher/publish.js";

class Publish extends Command {

    static description: string = 
    "Publish your project to Faust Registry\n\n"
    + "In order to publish a library you :- \n\n"
    + "\t0- Must be logged in\n"
    + "\t1- Must be a collaborator of the repository\n"
    + "\t2- The Repository's name must end with .lib\n"
    + "\t3- The Library file must be named as the repository\n"
    + "\t4- The Library file must be in the root of the repository\n"
    + "\t5- The Library must have an entry pointed named in a specific format '<library_name_without_.lib>'_test to be able to test it\n"
    + "\t6- All your dependencies must follow new faust-pkg format";


    static examples: string[] = [
        `$ faustpublisher publish https://github.com/shehab299/oscillators.lib`,
    ];

    static args = {
        link: Args.string({
            name: "repo",
            required: true,
            description: "GITHUB Repository link containing the faust library to publish"
        })
    }

    validateLink(link: string){

        let url : URL;
        try{
            url = new URL(link);

            if(url.protocol == 'http:'){
                url.protocol = 'https:';
            }

            if(url.hostname !== 'github.com' || url.protocol !== 'https:'){
                this.error('Invalid HOST or PROTOCOL');
            }

            if(url.pathname.split("/").length !== 3){
                this.error("Not a repository link");
            }
    
        }catch(e){
            this.error('Invalid URL Format');
        }
    }

    async run() {

        createFaustDir();
        const faustPath = getFaustPath();

        const { args } = await this.parse(Publish);
        this.validateLink(args.link);

        let token = await getToken(getCreditsPath());
        let user = await getUser(token);

        if(!checkCollaborators(user, args.link, token))
            this.error('You are not a collaborator of this repository');

        await publish(args.link, user, faustPath);
        this.log("Branch Created In The Registered Successfully");
    }

}

export default Publish;