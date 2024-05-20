// 此处不要导入 @/i18n 使用 i18n.global ，因为我们在 router 中 layout 不是按需加载，所以会在 Guide 会在 I18n 初始化完成之前被直接调用。导致 i18n 为 undefined
const getSteps = (i18n: any) => {
  return [
    {
      // element 为需要高亮的元素
      element: '#guide-start',
      //  popover 为弹出框的内容
      popover: {
        title: i18n.t('msg.guide.guideTitle'),
        description: i18n.t('msg.guide.guideDesc')
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: i18n.t('msg.guide.searchTitle'),
        description: i18n.t('msg.guide.searchDesc')
      }
    },
    {
      element: '#guide-full',
      popover: {
        title: i18n.t('msg.guide.fullTitle'),
        description: i18n.t('msg.guide.fullDesc')
      }
    },
    {
      element: '#guide-theme',
      popover: {
        title: i18n.t('msg.guide.themeTitle'),
        description: i18n.t('msg.guide.themeDesc')
      }
    },
    {
      element: '#guide-lang',
      popover: {
        title: i18n.t('msg.guide.langTitle'),
        description: i18n.t('msg.guide.langDesc')
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: i18n.t('msg.guide.hamburgerTitle'),
        description: i18n.t('msg.guide.hamburgerDesc')
      }
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: i18n.t('msg.guide.breadcrumbTitle'),
        description: i18n.t('msg.guide.breadcrumbDesc')
      }
    },

    {
      element: '#guide-tags',
      popover: {
        title: i18n.t('msg.guide.tagTitle'),
        description: i18n.t('msg.guide.tagDesc')
      }
    },
    {
      element: '#guide-sidebar',
      popover: {
        title: i18n.t('msg.guide.sidebarTitle'),
        description: i18n.t('msg.guide.sidebarDesc')
      }
    },
    {
      popover: {
        title: i18n.t('msg.guide.endingTitle'),
        description: i18n.t('msg.guide.endingDesc')
      }
    }
  ]
}
export default getSteps
