module.exports = {
  title: "花果山集训营",
  description: "Just playing around",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  plugins: [
    "@vuepress/back-to-top",
    "@vuepress/nprogress",
  ],
  themeConfig: {
    logo: "/logo.jpeg",
    displayAllHeaders: true, // 默认值：false
    lastUpdated: 'Last Updated',
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Javascript",
        link: "/javascript/",
        items: [
          {
            text: "ES6",
            link: "/javascript/es6/",
            items: [
              { text: "Interator", link: "/javascript/es6/interator/" },
              { text: "Generator", link: "/javascript/es6/generator/" },
              { text: "Async", link: "/javascript/es6/async/" },
            ],
          },
        ],
      },
      {
        'text': '浏览器原理及性能优化',
        link: '/browser/',
      },
      {
        text: "Vue",
        link: "/vue/",
        items: [
          { text: "Vue2", link: "/vue/vue2/" },
          { text: "Vue3", link: "/vue/vue3/" },
        ],
      },
      {
        text: 'TypeScript',
        link: '/typescript/',
      },
      { text: "React", link: "/react/" },
      { text: "Node", link: "/node/" },
      { text: "Webpack", link: "/前端工程化/webpack/" },
      { text: "CI/CD", link: "/cicd/" },
      {
        text: 'Java',
        link: '/java/'
      }
    ],
    sidebar: {
      '/browser/': [
        '',
        'property',
      ],
      '/typescript/': [
        '',
        'tsAdvanced',
        'typeDeclarationFile'
      ],
      '/node/': [
        '',
        'NODE_FS',
        'NODE_PATH',
        'NODE_HTTP'
      ],
      '/前端工程化/webpack/': [
        ''
      ]
    }
  },
  base: "/",
};
