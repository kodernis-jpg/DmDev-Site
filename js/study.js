function selectField(field){
  const user = JSON.parse(localStorage.getItem("user"));
  user.studyField = field;
  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "courses.html";
}
