'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%']
      },
      dist: {
        files: [{
          expand: true,
          cwd:'<%= config.dist %>/styles/',
          src: '*.css',
          dest:'<%= config.dist %>/styles/'
        }]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '.sass-cache',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },



    compass: {
      dev: {
        options: {
          sourcemap:true,
          imagesDir:'<%= config.app %>/images',
          fontsDir:'<% config.app %>/fonts',
          sassDir:'<%= config.app %>/styles',
          cssDir:'.tmp/styles'
        }
      },
      dist: {
        options: {
          noLineComments:true,
          sourcemap:false,
          imagesDir:'<%= config.app %>/images',
          fontsDir:'<% config.app %>/fonts',
          sassDir:'<%= config.app %>/styles',
          cssDir:'<%= config.dist %>/styles'
        }
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },




    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'fonts/{,*/}*.*'
          ]
        },
        {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        },
        {
          src: '.tmp/concat/styles/vendor.css',
          dest: '<%= config.dist %>/styles/vendor.css'
        }
        ]
      }
    },




    cssmin: {
      dist: {
        options: {
          keepSpecialComments:0,
          report:'min'
        },
        files: [
          {
            expand: true,
            cwd:'<%= config.dist%>/styles/',
            src: '*.css',
            dest:'<%= config.dist%>/styles/'
          }
        ]
      }

    },

    'ftp-deploy': {
      dist: {
        auth: {
         host:'64.207.177.143',
         authKey:'ftp'
        },
        src:'<%= config.dist %>',
        dest:'/httpdocs/',
        exclusions:['.git*', '.DS_Store']
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files:[{
          expand:true,
          cwd:'<%= config.dist %>/',
          src:'**/*.html',
          dest:'dist/'
        }]
      }
    },


    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    // Generates a custom Modernizr build that includes only the tests you reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },



    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },


    //RSYNC doesn't respect grunt variables.
    rsync: {
      options: {
        recursive:true,
        exclude: [".git*", "*.scss", "node_modules", "*.map"]
      },
      dist: {
        options: {
          expand:true,
          src: "dist/",
          host:"USER@HOST",
          dest:"DEST_PATH"
        }
      }
    },


    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },


    uncss: {
      dist: {
        files: {
          '<%= config.dist %>/styles/styles.css': ['<%= config.app %>/index.html', '<%= config.app %>/under-construction.html'],
          '<%= config.dist %>/styles/vendor.css': ['<%= config.app %>/index.html', '<%= config.app %>/under-construction.html'],
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/*.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:dev']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/scripts/{,*/}*.js',
          '<%= config.app %>/{,*/}*.html',
         // '<%= config.app %>/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*',
          '.tmp/styles/{,*/}*.css'
        ]
      }
    }


  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'compass:dev',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });


  grunt.registerTask('build', [
    //Removes the previous dist directory.
    'clean:dist',
    //Not really sure what this does, but you need it for usemin.
    'useminPrepare',
    //CSS / Spriting
    'compass:dist',
    //Autoprefixes
    'autoprefixer:dist',
    //Smooshes images.
    'imagemin',
    //Smooshes SVGs.
    'svgmin',
    //Combines JS?
    'concat',
    //Minifies CSS
    'cssmin:dist',
    //Smooshes JS
    'uglify',
    //Copies all the other shit.
    'copy:dist',
  //  'modernizr', //No need for this app.
    'usemin'
   // 'rev'
  ]);

  grunt.registerTask('deploy', function() {
    grunt.task.run(['build', 'ftp-deploy:dist']);
  });

  grunt.registerTask('default', [
    'build'
  ]);
};
