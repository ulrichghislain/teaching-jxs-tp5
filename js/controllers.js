var pokemonController = angular.module('pokemonController', []);
var oldValue = "";

pokemonController.controller('searchPokemon', ['$scope', '$log', '$http', '$templateCache', 'bridge',
    function ($scope, $log, $http, $templateCache, bridge) {
        bridge.setScope($scope);
        $scope.loading = true;
        /* $scope.pokemonList = [
         {
         id: 1,
         name: 'pouansi'
         },
         {
         id: 2,
         name: 'ghislain'
         },
         {
         id: 3,
         name: 'kadiatou'
         },
         {
         id: 4,
         name: 'moussa'
         },
         {
         id: 5,
         name: 'rosenberg'
         }
         ];*/
        $scope.onChange = function(pokemonId){
            $scope.loading = true;
            bridge.setId(pokemonId);
        };

        $scope.getSelectedPokemon = function(selectedPokemon){
            if(selectedPokemon !== undefined && oldValue !== selectedPokemon)
            {
                oldValue = selectedPokemon;
                $scope.loading = true;
                bridge.setId(selectedPokemon);
            }
        };

        $http({
            method: 'GET',
            url: 'http://pokeapi.co/api/v1/pokedex/1',
            cache: $templateCache
        }).then(function (response) {
          $log.log(response);
            $scope.pokemonList = response.data.pokemon;
            $scope.loading = false;
        }, function (response) {
            $log.log(response);
            $scope.loading = false;
        });
    }]);

pokemonController.controller('pokemonInfo', ['$scope', 'Pokemon', 'bridge', '$log', function ($scope, Pokemon, bridge, $log) {

        
        $scope.$watch(function () {
            return bridge.getId();
        }, function () {
            
                  Pokemon.get({pokemonId: bridge.getId()}, function (response) {
                      if (response.national_id !== undefined){
                          $scope.data = response;
                          $scope.data.info = 'id:' + $scope.data.national_id + ',  name: ' + $scope.data.name;
                          $scope.data.pokemonImageLink = 'http://pokeapi.co/media/img/' + $scope.data.national_id + '.png';
                      }
                      else{
                        $scope.data = {};
                      }
                      bridge.getScope().loading = false;
                  },
                  function (response) {
                          $scope.data = {};
                          bridge.getScope().loading = false;
                  });
            
        }, true);

    }]);
