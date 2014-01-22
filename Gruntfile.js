module.exports = function(grunt) {
	
	
	grunt.initConfig({
		// local dev server
		connect: {
			development: {
				options: {
					port: 8080,
					hostname: '0.0.0.0',
					base: '.',
					livereload: true
				}
			}
		},
		
		
		less: {
			development: {
				options: {
					paths: ["/"]
//					,compress: true,
//					yuicompress: true,
//					optimization: 2
					
				},
				files: {
					"css/bootstrap.css": "less/bootstrap.less"
				}
			},
		}
		,		
		
		open: {
			development : {
				path: 'http://192.168.1.2:8080/'
			}
			
		}
		,
		
		
		watch: {
			styles: {
				// Which files to watch (all .less files recursively in the less directory)
				files: ['less/**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		}
		,
		lesslint: {
			src: ['less/**/*.less']
		}		
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-lesslint')
	grunt.loadNpmTasks('grunt-contrib-connect')
	grunt.loadNpmTasks('grunt-open')
	
	grunt.registerTask('default', ['connect','open','watch']);
	
	grunt.registerTask('lint', ['lesslint']);
};