module.exports = function (grunt) {

	grunt.initConfig({
	
		stylus: {
			compile: {
				options: {compress:true},
				files:{
					'public/css/**.css': 'public/css/**.styl'
				}
			}
		},
		watch:{
			stylus:{
				files:['styl/**.styl'],
				tasks:['stylus:compile']
			}
		},
		css: {
			options:{livereload:true},
			files:['public/css/**.css']			
		},
		jade: {
			options:{livereload:true},
			files:['**.jade']		

		},
		script: {			
			options:{livereload:true},
			files:['**.js']		
		},
		concat: {
			js: {
				src: ['public/vendor/angular/angular.js', 
				      'public/app/app.js',
					  'public/vendor/jquery/dist/jquery.js',
					  'public/vendor/bootstrap/bootstrap.js',
					  'public/vendor/toastr/toastr.js',
					  'public/vendor/ng-file-upload-shim/angular-file-upload-shim.js',
					  'public/vendor/angular/angular.js',
					  'public/vendor/ng-file-upload/angular-file-upload.js',
					  'public/vendor/angular-resource/angular-resource.js',
					  'public/vendor/angular-route/angular-route.js',
					  'public/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
					  'public/vendor/angular-ui-router/release/angular-ui-router.js',
					  'public/vendor/textAngular/dist/textAngular-sanitize.min.js',
					  'public/vendor/textAngular/dist/textAngular.min.js',
					  'public/vendor/bg-splitter/js/splitter.js',
					  'public/vendor/socket.io.js',
					  'public/vendor/angular-xeditable/js/xeditable.js',
					  'public//localhost:35729/livereload.js',
      				  'public/vendor/leaflet-0.7.1/leaflet.js',
					  'public/vendor/angular-leaflet-directive.js',
					  'public/vendor/leaflet-0.7.1/js/search/l.control.geosearch.js',
					  'public/vendor/leaflet-0.7.1/js/search/l.geosearch.provider.openstreetmap.js',
					  'public/vendor/leaflet-0.7.1/js/draw/Leaflet.draw.js',
					  'public/vendor/leaflet-0.7.1/js/draw/edit/handler/Edit.Poly.js',
					  'public/vendor/leaflet-0.7.1/js/draw/edit/handler/Edit.SimpleShape.js',
					  'public/vendor/leaflet-0.7.1/js/draw/edit/handler/Edit.Circle.js',
					  'public/vendor/leaflet-0.7.1/js/draw/edit/handler/Edit.Rectangle.js',
					  'public/vendor/leaflet-0.7.1/js/draw/draw/handler/Draw.Feature.js',
					  'public/vendor/leaflet-0.7.1/js/draw/draw/handler/Draw.Polyline.js',
					  'public/vendor/leaflet-0.7.1/js/draw/draw/handler/Draw.Polygon.js',
					  'public/vendor/leaflet-0.7.1/js/draw/draw/handler/Draw.SimpleShape.js',
					  'public/vendor/leaflet-0.7.1/js/draw/draw/handler/Draw.Rectangle.js',
					  'public/vendor/leaflet-0.7.1/js/draw/draw/handler/Draw.Circle.js',
					  'public/vendor/leaflet-0.7.1/js/draw/draw/handler/Draw.Marker.js',
					  'public/vendor/leaflet-0.7.1/js/draw/ext/LatLngUtil.js',
					  'public/vendor/leaflet-0.7.1/js/draw/ext/GeometryUtil.js',
					  'public/vendor/leaflet-0.7.1/js/draw/ext/LineUtil.Intersect.js',
					  'public/vendor/leaflet-0.7.1/js/draw/ext/Polyline.Intersect.js',
					  'public/vendor/leaflet-0.7.1/js/draw/ext/Polygon.Intersect.js',
					  'public/vendor/leaflet-0.7.1/js/draw/Control.Draw.js',
					  'public/vendor/leaflet-0.7.1/js/draw/Tooltip.js',
					  'public/vendor/leaflet-0.7.1/js/draw/Toolbar.js',
					  'public/vendor/leaflet-0.7.1/js/draw/draw/DrawToolbar.js',
					  'public/vendor/leaflet-0.7.1/js/draw/edit/EditToolbar.js',
					  'public/vendor/leaflet-0.7.1/js/draw/edit/handler/EditToolbar.Edit.js',
					  'public/vendor/leaflet-0.7.1/js/draw/edit/handler/EditToolbar.Delete.js',
					  'publichttp://www.mapquestapi.com/sdk/leaflet/v1.0/mq-map.js?key=Fmjtd%7Cluur2du2l9%2C8l%3Do5-9ar2qa',
					  'public/vendor/terraformer/terraformer.js',
					  'public/vendor/terraformer-wkt-parser/terraformer-wkt-parser.js',
					  'public/vendor/leaflet-google.js',
					  'public/app/account/wFAuth.js',
					  'public/app/account/wFNavBarLoginCtrl.js',
					  'public/app/account/wFIdentity.js',
					  'public/app/account/wFUser.js',
					  'public/app/account/wFProfileCtrl.js',
					  'public/app/account/wFSignupCtrl.js',
					  'public/app/account/wFSignUpToGroupCtrl.js',
					  'public/app/admin/wFUserListCtrl.js',
					  'public/app/common/directives/wFDraggabilityDir.js',
					  'public/app/common/directives/wFMonitorDir.js',
					  'public/app/common/wFNotifier.js',
					  'public/app/common/wFMapFactory.js',
					  'public/app/common/wFWildlifeFactory.js',
					  'public/app/common/wFProjectFactory.js',
					  'public/app/common/wFGroupFactory.js',
					  'public/app/common/wFMailService.js',
					  'public/app/common/wFSocketIOFactory.js',
					  'public/app/common/wFTaskFactory.js',
					  'public/app/common/wFUserFactory.js',
    				  'public/app/dashboard/wFDashboardCtrl.js',
					  'public/app/dashboard/chat/wFChatCtrl.js',
					  'public/app/dashboard/email/wFEmailCtrl.js',
					  'public/app/dashboard/email/wFEmailContentCtrl.js',
					  'public/app/dashboard/email/wFEmailListingDir.js',
					  'public/app/dashboard/files/wFFileUploadCtrl.js',
					  'public/app/dashboard/tasks/wFTaskCtrl.js',
					  'public/app/groups/wFGroupCtrl.js',
					  'public/app/main/wFMainCtrl.js',
					  'public/app/main/map/wFMapCtrl.js',
					  'public/app/main/wFHowToCtrl.js',
					  'public/app/main/wildlife/wFWildlifeSelectCtrl.js',
					  'public/app/projects/wFProjectCtrl.js',
					  'public/app/projects/contributions/wFContributionCtrl.js',
					  'public/app/projects/details/wFProjectDetailsCtrl.js',
					  'public/app/projects/edit/wFEditProjectCtrl.js',
					  'public/app/projects/edit/wFSlidingPanelCtrl.js',
					  'public/app/projects/edit/wFWebRTCCtrl.js',
					  'public/app/users/wFUserCtrl.js'],
				dest: 'public/build/app.js'
			}

		},

		uglify: {
			js:{
				src:['public/build/app.js'],
				dest:'public/build/app.js'
			}
		}
	        
	});

	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask("build", ['concat', 'uglify']);
	
}
