var pokemonDirective = angular.module('pokemonDirective', []);
pokemonDirective.directive('pokedex', function(){
	return {
		restrict: 'E',
		templateUrl: 'pokedex.html'
	};
});
