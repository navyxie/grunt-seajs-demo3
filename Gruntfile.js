//http://hi.baidu.com/liuda101/item/54bcf8d0b6a65602d68ed057
module.exports = function(grunt){
     // var transport = require('grunt-cmd-transport');
     // var style = transport.style.init(grunt);
     // var text = transport.text.init(grunt);
     // var script = transport.script.init(grunt);
     grunt.initConfig({
          pkg: grunt.file.readJSON("package.json"),
          // imagemin:{
          //      options:{
          //           optimizationLevel:7,
          //           progressive:true
          //      },
          //      dynamic:{
          //           expand: true,                  // Enable dynamic expansion
          //           cwd: 'images/',                   // Src matches are relative to this path
          //           src: ['**/*.{png,jpg,gif,jpeg}'],   // Actual patterns to match
          //           dest: 'dist/'                  // Destination path prefix
          //      }             
          // },
          // jshint:{
          //      files: ['static/**/*.js'],
          // },
          transport : {
               options : {
                    paths: ['.'],  
                    alias: '<%= pkg.spm.alias %>'
                    // ,parsers : {
                    //      '.js' : [script.jsParser],
                    //      '.css' : [style.css2jsParser],
                    //      '.html' : [text.html2jsParser]
                    // }                                   
               },
               application : {
                    options:{
                         idleading: "appjs/",
                         relative:true
                    },
                    files:[{
                         expand:true,
                         cwd:'static/src/javascripts',
                         src:['**/*.js','!**/*-min.js'],
                         dest:'.build/',
                         filter: 'isFile',
                         nonull: true,
                         ext : '.js'
                    }]
               }
               // ,stylesheets:{
               //      options:{
               //           idleading: "appstylesheet/",
               //           relative:true
               //      },
               //      files:[{
               //           expand:true,
               //           cwd:'static/src/stylesheets',
               //           src:['**/*.css','!**/*.less'],
               //           dest:'.build/',
               //           filter: 'isFile',
               //           nonull: true,
               //           ext : '.css'
               //      }]
               // }
          },
          concat : {
               main : {
                    options : {
                         paths: ['.'],
                         include: 'all'//当为all时会把alias里的js也一起合并，当为relative时合并出alias之外的js
                    },
                    files: [{
                         expand: true,
                         cwd: '.build/',
                         src: ['**/*.js','!**/*-debug.js'],
                         dest: 'appjs/',
                         ext: '.js'
                    }]
               }
          },
          uglify : {
               main : {
                    options: {
                         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd h:m:s") %> <%= pkg.author %> */\n'
                    },
                    files: [{
                         expand: true,
                         cwd: "appjs",
                         src: ["**/*.js", '!**/*-debug.js'],
                         dest: 'appjs/',
                         ext: '.js'
                    }]
               }
          },
          copy:{
               main:{
                    files: [{
                         src: ['appjs/main.js'], 
                         dest: 'dest/main.js'
                    }]
               },
               appjs:{
                    files:[{
                         src:['dest/main.js'],
                         dest:'appjs/main.js'
                    }]
               }
          },
          clean : {
               build : ['.build','appjs'], //清除.build文件
               dest:['dest']
          }
     });
     // grunt.loadNpmTasks('grunt-contrib-imagemin');
     grunt.loadNpmTasks('grunt-contrib-jshint');
     grunt.loadNpmTasks('grunt-cmd-transport');
     grunt.loadNpmTasks('grunt-cmd-concat');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-contrib-copy');
     grunt.loadNpmTasks('grunt-contrib-clean'); 
     // grunt.registerTask('build',['imagemin','jshint','transport','concat','uglify','clean:build']);
     grunt.registerTask('build',['transport','concat','uglify','copy:main','clean:build']);
     grunt.registerTask('production',['copy:appjs','clean:dest']);
     grunt.registerTask('default',['build','production']);
};