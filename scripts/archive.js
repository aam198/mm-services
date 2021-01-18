const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("addFolder");

const addFileBtn = document.getElementByID("addFile");
const customTxt = document.getElementById("custom-text");


customBtn.addEventListener("click", function() {
  realFileBtn.click();
});

realFileBtn.addEventListener("change", function() {
  if (realFileBtn.value) {
    customTxt.innerHTML = realFileBtn.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
  } else {
    customTxt.innerHTML = "No file chosen, yet.";
  }
});
