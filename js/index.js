var reminder=angular.module('reminder',['ngAnimate']);
reminder.controller('mainCtrl',['$scope','$timeout',function($scope,$timeout){
  /*  $scope.database=[
        {
            id:1000,
            listName:'新列表1',
            color:'green',
            todos:[
                {id:1,name:'故事会',isDone:false},
                {id:2,name:'小说',isDone:true},
               /!* {id:1,name:'历史',isDone:true},
                {id:2,name:'地理',isDone:false},*!/

            ]

        },
        {
            id:1001,
            listName:'新列表2',
            color:'yellow',
            todos:[
                {id:1,name:'面条',isDone:false},
                {id:2,name:'土豆丝',isDone:true},

            ]

        }
    ]*/
    var id;
    if(localStorage.list1){
        $scope.database = JSON.parse(localStorage.list1);
        id=$scope.database[$scope.database.length-1].id+1;
        $scope.currentlist=$scope.database[0];
    }else{
        $scope.database=[];
        id=0;
    }
    $scope.saveData=function(){
        localStorage.list1=JSON.stringify($scope.database);

    }
    $scope.colors=[
        'green',
        'yellow',
        'blue',
        'orange',
        'purple',
        'brown',
        'red'
    ]
    $scope.add=function(){
         var len=$scope.database.length;
         var list1={
             id:id++,
             listName:'新列表'+(len+1),
             color:$scope.colors[len%7],
             todos:[]

         }
        $scope.database.push(list1);
        // $scope.currentlist=$scope.database[0];
        $scope.currentlist = list1;
        $scope.saveData();
    }

    $scope.setcurrent=function (i) {
        $scope.currentlist=$scope.database[i];
    }
    $scope.cancel=function(e){
        e.stopPropagation();
    }
    $scope.deletelist=function(id){
        var arr=[];
        for(var i=0;i<$scope.database.length;i++){
            if($scope.database[i].id!==id){
                arr.push($scope.database[i]);
            }
        }
        $scope.database=arr;
        $scope.currentlist=$scope.database[0];
        $scope.saveData();
    }
    $scope.addtodo=function(){
        var newtodo={
            name:'',
            date:new Date().getTime(),
            isDone:false
        };
        $scope.currentlist.todos.push(newtodo);
        $scope.currenttodo=newtodo;
        // document.querySelector();
        $scope.saveData();

    }
    $scope.setcurrenttodo=function(v){
        $scope.currenttodo=v;
    }
    $scope.count=function(){
        var num=0;
        $scope.currentlist.todos.forEach(function(data){
            if(data.isDone){
                num+=1;
            }
        })
        return num;
    }
    $scope.retract=false;
    $scope.toggleshowdone=function(){
        $scope.retract=$scope.retract?false:true;
    }
    $scope.deletetodo = function() {
        $scope.currentlist.todos = $scope.currentlist.todos.filter(function (data) {
            return data != $scope.currenttodo;
        })
    }
    $scope.focus=function(e){
        $timeout(function(){
            $(e.currentTarget).find('input').trigger('focus');
        },0)
    }

}
])