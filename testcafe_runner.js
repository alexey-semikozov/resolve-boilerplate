#!/usr/bin/env node
const createTestCafe = require('testcafe');
const { getInstallations } = require('testcafe-browser-tools');
const fs = require('fs');
let testcafe = null;
process.env.DB = './__test_db__.json';

getInstallations()
    .then((browsers) => {
        createTestCafe('localhost', 1337, 1338)
            .then((tc) => {
                testcafe = tc;
                const runner = testcafe.createRunner();
                const browser = Object.keys(browsers).slice(0,1);
                return runner
                    .startApp('npm run dev', 5000)
                    .src(['./tests/e2e-tests/index.test.js'])
                    .browsers(browser)
                    .run();
            })
            .then(() => {
                testcafe.close();
                fs.unlink(process.env.DB);
            })
    });