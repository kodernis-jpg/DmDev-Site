document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('.course-progress');
  nodes.forEach(el => {
    let pct = 0;

    // If parent card aggregates the intro course, compute from sub-theory flags
    const card = el.closest('.course-card');
    if (card && card.dataset.agg === 'intro') {
      const sub = ['course-1','course-2','course-3','course-4'];
      const doneCount = sub.reduce((sum,id)=> {
        const done = (window.isDone ? window.isDone(id) : (localStorage.getItem('done:'+id) === '1' || localStorage.getItem('done:'+id) === 'true'));
        return sum + (done ? 1 : 0);
      }, 0);
      pct = Math.round((doneCount / sub.length) * 100);
    } else {
      // Fallback: if the element itself has a data-percent attribute, use it
      const p = Number(el.getAttribute('data-percent') || 0);
      pct = Math.max(0, Math.min(100, p));
    }

    el.style.setProperty('--p', String(pct));
    const span = el.querySelector('.percent');
    if (span) span.textContent = pct + '%';
  });
});
