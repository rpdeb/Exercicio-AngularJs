angular.module("crudItemCompra", []);
angular.module("crudItemCompra").controller("itemCompraCtrl", function ($scope, $http) {

    $scope.novoProduto = {};
    $scope.produtoSelecionado = {};
    $scope.produtos = [];
  
    var listarProdutos = function () {
        $http.get("http://localhost:3000/itemsdecompra").success(function (data) {
            console.log(data, "produtos");
            $scope.produtos = data;
        });
    };

    var listarCompras = function () {
        $http.get("http://localhost:3000/compras").success(function (data) {
            console.log(data, "comprinhas");
            $scope.compras = data;
        });
    };

    $scope.salvar = function () {
        $scope.produtos.push($scope.novoProduto);
        var produto = $scope.novoProduto;
        $http.post("http://localhost:3000/itemsdecompra", produto).success(function (data) {
		console.log("realizou o post - pessoa com id", data);	
        listarProdutos();
		});
        //$scope.novoProduto = {};
    };

    $scope.selecionaProduto = function (produto) {
        $scope.produtoSelecionada = produto;
    };

    $scope.alterarProduto = function () {
        var produto = $scope.produtoSelecionado;

        $http.put(`http://localhost:3000/itemsdecompra/${produto.id}`,produto).success(function (data) {
			$scope.produtos = data;
			console.log($scope.produtos);	
			console.log("sucesso na alteração");
			});
        listarProdutos();
    };

    $scope.excluirProduto = function () {
        var produto = $scope.produtoSelecionada;
        
        $http.delete(`http://localhost:3000/itemsdecompra/${produto.id}`,produto).success(function (data) {
			$scope.produtos = data;
			console.log($scope.produtos);	
			console.log("sucesso na exclusão");
			});
        $scope.produtos.splice($scope.produtos.indexOf($scope.produtoSelecionado), 1);
    };

    listarProdutos();
    listarCompras();
});