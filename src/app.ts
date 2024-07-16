import '@vaadin/vaadin-lumo-styles/all-imports';
import './css/theme.css';

/* 图表 */
// https://www.chartjs.org/docs/latest/getting-started/integration.html
import { Chart } from 'chart.js/auto';
// https://threejs.org/docs/index.html#manual/en/introduction/Installation
import * as THREE from 'three';

/* 自定义组件 */
import './components/header';
import './components/search';
import './components/nav';
import './components/aside';
import './components/bmenu';
import './components/footer';

/* 自定义视图 */
import './views/homeView';
import './views/newsView';
import './views/forumView';
import './views/studyView';
import './views/funView';
import './views/aboutView';
import './views/dashboardView';

import { Router } from '@vaadin/router';

const app = document.getElementById('app');
const router = new Router(app);
router.setRoutes([
  {
    name: '主页',
    path: '/',
    component: 'home-view',
  },
  {
    name: '新闻',
    path: '/news',
    component: 'news-view',
  },
  {
    name: '论坛',
    path: '/forum',
    component: 'forum-view',
  },
  {
    name: '学习',
    path: '/study',
    component: 'study-view',
  },
  {
    name: '娱乐',
    path: '/fun',
    component: 'fun-view',
  },
  {
    name: '关于',
    path: '/about',
    component: 'about-view',
  },
  {

    name: '控制面板',
    path: '/dashboard',
    component: 'dashboard-view',
  },
]);

// 点击前进/后退
window.addEventListener('popstate', () => {
  router.render({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash
  });
});
