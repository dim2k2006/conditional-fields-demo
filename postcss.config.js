const browsers = {
    "android": 4,
    "chrome": 42,
    "firefox": 37,
    "ie": 9,
    "ios": 7,
    "opera": 28,
    "safari": 7
};

module.exports = {
    plugins: {
        'postcss-import': {},
        'autoprefixer': {
            browsers: [
                'Android >= ' + browsers.android,
                'Chrome >= ' + browsers.chrome,
                'Firefox >= ' + browsers.firefox,
                'Explorer >= ' + browsers.ie,
                'iOS >= ' + browsers.ios,
                'Opera >= ' + browsers.opera,
                'Safari >= ' + browsers.safari
            ]
        },
        'cssnano': {
            discardUnused: false,
            zindex: false
        },
    },
};
