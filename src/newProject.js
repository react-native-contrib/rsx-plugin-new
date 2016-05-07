const path  = require('path');
const utils = require('rsx-common');
const env   = require('yeoman-environment').createEnv();

const log = utils.log;

const registerGenerators = () => {
    env.register(require.resolve('rsx-generator-base'), 'rsx:app');
}

const generatePlatform = (platform) => {
    utils.process.run(`rsx platforms add ${platform}`, () => {
        log.info(`The ${platform} platform was added successfully`);
    });
};

module.exports = function newProject(args, callback) {
    log.heading     = 'rsx-new';
    const name      = args[0];
    const platforms = (typeof args[1] === 'string') ? args[1].split(',') : ['ios', 'android'];

    const rootPath    = process.cwd();
    const projectPath = path.join(rootPath, name);

    utils.path.makeDirectory(projectPath);
    process.chdir(projectPath);

    registerGenerators();

    env.run(['rsx:app', name], () => {
        platforms.forEach(generatePlatform);
        process.chdir(rootPath);
    });

    log.info(`A new project has been created in ${projectPath}/`);
};
