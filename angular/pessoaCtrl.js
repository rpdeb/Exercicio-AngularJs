angular.module("crud", []);
angular.module("crud").controller("controller", function ($scope, $http) {

    $scope.novaPessoa = {};
    $scope.pessoaSelecionado = {};
    $scope.pessoas = [];

    var listarPessoas = function () {
        $http.get("http://localhost:3000/pessoas").success(function (data) {
            console.log(data, "oii");
            $scope.pessoas = data;
        });
    };

    $scope.salvar = function () {
        $scope.pessoas.push($scope.novaPessoa);
        var pessoa = $scope.novaPessoa;
        $http.post("http://localhost:3000/pessoas", pessoa).success(function (data) {
		console.log("realizou o post - pessoa com id", data.id);	
        listarPessoas();
		});
        //$scope.novaPessoa = {};
    };

    $scope.selecionaPessoa = function (pessoa) {
        $scope.pessoaSelecionado = pessoa;
    };

    $scope.alterarPessoa = function () {
        var pessoa = $scope.pessoaSelecionado;

        $http.put(`http://localhost:3000/pessoas/${pessoa.id}`,pessoa).success(function (data) {
			$scope.pessoas = data;
			console.log($scope.pessoas);	
			console.log("sucesso na alteração");
			});
        listarPessoas();
    };

    $scope.excluirPessoa = function () {
        var pessoa = $scope.pessoaSelecionado;
        
        $http.delete(`http://localhost:3000/pessoas/${pessoa.id}`,pessoa).success(function (data) {
			$scope.pessoas = data;
			console.log($scope.pessoas);	
			console.log("sucesso na exclusão");
			});
        $scope.pessoas.splice($scope.pessoas.indexOf($scope.pessoaSelecionado), 1);
    };

    listarPessoas();
});