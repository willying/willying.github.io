module.exports = {
  title: '花果山集训营',
  description: 'Just playing around',
  plugins: ['@vuepress/back-to-top','@vuepress/nprogress'],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Javascript', link: '/javascript/', items: [
        { text: 'ES6', link: '/javascript/es6/', items: [
          { text: 'Interator', link: '/javascript/es6/interator/' },
          { text: 'Generator', link: '/javascript/es6/generator/' }
        ]}
      ] },
      { text: 'Vue', link: '/vue/' },
      { text: 'React', link: '/react/' },
    ]
  },
}