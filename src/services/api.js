import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? '/api'
    : 'https://observaacao-api.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  listar: () => api.get('/solicitacoes'),

  buscarPorId: (id) => api.get(`/solicitacoes/${id}`),

  buscarPorProtocolo: (protocolo) => api.get(`/solicitacoes/protocolo/${protocolo}`),

  criar: (dados) => api.post('/solicitacoes', dados),

  deletar: (id) => api.delete(`/solicitacoes/${id}`),

  atualizarStatus: (protocolo, dados) =>
    api.patch(`/solicitacoes/${protocolo}/status`, dados),

  filtrarPorPrioridade: (valor) =>
    api.get('/solicitacoes/filtro/prioridade', { params: { valor } }),

  filtrarPorCategoria: (valor) =>
    api.get('/solicitacoes/filtro/categoria', { params: { valor } }),

  filtrarPorLocalizacao: (valor) =>
    api.get('/solicitacoes/filtro/localizacao', { params: { valor } }),

  filtrarPorStatus: (valor) =>
    api.get('/solicitacoes/filtro/status', { params: { valor } }),

  fila: () => api.get('/solicitacoes/fila')
}
