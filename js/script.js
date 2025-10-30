/* util: ano no footer */
document.getElementById('year').textContent = new Date().getFullYear();

/* mobile nav toggle */
const btn = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
btn?.addEventListener('click', () => {
  const open = menu.classList.toggle('show');
  btn.setAttribute('aria-expanded', String(open));
});

/* checkout stub */
document.querySelectorAll('[data-plan]').forEach(el => {
  el.addEventListener('click', () => {
    const plan = el.getAttribute('data-plan');
    const price = el.getAttribute('data-price');
    if (confirm(`Assinar plano ${plan} por R$${Number(price).toFixed(2)}/mês?`)) {
      // window.location.href = 'https://seu-checkout.com';
      alert('Substitua por seu link de checkout ✅');
    }
  });
});

/* progresso animado */
const pct = document.getElementById('progressPct');
const bar = document.getElementById('progressBar');
let value = 62;
function tick(){
  value = value >= 92 ? 38 : value + 1;
  pct.textContent = value + '%';
  bar.style.width = value + '%';
  requestAnimationFrame(() => setTimeout(tick, 40));
}
tick();

/* atalhos que preenchem o chat */
function sendCommand(cmd){
  const input = document.getElementById('chatInput');
  input.value = cmd;
  // Integre com sua API de chat aqui, se quiser.
  alert(`Comando enviado ao EvoluENEM: \n${cmd}`);
}
document.querySelectorAll('[data-cmd]').forEach(el=>{
  el.addEventListener('click', ()=> sendCommand(el.getAttribute('data-cmd')));
});

/* widget de chat (mock) */
const chatFloat = document.getElementById('chatFloat');
const chatWidget = document.getElementById('chatWidget');
const chatClose = document.getElementById('chatClose');
const chatSend = document.getElementById('chatSend');

chatFloat.addEventListener('click', ()=> chatWidget.style.display = 'block');
chatClose.addEventListener('click', ()=> chatWidget.style.display = 'none');
chatSend.addEventListener('click', ()=> {
  const txt = document.getElementById('chatInput').value.trim();
  if(!txt) return;
  sendCommand(txt);
});
/* rolagem suave até a seção de planos ao clicar em "Quero meu plano agora" */
document.getElementById('comprar')?.addEventListener('click', (e) => {
  e.preventDefault();
  const target = document.querySelector('#planos');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
// Garantir binding mesmo se houver erros acima no script
(function attachComprarHandler() {
  function go() {
    const target = document.querySelector('#planos');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Delegação + botão direto
  document.addEventListener('click', (e) => {
    const el = e.target.closest('#comprar');
    if (el) {
      e.preventDefault();
      go();
    }
  });

  // Se o botão já existir, também liga direto
  const btn = document.getElementById('comprar');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      go();
    });
  }
})();
