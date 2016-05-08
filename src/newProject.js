const fs     = require('fs');
const path   = require('path');
const utils  = require('rsx-common');
const yeoman = require('yeoman-environment');

const log = utils.log;

const registerGenerators = (env) => {
    env.register(require.resolve('rsx-generator-base'), 'rsx:app');
    return env;
};

const generatePlatform = (platform) => {
    utils.process.run(`rsx platforms add ${platform}`)(() => {
        log.info(`The ${platform} platform was added successfully`);
    });
};

module.exports = function newProject(args, callback) {
    log.heading     = 'rsx-new';
    const name      = args[0];
    const platforms = typeof args[1] === 'string' ? args[1].split(',') : ['ios', 'android'];

    const rootPath    = process.cwd();
    const projectPath = path.join(rootPath, name);

    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
    }

    process.chdir(projectPath);

    const env = registerGenerators(yeoman.createEnv());
    env.run(['rsx:app', name], () => {
        platforms.forEach(generatePlatform);
        process.chdir(rootPath);
    });

    log.info(`A new project has been created in ${projectPath}/`);
};
