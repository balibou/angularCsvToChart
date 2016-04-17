'use strict';

angular.module('angularCsvToChartApp')
  .controller('MainCtrl', ['$scope', '$parse','$interval', function ($scope, $parse, $interval) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.csv = {
    	content: null,
    	header: true,
    	headerVisible: true,
    	separator: ',',
    	separatorVisible: true,
    	result: null,
    	encoding: 'ISO-8859-1',
    	encodingVisible: true,
    };

    var _lastGoodResult = '';
    var labels = [];
    var values = [];

    $scope.toPrettyJSON = function (json, tabWidth) {
			var objStr = JSON.stringify(json);
			var obj = null;
			try {
				obj = $parse(objStr)({});
			} catch(e){
				// eat $parse error
				return _lastGoodResult;
			}

			var result = JSON.stringify(obj, null, Number(tabWidth));
			_lastGoodResult = result;

      // Formatting labels and values for chart
      labels=[];
      values=[];
      var resultJson = angular.fromJson(result);
      var jsonLoopLabels = angular.forEach(resultJson,function(value,key){
        this.push(value.Month);
      },labels);
      var jsonLoopValues = angular.forEach(resultJson,function(value,key){
        this.push(value.Data);
      },values);
      // End of formatting

			return result;
    };

    // $interval to avoid too many digest cycle bug
    $interval(function(){
      if(labels.length>0 && values.length>0){
        $scope.labels=labels;
        $scope.series = ['Data'];
        $scope.data = [
          values
        ];
      };
    }, 100)

    // Interactivity between chart and table
    // $scope.onClick = function (points, evt) {
    //   console.log(points, evt);
    // };

  }]);
