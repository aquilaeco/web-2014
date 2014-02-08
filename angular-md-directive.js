app.directive('markdown', ['$compile', '$http', '$templateCache',
    function($compile, $http, $templateCache) {
        return {
            restrict: 'AE',
            replace: true,
            transclude: false,
            compile: function(elem, attr) {
                templateLoader = $http.get(attr.src, {
                    cache: $templateCache
                })
                    .success(function(md) {
                        elem.html(marked(md));
                    })
                    .error(function(md) {
                        errStr = 'An error occurred processing markdown file <a target="_blank" href="' + attr.src + '">' + attr.src + '</a>: ' + md;
                        console.log(errStr);
                        elem.html(errStr);
                    });
            }
        };
    }
]);
