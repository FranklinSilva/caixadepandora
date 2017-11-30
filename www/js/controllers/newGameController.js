
pandoraBoxApp.controller('newGameController', [ '$window', '$q', '$route', '$location', 'LocalDatabaseService',
    function($window, $q, $route, $location, LocalDatabaseService) {

    var vm = this;
    
    vm.init = function() {
        console.log("preparado para iniciar um novo jogo????");
        //vm.loadUser();
        //GaEventsService.startGaApp();
    }
    
    vm.translateUserObject = function(userToBeTranslated) {
        var u = UsuarioModel.fromServer(userToBeTranslated);
        UsuarioModel.setUser(u);

        return u;
    }


    vm.cryptographPassword = function(senha) {
        // Password has begin fixed to "#!#123_a"
        return CryptoJS.MD5("#!#123_a" + senha).toString();
    }


    vm.signIn = function(email, password) {
        vm.passwordHash = vm.cryptographPassword(password);
        
        var params = {
          login : email,
          senha : vm.passwordHash
        };
               
        WebServiceNew.autenticar(params)
        .then( function (response) {
            if(response.data.Retorno.Codigo == 0){
                vm.user = WebServiceNew.user;
                vm.saveInLocalDatabase();
                var userToBeTranslated = vm.translateUserObject(vm.user);

                $location.path('/library');
            }

        });
    };

    vm.saveInLocalDatabase = function() {
        var data = [{
                    key: 'usuario',
                    value: vm.user
                }]; 
        
        LocalDatabaseService.addDataToLocalDatabase('shared', 'readwrite', data);
    }

    vm.loadUser = function() {

        var databaseReady = LocalDatabaseService.openDatabase('empregoseconcursos', 1)
        .then( function(){
            var getLocalUser = LocalDatabaseService.getDataFromLocalDatabase('usuario', 'shared')
            .then( function(){
                vm.localUser = LocalDatabaseService.objectGet;
                if(vm.localUser){
                    vm.localUser = UsuarioModel.fromServer(vm.localUser.value)
                    WebServiceNew.setTokenSession(vm.localUser.token);
                    UsuarioModel.setUser(vm.localUser);
                    $location.path('/library');
                } else{
                   vm.params = {};
                }

            });
        });
    }

    vm.forgotPasswordUrl = function(){
        $window.open(GlobalService.setWebsiteBaseUrl() + 'LembrarSenha.aspx');
    }
}]);

