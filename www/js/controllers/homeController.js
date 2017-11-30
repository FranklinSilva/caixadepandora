
pandoraBoxApp.controller('homeController', [ '$window', '$q', '$route', '$location', 'LocalDatabaseService', '$ionicPlatform',
    function($window, $q, $route, $location, LocalDatabaseService, $ionicPlatform) {

    var vm = this;
    
    $ionicPlatform.ready(function(){
        console.log("estou pronto");
    });

}]);

