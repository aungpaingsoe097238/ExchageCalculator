let input = document.getElementById('input');
let from = document.getElementById('from');
let to = document.getElementById('to');
let result = document.getElementById('result');
let recordtable = document.getElementById('recordtable');
let changemood = document.getElementById('changemood');


let output = data.rates;   

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => console.log(data));


function createOption(selected,data,value){
    let element = document.createElement('option');
    let content = document.createTextNode(data);    
    selected.appendChild(element);
    element.setAttribute("value",ToNum(value));
    element.appendChild(content);
}

function ToNum(a){
    return Number(a.replace(",",""));
}

for(x in output){
    createOption(from,x,output[x]);
    createOption(to,x,output[x]);
}

//Main
document.getElementById('form').addEventListener('submit',function(event){
    event.preventDefault();
    //Get State
    let TextInput = input.value;
    let FromInput = from.value;
    let ToInput = to.value;

    // Process
    let first = TextInput * FromInput;
    let second = first/ToInput;

    // For Table
    let date = new Date();
    let FromText = TextInput+" "+from.options[from.options.selectedIndex].text;//eg;100USD
    let ToText = to.options[to.options.selectedIndex].text;//eg;200MMK
    let getdate = date.toDateString();
    let getresult = `${second.toFixed(2)}`;

    AddToTable(FromText,ToText,getdate,getresult);

    //Set State
    result.innerHTML = getresult;
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";
});

//Add To Table
function AddToTable(fromtext,totext,date,result){
    let nullrow = document.getElementById('nullrow');
    let arr = [date,fromtext,totext,result];
    let tr = document.createElement('tr');

    if(nullrow){
        nullrow.remove();
    }

    arr.map(function(el,index){
        let td = document.createElement('td');
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    });

    recordtable.appendChild(tr);
    AddToLocalStorage(recordtable);
}

//Add To LocalStorage
function AddToLocalStorage(table_data){
    let data = table_data.innerHTML
    localStorage.setItem('key',data);
};


(function(){
    if(localStorage.getItem('key') == null){
        recordtable.innerHTML = `<td colspan="4" class="null-row" id="nullrow">There is no history</td> `;
    }else{
        recordtable.innerHTML = localStorage.getItem('key');
    }
})();

//Dark Mode
function changeMode() {
    document.body.classList.toggle("night-mode");
    document.getElementById("modeIcon").classList.toggle("fa-sun");
}

//Remove
function remove(){
    if(localStorage.getItem('key') != null){
        window.confirm('Are you sure , you want to delete!🔺');
        localStorage.clear();
        recordtable.innerHTML = `<td colspan="4" class="null-row" id="nullrow">There is no history</td>`;
    }else{
        window.alert('There is no any item for trash!😃');
    }
}