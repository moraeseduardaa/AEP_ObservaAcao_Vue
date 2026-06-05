<template>
  <div class="shell">
    <aside class="sidebar" style="width: 260px">
      <div class="sidebar-brand" style="height: 105px">
        <h2 style="font-size: 20px">ObservaAção</h2>
        <p style="font-size: 13px">Sistema de Solicitações de Serviços</p>
      </div>

      <nav>
        <router-link to="/cidadao/inicio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
          </svg>
          Início
        </router-link>
        <router-link to="/cidadao/nova-solicitacao">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Nova Solicitação
        </router-link>
        <router-link to="/cidadao/acompanhar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Acompanhar Solicitação
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
