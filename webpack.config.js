
export const entry = './src/main.js';

export const output = {
  path: path.resolve(__dirname, './dist'),
  publicPath: '/dist/',
  filename: 'build.js'
};

export const module = {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        // vue-loader options go here
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: 'css-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file-loader'
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }
  ]
};

export const resolve = {
  alias: {
    'vue$': 'vue/dist/vue'
  }
};

export const devServer = {
  historyApiFallback: true,
  noInfo: true
};

export const devtool = '#eval-source-map';
