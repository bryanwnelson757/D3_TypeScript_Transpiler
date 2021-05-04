import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'terser-webpack-plugin';
import MiniCssExtract from 'mini-css-extract-plugin'; 

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
  mode: "production",
  target: "web",
  entry: [
    "./src/index.ts"
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: "./dist"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: "viz",
    libraryTarget: "var",
    publicPath: "/"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ sourceMap: true })
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS), 
    new MiniCssExtract({filename: 'styles.css'})
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtract.loader,
          'css-loader',
          'less-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
