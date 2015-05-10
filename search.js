angular.module('instagramApp',['ngAnimate'])
.controller('instagramController',function($scope,$http){
	$scope.submitted=false;
	$scope.message=null;

	$scope.submit=function(){
		$scope.submitted=true;
		var tag=$scope.instagramData.tag;
		console.log("you searched for "+tag);
		getImages(tag);
	};

	
		/*--Define variables--*/
	function getImages(tag) {
        // api config
        var base = "https://api.instagram.com/v1";
        var clientId = '624f6e00c6a2428d9082e9a3c8b592f7';
        // request url
        var request = '/tags/' + tag + '/media/recent';
        var url = base + request;
        // parameters
        var config = {
            'params': {'client_id': clientId, 'callback': 'JSON_CALLBACK', 'count': 20,}
        };
        $http.jsonp(url, config).success(function (results) {
            if (results.meta.code == 200) {
                if (results.data.length > 0) {
                    console.log(results.data)
                    $scope.images = results.data;
                    $scope.message = "Found " +results.data.length+ " results tagged with '" +tag+ "' ...";
                } else {
                    $scope.message = "Sorry. No results were found.";
                }
            } else {
                $scope.message = "Oops! Error: '" +result.meta.error_type+"'.";
            }
        }).error(function() {
            $scope.message = "Oops! Error.";
        });
    }

	$scope.reset=function(){
		$scope.submitted=false;
		$scope.message=null;
		$scope.instagramData={};
		$scope.images={};
	}
});