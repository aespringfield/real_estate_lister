// Setup grunt and add the uglify module to the project
module.exports = function(grunt) {
  // Tell grunt how the project is configured
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // MUST LOAD & REGISTER UGLIFY PLUGIN (see below)
    uglify: {
      client: {
        // src can be an array [] or wildcard '*.js'
        src: 'client/scripts/client.js',
        dest: 'server/public/scripts/client.min.js'
      }
    },
    // MUST LOAD & REGISTER COPY PLUGIN (see below)
    copy: {
      scripts: {
        // Required but not getting into at this point
        expand: true,
        // Current working directory, where are the files?
        cwd: 'client/scripts/',
        // List of files to copy
        src: ['*.*'], // Could use ['*.html'] or ['*.*']
        // Destination, where should we put them?
        dest: 'server/public/scripts/'
      },
      views: {
        // Required but not getting into at this point
        expand: true,
        // Current working directory, where are the files?
        cwd: 'client/views/',
        // List of files to copy
        src: ['*.*'], // Could use ['*.html'] or ['*.*']
        // Destination, where should we put them?
        dest: 'server/public/views/'
      },
      // name of the task e.g. jquery
      jquery: {
        // Required but not getting into at this point
        expand: true,
        // Current working directory, where are the files?
        cwd: 'node_modules/jquery/dist/',
        // List of files to copy
        src: ['jquery.js'],
        // Destination, where should we put them?
        dest: 'server/public/vendors/'
      },
      bootstrap_css: {
        // Required but not getting into at this point
        expand: true,
        // Current working directory, where are the files?
        cwd: 'node_modules/bootstrap/dist/css',
        // List of files to copy
        src: ['bootstrap.css'], // Could use ['*.html'] or ['*.*']
        // Destination, where should we put them?
        dest: 'server/public/vendors/bootstrap'
      },
      bootstrap_js: {
        // Required but not getting into at this point
        expand: true,
        // Current working directory, where are the files?
        cwd: 'node_modules/bootstrap/dist/js',
        // List of files to copy
        src: ['bootstrap.js'], // Could use ['*.html'] or ['*.*']
        // Destination, where should we put them?
        dest: 'server/public/vendors/bootstrap'
      },
    },
    // No sub tasks for watch
    watch: {
      // What files am I looking at
      files: ['client/scripts/*.js', 'client/views/*.html'],
      // What tasks should I complete
      tasks: ['uglify', 'copy']
    },
  //   express: {
  //   options: {
  //     port: 3000,
  //     // Override defaults here
  //   },
  //   dev: {
  //     options: {
  //       script: 'server/app.js'
  //     }
  //   },
  //   prod: {
  //     options: {
  //       script: 'server/app.js',
  //       node_env: 'production'
  //     }
  //   },
  //   test: {
  //     options: {
  //       script: 'server/app.js'
  //     }
  //   }
  // }
  });
  // LOAD PLUGIN: Bring the plugin into the project
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-express-server');

  // REGISTER TASK: Actually use the plugin
  grunt.registerTask('default', [/*'uglify',*/'copy', /*'express',*/ 'watch']);
};
