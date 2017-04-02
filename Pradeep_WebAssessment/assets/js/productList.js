var prodList = angular.module('productlist', []);

prodList.controller('listcontroller', function($scope, getProducts) {
  getProducts.getProductList().then(function(response) {
    $scope.data = response.data;
    $scope.productList = $scope.data.productList;
  });

  $scope.hoverIn = function(data){
    $scope.hoveredObj = data;
  };
});

prodList.factory('getProducts', function($http) {
  this.getProductList = function() {
    return $http.get('./getData')
      .success(function(response) {
        console.log(response);
        return {
          data: response
        };
      });
  };
  return {
    getProductList: this.getProductList
  };
});

prodList.directive('product', function($sce) {
  return {
    restrict: 'E',
    scope: {
      prodInfo: '=info'
    },
    link: function(scope, ele, attr) {
    },
    template: ['<div class="item">',
             '<div class="item-img desktop"><img src="{{prodInfo.imageUrls.sm}}" class="sm" alt="" /></div>',
             '<div class="item-img mobile"><img src="{{prodInfo.imageUrls.md}}" class="sm" alt="" /></div>',
             '<div class="item-desc"><p class="custom-bold">{{prodInfo.description | cut:true:70}}</p></div>',
             '<div class="item-price">${{prodInfo.pricing.price.selling}}</div>',
             '<div class="view-more"><button type="button" name="View More">View More</button></div></div></div>'
           ].join('')
  };
});
prodList.directive('productDetail', function($sce) {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    link: function(scope, ele, attr) {
      scope.showPriceAlert = function(price) {
          alert("The Price of the Product is $"+price);
      };
    },
    template: ['<div class="item clearfix">',
             '<div class="item-img desktop"><img src="{{info.imageUrls.md}}" alt="" class="md" /></div>',
             '<div class="item-img mobile"><img src="{{info.imageUrls.xl}}" alt="" class="md" /></div>',
             '<div class="item-desc"><p class="custom-head">{{info.description}}</p><ul><li ng-repeat="list in info.marketingBullets | limitTo : 5" ng-bind-html="list | unsafe"></li></ul></div>',
             '<div class="price-cart"><p class="custom-price">${{info.pricing.price.selling}}</p><button type="button" name="ADD TO CART" ng-click="showPriceAlert(info.pricing.price.selling)">Add to Cart</button></div></div>'
           ].join('')
  };
});
prodList.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
prodList.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
