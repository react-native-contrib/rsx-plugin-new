'use strict';

let path   = require('path');
let utils  = require('rsx-common');
let yeoman = require('yeoman-environment');

let log = utils.log;

/**
 * Registers any Yeoman generators with the environment.
 *
 * @param  {Environment} env Yeoman environment
 *
 * @return {Environment}     Yeoman environment
 */
const registerGenerators = (env) => {
    env.register(require.resolve('rsx-generator-base'), 'rsx:app');
    return env;
};

/**
 * Calls `rsx platforms add` through an external process.
 *
 * @param  {String} platform The platform to add
 *
 * @return {void}
 */
const generatePlatform = (platform) => {
    utils.process.run(`rsx platforms add ${platform}`)(() => {
        log.info(`The ${platform} platform was added successfully`);
    });
};

/**
 * Creates a new React Native project.
 *
 * @param  {Object}   args     An object containing any arguments for this command
 * @param  {Function} callback A callback to execute on successful process completion
 *
 * @return {void}
 */
module.exports = function newProject(args, callback) {
    log.heading     = 'rsx-new';
    let name      = args[0];
    let platforms = typeof args[1] === 'string' ? args[1].split(',') : ['ios', 'android'];

    let rootPath    = process.cwd();
    let projectPath = path.join(rootPath, name);

    utils.path.makeDirectory(projectPath);
    process.chdir(projectPath);
    log.info(`A new project has been created in ${projectPath}/`);

    let env = registerGenerators(yeoman.createEnv());
    env.run(['rsx:app', name], () => {
        platforms.forEach(generatePlatform);
        process.chdir(rootPath);

        if (callback) { callback(); }
    });
};
