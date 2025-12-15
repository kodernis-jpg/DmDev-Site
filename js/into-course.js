// Handles marking theory pages as done and unlocking practice when all done
// tolerant check for done flags (accept '1', 'true' or any present value)
function isDone(id){
  try{
    const v = localStorage.getItem('done:' + id);
    return v === '1' || v === 'true' || v === 'yes' || v === 'done' || v === 'true';
  }catch(e){
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const courseIds = ['course-1','course-2','course-3','course-4'];

  // Update grid/cards state on the index page
  document.querySelectorAll('.video-card').forEach(card => {
    const id = card.dataset.courseId;
    if (!id) return;
    const done = isDone(id);
    if (done) card.classList.add('done');

    if (id === 'practice') {
      const allDone = courseIds.every(cid => isDone(cid));
      if (allDone) {
        card.classList.remove('disabled');
        const locked = card.querySelector('.locked');
        if (locked) {
          const a = document.createElement('a');
          a.className = 'btn btn-primary';
          a.href = 'practice-test.html';
          a.textContent = 'Відкрити';
          locked.replaceWith(a);
        }
      }
    }
  });

  // Prevent clicks on disabled cards (anchor wrappers)
  document.querySelectorAll('.video-card.disabled').forEach(el => {
    el.addEventListener('click', e => e.preventDefault());
  });
});

// expose helper globally
window.isDone = isDone;

// For theory pages: helper to mark current course done
function markCourseDone(id, redirect = true) {
  if (!id) return;
  try{
    console.log('[markCourseDone] mark', id);
    localStorage.setItem('done:' + id, '1');
  }catch(e){
    console.error('[markCourseDone] error', e);
  }
  if (redirect) window.location.href = 'into_course.html';
}

// Expose to global for inline onclick handlers on theory pages
window.markCourseDone = markCourseDone;
