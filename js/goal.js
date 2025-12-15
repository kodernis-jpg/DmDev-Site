function selectGoal(goal){
  const user = JSON.parse(localStorage.getItem("user")) || {};
  user.learningGoal = goal;
  localStorage.setItem("user", JSON.stringify(user));

  if(goal === "life"){
    window.location.href = "courses.html";
  } else {
    window.location.href = "study-field.html";
  }
}
