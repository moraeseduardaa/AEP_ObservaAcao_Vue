<template>
  <div>
    <div class="page-header">
      <h1>Histórico de Modificações</h1>
      <p>Consulte o histórico de todas as atualizações das solicitações</p>
    </div>

    <div class="tabela-wrap">
      <table class="tabela">
        <thead>
          <tr>
            <th>Data/Alteração</th>
            <th>Protocolo</th>
            <th>Categoria</th>
            <th>Antigo Status</th>
            <th>Novo Status</th>
            <th>Responsável</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="s in lista" :key="s.id">
            <template v-for="(h, i) in s.historico" :key="h.id">
              <tr v-if="i > 0">
                <td>{{ formatarData(h.data) }}</td>
                <td style="font-family: monospace; font-weight: 600">{{ s.protocolo }}</td>
                <td>{{ s.categoria }}</td>
                <td>
                  <span :class="badgeClass(s.historico[i - 1].status)" class="badge">{{
                    s.historico[i - 1].status
                  }}</span>
                </td>
                <td>
                  <span :class="badgeClass(h.status)" class="badge">{{ h.status }}</span>
                </td>
                <td>{{ h.responsavel }}</td>
              </tr>
            </template>
          </template>
          <tr v-if="!temLinhas">
            <td colspan="6" style="text-align: center; color: #9ca3af; padding: 28px">
              {{ carregando ? "Carregando..." : "Nenhuma modificação registrada." }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../../services/api.js";

const lista = ref([]);
const carregando = ref(false);

const temLinhas = computed(() => lista.value.some((s) => s.historico?.length > 1));

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
</script>
