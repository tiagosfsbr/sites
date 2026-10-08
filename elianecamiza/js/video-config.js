// Configurações do vídeo de fundo (video/video-loop.webm = vídeo original + ele de trás para frente, em loop contínuo). O vídeo sempre toca na mesma velocidade,
// independente da velocidade do scroll: o scroll apenas liga/desliga a reprodução.
window.VIDEO_CONFIG={
  // Segundos de vídeo tocados automaticamente ao abrir a página (0 desativa).
  introSeconds:4,
  // Só toca a introdução se a página abrir com scroll até este valor (px).
  introMaxScrollY:40,
  // Segundos que o vídeo continua tocando depois do último movimento de scroll (0 desativa).
  coastSeconds:1,
  // Velocidade de reprodução (1 = normal, 2 = dobro, .5 = metade).
  playbackRate:1,
  // true = rolar para cima também toca o vídeo (sempre para frente, nunca de trás para frente).
  playOnScrollUp:true,
  // Movimento mínimo de scroll (px) para contar como scroll.
  minScrollDelta:1,
  // Tempo máximo (ms) para o vídeo carregar; passado isso, fica só a imagem estática (0 desativa).
  loadTimeoutMs:8000,
  // Modo leve: em conexão fraca não baixa o vídeo e mostra só o primeiro quadro (video/poster.jpg).
  lowBandwidth:true,
  // Tipos de conexão (Network Information API) considerados fracos.
  slowConnectionTypes:["slow-2g","2g","3g"],
  // Velocidade mínima estimada (Mbps); abaixo disso usa o modo leve.
  minDownlinkMbps:1.5,
  // Usa o modo leve se o usuário ativou a economia de dados.
  respectSaveData:true,
  respectReducedData:true
};