<template>
  <div>
    <div class="page-header">
      <h1>Atualização de Status</h1>
      <p>Atualize o status e as informações da solicitação</p>
    </div>

    <div class="busca-topo">
      <div class="card busca-card mb-3" style="width: 1045px">
        <h2 class="busca-titulo" style="font-size: 20px; display: flex; justify-content: center; margin-bottom: 20px">
          Informe o protocolo
        </h2>
        <div class="busca-row">
          <input
            v-model="buscarProtocolo"
            type="text"
            class="form-control"
            placeholder="Informe o protocolo"
            @keyup.enter="buscar"
            style="max-width: 900px"
          />
          <button class="btn btn-primary" style="margin-left: 12px" @click="buscar">Buscar</button>
        </div>
      </div>
    </div>

    <div v-if="erro" class="alerta-erro mb-2">{{ erro }}</div>

    <div v-if="sol" class="atualizar-layout">
      <div class="card mb-3">
        <h3 class="titulo">Dados da Solicitação</h3>
        <div class="dados-grid">
          <div class="dado-item">
            <span class="dado-key">Protocolo</span><span class="dado-val">{{ sol.protocolo }}</span>
          </div>
          <div class="dado-item">
            <span class="dado-key">Data</span><span class="dado-val">{{ formatarData(sol.dataCriacao) }}</span>
          </div>
          <div class="dado-item">
            <span class="dado-key">Descrição</span><span class="dado-val">{{ sol.descricao }}</span>
          </div>
          <div class="dado-item">
            <span class="dado-key">Localização</span><span class="dado-val">{{ sol.localizacao }}</span>
          </div>
          <div class="dado-item">
            <span class="dado-key">Categoria</span><span class="dado-val">{{ sol.categoria }}</span>
          </div>
          <div class="dado-item">
            <span class="dado-key">Status atual</span>
            <span :class="badgeClass(sol.status)" class="badge">{{ sol.status }}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="form-group">
          <label class="form-label">Novo Status *</label>
          <select v-model="form.novoStatus" class="form-control">
            <option value="" disabled>Selecione o novo status</option>
            <option v-for="s in proximosStatus" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Responsável *</label>
          <input v-model="form.responsavel" type="text" class="form-control" placeholder="Nome do responsável" />
        </div>

        <div class="form-group">
          <label class="form-label">Observação *</label>
          <textarea
            v-model="form.comentario"
            class="form-control"
            rows="4"
            placeholder="Descreva a atualização."
          ></textarea>
        </div>

        <div v-if="erroForm" class="alerta-erro">{{ erroForm }}</div>

        <div class="acoes-form">
          <button class="btn btn-danger" @click="sol = null">Cancelar</button>
          <button class="btn btn-primary" @click="salvar" :disabled="salvando">
            {{ salvando ? "Salvando..." : "Salvar" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import api from "../../services/api.js";

const buscarProtocolo = ref("");
const sol = ref(null);
const erro = ref("");
const erroForm = ref("");
const salvando = ref(false);

const form = ref({ novoStatus: "", responsavel: "", comentario: "" });

const steps = [
  { key: "ABERTO", label: "Recebida" },
  { key: "TRIAGEM", label: "Em análise" },
  { key: "EM_EXECUCAO", label: "Em execução" },
  { key: "RESOLVIDO", label: "Concluída" },
];
const ordem = ["ABERTO", "TRIAGEM", "EM_EXECUCAO", "RESOLVIDO"];

const stepIdx = computed(() => (sol.value ? ordem.indexOf(sol.value.status) : -1));

const fluxo = {
  ABERTO: ["TRIAGEM"],
  TRIAGEM: ["EM_EXECUCAO"],
  EM_EXECUCAO: ["RESOLVIDO"],
  RESOLVIDO: [],
};
const proximosStatus = computed(() => (sol.value ? fluxo[sol.value.status] || [] : []));

async function buscar() {
  if (!buscarProtocolo.value.trim()) return;
  erro.value = "";
  sol.value = null;
  try {
    const res = await api.buscarPorProtocolo(buscarProtocolo.value.trim().toUpperCase());
    sol.value = res.data;
    form.value = { novoStatus: "", responsavel: "", comentario: "" };
  } catch {
    erro.value = "Protocolo não encontrado";
  }
}

async function salvar() {
  erroForm.value = "";
  if (!form.value.novoStatus || !form.value.responsavel || !form.value.comentario) {
    erroForm.value = "Preencha os campos obrigatórios";
    return;
  }
  salvando.value = true;
  try {
    const res = await api.atualizarStatus(sol.value.protocolo, form.value);
    sol.value = res.data;
    form.value = { novoStatus: "", responsavel: "", comentario: "" };
  } catch (e) {
    erroForm.value =
      "Erro ao atualizar: " + (e.response?.status === 400 ? "mudança de status inválida." : "tente novamente.");
  } finally {
    salvando.value = false;
  }
}

function tlClass(key) {
  const idx = ordem.indexOf(key);
  if (idx < stepIdx.value) return "tl-dot-done";
  if (idx === stepIdx.value) return "tl-dot-active";
  return "tl-dot-pending";
}

function formatarData(dt) {
  if (!dt) return "-";
  return new Date(dt).toLocaleString("pt-BR");
}
function badgeClass(s) {
  const map = {
    ABERTO: "badge-aberto",
    TRIAGEM: "badge-triagem",
    EM_EXECUCAO: "badge-execucao",
    RESOLVIDO: "badge-resolvido",
  };
  return map[s] || "";
}
</script>

<style scoped>
.busca-topo {
  font-size: 20px;
  text-align: center;
  margin-bottom: 12px;
  margin-top: 12px;
}
.alerta-erro {
  color: #dc2626;
  padding: 10px 14px;
  font-size: 13px;
}
.mb-2 {
  margin-bottom: 14px;
}
.mb-3 {
  margin-bottom: 16px;
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
  color: #92959a;
}
.dado-val {
  font-size: 14px;
  color: #1e2329;
}
.titulo {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 14px;
}
.acoes-form {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}
</style>
