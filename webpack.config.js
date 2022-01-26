const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      //处理ts文件
      {
        //规则生效的文件
        test: /\.ts$/,
        use: [
          //配置babel
          {
            //指定loader
            loader:"babel-loader",
            //设置babel
            options:{
              presets:[
                [
                  //指定环境的插件
                  "@babel/preset-env",
                  //配置信息
                  {
                    //要兼容的目标浏览器
                    targets:{
                      "chrome":'88'
                    },
                    //指定corejs 的版本
                    "corejs":"3",
                    //使用corejs的方式“usage”，按需加载
                    "useBuiltIns":'usage'
                  }
                ]
              ]
            }
          }
          ,'ts-loader'
        ],
        exclude: /node-modules/
      },
      //处理样式文件
      {
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          // 引入postcss
          {
            loader:'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[
                  [
                    "postcss-preset-env",
                    {
                      browsers:'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './source/index.html'
      }
    ),
    new CleanWebpackPlugin()
  ],
  //设置引用模块
  resolve:{
    extensions:['.ts','.js']
  },
  mode:'development'
}