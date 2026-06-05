<template>
  <div>
    <div class="banner">
      <div class="banner-text">
        <h1>Bem-vindo ao ObservaAção!</h1>
        <p>
          Utilize o menu lateral para registrar solicitações, acompanhar protocolos e colaborar para uma cidade melhor.
        </p>
      </div>

      <div class="banner-img">
        <svg viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="180" height="120" rx="12" fill="#eaf6ef" />
          <circle cx="90" cy="55" r="28" fill="#22a261" opacity=".15" />
          <circle cx="90" cy="55" r="16" fill="#22a261" opacity=".3" />
          <path d="M82 55l5 5 11-10" stroke="#1a7a4a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <rect x="30" y="90" width="120" height="4" rx="2" fill="#e5e7eb" />
          <rect x="50" y="96" width="80" height="3" rx="1.5" fill="#e5e7eb" />
        </svg>
      </div>
    </div>

    <div class="home-grid">
      <div class="card">
        <h3>Como utilizar o sistema</h3>

        <div class="passo">
          <span class="numero">1</span>
          <div>
            <strong>Registre sua solicitação</strong>
            <p>Informe o problema ou serviço desejado de forma clara.</p>
          </div>
        </div>

        <div class="passo">
          <span class="numero">2</span>
          <div>
            <strong>Receba um protocolo</strong>
            <p>O sistema gera automaticamente um número para acompanhamento.</p>
          </div>
        </div>

        <div class="passo">
          <span class="numero">3</span>
          <div>
            <strong>Acompanhe o andamento</strong>
            <p>Consulte o status da solicitação sempre que desejar.</p>
          </div>
        </div>

        <div class="passo">
          <span class="numero">4</span>
          <div>
            <strong>Receba a resposta</strong>
            <p>O órgão responsável analisará sua solicitação.</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>Dicas importantes</h3>

        <ul class="dicas">
          <li>Informe o endereço completo da ocorrência.</li>
          <li>Descreva o problema de forma objetiva.</li>
          <li>Guarde seu número de protocolo.</li>
          <li>Acompanhe regularmente o andamento.</li>
          <li>Mantenha seus dados atualizados.</li>
        </ul>
      </div>
    </div>

    <div class="card objetivo">
      <h3>Nosso Objetivo</h3>

      <p>
        O ObservaAção tem como objetivo aproximar o cidadão da gestão pública, facilitando a comunicação com os órgãos
        responsáveis e contribuindo para uma cidade mais organizada, transparente e eficiente.
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px 32px;
  margin-bottom: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.banner-text h1 {
  font-size: 28px;
  color: #1e2329;
  margin-bottom: 10px;
}

.banner-text p {
  color: #6b7280;
  line-height: 1.7;
  max-width: 500px;
}

.banner-img svg {
  width: 240px;
  height: 160px;
}

.home-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 18px;
  margin-bottom: 18px;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.card h3 {
  margin-bottom: 18px;
  color: #1e2329;
}

.passo {
  display: flex;
  gap: 16px;
  margin-bottom: 22px;
}

.passo:last-child {
  margin-bottom: 0;
}

.numero {
  width: 38px;
  height: 38px;
  background: #eaf6ef;
  color: #1a7a4a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.passo strong {
  display: block;
  margin-bottom: 4px;
  color: #1e2329;
}

.passo p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.dicas {
  padding-left: 18px;
  margin: 0;
}

.dicas li {
  margin-bottom: 12px;
  color: #4b5563;
  line-height: 1.6;
}

.objetivo p {
  color: #6b7280;
  line-height: 1.8;
  margin: 0;
}

@media (max-width: 900px) {
  .banner {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .home-grid {
    grid-template-columns: 1fr;
  }

  .banner-text p {
    max-width: 100%;
  }
}
</style>
