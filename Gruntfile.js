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
        }
    });

    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.registerTask('default', ['responsive_images']);

};
