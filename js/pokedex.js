var pokeApp = angular.module('pokedex', ['pokemonDirective', 'pokemonController', 'pokemonService']);

pokeApp.config(['$resourceProvider', function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);
