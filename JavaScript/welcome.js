const container =
document.getElementById("container");
const okBtn =
document.getElementById("okBtn");

// Show automatically after signup success 
window.onload = () => { 
  container.style.display = "flex";
};
// close container
okBtn.onclick = () => {
  container.style.display = "none";
};
// close when clicking outside
window.onclick = (e) => {
  if(e.target === container){
    container.style.display = "none"
  }
};