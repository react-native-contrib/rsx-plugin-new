'use strict';

const chai = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const path = require('path');

const expect = chai.expect;

const command = require('../src/newProject');

describe('new', () => {

    // it('should do something');

    it('should add a platform project for React Native', () => {
            // process.env.RN_PROJECT_ROOT = path.join(__dirname, 'fixtures');

            let commandMock = rewire('../src/newProject');
            commandMock.__set__('process', {
                cwd: process.cwd,
                chdir: function chdir() {},
            });
            commandMock.__set__('utils', {
                path: {
                    makeDirectory: function makeDirectory() {},
                },
                process: {
                    run: function run(command) { return (callback) => callback(command); },
                },
            });
            commandMock.__set__('yeoman', {
                createEnv: () => {
                    return {
                        register: () => {},
                        run: (args, callback) => { callback(); },
                    };
                },
            });

            const spy = sinon.spy();
            commandMock('TestApp', spy);

            expect(spy.calledOnce).to.be.true;
        });

});
