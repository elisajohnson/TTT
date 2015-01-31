var ticTacApp = angular.module('ticTacApp', ["firebase"]);

ticTacApp.controller('ticTacCtrl', function($scope, $firebase){
	// setting up firebase with my board
	var ref = new Firebase ("https://tic-tac-toe-ej.firebaseio.com/board");
	var sync = $firebase(ref);
	$scope.board = sync.$asArray();

	// setting up firebase for the turn 
	var counterRef = new Firebase ("https://tic-tac-toe-ej.firebaseio.com/counter");
	var counterSync = $firebase(counterRef);
	$scope.counter = counterSync.$asArray();
	
	// props to Brooke 
	// this function will add the counter to firebase and reset the board
	$scope.counter.$loaded(function () {
        if ($scope.counter.length === 0) {
            $scope.counter.$add({turnCounter: 0});
        } else {
            $scope.counter[0].turnCounter = 0;
            $scope.counter.$save($scope.counter[0]);
        }
    });


	// builds out the board when it is loaded 
    $scope.board.$loaded(function () {
        if ($scope.board.length === 0) {
        	var player1 = 'x';
            for (var i = 0; i < 9; i++) {
                $scope.board.$add({marker: ''});
            }
		} else {
   			for (var i=0; i<9; i++)
   			$scope.board[i] = '';
   			$scope.board.$save(i);
		}
   	});

    // ng-click and ng-bind are linked to this function 
   	$scope.onClick = function (index){
   		if ($scope.board[index].marker == ""){
   			if ($scope.counter[0].turnCounter % 2 == 0) {
   				$scope.board[index].marker = "0";
   				// saves the marker in firebase
   				$scope.board.$save($scope.board[index]);
   			}
   			else {
   				$scope.board[index].marker = "X";
   				// saved the marker in firebase
   				$scope.board.$save($scope.board[index]);
   			};
   			$scope.counter[0].turnCounter++;
   			checkWin();
   		}

   	}

   	var checkWin = function(){
   		if ($scope.board[0].marker=="X" && $scope.board[1].marker=="X" && $scope.board[2].marker=="X"){
   			alert("X Wins!");
   		}
   	}

    // assigning values to each square
    // $scope.value.$add({value: 8});
    // $scope.value.$add({value: 1});
    // $scope.value.$add({value: 6});
    // $scope.value.$add({value: 3});
    // $scope.value.$add({value: 5});
    // $scope.value.$add({value: 7});
    // $scope.value.$add({value: 4});
    // $scope.value.$add({value: 9});
    // $scope.value.$add({value: 2});

	// setting up firebase for my values
	// var valuesRef = new Firebase ("https://tic-tac-toe-ej.firebaseio.com/values");
 	//    var valueSync = $firebase(valuesRef);
 	//    $scope.values = sync.$asArray();





   	});


