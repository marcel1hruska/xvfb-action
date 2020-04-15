const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');

async function main() {

    const command = core.getInput('run');

    if (command) {
        try {
            if (process.platform == "linux") {
                await runForLinux(command);
            } else {
                await runForWin32OrDarwin(command);
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    } else {
        core.setFailed("run parameter is required for xvfb");
    }
}

async function runForLinux(command) {
    if (fs.existsSync('/etc/alpine-release'))
        await exec.exec("apk add xvfb");
    else
        await exec.exec("sudo apt-get install xvfb");

    try {
        await exec.exec(`xvfb-run --auto-servernum ${command}`);
    } finally {
        await cleanUpXvfb();
    }
}

async function cleanUpXvfb() {
    try {
        await exec.exec("bash", [`${__dirname}/cleanup.sh`]);
    } catch {

    }
}

async function runForWin32OrDarwin(command) {
    await exec.exec(command);
}

main();