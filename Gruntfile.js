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
                    }]
                },
                files: [{
                    expand: true,
                    src: ['img/*.{gif,jpg,png}'],
                    cwd: 'dist/',
                    dest: 'images/'
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.registerTask('default', ['responsive_images']);

};
