module.exports = function (grunt) {

    grunt.initConfig({
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 800,
                        suffix: '_large_1x',
                        quality: 50
                    }, {
                        suffix: '_small',
                        width: 320,
                        height: 240
                    }, {
                        suffix: '_medium',
                        width: 640
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['*.{gif,jpg,png}'],
                    dest: 'img/'
                }]
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 6
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    banner: '/*! MyLib.js 1.0.0 | Aurelio De Rosa (@AurelioDeRosa) | MIT Licensed */'
                },
                files: {
                    'js/output.min.js': ['dbhelper.js', 'js/commonScript.js'],
                }
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: '/*! MyLib.js 1.0.0 | Aurelio De Rosa (@AurelioDeRosa) | MIT Licensed */'
                },
                files: {
                    'css/style.min.css': ['css/**/*.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['responsive_images', 'imagemin', 'uglify', 'cssmin']);

};
