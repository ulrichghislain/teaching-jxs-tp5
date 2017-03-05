var pokemonService = angular.module('pokemonService', ['ngResource']);
var pokemonApiUrl = "http://pokeapi.co/";
var urlGetPokemonById = pokemonApiUrl + 'api/v1/pokemon/:pokemonId';

pokemonService.factory('Pokemon', ['$resource', function($resource){
        return $resource(urlGetPokemonById, {pokemonId:'@id'});
}]);

pokemonService.factory('bridge', [function(){
     var id = 0;
     var name = "";
     var scope;

     var pokemon = {

         getId : function(){
            return id;
         },

         setId : function(pokeid){
            id = pokeid;
         },

         getScope : function(){
            return scope;
         },

         setScope : function(scp){
            scope = scp;
         },

         getName : function(){
            return name;
         },

         setName : function(pokeName){
            name = pokeName;
         }
      };
      return pokemon;
}]);
