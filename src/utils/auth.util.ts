import { createOAuthDeviceAuth } from '@octokit/auth-oauth-device';

const clientId = 'Ov23liqZr7tHgzYreUKw'; // needs to be out of the code

const auth = createOAuthDeviceAuth({
    clientType: 'oauth-app',
    clientId: clientId,
    scopes: ['repo', 'user'], 
    onVerification({ user_code, verification_uri }) {
      console.log(`Open ${verification_uri}`);
      console.log(`Enter code: ${user_code}`);
    }
});
  
  
export default auth;
  