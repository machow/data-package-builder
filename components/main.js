app = angular.module('datapackage', []);

app.controller('FormController', ['$scope', function($scope){
    $scope.options = [
        {
            name: 'license',
            type: 'list',
            priority: 1,
            help: 'will be replaced with directive',
            plural: true
        },
        {
            name: 'title',
            priority: 1,
            help: 'DIRECTIVE ME',
        },
        {
            name: 'description',
            type: 'textarea',
            priority: 1,
        },
        {
            name: 'homepage',
            priority: 1,
        },
        {
            name: 'keywords',
            type: 'list',
            priority: 1,
            plural: true
        },
        {
            name: 'sources',
            type: 'fields',
            priority: 1,
            fields: ['name', 'email', 'web'],
            plural: true
        },
        {
            name: 'maintainers',
            type: 'fields',
            priority: 2,
            fields: ['name', 'email', 'web']
        },
        {
            name: 'contributers',
            type: 'fields',
            priority: 2,
            fields: ['name', 'email', 'web']
        },
        {
            name: 'publisher',
            type: 'fields',
            priority: 2,
            fields: ['name', 'email', 'web']
        },
    ];
    options = $scope.options;

    $scope.focus = ''

    $scope.deleteInput = function(option){
        if (!option.type || option.type == 'textarea') delete option['entry'];
        else if (option.type == 'many') option['entry'] = [];
        option['active'] = false;
    };

    $scope.selectInput = function(option){
        if ($scope.focus == option.name) option.active = true;
        else {
            $scope.focus = option.name;
            if (option.plural && !option.entry) {
                $scope.appendEntry(option)
            }
            else if (option.fields && !option.entry) {
                // initialize singular fields entry
                option.entry = {};
                //consolidate
                var fields = option.fields;
                for (var ii = 0; ii < fields.length; ii++) {
                    option.entry[fields[ii]] = '';
                }
            }
        }
    };
    $scope.appendEntry = function(option){
        console.log('appending');
        if (option.plural) {
            if (option.type == 'fields') {
                if (!option.entry) option.entry = [];
                var new_entry = {};
                // consolidate
                var fields = option.fields;
                for (var ii = 0; ii < fields.length; ii++) {
                    new_entry[fields[ii]] = '';
                }
                option.entry.push(new_entry);
            }
        }
            else {
                console.log(option.entry);
                if (!option.entry) option.entry = [];
                option.entry.push('');
            }
    };

    $scope.removeEntry = function(entry, ii){
        console.log(ii);
        console.log(entry);
        if (ii === undefined && entry.length > 1) entry.pop()
        else entry.splice(ii, 1);
    };

}])
