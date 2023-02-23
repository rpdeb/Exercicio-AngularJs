angular.module("crudItemCompra", []);
angular.module("crudItemCompra").controller("itemCompraCtrl", function ($scope, $http) {

    $scope.novoItem = {};
    $scope.itemSelecionado = {};
    $scope.itens = [];
    $scope.compras = [];
    $scope.novoItem.codigo = Math.floor(Math.random() * 10000);
  
    var listarItens = function () {
        $http.get("http://localhost:3000/itensdecompra").success(function (data) {
            console.log(data, "itens");
            $scope.itens = data;
        });
    };

    $scope.salvar = function () {
        $scope.itens.push($scope.novoItem);
        $http.post("http://localhost:3000/itensdecompra", $scope.novoItem).success(function (data) {
		console.log("realizou o post - pessoa com id", data);	
        listarItens();
		});
        //$scope.novoItem = {};
    };

    $scope.selecionaItem = function (produto) {
        $scope.itemSelecionado = produto;
    };

    $scope.alterarItem = function () {
        var itemCompra = $scope.itemSelecionado;

        $http.put(`http://localhost:3000/itensdecompra/${itemCompra.id}`,itemCompra).success(function (data) {
			$scope.itens = data;
			console.log($scope.itens);	
			console.log("sucesso na alteração");
			});
        listarItens();
    };

    $scope.excluirItem = function () {
        var itemCompra = $scope.itemSelecionado;
        console.log("excluir");
        
        $http.delete(`http://localhost:3000/itensdecompra/${itemCompra.id}`,itemCompra).success(function (data) {
			//$scope.itens = data;
			console.log($scope.itens);	
			console.log("sucesso na exclusão");
            listarItens();
			});
        $scope.itens.splice($scope.itens.indexOf($scope.itemSelecionado), 1);
    };

    listarItens();
    //listarCompras();
});