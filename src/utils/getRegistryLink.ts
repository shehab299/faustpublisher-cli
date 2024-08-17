function getRegistryLink() {

    if(!process.env.FAUST_REGISTRY_URL) {
        process.env.FAUST_REGISTRY_URL = "https://github.com/shehab299/faustregistry";
    }

    return process.env.FAUST_REGISTRY_URL;
}


export default getRegistryLink;