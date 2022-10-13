const {resolve}= require('path');
const TerserPlugin = require('terser-webpack-plugin');

const base = process.cwd();

module.exports = {
  target: ['web', 'es5'],
  cache: true,
  mode: 'production',
  output: {
    filename: 'letter.min.js',
    libraryTarget: 'window',
    sourceMapFilename: 'letter.js.map'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      resolve('src'),
      'node_modules'
    ]
  },
  optimization: {
    minimize:true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          beautify: false,
          comments: /# sourceMappingURL/i,
        },
        compress: true,
        mangle: true
      },
      extractComments: false
    })],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: resolve(base, 'node_modules', '.cache', 'babel-ts'),
            presets: ['@babel/preset-env'],
            minified: true,
            sourceMap: false,
            compact: true,
          }
        },
        {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.webpack.json'
          }
        }
      ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: resolve(base, 'node_modules', '.cache', 'babel'),
            presets: ['@babel/preset-env'],
            minified: true,
            sourceMap: false,
            compact: true,
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
}/*

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: resolve(__dirname, 'src', 'index.ts'),
  output: {
    filename: 'letter.min.js',
   path: resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize:true,
    minimizer: [new TerserPlugin({
      cache: resolve(__dirname, 'node_modules', '.cache', 'terser-minify'),
      terserOptions: {
        output: {
          beautify: true,
          comments: /# sourceMappingURL/i,
        },
        compress: false,
        mangle: false
      },
      extractComments: false
    })],
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: 'tsconfig.webpack.json'
        }
      }
    ]
  }
};
*/
