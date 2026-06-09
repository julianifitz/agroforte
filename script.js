const menuBtn=document.getElementById('menuBtn');
const menu=document.getElementById('menu');
const accessBtn=document.getElementById('accessBtn');
const accessPanel=document.getElementById('accessPanel');
const fontPlus=document.getElementById('fontPlus');
const fontMinus=document.getElementById('fontMinus');
const contrastBtn=document.getElementById('contrastBtn');
const curiosidadeBtn=document.getElementById('curiosidadeBtn');
const curiosidadeTexto=document.getElementById('curiosidadeTexto');
const quizBox=document.getElementById('quizBox');
const quizBtn=document.getElementById('quizBtn');
const quizResultado=document.getElementById('quizResultado');
const slideImg=document.getElementById('slideImg');
const slideCaption=document.getElementById('slideCaption');
const prevSlide=document.getElementById('prevSlide');
const nextSlide=document.getElementById('nextSlide');
const toggleTexto=document.getElementById('toggleTexto');

let fontSize=16;
let contrast=false;
let slide=0;

const slides=[
  {src:'img/Campo.png',cap:'Cultivo da cevada no campo.'},
    {src:'img/Malte.png',cap:'Transformação em malte na indústria.'},
      {src:'img/Cidade.png',cap:'Conexão entre agro e cidade.'}
      ];

      const curiosidades=[
        'A cevada é muito usada na produção de malte e de alimentos.',
          'A sustentabilidade ajuda a produzir mais com menos impacto ambiental.',
            'Tecnologia no campo melhora eficiência e reduz desperdícios.'
            ];

            const quiz=[
              {q:'A cevada faz parte de qual etapa inicial?',a:'campo',opts:['Campo','Cidade','Loja']},
                {q:'O malte é resultado de qual processo?',a:'transformação',opts:['Transformação','Decoração','Venda']},
                  {q:'Qual prática é importante no projeto?',a:'uso consciente da água',opts:['Uso consciente da água','Desperdício','Poluição']}
                  ];

                  menuBtn.onclick=()=>{
                    menu.classList.toggle('open');
                      menuBtn.setAttribute('aria-expanded',menu.classList.contains('open'));
                      };

                      accessBtn.onclick=()=>{
                        const open=accessPanel.hidden;
                          accessPanel.hidden=!open;
                            accessBtn.setAttribute('aria-expanded',open);
                            };

                            document.addEventListener('keydown',e=>{
                              if(e.key==='Escape'){
                                  menu.classList.remove('open');
                                      accessPanel.hidden=true;
                                          menuBtn.setAttribute('aria-expanded','false');
                                              accessBtn.setAttribute('aria-expanded','false');
                                                }
                                                });

                                                fontPlus.onclick=()=>{
                                                  fontSize=Math.min(fontSize+2,24);
                                                    document.documentElement.style.fontSize=fontSize+'px';
                                                    };

                                                    fontMinus.onclick=()=>{
                                                      fontSize=Math.max(fontSize-2,12);
                                                        document.documentElement.style.fontSize=fontSize+'px';
                                                        };

                                                        contrastBtn.onclick=()=>{
                                                          contrast=!contrast;
                                                            document.body.classList.toggle('high-contrast',contrast);
                                                            };

                                                            curiosidadeBtn.onclick=()=>{
                                                              curiosidadeTexto.textContent=curiosidades[Math.floor(Math.random()*curiosidades.length)];
                                                              };

                                                              quiz.forEach((item,i)=>{
                                                                const el=document.createElement('div');
                                                                  el.className='card';
                                                                    el.innerHTML=`<p><strong>${i+1}. ${item.q}</strong></p>${item.opts.map(o=>`<label><input type="radio" name="q${i}" value="${o}"> ${o}</label><br>`).join('')}`;
                                                                      quizBox.appendChild(el);
                                                                      });

                                                                      quizBtn.onclick=()=>{
                                                                        let score=0;
                                                                          quiz.forEach((item,i)=>{
                                                                              const selected=document.querySelector(`input[name="q${i}"]:checked`);
                                                                                  if(selected&&selected.value.toLowerCase()===item.a.toLowerCase())score++;
                                                                                    });
                                                                                      quizResultado.textContent=`Você acertou ${score} de ${quiz.length}. ${score===quiz.length?'Excelente!':'Continue explorando o projeto.'}`;
                                                                                      };

                                                                                      const showSlide=i=>{
                                                                                        slide=(i+slides.length)%slides.length;
                                                                                          slideImg.src=slides[slide].src;
                                                                                            slideCaption.textContent=slides[slide].cap;
                                                                                            };

                                                                                            prevSlide.onclick=()=>showSlide(slide-1);
                                                                                            nextSlide.onclick=()=>showSlide(slide+1);
                                                                                            setInterval(()=>showSlide(slide+1),5000);

                                                                                            document.querySelectorAll('.toggle-card').forEach(card=>card.addEventListener('click',()=>toggleTexto.textContent=card.dataset.text));

                                                                                            showSlide(0);