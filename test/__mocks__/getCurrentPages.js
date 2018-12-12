var pages = [{
    route: 'path/to/page1',
    options: {
        a: 1
    },
    _onNavigateBack: function() {
        return 1;
    }
}, {
    route: 'path/to/page2',
    options: {
        a: 2
    },
    _onNavigateBack: function() {
        return 2;
    }
}];

global.getCurrentPages = function() {
    return pages;
};