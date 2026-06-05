<template>
  <div>
    <div class="page-header mb-3">
      <h1>Dashboard</h1>
    </div>

    <div class="stats-grid mb-3">
      <div class="stat-card" v-for="stat in stats" :key="stat.label">
        <div class="stat-icon" :style="{ background: stat.bg, color: stat.cor }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-num">{{ stat.valor }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <div class="graficos mb-3">
      <div class="card">
        <h3 class="card-title">Solicitações por Status</h3>
        <div class="donut-wrap">
          <svg viewBox="0 0 120 120" class="donut-svg">
            <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" stroke-width="18" />
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#1a7a4a"
              stroke-width="18"
              :stroke-dasharray="`${pctAberto * 2.827} ${282.7}`"
              :stroke-dashoffset="0"
              transform="rotate(-90 60 60)"
            />
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#d97706"
              stroke-width="18"
              :stroke-dasharray="`${pctTriagem * 2.827} ${282.7}`"
              :stroke-dashoffset="`${-pctAberto * 2.827}`"
              transform="rotate(-90 60 60)"
            />
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#2563eb"
              stroke-width="18"
              :stroke-dasharray="`${pctExecucao * 2.827} ${282.7}`"
              :stroke-dashoffset="`${-(pctAberto + pctTriagem) * 2.827}`"
              transform="rotate(-90 60 60)"
            />
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#22a261"
              stroke-width="18"
              :stroke-dasharray="`${pctResolvido * 2.827} ${282.7}`"
              :stroke-dashoffset="`${-(pctAberto + pctTriagem + pctExecucao) * 2.827}`"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div class="donut-legend">
            <div class="legend-item">
              <span class="dot" style="background: #1a7a4a"></span>Aberto ({{ contadores.ABERTO || 0 }})
            </div>
            <div class="legend-item">
              <span class="dot" style="background: #d97706"></span>Triagem ({{ contadores.TRIAGEM || 0 }})
            </div>
            <div class="legend-item">
              <span class="dot" style="background: #2563eb"></span>Em execução ({{ contadores.EM_EXECUCAO || 0 }})
            </div>
            <div class="legend-item">
              <span class="dot" style="background: #22a261"></span>Resolvido ({{ contadores.RESOLVIDO || 0 }})
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Solicitações por Categoria</h3>
        <div class="bar-list">
          <div class="bar-item" v-for="cat in catStats" :key="cat.nome">
            <div class="bar-label-row">
              <span class="bar-name">{{ cat.nome }}</span>
              <span class="bar-count">{{ cat.count }}</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: barWidth(cat.count) + '%', background: cat.cor }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../../services/api.js";

const todas = ref([]);

onMounted(async () => {
  try {
    const res = await api.listar();
    todas.value = res.data;
  } catch {
    todas.value = [];
  }
});

const contadores = computed(() => {
  const c = {};
  todas.value.forEach((s) => {
    c[s.status] = (c[s.status] || 0) + 1;
  });
  return c;
});

const total = computed(() => todas.value.length || 1);
const pctAberto = computed(() => ((contadores.value.ABERTO || 0) / total.value) * 100);
const pctTriagem = computed(() => ((contadores.value.TRIAGEM || 0) / total.value) * 100);
const pctExecucao = computed(() => ((contadores.value.EM_EXECUCAO || 0) / total.value) * 100);
const pctResolvido = computed(() => ((contadores.value.RESOLVIDO || 0) / total.value) * 100);

const catCores = {
  ILUMINACAO: "#f59e0b",
  BURACO: "#ef4444",
  LIMPEZA: "#22a261",
  SAUDE: "#3b82f6",
  ZELADORIA: "#8b5cf6",
  SEGURANCA: "#ec4899",
};

const catStats = computed(() => {
  const c = {};
  todas.value.forEach((s) => {
    c[s.categoria] = (c[s.categoria] || 0) + 1;
  });
  return Object.entries(c)
    .map(([nome, count]) => ({ nome, count, cor: catCores[nome] || "#9ca3af" }))
    .sort((a, b) => b.count - a.count);
});

const maxCat = computed(() => Math.max(...catStats.value.map((c) => c.count), 1));

function barWidth(count) {
  return (count / maxCat.value) * 100;
}

const stats = computed(() => [
  { label: "Total de Solicitações", valor: todas.value.length, bg: "#eaf6ef", cor: "#1a7a4a" },
  { label: "Em análise", valor: contadores.value.TRIAGEM || 0, bg: "#fef9c3", cor: "#854d0e" },
  { label: "Em execução", valor: contadores.value.EM_EXECUCAO || 0, bg: "#dbeafe", cor: "#1d4ed8" },
  { label: "Concluídas", valor: contadores.value.RESOLVIDO || 0, bg: "#dcfce7", cor: "#166534" },
]);
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.stat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-num {
  font-family: "Sora", sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #1e2329;
  line-height: 1;
}
.stat-label {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}
.mb-3 {
  margin-bottom: 18px;
}
.graficos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.card-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
}
.donut-wrap {
  display: flex;
  align-items: center;
  gap: 20px;
}
.donut-svg {
  width: 110px;
  height: 110px;
  flex-shrink: 0;
}
.donut-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: #4b5563;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.bar-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bar-label-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 12px;
}
.bar-name {
  color: #4b5563;
  font-weight: 500;
}
.bar-count {
  color: #9ca3af;
  font-weight: 600;
}
.bar-track {
  background: #f3f4f6;
  border-radius: 99px;
  height: 8px;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.4s ease;
}
</style>
