const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = env => {
  return {
    entry: {
      server: './server/index.js'
    },
    target:'node',
    externals: [nodeExternals()],
    output: {
      publicPath: env ? env.publicPath : '',
      path: `${__dirname}/.next/dist/server`,
      filename: '[name].js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        loaders: [{
          loader: 'babel-loader',
          query: {
            presets: [['es2015', { modules: false }], 'stage-0']
          }
        }],
        exclude: [/node_modules/]
      }]
    },

    plugins: [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    //   new webpack.optimize.UglifyJsPlugin({
    //     compress: { warnings: false }, output: { comments: false }
    //   })
    ]
  };
};