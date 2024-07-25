import { Command, Errors } from "@oclif/core";
import getCreditsPath, {createFaustDir} from "../utils/credits_path.util.js";
import fs from 'fs/promises';
import auth from "../utils/auth.util.js";
import checkToken from "../utils/checkToken.util.js";


class Login extends Command {
    static description: string = "Login to your GitHub account";

    static examples: string[] = [
        `$ faustpublisher login`,
    ];


    async login(): Promise<string> {
        try {
            const result = await auth({ type: "oauth" });
            let token = result.token;
            return token;
        } catch (e) {
            throw new Errors.CLIError("Error while trying to log in");
        }
    }

    async saveToken(token: string, filepath: string): Promise<void> {
        try {
            let user = { token };
            await fs.writeFile(filepath, JSON.stringify(user));
        } catch (e) {
            throw new Errors.CLIError("Error while trying to save the token");
        }
    }


    async run() : Promise<void> {

        createFaustDir();

        let filepath = getCreditsPath();
        let valid = await checkToken(filepath);

        if (!valid) {
            this.log('Invalid token found, initiating login process...');
            let token = await this.login();
            await this.saveToken(token, filepath);
            this.log('Logged in successfully!');
            return;
        }

        this.log('You are already logged in');
    }

}

export default Login;
