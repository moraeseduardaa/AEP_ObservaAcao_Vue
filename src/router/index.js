import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'

import CidadaoLayout    from '../views/cidadao/Layout.vue'
import CidadaoInicio    from '../views/cidadao/Inicio.vue'
import NovaSolicitacao  from '../views/cidadao/NovaSolicitacao.vue'
import AcompanharSolicitacao from '../views/cidadao/AcompanharSolicitacao.vue'

import GestorLayout     from '../views/gestor/Layout.vue'
import GestorDashboard  from '../views/gestor/Dashboard.vue'
import GestorSolicitacoes from '../views/gestor/Solicitacoes.vue'
import GestorAtualizarStatus from '../views/gestor/AtualizarStatus.vue'
import GestorHistorico  from '../views/gestor/Historico.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },

  {
    path: '/cidadao',
    component: CidadaoLayout,
    children: [
      { path: '',        redirect: '/cidadao/inicio' },
      { path: 'inicio',  component: CidadaoInicio },
      { path: 'nova-solicitacao', component: NovaSolicitacao },
      { path: 'acompanhar', component: AcompanharSolicitacao }
    ]
  },

  {
    path: '/gestor',
    component: GestorLayout,
    children: [
      { path: '',           redirect: '/gestor/dashboard' },
      { path: 'dashboard',  component: GestorDashboard },
      { path: 'solicitacoes', component: GestorSolicitacoes },
      { path: 'atualizar-status', component: GestorAtualizarStatus },
      { path: 'historico',  component: GestorHistorico }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
