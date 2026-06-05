<template>
  <div>
    <div class="page-header">
      <h1>Acompanhar Solicitação</h1>
      <p>Veja o andamento da sua solicitação</p>
    </div>

    <div class="busca-wrap">
      <div class="card busca-card mb-3">
        <h2 class="busca-titulo">Número de protocolo</h2>
        <p class="busca-texto">O número de protocolo foi enviado para você no momento do registro da solicitação.</p>
        <div class="busca-row">
          <input
            v-model="protocolo"
            type="text"
            class="form-control"
            placeholder="Digite o protocolo..."
            @keyup.enter="buscar"
          />
          <button class="btn btn-primary" @click="buscar" :disabled="carregando">Buscar</button>
        </div>
        <div v-if="erro" class="alerta-erro">{{ erro }}</div>
      </div>
    </div>

    <div v-if="sol">
      <div class="card mb-3">
        <h3 class="sec-title">Dados da Solicitação</h3>
        <div class="dados-grid">
          <div class="dado-item">
            <span class="dado-key">Protocolo</span><span class="dado-val">{{ sol.protocolo }}</span>
          </div>
          <div class="dado-item">
            <span class="dado-key">Data de Cadastro</span
            ><span class="dado-val">{{ formatarData(sol.dataCriacao) }}</span>
          </div>
          <div class="dado-item">
            <span class="dado-key">Descrição</span><span class="dado-val">{{ sol.descricao }}</span>
          </div>
          <div class="dado-item">
            <span class="dado-key">Localização</span><span class="dado-val">{{ sol.localizacao }}</span>
          </div>
          <div class="dado-item">
            <span class="dado-key">Prioridade</span><span class="dado-val">{{ sol.prioridade }}</span>
          </div>
          <div class="dado-item">
            <span class="dado-key">Categoria</span><span class="dado-val">{{ sol.categoria }}</span>
          </div>
          <div class="dado-item">
            <span class="dado-key">Status Atual</span>
            <span :class="badgeClass(sol.status)" class="badge">{{ labelStatus(sol.status) }}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="sec-title mb-2">Andamento</h3>
        <div class="steps-track">
          <template v-for="(step, i) in steps" :key="step.key">
            <div class="step-item">
              <div class="step-circle" :class="stepClass(step.key)">
                <span v-if="stepClass(step.key) === 'done'">✓</span>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <div class="step-label" :class="stepClass(step.key)">{{ step.label }}</div>
              <div class="step-sub" v-if="stepData(step.key)">{{ stepData(step.key) }}</div>
            </div>
            <div v-if="i < steps.length - 1" class="step-line" :class="{ done: stepIndex > i }"></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../../services/api.js";

const protocolo = ref("");
const sol = ref(null);
const carregando = ref(false);
const erro = ref("");

const steps = [
  { key: "ABERTO", label: "Recebido" },
  { key: "TRIAGEM", label: "Em análise" },
  { key: "EM_EXECUCAO", label: "Em execução" },
  { key: "RESOLVIDO", label: "Concluída" },
];
const ordem = ["ABERTO", "TRIAGEM", "EM_EXECUCAO", "RESOLVIDO", "ENCERRADO"];

const stepIndex = ref(0);

async function buscar() {
  if (!protocolo.value.trim()) return;
  erro.value = "";
  sol.value = null;
  carregando.value = true;
  try {
    const res = await api.buscarPorProtocolo(protocolo.value.trim().toUpperCase());
    sol.value = res.data;
    stepIndex.value = ordem.indexOf(sol.value.status);
  } catch {
    erro.value = "Protocolo não encontrado.";
  } finally {
    carregando.value = false;
  }
}

function stepClass(key) {
  const idx = ordem.indexOf(key);
  if (idx < stepIndex.value) return "done";
  if (idx === stepIndex.value) return "active";
  return "pending";
}

function stepData(key) {
  if (!sol.value?.historico) return null;
  const h = sol.value.historico.find((h) => h.status === key);
  return h ? formatarData(h.data) : null;
}

function formatarData(dt) {
  if (!dt) return "-";
  return new Date(dt).toLocaleDateString("pt-BR");
}

function labelStatus(s) {
  const map = {
    ABERTO: "Recebido",
    TRIAGEM: "Em análise",
    EM_EXECUCAO: "Em execução",
    RESOLVIDO: "Concluída",
    ENCERRADO: "Encerrada",
  };
  return map[s] || s;
}

function badgeClass(s) {
  const map = {
    ABERTO: "badge-aberto",
    TRIAGEM: "badge-triagem",
    EM_EXECUCAO: "badge-execucao",
    RESOLVIDO: "badge-resolvido",
    ENCERRADO: "badge-encerrado",
  };
  return map[s] || "";
}
</script>

<style scoped>
.busca-titulo {
  font-size: 20px;
  text-align: center;
  margin-bottom: 12px;
  margin-top: 12px;
}
.busca-texto {
  text-align: center;
  margin-bottom: 18px;
}
.busca-row {
  display: flex;
  gap: 10px;
}
.busca-row .form-control {
  flex: 1;
}
.alerta-erro {
  color: #dc2626;
}
.mb-3 {
  margin-bottom: 18px;
}
.dados-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.dado-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.dado-key {
  font-size: 14px;
  font-weight: 700;
  color: #656970;
}
.dado-val {
  font-size: 14px;
  color: #1e2329;
}
.mb-2 {
  margin-bottom: 14px;
}
.step-sub {
  font-size: 12px;
  color: #848b96;
  margin-top: 2px;
  text-align: center;
}
</style>
