const path =  require('path');

const SRC_PATH=path.resolve(__dirname,'src');
const DIST_PATH=path.resolve(__dirname,'dist');
config={
  entry:SRC_PATH+"/index.js",
  output:{
    path:DIST_PATH+"/app",
    filename:"bundle.js",
    publicPath:"/app/"

  },
  module:{
    loaders:[
      {
        test:/\.js?/,
        include:SRC_PATH,
        loader:'babel-loader',
        query:{
          presets:['es2015','react','stage-2']
        }
      },
      {
        test:/\.scss$/,
        include:SRC_PATH,
        loaders:[require.resolve('style-loader'), require.resolve('css-loader'), require.resolve('sass-loader')]
      },
      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      // This loader don't uses a "test" so it will catch all modules
      // that fall through the other loaders.
      {
        // Exclude `js` files to keep "css" loader working as it injects
        // it's runtime that would otherwise processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/\.js$/, /\.html$/, /\.json$/,/\.sass$/,/\.scss$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      }
    ]
  }
}

module.exports = config;
