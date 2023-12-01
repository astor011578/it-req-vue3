const setting = {
  title: 'IT Request System',

  //* layout-related *//
  /**
   * @type { boolean } true | false
   * @description whether show the settings left-panel
   */
  showLeftMenu: true,
  
  //* animation-related *//
  /**
   * @type { boolean } true | false
   * @description whether need animation of main area
   */
  mainNeedAnimation: true,
  /**
   * @type { boolean } true | false
   * @description whether need nprogress
   */
  isNeedNprogress: true,

  //* login and permission related *//
  /**
   * @type { boolean } true | false
   * @description whether need login
   */
  isNeedLogin: true,
  /**
   * @type { boolean } true | false
   * @description open permissions that TEST-IT could edit ALL STEPS in his/her own request
   */
  highPermission: true,
  /**
   * @type { string } 'zh' | 'en'
   * @description the default language setting for i18n
   */
  defaultLanguage: 'en',

  //* Others *//
  /**
   * @type { string } 'roles' | 'code'
   */
  permissionMode: 'roles',
  /**
   * @type { boolean } true | false
   * @description whether  open prod mock
   */
  openProdMock: false,
  /**
   * @type { string | array } 'dev' | ['prod','test','dev'] according to the .env file props of VITE_APP_ENV
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['dev', 'test']
   */
  errorLog: ['prod', 'test'],
  /**
   * table height (100vh-delWindowHeight)
   */
  delWindowHeight: '210px',
  /**
   * setting dev token when  isNeedLogin is setting false
   */
  tmpToken: 'tmp_token',
  /**
   * vite.config.js base config
   * such as './'
   */
  viteBasePath: './'
}

export default setting
