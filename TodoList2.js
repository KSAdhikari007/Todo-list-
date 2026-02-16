/*When you rewrite it:
Keep data separate from UI.
Don’t store HTML in localStorage.
Make indexing reliable.
*/

// stores tasks as strings(in markup)
let tasks = [];
var gIndex = 0;

let addTask = document.getElementById("addtaskbtn");
let inputTask = document.getElementById("input");
let taskList = document.getElementById("tasklist");
let clearTask = document.getElementById("cleartaskbtn");

// fnc to add task
addTask.addEventListener('click',()=>{

    let inputVal = inputTask.value;
    let li = `<li>${inputVal} <button id="btn${gIndex}">X</button></li>`;
    tasks.push(li);
    display(inputVal,`btn${gIndex}`);
    save();

    //fn to remove task
    let btn = document.getElementById(`btn${gIndex}`);
    
    btn.addEventListener('click',()=>{
        taskList.removeChild(btn.parentNode);
        // let ind = btn.id[3];
        let ind;
        let idn = btn.id;
        console.log(idn);
        for(let i=0;i<tasks.length;i++){
            let str1 = tasks[i];
            if(str1.includes(`${idn}`)){
                ind = i;
                break;
            }
        }
        tasks.splice(ind,1);
        
        save();
        
    })
    gIndex++;
})


//display list
function display(d,c){
    
    let nli = document.createElement('li');
    let litxt = document.createTextNode(`${d} `);
    nli.append(litxt);
    let nbt = document.createElement('button');
    nbt.id = c;
    nbt.textContent = "X";
    nli.append(nbt);
    taskList.append(nli);

}

//clear list
clearTask.addEventListener('click',()=>{

    tasks = [];
    taskList.innerHTML = "";
    gIndex = 0;
    save();
})

//locaStorage
function save(){    
    localStorage.setItem("TL",JSON.stringify(tasks));
    localStorage.setItem("GI",JSON.stringify(gIndex));    
}

function load(){
    if(localStorage.getItem("TL") != null){
        tasks = JSON.parse(localStorage.getItem("TL"));
        gIndex = JSON.parse(localStorage.getItem("GI"));
        let size = tasks.length;

        taskList.innerHTML = "";
        for(let i=0;i<size;i++){
            let tstr = tasks[i];
            let tstr2 = tstr.slice(4,tstr.length);

            let inpVal = tstr2.slice(0,tstr2.indexOf('<button id') -1)
            let btnId = tstr2.slice(tstr2.indexOf(`id="btn`) + 4,tstr2.indexOf('">X</button></li>') )

            display(inpVal,btnId);

            let btn = document.getElementById(`${btnId}`);

             btn.addEventListener('click',()=>{
                // taskList.removeChild(btn.parentNode);
                // let index = btn.id[3];
                // tasks.splice(index,1);

                taskList.removeChild(btn.parentNode);
                let ind;
                let idn = btn.id;
                console.log(idn);
                for(let i=0;i<tasks.length;i++){
                    let str1 = tasks[i];
                    if(str1.includes(`${idn}`)){
                        ind = i;
                        break;
                    }
                }
                tasks.splice(ind,1);
        
                save();
                
        })
            
        }
        
    }
}
load();