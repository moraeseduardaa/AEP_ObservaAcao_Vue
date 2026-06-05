<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-brand">
        <div class="brand-icon">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#1a7a4a" />
            <path d="M12 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="white" stroke-width="2" stroke-linecap="round" />
            <circle cx="20" cy="15" r="4" stroke="white" stroke-width="2" />
          </svg>
        </div>
        <h1>ObservaAção</h1>
        <p>Sistema de Solicitações de Serviços</p>
      </div>

      <p class="login-subtitle">Faça o login para acessar o sistema</p>

      <div class="perfil-select">
        <label class="perfil-option" :class="{ active: perfil === 'cidadao' }">
          <input type="radio" v-model="perfil" value="cidadao" />
          <span>Cidadão</span>
        </label>
        <label class="perfil-option" :class="{ active: perfil === 'gestor' }">
          <input type="radio" v-model="perfil" value="gestor" />
          <span>Gestor</span>
        </label>
      </div>

      <template v-if="perfil === 'gestor'">
        <div class="form-group">
          <label class="form-label">Usuário</label>
          <input v-model="usuario" type="text" class="form-control" placeholder="Digite seu usuário" />
        </div>
        <div class="form-group">
          <label class="form-label">Senha</label>
          <input v-model="senha" type="password" class="form-control" placeholder="Digite sua senha" />
        </div>
      </template>

      <button class="btn btn-primary btn-full mt-2" @click="entrar">ENTRAR</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const perfil = ref("cidadao");
const usuario = ref("");
const senha = ref("");

function entrar() {
  if (perfil.value === "gestor") {
    router.push("/gestor/dashboard");
  } else {
    router.push("/cidadao/inicio");
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #eaf6ef 0%, #f7f8fa 60%, #e8f4ff 100%);
}

.login-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.login-brand {
  text-align: center;
  margin-bottom: 8px;
}
.brand-icon svg {
  width: 52px;
  height: 52px;
  margin-bottom: 10px;
}
.login-brand h1 {
  font-family: "Sora", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #1a7a4a;
}
.login-brand p {
  font-size: 13px;
  color: #9ca3af;
  margin-top: 2px;
}

.login-subtitle {
  text-align: center;
  font-size: 13px;
  color: #6b7280;
  margin: 6px 0 14px;
}

.perfil-select {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
  justify-content: center;
}
.perfil-option {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 20px;
  border: 1.5px solid #e5e7eb;
  border-radius: 99px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.18s;
}
.perfil-option input {
  display: none;
}
.perfil-option.active {
  border-color: #1a7a4a;
  color: #1a7a4a;
  background: #eaf6ef;
  font-weight: 600;
}
</style>
