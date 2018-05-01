const config = {
  entry: {
    main: __dirname + '/client/src/app.js',
    list: __dirname + '/client/src/list.js',
    schedule: __dirname + '/client/src/schedule.js'
  },
  output: {
    filename: '[name]_bundle.js',
    path: __dirname + '/client/public/js'
  },
  mode: 'development'
};

module.exports = config;
