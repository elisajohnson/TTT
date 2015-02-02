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
    $scope.board.$loaded(function buildBoard() {
        if ($scope.board.length === 0) {
          var player1 = 'X';
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
          $scope.board[index].marker = "X";
          // saves the marker in firebase
          $scope.board.$save($scope.board[index]);
          $scope.counter[0].turnCounter++;
          $scope.counter[0].currentPlayer = 'f';
          $scope.counter.$save($scope.counter[0]);
        }
        else {
          $scope.board[index].marker = "f";
          // saved the marker in firebase
          $scope.board.$save($scope.board[index]);
          $scope.counter[0].turnCounter++;
          $scope.counter[0].currentPlayer = 'X';
          $scope.counter.$save($scope.counter[0]);
        };
        checkWin();
      }

    } 


    // Win logic
    var checkWin = function(){
      if ($scope.board[0].marker=="X" && $scope.board[1].marker=="X" && $scope.board[2].marker=="X"){
        alert("Snake Wins!");
        // clears data from firebase after each win
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[0].marker=="f" && $scope.board[1].marker=="f" && $scope.board[2].marker=="f"){
        alert("Unicorn Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[3].marker=="X" && $scope.board[4].marker=="X" && $scope.board[5].marker=="X"){
        alert("Snake Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[3].marker=="f" && $scope.board[4].marker=="f" && $scope.board[5].marker=="f"){
        alert("Unicorn Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[6].marker=="X" && $scope.board[7].marker=="X" && $scope.board[8].marker=="X"){
        alert("Snake Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[6].marker=="f" && $scope.board[7].marker=="f" && $scope.board[8].marker=="f"){
        alert("Unicorn Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[0].marker=="X" && $scope.board[3].marker=="X" && $scope.board[6].marker=="X"){
        alert("Snake Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[0].marker=="f" && $scope.board[3].marker=="f" && $scope.board[6].marker=="f"){
        alert("Unicorn Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[1].marker=="X" && $scope.board[4].marker=="X" && $scope.board[7].marker=="X"){
        alert("Snake Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[1].marker=="f" && $scope.board[4].marker=="f" && $scope.board[7].marker=="f"){
        alert("Unicorn Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[2].marker=="X" && $scope.board[5].marker=="X" && $scope.board[8].marker=="X"){
        alert("Snake Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[2].marker=="f" && $scope.board[5].marker=="f" && $scope.board[8].marker=="f"){
        alert("Unicorn Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[0].marker=="X" && $scope.board[4].marker=="X" && $scope.board[8].marker=="X"){
        alert("Snake Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[0].marker=="f" && $scope.board[4].marker=="f" && $scope.board[8].marker=="f"){
        alert("Unicorn Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[2].marker=="X" && $scope.board[4].marker=="X" && $scope.board[6].marker=="X"){
        alert("Snake Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[2].marker=="f" && $scope.board[4].marker=="f" && $scope.board[6].marker=="f"){
        alert("Unicorn Wins!");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }

      else if ($scope.board[0].marker!='' && $scope.board[1].marker!='' && $scope.board[2].marker!='' && $scope.board[3].marker!='' && $scope.board[4].marker!='' && $scope.board[5].marker!='' && $scope.board[6].marker!='' && $scope.board[7].marker!='' && $scope.board[8].marker!=''){
        alert("Cat's Game");
        ref.remove(checkWin);
        counterRef.remove(checkWin);
      }
    }

      $scope.reset = function(){
      location.reload();
      };

    });




    // ng-click and ng-bind are linked to this function 
     // $scope.onClick = function (index){
     //   if ($scope.board[index].marker == "")

     //  {
     //     if ($scope.counter[0].turnCounter % 2 == 0 &&
     //        $scope.counter[0].currentPlayer == "X"){
     //      // F takes even turns
     //       $scope.board[index].marker = "X";
     //       // saves the marker in firebase
     //       $scope.board.$save($scope.board[index]);
     //      $scope.counter[0].turnCounter++;
     //      $scope.counter[0].currentPlayer = 'f';
     //      $scope.counter.$save($scope.counter[0]);
     //     }

     //    else if ($scope.counter[0].turnCounter % 2 != 0 &&
     //             $scope.counter[0].currentPlayer == "X") {
     //             $scope.board[index].marker = "f";
     //            // saved the marker in firebase
     //             $scope.board.$save($scope.board[index]);
     //             $scope.counter[0].turnCounter++;
     //             $scope.counter[0].currentPlayer = 'X';
     //             $scope.counter.$save($scope.counter[0]);

       // else {
           // $scope.board[index].marker = "X";
       //    // saved the marker in firebase
       //    $scope.board.$save($scope.board[index]);
       //    $scope.counter[0].turnCounter++;
       //    $scope.counter[0].currentPlayer = 'f';
       //    $scope.counter.$save($scope.counter[0]);
         // };
         // $scope.counter[0].turnCounter++;
     //   }
     //  checkWin();

     // } 
