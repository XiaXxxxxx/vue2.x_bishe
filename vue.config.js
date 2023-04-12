const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
        .set('@img', resolve('src/assets/images'))
        .set('@assets', resolve('src/assets'))
        .set('@public', resolve('public'))
        .set('@components', resolve('src/components'))
    // 修复HMR
    config.resolve.symlinks(true);
    
    // set svg-sprite-loader
    config.module
        .rule("svg")
        .exclude.add(resolve("src/icons"))
        .end();
    config.module
        .rule("icons")
        .test(/\.svg$/)
        .include.add(resolve("src/icons"))
        .end()
        .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
        .options({
          symbolId: "icon-[name]",
        })
        .end();
    
    // if (IS_PROD) {
    //   /* 添加分析工具 */
    //   //config
    //   //  .plugin('webpack-bundle-analyzer')
    //   //  .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    //   //  .end();
    //   config.plugins.delete('prefetch');
    //   /* 压缩图片 */
    //   config.module
    //       .rule('images')
    //       .use('image-webpack-loader')
    //       .loader('image-webpack-loader')
    //       .options({
    //         mozjpeg: {
    //           progressive: true,
    //           quality: 65,
    //         },
    //         optipng: {
    //           enabled: false,
    //         },
    //         pngquant: {
    //           quality: [0.65, 0.9],
    //           speed: 4,
    //         },
    //         gifsicle: {
    //           interlaced: false,
    //         },
    //         // webp: { quality: 75 }
    //       });
    // } else { }
  }
})
