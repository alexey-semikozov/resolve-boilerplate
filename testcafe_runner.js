#!/usr/bin/env node
const yargs = require('yargs');
const createTestCafe = require('testcafe');
const { getInstallations } = require('testcafe-browser-tools');
const fs = require('fs');
let testcafe = null;
process.env.DB = './__test_db__.json';

const argv = yargs.option('browser', {
    alias: 'b',
    default: false
}).help().argv

getInstallations()
    .then((browsers) => {
        createTestCafe('localhost', 1337, 1338)
            .then((tc) => {
                testcafe = tc;
                const runner = testcafe.createRunner();
                const browser = argv.browser || Object.keys(browsers).slice(0,1);
                return runner
                    .startApp('npm run dev', 5000)
                    .src(['./tests/e2e-tests/index.test.js'])
                    .browsers(browser)
                    .run();
            })
            .then((exitCode) => {
                testcafe.close();
                fs.unlink(process.env.DB);
                process.exit(exitCode)
            })
    });