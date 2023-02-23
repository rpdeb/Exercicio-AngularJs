angular.module("crudCompra", []);
angular.module("crudCompra").controller("compraController", function ($scope, $http) {

    $scope.novaCompra = {};
    $scope.compraSelecionada = {};
    $scope.compras = [];
    $scope.pessoas = [];
    $scope.itens = [];
    $scope.novaCompra.valorTotal = 0;
    $scope.novaCompra.codigo = Math.floor(Math.random() * 1000);

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

    var listarItens = function () {
        $http.get("http://localhost:3000/itensdecompra").success(function (data) {
            console.log(data, "itens");
            $scope.itens = data;
        });
    };

    // $scope.criarCompra = function (valortotal,codigo,nome) {
    //     var compra = {
    //         codigo: Math.floor(Math.random() * 10000),
    //         valortotal: valortotal,
    //         pessoa: {
    //             codigo: codigo,
    //             nome: nome
    //         }
    //     };
    //     $scope.salvar(compra);
    // }

    $scope.salvar = function (compra) {
        $scope.compras.push($scope.novaCompra);
        var compra = $scope.novaCompra;
        $http.post("http://localhost:3000/compras", compra).success(function (data) {
            console.log("realizou o post - pessoa com id", data.id);
            listarCompras();
            $scope.calculaValorTotal();
        });
        //$scope.novaCompra = {};
    };

    // $scope.selecionaPessoa = function (pessoa) {
    //     $scope.pessoaSelecionada = pessoa;
    // };

    $scope.selecionaCompra = function (compra) {
        $scope.compraSelecionada = compra;
    };

    // $scope.alterarCompra = function () {
    //     var compra = $scope.compraSelecionada;

    //     $http.put(`http://localhost:3000/compras/${compra.id}`,compra).success(function (data) {
    // 		$scope.compras = data;
    // 		console.log($scope.compras);	
    // 		console.log("sucesso na alteração");
    // 		});
    //     listarCompras();
    // };

    $scope.excluirCompra = function () {
        var compra = $scope.compraSelecionada;
        $scope.compras.splice($scope.compras.indexOf($scope.compraSelecionada), 1);
        $http.delete(`http://localhost:3000/compras/${compra.id}`, compra).success(function (data) {
            $scope.compras = data;
            console.log($scope.compras);
            console.log("sucesso na exclusão");
            listarCompras();
        });
    };

    // $scope.insereItem = function (itemSelecionado){
    //     $scope.itensSelecionados.push(itemSelecionado);
    // }

    $scope.calculaValorTotal = function(){
       var item = $scope.itemSelecionado.valor;
       $scope.novaCompra.valorTotal = $scope.novaCompra.quantidade * item;
    }

    listarCompras();
    listarPessoas();
    listarItens();
});