const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');


// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Webpack plugin that generates our html file and injects our bundles. 
      new HtmlWebpackPlugin({
        title: 'Notes App',
        template: './index.html',
      }),
      // injects the service worker into the HTML
      new InjectManifest({
        swSrc: path.join(__dirname, 'src-sw.js'),
        swDest: 'src-sw.js',
      }),
      // Webpack plugin that generates our manifest file.
      new WebpackPwaManifest({
        name: 'Notes App',
        short_name: 'Notes',
        description: 'An app to take notes',
        background_color: '#01579b',
        theme_color: '#01579b',
        'theme-color': '#01579b',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          }
        }
      ],
      // Adding CSS loaderers
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    }
  };
};
