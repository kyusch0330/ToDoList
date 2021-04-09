const listInput= document.querySelector('.listInput');
const toDos=document.querySelector('.toDos');
function printToDo(toDo){
  let td = document.createElement("div");
  td.classList.add("toDo");
  td.innerHTML=toDo;
  toDos.appendChild(td); 
}

listInput.addEventListener('keydown',(e)=>{
  if(e.keyCode==13){
    printToDo(listInput.value);
    listInput.value="";
  }
});
