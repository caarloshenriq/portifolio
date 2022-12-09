 //getting all required element
 const inputBox = document.querySelector(".inputField input");
 const addBtn = document.querySelector(".inputField button");
 const todolist = document.querySelector(".todolist");
 const deleteAllBnt = document.querySelector(".footer button");
 
 
 inputBox.onkeyup = ()=>{
     let userData = inputBox.value; //gettind user entered value
     if (userData.trim() != 0){ //if user values aren't only spaces
         addBtn.classList.add("active"); //ativa o botão add
     }else{
         addBtn.classList.remove("active"); //desativa botão add
     }
 }
 
 showTasks()
 
 //se o usuario clicar no botão add
 addBtn.onclick = ()=>{
     let userData = inputBox.value;
     let getLocalStorage = localStorage.getItem("new todo"); //getting localstorage
     if(getLocalStorage == null){ //if localstorage is null
         listarr = []; //creating blank array
     }else{
         listarr = JSON.parse(getLocalStorage);//transforming json string into a js obj
     }
     listarr.push(userData);  
     localStorage.setItem("new todo", JSON.stringify(listarr)); //transforming js obj into a json string
     showTasks(); //chamando função showTasks
 }
 
 //function to add task list inside ul
 function showTasks(){
     let getLocalStorage = localStorage.getItem("new todo"); //getting localstorage
     if(getLocalStorage == null){ //if localstorage is null
         listarr = []; //creating blank array
     }else{
         listarr = JSON.parse(getLocalStorage);//transforming json string into a js obj
     }
     
     const pendente = document.querySelector(".pendente");
     pendente.textContent = listarr.length;
     if(listarr.length > 0){
         deleteAllBnt.classList.add("active");
     }else{
         deleteAllBnt.classList.remove("active");
     }
 
     let newLiTag = '';
     listarr.forEach((element, index) => {
         newLiTag += `<li> ${element} <span onclick="deletetask(${index})"; ><i class="fa-solid fa-trash-can"></i></span></li>`;
     });
 
     todolist.innerHTML = newLiTag; //add nova li tag inside ul tag
     inputBox.value = ""; //once task added leave the input field blank
 }
 
 //delete task function
 function deletetask(index){
     let getLocalStorage = localStorage.getItem("new todo")
     listarr = JSON.parse(getLocalStorage);
     listarr.splice (index, 1); //delete or remove the particular indexed li
     //after remove the li again update the local storage
     localStorage.setItem("new todo", JSON.stringify(listarr));
     showTasks(); //calling showTask function
 }
 
 //delete all task function
 deleteAllBnt.onclick = ()=>{
     listarr = [];
     localStorage.setItem("new todo", JSON.stringify(listarr));
     showTasks();
 }