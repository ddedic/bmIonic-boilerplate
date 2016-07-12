'use strict';

/**
 * @ngdoc service
 * @name bmIonic.common.services:Filters
 * @description
 * # Filters
 */
angular.module('bmIonic.common')
.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        return input.split(splitChar)[splitIndex];
    }
})

.filter('comma2decimal', [
    function() {
        return function(input) {
            var ret=(input)?input.toString().replace(".",","):null;
            if(ret){
                var decArr=ret.split(",");
                if(decArr.length>1){
                    var dec=decArr[1].length;
                    if(dec===1){ret+="0";}
                }
            }
            return ret;
        };
    }
])

.filter('range', function () {
    return function (input, from, to) {
        to = parseInt(to, 10);
        from = parseInt(from, 10);
        for (var i = from; i < to; i++) {
            input.push(i);
        }
        return input;
    }
});