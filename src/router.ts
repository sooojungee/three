import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/main';
import Example from './views/example';
import BufferGeometry from './views/examples/bufferGeometry';
import BufferGeometryWave from './views/examples/bufferGeometry.wave';
import Shader from './views/examples/shader';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/example',
      name: 'example',
      component: Example,
    },
    {
      path: '/bufferGeometry',
      name: 'bufferGeometry',
      component: BufferGeometry,
    },
    {
      path: '/wave',
      name: 'wave',
      component: BufferGeometryWave,
    },
    {
      path: '/shader',
      name: 'shader',
      component: Shader,
    },
  ],
});
