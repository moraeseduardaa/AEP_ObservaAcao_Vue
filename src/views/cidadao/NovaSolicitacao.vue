<template>
  <div>
    <div class="page-header">
      <h1>Nova Solicitação</h1>
      <p>Preencha os dados abaixo para registrar sua solicitação</p>
    </div>

    <div class="card">
      <div class="form-group">
        <label class="form-label">Categoria *</label>
        <select v-model="form.categoria" class="form-control">
          <option value="" disabled>Selecione a categoria</option>
          <option v-for="c in categorias" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Descrição *</label>
        <textarea
          v-model="form.descricao"
          class="form-control"
          placeholder="Descreva o problema ou serviço."
        ></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Localização *</label>
        <textarea v-model="form.localizacao" class="form-control" placeholder="Informe o endereço"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Prioridade *</label>
        <select v-model="form.prioridade" class="form-control">
          <option value="" disabled>Selecione a prioridade</option>
          <option value="ALTA">Alta</option>
          <option value="MEDIA">Média</option>
          <option value="BAIXA">Baixa</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Deseja se identificar?</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" v-model="identificacao" value="sim" />
            Sim, quero me identificar
          </label>
          <label class="radio-label">
            <input type="radio" v-model="identificacao" value="nao" />
            Não, quero fazer de forma anônima
          </label>
        </div>
      </div>

      <template v-if="identificacao === 'sim'">
        <div class="form-group">
          <label class="form-label">Nome completo *</label>
          <input v-model="form.nomeRequerente" type="text" class="form-control" placeholder="Digite o nome" />
        </div>
        <div class="form-group">
          <label class="form-label">Contato *</label>
          <input v-model="form.contatoRequerente" type="text" class="form-control" placeholder="Telefone ou e-mail" />
        </div>
      </template>

      <div v-if="erro" class="alerta-erro">{{ erro }}</div>

      <div class="acoes">
        <button class="btn btn-danger" @click="resetForm()">Cancelar</button>
        <button class="btn btn-primary" @click="registrar" :disabled="carregando">
          {{ carregando ? "Registrando..." : "Registrar Solicitação" }}
        </button>
      </div>
    </div>

    <div v-if="protocoloGerado" class="modal-sucesso">
      <div class="modal-box">
        <h2>Solicitação registrada</h2>
        <p>Número do protocolo para acompanhar sua solicitação.</p>
        <div class="protocolo">{{ protocoloGerado }}</div>
        <div class="flex gap-2 justify-between mt-2" style="justify-content: center; gap: 12px">
          <button
            class="btn btn-primary"
            @click="
              protocoloGerado = null;
              resetForm();
            "
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import api from "../../services/api.js";

const categorias = [
  { value: "ILUMINACAO", label: "Iluminação Pública" },
  { value: "BURACO", label: "Buraco / Asfalto" },
  { value: "LIMPEZA", label: "Limpeza Urbana" },
  { value: "SAUDE", label: "Saúde" },
  { value: "ZELADORIA", label: "Zeladoria" },
  { value: "SEGURANCA", label: "Segurança" },
];

const identificacao = ref("sim");
const carregando = ref(false);
const erro = ref("");
const protocoloGerado = ref(null);

const form = reactive({
  categoria: "",
  descricao: "",
  localizacao: "",
  prioridade: "",
  nomeRequerente: "",
  contatoRequerente: "",
});

function resetForm() {
  Object.assign(form, {
    categoria: "",
    descricao: "",
    localizacao: "",
    prioridade: "",
    nomeRequerente: "",
    contatoRequerente: "",
  });
  identificacao.value = "sim";
  erro.value = "";
}

async function registrar() {
  erro.value = "";
  if (!form.categoria || !form.descricao || !form.localizacao || !form.prioridade) {
    erro.value = "Preencha os campos obrigatórios.";
    return;
  }
  carregando.value = true;
  try {
    const payload = { ...form, anonimo: identificacao.value === "nao" };
    if (payload.anonimo) {
      payload.nomeRequerente = null;
      payload.contatoRequerente = null;
    }
    const res = await api.criar(payload);
    protocoloGerado.value = res.data.protocolo;
  } catch (e) {
    erro.value = "Erro. Verifique os dados e tente novamente.";
  } finally {
    carregando.value = false;
  }
}
</script>

<style scoped>
.alerta-erro {
  color: #dc2626;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 12px;
}
.acoes {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
}
.modal-sucesso {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal-box {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
}
.modal-box h2 {
  font-size: 20px;
  margin-bottom: 8px;
}
.modal-box p {
  font-size: 13px;
  color: #585d66;
  margin-bottom: 20px;
}
.protocolo {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}
</style>
