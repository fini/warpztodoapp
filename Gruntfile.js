module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt, {scope: ['devDependencies', 'dependencies']});

    // Time Grunt, gives stats about the execution time of tasks, stuff accounting for <1% will not be output on results.
    require('time-grunt')(grunt); // NOTE: move above load-grunt-tasks, if you want to meassure it as well.


    // Project configuration.
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '1.0.0',
      banner: '/*!\n' +
        ' * Todo App v<%= meta.version %>\n' +
        ' * www.bytefarmers.com\n\n' +
        ' * Copyright © 2016 Bytefarmers.com\n' +
        ' * All Rights Reserved\n */'
    },
    paths: {
        build: {
            distFolder: 'build/dist',
            devFolder: 'build/dev',
            bower: 'bower_components'
        },
        html: {
            projectFiles: ['*.html']
        },
        js: {
            projectFiles: ['js/**/*.js'],
            libraryFiles: [
                //'<%= paths.build.bower %>/lodash/lodash.js',
                '<%= paths.build.bower %>/velocity/velocity.js',
                '<%= paths.build.bower %>/velocity/velocity.ui.js'
                //'<%= paths.build.bower %>/jquery/dist/jquery.min.js',
            ]
        },
        sass: {
            projectFiles: ['sass/**/*.scss']
        },
        img: {
            responsiveImageFiles: ['img/bg/**/*.{jpg,gif,png}']
        },
        tmp: {

        }
    },


    // grunt-contrib-sass
    sass: {
        dist: {
            options: {

            },
            files: {
                'css/master.css': 'sass/main.scss'
            }
        }
    },

    cssmin: {
        options: {
            keepSpecialComments: '*',
            report: false
        },
        dist: {
            options: {
                keepSpecialComments: '1',
                report: 'gzip' // false, 'min', 'gzip'
            },
            files: {
                '<%= paths.build.distFolder %>/css/master.min.css': 'css/master_prefixed.css'
            }
        },
        dev: {
            files: {
                '<%= paths.build.devFolder %>/css/master.min.css': 'css/master_cssc.css'
            }
        }
    },


    autoprefixer: {

        options: {
        // Task-specific options go here.
            browsers: ['last 2 versions', 'ie 9']
        },

        // prefix all files
        dist: {
            //expand: true,
            //flatten: true,
            src: 'css/master.css',
            dest: 'css/master_prefixed.css'
        },
    },

    // grunt-contrib-copy
    copy: {
        dist: {
            files: [
                //{expand: true, src: ['img/icons/**/*.{jpg,gif,png,svg,svgz}'], dest: '<%= paths.build.distFolder %>/'},
                //{expand: true, src: ['img/text/**/*.{jpg,gif,png,svg,svgz}'], dest: '<%= paths.build.distFolder %>/'},
                {expand: true, src: ['README.md'], dest: '<%= paths.build.distFolder %>/'},
                {expand: true, src: ['data/**/*.json'], dest: '<%= paths.build.distFolder %>/'}
            ]
        }
    },

    // grunt-connect
    connect: {
        server: {
            options: {
                port: 1339,
                hostname: '*',
                base: "./build/dist/",
                livereload: 35730,
                onCreateServer: function(server, connect, options) {

                    console.log('Starting Server with options:', options);
                }
            }
        }
    },


    // grunt-contrib-clean
    clean: {
        dist: {
            src: ["<%= paths.build.distFolder %>"]
        },
        dev: {
            src: ["<%= paths.build.devFolder %>"]
        }
    },

    // grunt-htmlhint
    htmlhint: {
        options: {
            'tag-pair': true,
            'tagname-lowercase': false,
            'tag-self-close': true,
            //'attr-lowercase': true,
            //'attr-value-double-quotes': true,
            'attr-value-not-empty': true,
            'src-not-empty': true,
            'doctype-first': true,
            'doctype-html5': true,
            'spec-char-escape': true,
            'id-unique': true,
            //'id-class-value': 'dash',
            //'head-script-disabled': true,   // true/false does not work, commenting out instead.
           // 'style-disabled': false
        },
        dist: {
            src: '<%= paths.html.projectFiles %>'
        }
    },

    // grunt-contrib-htmlmin
    htmlmin: {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                lint: false,
                keepClosingSlash: true
            },
            files: {
                '<%= paths.build.distFolder %>/index.html': 'index.html'
            }
        }
    },

    // grunt-contrib-jshint
    jshint: {
        options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            globals: {
                jQuery: true
            }
        },
        dist: {
            files: {
                src: ['<%= paths.build.distFolder %>/js/**/*.js']
            }
        },
        dev: {
            files: {
                src: ['Gruntfile.js', 'js/**/*.js']
            }
        }
    },

    // grunt-contrib-uglify
    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            footer: '\n',
            report: 'gzip', // false, 'min', 'gzip'  Reports actual minified size
            preserveComments: 'none', // some
            sourceMap: true,
            beautify: false,
            mangle: true
        },
        dist: {
            files: {
                '<%= paths.build.distFolder %>/js/master.min.js': '<%= paths.js.projectFiles %>',
                '<%= paths.build.distFolder %>/js/libs.min.js': '<%= paths.js.libraryFiles %>'
            }
        },
        dev: {
            files: {
              //  '<%= paths.build.devFolder %>/js/master.min.js': '<%= paths.js.projectFiles %>' //perhaps dev should use plain old js files.
            }
        }
    },

    // grunt-contrib-watch
    watch: {
        options: {
            livereload: 35730
        },
        html: {
            files: '<%= paths.html.projectFiles %>',
            tasks: ['newer:htmlhint', 'newer:htmlmin']
        },
        js: {
            files: '<%= paths.js.projectFiles %>',
            tasks: ['build_js'] // , 'jshint:dist'
        },
        css: {
            files: '<%= paths.sass.projectFiles %>',
            tasks: ['build_css']
        }
    }
  });



    // Custom Tasks
    grunt.registerTask('build_js',  ['newer:jshint:dev','uglify:dist']);
    grunt.registerTask('build_css',  ['sass', 'autoprefixer:dist', 'cssmin:dist']);
    grunt.registerTask('build_html',  ['htmlhint', 'htmlmin']);
    grunt.registerTask('server',  ['connect:server:keepalive']);

    grunt.registerTask('default', ['build_js', 'build_html', 'build_css', 'copy:dist']); // , 'copy:dist'

};
