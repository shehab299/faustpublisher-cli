# Faust Publisher CLI Documentation

## Overview

The Faust Publisher CLI simplifies the process of publishing Faust packages to the Faust Registry. It automates the workflow, making it easy for contributors to share their libraries with the community.

## How to Contribute Packages to the Faust Public Registry

The Faust community, being small due to Faust's domain-specific nature, requires a simple publishing workflow. This is facilitated by the `faustpublisher` CLI tool.

### **Prerequisites:**
- **Faust with Package Support:** Ensure Faust is installed with package support.
- **npm (Node Package Manager):** Required to install the `faustpublisher` CLI tool.

### **Installing the Publisher:**

Install `faustpublisher` globally using npm:
```bash
npm install -g faustpublisher
```

### **Logging In:**

Authenticate before publishing:
```bash
faustpublisher login
```
- If you're already logged in, you'll receive a notification.
- If not, follow the provided link and code for authorization.

### **Publishing a Library:**

To publish your library, use:
```bash
faustpublisher publish <github_repo_link>
```

### **Repository Requirements for Successful Publishing:**
- **Collaborator Status:** You must be a collaborator of the repository.
- **Repository Name:** Must match the library name and end with `.lib`.
- **Library Location:** The library file should be in the root of the repository.
- **Entry Point:** The library must have an entry point named `<library_name>_test` for syntax testing. Example:

    ```faust
    // filename: mylibrary.lib

    // Definitions and functions for the library

    mylibrary_test = _;
    ```
- **Versioning:** Ensure the version is updated if republishing.

### **Publishing Structure:**
The library will be published under your GitHub username in the registry, following this structure:
```
username
    libraryname
        version
            libraryname
```

### **First-Time Publishing:**
If you're not yet a collaborator, follow these additional steps:

1. **Prepare Your Library:** Ensure it meets repository requirements and is manually prepared.
2. **Fork the Registry Repository:** Fork and clone the Faust registry repository on GitHub.
3. **Add Your Library:** Create a directory in your forked repository with the structure `username/libraryname/version/` and place your library file in it.
4. **Submit a Pull Request:** Commit, push, and create a pull request to the original registry repository.
5. **Review Process:** Wait for review, address feedback, and await approval.
6. **Becoming a Collaborator:** Once approved, you'll be invited to become a collaborator, allowing direct publishing.
7. **Publishing Future Libraries:** As a collaborator, use the `faustpublisher` tool for direct publishing.



### **Commands**

#### `faustpublisher login`

Logs you into your GitHub account.

```
USAGE
  $ faustpublisher login

DESCRIPTION
  Login to your GitHub account

EXAMPLES
  $ faustpublisher login
```

#### `faustpublisher publish GITHUB_LINK`
Publishes your libraries to the Faust Registry.
```
USAGE
  $ faustpublisher publish LINK

ARGUMENTS
  LINK  GITHUB Repository link containing the Faust library to publish

EXAMPLES
  $ faustpublisher publish https://github.com/shehab299/oscillators.lib
```
