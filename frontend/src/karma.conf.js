// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        files: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.js'
        ],
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-chrome-launcher'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-jasmine'),
            require('karma-jasmine-html-reporter'),
            require('karma-junit-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('@metahub/karma-jasmine-jquery')
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            jasmine: {
                random: false
            }
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../coverage'),
            reports: ['html', 'lcovonly', 'junit'],
            fixWebpackSourcePaths: true
        },
        junitReporter: {
            outputDir: 'tests',
            outputFile: 'test.xml',
            useBrowserName: false
        },
        reporters: config.angularCli && config.angularCli.codeCoverage
            ? ['progress', 'coverage-istanbul', 'junit']
            : ['progress', 'kjhtml', 'junit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadlessNoSandbox'],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        singleRun: true
    });
};
