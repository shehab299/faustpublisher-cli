import axios from "axios";

async function checkCollaborators(username , link, token){

    let url = new URL(link);
    let owner = url.pathname.split('/')[1];
    let repo = url.pathname.split('/')[2];

    const response = await axios({
        method: "get",
        url: `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if(response.status === 204){
        return true;
    }

    return false;
};

export default checkCollaborators;

