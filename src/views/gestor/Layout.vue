<template>
  <div class="shell">
    <aside class="sidebar" style="width: 260px">
      <div class="sidebar-brand" style="height: 105px">
        <h2 style="font-size: 20px">ObservaAção</h2>
        <p style="font-size: 13px">Sistema de Solicitações de Serviços</p>
      </div>

      <nav>
        <router-link to="/gestor/dashboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Dashboard
        </router-link>
        <router-link to="/gestor/solicitacoes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
          Solicitações
        </router-link>
        <router-link to="/gestor/atualizar-status">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          Atualizar Status
        </router-link>
        <router-link to="/gestor/historico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Histórico
        </router-link>
      </nav>

      <nav>
        <router-link to="/login">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sair
        </router-link>
      </nav>
    </aside>

    <div class="main-wrap" style="margin-left: 320px">
      <main class="page-content">
        <router-view />
      </main>
    </div>
  </div>
</template>
