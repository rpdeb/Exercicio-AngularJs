angular.module("crud", []);
angular.module("crud").controller("controller", function ($scope, $http) {

    $scope.novoCliente = {};
    $scope.clienteSelecionado = {};
    $scope.clientes = [];

    var listarClientes = function () {
        $http.get("http://localhost:3000/clientes").success(function (data) {
            console.log(data, "oii");
            $scope.clientes = data;
        });
    };

    $scope.salvar = function () {
        $scope.clientes.push($scope.novoCliente);
        var cliente = $scope.novoCliente;
        $http.post("http://localhost:3000/clientes", cliente).success(function (data) {
		console.log("realizou o post - cliente com id", data.id);	
        listarClientes();
		});
        //$scope.novoCliente = {};
    };

    $scope.selecionaCliente = function (cliente) {
        $scope.clienteSelecionado = cliente;
    };

    $scope.alterarCliente = function () {
        var cliente = $scope.clienteSelecionado;

        $http.put(`http://localhost:3000/clientes/${cliente.id}`,cliente).success(function (data) {
			$scope.clientes = data;
			console.log($scope.clientes);	
			console.log("sucesso na alteração");
			});
        listarClientes();
    };

    $scope.excluirCliente = function () {
        var cliente = $scope.clienteSelecionado;
        
        $http.delete(`http://localhost:3000/clientes/${cliente.id}`,cliente).success(function (data) {
			$scope.clientes = data;
			console.log($scope.clientes);	
			console.log("sucesso na exclusão");
			});
        $scope.clientes.splice($scope.clientes.indexOf($scope.clienteSelecionado), 1);
    };

    listarClientes();
});