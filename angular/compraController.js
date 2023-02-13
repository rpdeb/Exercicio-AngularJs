angular.module("crudCompra", []);
angular.module("crudCompra").controller("compraController", function ($scope, $http) {

    $scope.novaCompra = {};
    $scope.compraSelecionada = {};
    $scope.compras = [];
    $scope.pessoas = [];

    var listarPessoas = function () {
        $http.get("http://localhost:3000/pessoas").success(function (data) {
            console.log(data, "pessoas");
            $scope.pessoas = data;
            //$scope.pessoasSelect = data.filter((d) => d.pessoa.nome);
        });
    };

    var listarCompras = function () {
        $http.get("http://localhost:3000/compras").success(function (data) {
            console.log(data, "comprinhas");
            $scope.compras = data;
        });
    };

    $scope.salvar = function () {
        $scope.compras.push($scope.novaCompra);
        var pessoa = $scope.novaCompra;
        $http.post("http://localhost:3000/compras", pessoa).success(function (data) {
		console.log("realizou o post - pessoa com id", data.id);	
        listarCompras();
		});
        //$scope.novaCompra = {};
    };

    // $scope.selecionaPessoa = function (pessoa) {
    //     $scope.pessoaSelecionada = pessoa;
    // };

    $scope.selecionaCompra= function (compra) {
        $scope.compraSelecionada = compra;
    };

    $scope.alterarCompra = function () {
        var compra = $scope.compraSelecionada;

        $http.put(`http://localhost:3000/compras/${compra.id}`,compra).success(function (data) {
			$scope.compras = data;
			console.log($scope.compras);	
			console.log("sucesso na alteração");
			});
        listarCompras();
    };

    $scope.excluirCompra = function () {
        var compra = $scope.compraSelecionada;
        
        $http.delete(`http://localhost:3000/compras/${compra.id}`,compra).success(function (data) {
			$scope.compras = data;
			console.log($scope.compras);	
			console.log("sucesso na exclusão");
			});
        $scope.compras.splice($scope.compras.indexOf($scope.compraSelecionada), 1);
    };

    listarCompras();
    listarPessoas();
});