Certainly! Below is the complete README for the Faust Publisher CLI based on the provided information:

---

# Faust Publisher CLI

The Faust Publisher CLI is used to publish FAUST packages from the command line. It is built using [oclif](https://oclif.io).

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

## Usage

### Installation

To install the Faust Publisher CLI globally using npm, run:

```sh
npm install -g faustpublisher
```

### Examples

After installation, you can use the `faustpublisher` command from any directory.

```sh-session
$ faustpublisher COMMAND
running command...

$ faustpublisher --version
faustpublisher/0.0.0 linux-x64 node-v20.13.1

$ faustpublisher --help [COMMAND]
```

## Commands

### `faustpublisher login`

Logs you into your GitHub account.

```
USAGE
  $ faustpublisher login

DESCRIPTION
  Login to your GitHub account

EXAMPLES
  $ faustpublisher login
```

### `faustpublisher publish GITHUB_LINK`

Publishes your libraries to the Faust Registry.

```
USAGE
  $ faustpublisher publish LINK

ARGUMENTS
  LINK  GITHUB Repository link containing the faust library to publish

DESCRIPTION
  Publish your project to Faust Registry

  In order to publish a library you:

  0- Must be logged in
  1- Must be a collaborator of the repository
  2- The Repository's name must end with .lib
  3- The Library file must be named as the repository
  4- The Library file must be in the root of the repository
  5- The Library must have a process function to be able to test it
  6- All your dependencies must follow new faust-pkg format

EXAMPLES
  $ faustpublisher publish https://github.com/shehab299/oscillators.lib
```

<!-- commandsstop -->

