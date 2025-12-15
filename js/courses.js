const user = JSON.parse(localStorage.getItem("user"));

document.querySelectorAll(".course").forEach(course => {
  const goal = course.dataset.goal;
  const field = course.dataset.field;

  if(user.learningGoal === "life"){
    if(goal !== "life") course.style.display = "none";
  }

  if(user.learningGoal === "study"){
    if(goal !== "study" || field !== user.studyField){
      course.style.display = "none";
    }
  }
});
