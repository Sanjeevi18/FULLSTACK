function showProject(title, description) {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-description").innerText = description;
  document.getElementById("modal").style.display = "block";
}

document.querySelector(".close").onclick = function () {
  document.getElementById("modal").style.display = "none";
};
