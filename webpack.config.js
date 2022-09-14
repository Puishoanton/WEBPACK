const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development' // потрібно щоб понять в режимі розробки чи виробництва передаєм в плагін міні цсс
const isProd = !isDev

const optimizer = () => {
  const config = {
    splitChunks: {
      chunks: 'all', // данна оптімізація дозволяє винести спільний код (в даному випадку бібліотека джейквері) в один файл і підключать її в різні точки входу для економії памяті
    },
    runtimeChunk: 'single', // юзуаєм що б працювало автообновлення дев серверу
  }

  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()]
  }

  return config
}
const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)
const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        //hmr: isDev, хот модуль реплейсмент юзається тільки в режимі розробки потрібен для змінення чогось без перезагрузки сторінки
        // reloadAll: true,},
      },
    },
    'css-loader',
  ] //дозволяє вебпаку розуміти що ми підключаємо цсс. Порядок запису обов'язковий. Вебпак читає з права на ліво
  if (extra) {
    loaders.push(extra)
  }
  return loaders
}
const babelUse = preset => {
  const opt = {
    presets: ['@babel/preset-env'], // цей пресет юзається для адаптиву під всі браузери (но це не точно)
  }
  if (preset) opt.presets.push(preset)
  return opt
}
const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      template: './index.html',
    }), // для автоматичного створення штмл файлу і підключення до нього файли джс з динамічним хешом
    new CleanWebpackPlugin(),
    new CopyPlugin({
      // даний плагін автоматично копіює всі статичні файли (в даному прикладі фавікон) в папку діст
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('.css'),
    }),
  ]
  if (isProd) {
    
    base.push(new BundleAnalyzerPlugin())
    console.log(base)
  }
  return base
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.jsx'], // точка входу  (з приводу бейбл поліфіл. незнаю чого, але і без нього працює весь асинхронний код))))
    analytic: './analytics.ts',
  },
  output: {
    filename: filename('.js'),
    path: path.resolve(__dirname, 'dist'),
  }, // результат роботи вебпаку
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  optimization: optimizer(),
  devServer: {
    port: 7777,
    hot: isDev,
    static: './dist',
  },
  // devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        test: /\.csv$/,
        use: ['csv-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelUse(),
        },
      },
      {
        test: /\.m?ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelUse('@babel/preset-typescript'),
        },
      },
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelUse('@babel/preset-react'),
        },
      },
    ],
  },
}
