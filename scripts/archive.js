// const realFileBtn = document.getElementById("real-file");
// const customBtn = document.getElementById("addFolder");

// const addFileBtn = document.getElementById("addFile");
// const customTxt = document.getElementById("custom-text");

let dropArea = document.getElementById("drop-area");
const dragArea = document.querySelector(".drag-area");
const dragText = document.getElementById("select-file");
const button = document.querySelector("button");
const icon = document.querySelector("icon");
const fileElem = document.getElementById("fileElem");

const nextBtn = document.getElementById("nextBtn");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close") [0];
const backBtn = document.getElementById("backBtn");




//Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
});


// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
});

button.addEventListener("click", () => {
  fileElem.click();
  dragArea.classList.add("active");
  dragText.textContent = "Select File to Upload";
});


// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  dragArea.classList.add("active");
  dragText.textContent = "Select File to Upload";
}

function unhighlight(e) {
  dropArea.classList.remove('active');
  dragText.textContent = "Drag & Drop to Upload File";
}

function handleDrop(e) {
  const dt = e.dataTransfer
  const files = dt.files

  handleFiles(files)
}


//If user Drag File Over DropArea
dragArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //Prevents default behavior 
    dragArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dragArea.addEventListener("dragleave", ()=>{
    dragArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  });


// Progress Bar when uploading files

let uploadProgress = [];
let progressBar = document.getElementById('progress-bar');

function initializeProgress(numFiles) {
  progressBar.value = 0;
  uploadProgress = [];

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0);
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent;
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  console.debug('update', fileNumber, percent, total);
  progressBar.value = total;

  if (progressBar.value == 100){
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

// When files are chosen
function handleFiles(files) {
  files = [...files]
  initializeProgress(files.length);
  files.forEach(uploadFile);
  files.forEach(previewFile);
  if(files.length <= 0){
    nextBtn.setAttribute("disabled", "");
  }
  else {
    nextBtn.removeAttribute("disabled");
  }
}

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  
    dragArea.classList.remove("active");
    const list = document.querySelector('ul');
    const listItem = document.createElement('li');
    const checkboxContain = document.createElement('label');
    const inputCheck = document.createElement('input');
    const checkmark = document.createElement('span');
    const listText = document.createElement('span');
    const close = document.createElement('i');
    const size = file.size;
    const name =file.name;
   
    listItem.classList.add('fadeIn');
    listItem.classList.add('verify');
    checkboxContain.classList.add('checkbox-container');
    inputCheck.type="checkbox";
    checkmark.classList.add('checkmark');

     listItem.appendChild(checkboxContain);
     checkboxContain.appendChild(inputCheck);
     checkboxContain.appendChild(checkmark);
     list.appendChild(listItem);
     listItem.appendChild(listText);
     listText.textContent = file.name;


     listItem.appendChild(close);
     close.className="fas fa-times";


    close.addEventListener("click", () =>{
      setTimeout(function(){
        list.removeChild(listItem);
      }, 1000);
        listItem.classList.remove('fadeIn');
        listItem.classList.add('fadeOut'); 
    });

}


// Open Modal
nextBtn.addEventListener("click", () => {
  modal.style.display = "block";
});
 
 span.addEventListener("click", () => {
  modal.style.display = "none";
 });

 backBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
 
 window.onclick = function (event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }

//  End of Modal



function uploadFile(file, i) {
  const url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload';
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
  });

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100) // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  });

  formData.append('upload_preset', 'ujpu6gyk');
  formData.append('file', file);
  xhr.send(formData);
}


// Older Upload function but can take out

// customBtn.addEventListener("click", function() {
//   realFileBtn.click();
// });

// realFileBtn.addEventListener("change", function() {
//   if (realFileBtn.value) {
//     customTxt.innerHTML = realFileBtn.value.match(
//       /[\/\\]([\w\d\s\.\-\(\)]+)$/
//     )[1];
//   } else {
//     customTxt.innerHTML = "No file chosen, yet.";
//   }
// });
