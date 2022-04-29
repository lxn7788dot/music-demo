module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 配置vant按需加载
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
