// Simple multiple-choice quiz with progress bar
(function(){
  const questions = [
    { id: 'q1', prompt: { uk: 'Як перекладається слово "миш"?', en: 'What is the Slovak for "mouse"?', sk: 'Ako sa po slovensky povie "mouse"?' },
      options: ['myš', 'kniha', 'stôl'], answer: 0 },
    { id: 'q2', prompt: { uk: 'Як перекладається "клавіатура"?', en: 'What is the Slovak for "keyboard"?', sk: 'Ako sa po slovensky povie "keyboard"?' },
      options: ['monitor', 'klávesnica', 'kábel'], answer: 1 },
    { id: 'q3', prompt: { uk: 'Як перекладається "кабель"?', en: 'What is the Slovak for "cable"?', sk: 'Ako sa po slovensky povie "cable"?' },
      options: ['kábel', 'myš', 'klávesnica'], answer: 0 },
    { id: 'q4', prompt: { uk: 'Як перекладається "принтер"?', en: 'What is the Slovak for "printer"?', sk: 'Ako sa po slovensky povie "printer"?' },
      options: ['klávesnica', 'tlačiareň', 'stôl'], answer: 1 }
  ];

  let score = 0;
  // queue of question indices; wrong answers will be re-queued
  let queue = questions.map((_,i)=>i);

  // elements
  const promptEl = document.getElementById('prompt');
  const choicesEl = document.getElementById('choices');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const resultEl = document.getElementById('result');
  const resultText = document.getElementById('resultText');

  function getLang(){ return localStorage.getItem('lang') || 'uk'; }

  function render(){
    if (queue.length === 0) {
      showResult();
      return;
    }
    const idx = queue[0];
    const q = questions[idx];
    const lang = getLang();
    promptEl.textContent = (q.prompt && q.prompt[lang]) ? q.prompt[lang] : q.prompt['uk'];

    choicesEl.innerHTML = '';
    q.options.forEach((opt,i)=>{
      const btn = document.createElement('button');
      btn.className = 'choice';
      btn.textContent = opt;
      btn.dataset.idx = i;
      btn.addEventListener('click', onChoice);
      choicesEl.appendChild(btn);
    });

    // navigation buttons are optional; disable prev always in linear queue
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    updateProgress();
  }

  function onChoice(e){
    const picked = Number(e.currentTarget.dataset.idx);
    const idx = queue[0];
    const q = questions[idx];
    // disable choices
    choicesEl.querySelectorAll('.choice').forEach(b => b.disabled = true);

    if (picked === q.answer){
      e.currentTarget.classList.add('correct');
      score++;
      // remove this question from queue (it's done)
      // we'll shift after a short delay to show feedback
      setTimeout(()=>{
        queue.shift();
        if (queue.length === 0) showResult(); else render();
      }, 700);
    } else {
      e.currentTarget.classList.add('wrong');
      const correctBtn = Array.from(choicesEl.children).find(ch => Number(ch.dataset.idx) === q.answer);
      if (correctBtn) correctBtn.classList.add('correct');
      // move the current question to the end of the queue
      setTimeout(()=>{
        queue.push(queue.shift());
        render();
      }, 900);
    }

    // update progress: only correct answers count towards completed
    updateProgress();
  }

  function updateProgress(){
    const total = questions.length;
    const doneCount = score; // number of correctly answered unique questions
    const pct = Math.round((doneCount / total) * 100);
    progressFill.style.width = pct + '%';
    progressText.textContent = pct + '%';
  }

  prevBtn.addEventListener('click', ()=>{
    // not implemented; keep disabled
  });

  nextBtn.addEventListener('click', ()=>{
    // allow manual skip: if current question was answered correctly, it was shifted already.
    if (queue.length === 0) { showResult(); return; }
    // move current to end (skip)
    queue.push(queue.shift()); render();
  });

  function showResult(){
    resultEl.classList.remove('hidden');
    resultText.textContent = (translations && translations[getLang()] && translations[getLang()].result_text)
      ? translations[getLang()].result_text.replace('%SCORE%',''+score).replace('%TOTAL%',''+questions.length)
      : `Score: ${score}/${questions.length}`;
    // hide question card
    document.getElementById('questionCard').classList.add('hidden');
    document.querySelector('.controls').classList.add('hidden');
    // mark progress 100%
    progressFill.style.width = '100%';
    progressText.textContent = '100%';
  }

  // initialize
  document.addEventListener('DOMContentLoaded', ()=>{
    render();
  });

  // expose a starter for dynamic loading contexts
  window.testStart = function(){
    try{ render(); }catch(e){ /* noop */ }
  };

})();
