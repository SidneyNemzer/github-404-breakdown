const path = require('path')
const fse = require('fs-extra')
const OnBuildPlugin = require('on-build-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const resolve = relativePath =>
  path.resolve(__dirname, relativePath)

module.exports = (env, argv) => {
  return {
    entry: {
      'content-script': resolve('./src/content-script.js')
    },
    output: {
      path: resolve('./build'),
      filename: '[name].js'
    },

    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            {
              test: /\.js$/,
              loader: 'babel-loader',
              options: {
                presets: [ 'env' ]
              }
            },
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: [ require('postcss-prefixer')({ prefix: 'g4b-' }) ]
                  }
                }
              ]
            }
          ]
        }
      ]
    },

    plugins: [
      new OnBuildPlugin(() => {
        const { name, description, version } = require('./package.json')
        const manifest = Object.assign(
          require('./src/manifest.json'),
          { name, description, version }
        )
        fse.outputFileSync(
          resolve('./build/manifest.json'),
          JSON.stringify(manifest, null, 2)
        )
      }),
      new CleanWebpackPlugin(
        [ 'build/**/*' ],
        { root: resolve('.') }
      )
    ]
  }
}
