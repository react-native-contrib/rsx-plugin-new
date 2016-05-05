const spawnSync = require('child_process').spawnSync;
const fs = require('fs');
const path = require('path');
const utils = require('rsx-common');
const yeoman = require('yeoman-environment');
const log = utils.log;
const spawnOpts = {
    stdio: 'inherit',
    stdin: 'inherit',
};

const generatePlatform = (platform) => {
    var res = spawnSync('rsx', ['platforms', 'add', platform], spawnOpts);

    if (res.status) {
        process.exit(res.status);
    }
};

module.exports = function newProject(args, callback) {
    log.heading = 'rsx-new';
    const rootPath = process.cwd();
    const name = args[0];
    const platforms = (typeof args[1] === 'string') ? args[1].split(',') : ['ios', 'android'];

    const projectPath = path.join(rootPath, name);

    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
    }

    process.chdir(projectPath);

    const env = yeoman.createEnv();
    env.register(require.resolve('rsx-generator-base'), 'rsx:app');
    env.run(['rsx:app', name], () => {
        platforms.forEach(generatePlatform);
        process.chdir(rootPath);
    });

    log.info(`A new project has been created in ${projectPath}/`);
};
