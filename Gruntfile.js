module.exports = function (grunt) {

    'use strict';

    var globalConfig = {
        myIP: "localhost"
    };

    grunt.initConfig({
        globalConfig: globalConfig,

        // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        // git add/commit/push
        exec: {

            //get IP & Set a local variable
            get_ip: {
                command: 'ifconfig | grep -m 1 "inet addr:192.168.1" | cut -c21-31',
                callback: function (error, stdout, stderr) {
                    if (error !== null) {
                        //grunt.log.error('exec error: ' + error);
                    }
                    if (stderr !== null) {
                        grunt.log.error('exec error: ' + stderr);
                    }
                    globalConfig.myIP = stdout;
                    console.log('set myIP:', globalConfig.myIP);
                },
                stdout: false,
                stderr: false

            },
        },

        // local dev server
        connect: {
            development: {
                options: {
                    port: 8080,
                    hostname: '*',
                    base: '.',
                    livereload: true
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: ["/"]
                    //                  ,compress: true,
                    //                  yuicompress: true,
                    //                  optimization: 2

                },
                files: {
                    "css/bootstrap.css": "less/bootstrap.less"
                }
            },
        },

        open: {
            development: {
                path: 'http://<%= globalConfig.myIP %>:8080'
            }

        },

        watch: {
            styles: {
                // Which files to watch (all .less files recursively in the less directory)
                files: ['less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        lesslint: {
            src: ['less/**/*.less']
        }

    });

    grunt.registerTask('default', ['exec','connect', 'open', 'watch']);

    grunt.registerTask('lint', ['lesslint']);

    require('load-grunt-tasks')(grunt);
};
