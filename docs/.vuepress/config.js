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
      { text: 'Vue', link: '/vue/' , items: [
        { text: 'Vue2', link: '/vue/vue2/'},
        { text: 'Vue3', link: '/vue/vue3/'}
      ]},
      { text: 'React', link: '/react/' },
      { text: 'Node', link: '/node/' },
      { text: 'Webpack', link: '/webpack/' },
    ]
  },
  base: '/'
}