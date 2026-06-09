// === CONTROLE DE ACESSIBILIDADE ===
const btnContraste = document.getElementById('btn-contraste');
const btnAumentar = document.getElementById('btn-aumentar');
const btnDiminuir = document.getElementById('btn-diminuir');

let tamanhoAtual = 16;

btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
});

btnAumentar.addEventListener('click', () => {
    if (tamanhoAtual < 24) {
        tamanhoAtual += 2;
        document.documentElement.style.setProperty('--tamanho-fonte-base', `${tamanhoAtual}px`);
    }
});

btnDiminuir.addEventListener('click', () => {
    if (tamanhoAtual > 14) {
        tamanhoAtual -= 2;
        document.documentElement.style.setProperty('--tamanho-fonte-base', `${tamanhoAtual}px`);
    }
});

// === CARDS EXPANSÍVEIS (SUSTENTABILIDADE) ===
document.querySelectorAll('.card-header').forEach(botao => {
    botao.addEventListener('click', () => {
        const card = botao.parentElement;
        const expandido = botao.getAttribute('aria-expanded') === 'true';
        
        botao.setAttribute('aria-expanded', !expandido);
        card.classList.toggle('ativo');
    });
});

// === LÓGICA DO QUIZ INTERATIVO ===
const perguntas = [
    {
        pergunta: "Qual é a principal matéria-prima cultivada em Guarapuava para a produção de malte?",
        opcoes: ["Trigo", "Cevada", "Milho", "Soja"],
        correta: 1
    },
    {
        pergunta: "O equilíbrio entre produção e meio ambiente foca em qual conceito?",
        opcoes: ["Expansão predatória", "Sustentabilidade", "Monocultura intensiva", "Desperdício zero"],
        correta: 1
    }
];

let perguntaAtualIndex = 0;
let pontuacao = 0;

const perguntaTexto = document.getElementById('pergunta-texto');
const opcoesContainer = document.getElementById('opcoes-container');
const btnProximo = document.getElementById('btn-proximo');
const resultadoQuiz = document.getElementById('resultado-quiz');

function carregarPergunta() {
    limparEstado();
    let q = perguntas[perguntaAtualIndex];
    perguntaTexto.innerText = q.pergunta;

    q.opcoes.forEach((opcao, index) => {
        const botao = document.createElement('button');
        botao.innerText = opacity = opcao;
        botao.classList.add('btn-opcao');
        botao.addEventListener('click', () => selecionarResposta(index));
        opcoesContainer.appendChild(botao);
    });
}

function limparEstado() {
    btnProximo.classList.add('escondido');
    while (opcoesContainer.firstChild) {
        opcoesContainer.removeChild(opcoesContainer.firstChild);
    }
}

function selecionarResposta(indexSelecionado) {
    const correta = perguntas[perguntaAtualIndex].correta;
    if (indexSelecionado === correta) {
        pontuacao++;
    }
    
    // Bloquear novos cliques
    Array.from(opcoesContainer.children).forEach(btn => btn.disabled = true);
    
    if (perguntaAtualIndex < perguntas.length - 1) {
        btnProximo.classList.remove('escondido');
    } else {
        exibirResultado();
    }
}

btnProximo.addEventListener('click', () => {
    perguntaAtualIndex++;
    carregarPergunta();
});

function exibirResultado() {
    perguntaTexto.classList.add('escondido');
    opcoesContainer.classList.add('escondido');
    resultadoQuiz.classList.remove('escondido');
    resultadoQuiz.innerHTML = `<h3>Quiz Concluído!</h3><p>Você acertou ${pontuacao} de ${perguntas.length} perguntas.</p>`;
}

// Inicializar o Quiz ao carregar a página
carregarPergunta();