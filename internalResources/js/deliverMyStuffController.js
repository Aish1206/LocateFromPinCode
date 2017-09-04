mainApp.controller('deliveryController',function($scope, $http){
     $scope.curPage = 0;
     $scope.pageSize = 10;
     $scope.data = [];
     $scope.dirOptions = {};
     $scope.orderByField = 'Pincode';
     $scope.reverseSort = false;
     $http.get("data/Pincode_US.json").then(function(response){
        $scope.data=response.data;
        
    });

      $scope.numberOfPages = function() {
         return Math.ceil($scope.data.length/$scope.pageSize);
	}
 
  $scope.callDirFunc = function(x){
    $scope.dirOptions.directiveFunction(x);
  };
  
});