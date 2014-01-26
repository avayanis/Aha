module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),    
    
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          args: ['dev'],
          nodeArgs: ['--debug'],
          ignoredFiles: ['node_modules/**', 'public/**', 'config/runtime.json'],
          watchedExtensions: ['js', 'yml'],
          watchedFolders: ['config', 'models', 'views', 'controllers', 'routes',  'app.js']
        }
      }
    },
    
    shell: {
      test: {
        command: 'node_modules/mocha/bin/mocha --recursive --reporter nyan',
        options: {
          stdout: true,
          stderr: true,
        }
      }
    },

    availabletasks: {

      tasks: {
        options: {
          filter: 'exclude',
          tasks: ['default', 'availabletasks', 'shell', 'nodemon'],
          groups: {
            'development': ['dev:start', 'dev:test']
          },
          descriptions: {
            'dev:start': 'Start app in development mode.',
            'dev:test': 'Run test suite.'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-available-tasks');

  grunt.registerTask('dev:start', ['nodemon:dev']);
  grunt.registerTask('dev:test', ['shell:test']);

  grunt.registerTask('default', ['availabletasks']);
};