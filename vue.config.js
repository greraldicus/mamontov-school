const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compiler = require('@vue/compiler-dom');
        options.compilerOptions = {
          isCustomElement: (tag) => tag.startsWith('ion-')
        };
        return options;
      });
  }
})
