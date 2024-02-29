module.exports = {
  title: "花果山集训营",
  description: "Just playing around",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  plugins: [
    "@vuepress/back-to-top",
    "@vuepress/nprogress",
    [
      "vuepress-plugin-comment",
      {
        choosen: "gitalk",
        options: {
          clientID: "1074e2fbd6bd8648a670",
          clientSecret: "249ee50e324b93805f4b6511506f289d17c89a2b",
          repo: "willying.github.io",
          owner: "willying",
          admin: ["willying"],
          distractionFreeMode: false,
        },
      },
    ],
  ],
  themeConfig: {
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
        text: "Vue",
        link: "/vue/",
        items: [
          { text: "Vue2", link: "/vue/vue2/" },
          { text: "Vue3", link: "/vue/vue3/" },
        ],
      },
      { text: "React", link: "/react/" },
      { text: "Node", link: "/node/" },
      { text: "Webpack", link: "/webpack/" },
      { text: "CI/CD", link: "/cicd/" },
    ],
  },
  base: "/",
};
