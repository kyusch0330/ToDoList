"use strict"
let toDos= [];

const TODOS_KEY = "toDos";
const listInput = document.querySelector('.listInput');

const toDosBoard =document.querySelector('.toDos');

const deleteBtn = document.querySelector('.deleteBtn');

function deleteChecks(){
  const checks = document.querySelectorAll(".toDo.checked");
  for(let i=0;i<checks.length;i++){
    toDos=toDos.filter((toDo)=>{
      return checks.item(i).id!==toDo.id.toString();  //remove from toDos array
    });
    toDosBoard.removeChild(checks.item(i)); // remove from toDoBoard
  }
  let boardChild = toDosBoard.firstChild;
  for(let i=0;i<toDos.length;i++){ //id rearrangement in order
    toDos[i].id=i;
    boardChild.id=i.toString();
    boardChild=boardChild.nextSibling;
  }
  saveToDos();
}
deleteBtn.addEventListener('click',deleteChecks);

function printToDo(toDo){
  const td = document.createElement("div");
  td.classList.add("toDo");
  td.innerHTML=toDo.text ;
  td.id=toDo.id;
  //when clicked, ToDo get checked
  td.addEventListener("click",()=>{
    td.classList.toggle("checked");
  });
  //when double-clicked, All of ToDo get checked
  //if you double-click checked ToDo, All of ToDo get unchecked
  td.addEventListener("dblclick",()=>{
    let boardChild = toDosBoard.firstChild;
    if(td.classList.contains("checked")){
      for(let i=0;i<toDos.length;i++){
        boardChild.classList.remove("checked");
        boardChild=boardChild.nextSibling;
      }
    }
    else{
      for(let i=0;i<toDos.length;i++){
        boardChild.classList.add("checked");
        boardChild=boardChild.nextSibling;
      }
    }
  
  });

  toDosBoard.appendChild(td); 

}

function saveToDos(){
  const toDosJson = JSON.stringify(toDos);
  localStorage.setItem(TODOS_KEY,toDosJson)
}

listInput.addEventListener('keydown',(e)=>{
  if(e.keyCode==13){
    
    const toDo = {
      text:listInput.value,
      id:toDos.length
    };
    toDos.push(toDo);
    printToDo(toDo);
    saveToDos();
    listInput.value="";
  }
});

function loadToDos(){
  const toDosJson = localStorage.getItem(TODOS_KEY);
  toDos = JSON.parse(toDosJson);
  
  if(toDos!==null) {
    toDos.forEach(printToDo); //toDos의 각 원소가 인자로 넘어가서 출력
  }
  else {
    toDos=[];
  }
}


function init(){
  //localStorage.setItem(TODOS_KEY,null); // reset code(for debug)
  loadToDos();
}

init();