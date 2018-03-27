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
                    src: ['*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
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
        },
        cwebp: {
            static: {
                files: {
                    'dist/img.webp': 'img/*.jpg',
                }
            },
            dynamic: {
                options: {
                    q: 50
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-cwebp');


    grunt.registerTask('default', ['cwebp']);

};
