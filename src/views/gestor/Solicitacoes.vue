<template>
  <div>
    <div class="page-header">
      <h1>Lista de Solicitações</h1>
      <p>Lista de todas as solicitações registradas</p>
    </div>

    <div class="filtros">
      <div>
        <div class="filtro-label">Categoria</div>
        <select v-model="filtros.categoria" class="filtro-sel">
          <option value="">Todas</option>
          <option v-for="c in categorias" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <div>
        <div class="filtro-label">Status</div>
        <select v-model="filtros.status" class="filtro-sel">
          <option value="">Todas</option>
          <option v-for="s in statusList" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div>
        <div class="filtro-label">Prioridade</div>
        <select v-model="filtros.prioridade" class="filtro-sel">
          <option value="">Todas</option>
          <option value="ALTA">Alta</option>
          <option value="MEDIA">Média</option>
          <option value="BAIXA">Baixa</option>
        </select>
      </div>
      <button class="btn btn-primary" @click="buscar">Buscar</button>
    </div>

    <div class="tabela-wrap">
      <table class="tabela">
        <thead>
          <tr>
            <th>Protocolo</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Data Cadastro</th>
            <th>Status</th>
            <th>Prioridade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in lista" :key="s.id">
            <td style="font-family: monospace; font-weight: 600">{{ s.protocolo }}</td>
            <td>{{ labelCategoria(s.categoria) }}</td>
            <td style="max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
              {{ s.descricao }}
            </td>
            <td>{{ formatarData(s.dataCriacao) }}</td>
            <td>
              <span :class="badgeClass(s.status)" class="badge">{{ s.status }}</span>
            </td>
            <td>
              <span :class="prioridadeClass(s.prioridade)" class="badge">{{ s.prioridade }}</span>
            </td>
          </tr>
          <tr v-if="!lista.length">
            <td colspan="6" style="text-align: center; color: #9ca3af; padding: 28px">
              {{ carregando ? "Carregando..." : "Nenhuma solicitação encontrada." }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api.js";

const lista = ref([]);
const carregando = ref(false);
const filtros = ref({ categoria: "", status: "", prioridade: "" });

const categorias = ["ILUMINACAO", "BURACO", "LIMPEZA", "SAUDE", "ZELADORIA", "SEGURANCA"];
const statusList = ["ABERTO", "TRIAGEM", "EM EXECUCAO", "RESOLVIDO", "ENCERRADO"];

onMounted(carregarTodas);

async function carregarTodas() {
  carregando.value = true;
  try {
    lista.value = (await api.listar()).data;
  } catch {
    lista.value = [];
  } finally {
    carregando.value = false;
  }
}

async function buscar() {
  carregando.value = true;
  try {
    let res;
    if (filtros.value.status) res = await api.filtrarPorStatus(filtros.value.status);
    else if (filtros.value.categoria) res = await api.filtrarPorCategoria(filtros.value.categoria);
    else if (filtros.value.prioridade) res = await api.filtrarPorPrioridade(filtros.value.prioridade);
    else res = await api.listar();
    lista.value = res.data;
  } catch {
    lista.value = [];
  } finally {
    carregando.value = false;
  }
}

function labelCategoria(c) {
  const map = {
    ILUMINACAO: "Iluminação",
    BURACO: "Buraco",
    LIMPEZA: "Limpeza",
    SAUDE: "Saúde",
    ZELADORIA: "Zeladoria",
    SEGURANCA: "Segurança",
  };
  return map[c] || c;
}
function formatarData(dt) {
  if (!dt) return "-";
  return new Date(dt).toLocaleDateString("pt-BR");
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
function prioridadeClass(p) {
  return p === "ALTA" ? "badge-execucao" : p === "MEDIA" ? "badge-triagem" : "badge-encerrado";
}
</script>

<style scoped>
.filtros {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.filtro-label {
  font-size: 11px;
  color: #9ca3af;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.filtro-sel {
  padding: 8px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  color: #1e2329;
  outline: none;
  cursor: pointer;
  min-width: 130px;
}
</style>
