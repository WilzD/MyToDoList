//**********Personal list************ */
function showdData_Personal() {
    let tasklist

    if (localStorage.getItem('tasklist') == null) {
        tasklist = []
    }
    else {
        tasklist = JSON.parse(localStorage.getItem('tasklist'))
    }

    let html = ""
    tasklist.forEach((element, index) => {
        html += "<tr>"
        html += '<td>' + element.task + '</td>'
        html += '<td>' + element.date + '</td>'
        html += '<td><button class="btn btn-success" onclick=DoneTask_Personal(' + index + ') value="ONN" id="doneBtn">done</button> <button class="btn btn-warning" onclick=EditTask_Personal(' + index + ')>edit</button> <button class="btn btn-danger" onclick=DeleteTask_Personal(' + index + ')>delete</button></td>'
        html += "</tr>"
    });
    document.querySelector('#personal_list tbody').innerHTML = html
}
document.onload = showdData_Personal()

//***********official list****** */
function showdData_Official() {
    let tasklist2
    if (localStorage.getItem('tasklist2') == null) {
        tasklist2 = []
    } else {
        tasklist2 = JSON.parse(localStorage.getItem('tasklist2'))
    }
    let html2 = ""
    tasklist2.forEach((element, index) => {
        html2 += "<tr>"
        html2 += '<td>' + element.task + '</td>'
        html2 += '<td>' + element.date + '</td>'
        html2 += '<td><button class="btn btn-success" onclick=DoneTask_Official(' + index + ')>done</button> <button class="btn btn-warning" onclick=EditTask_Official(' + index + ')>edit</button> <button class="btn btn-danger" onclick=DeleteTask_Official(' + index + ')>delete</button></td>'
        html2 += "</tr>"
    })
    document.querySelector('#official_list tbody').innerHTML = html2
}
document.onload = showdData_Official()

//****************adding to table on condition****************  */
function Addtask() {
    let btn = document.getElementById('Add')
    btn.addEventListener('click', function Add() {
        let task = document.getElementById('Task')
        let details = document.getElementById('Details')
        let cat = document.getElementById('Category')
        if (cat.value === 'Personal') {
            let tasklist
            var date = new Date().toLocaleString(undefined, {
                timeZone: 'Asia/Kolkata',
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit"
            });  //given two object property in time timezone->convert to IST and second convert to standard form

            if (localStorage.getItem('tasklist') == null) {
                tasklist = []
            } else {
                tasklist = JSON.parse(localStorage.getItem('tasklist'))
            }
            tasklist.push({
                task: task.value,
                details: details.value,
                cat: cat.value,
                date: date
            })
            localStorage.setItem('tasklist', JSON.stringify(tasklist))
            showdData_Personal()
            document.getElementById('Task').value = ""
            document.getElementById('Details').value = ""
            Finaldate = ""
        }
        else {
            let tasklist2
            var date = new Date().toLocaleString(undefined, {
                timeZone: 'Asia/Kolkata',
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit"
            });
            if (localStorage.getItem('tasklist2') == null) {
                tasklist2 = []
            } else {
                tasklist2 = JSON.parse(localStorage.getItem('tasklist2'))
            }
            tasklist2.push({
                task: task.value,
                details: details.value,
                cat: cat.value,
                date: date
            })
            localStorage.setItem('tasklist2', JSON.stringify(tasklist2))
            showdData_Official()
            document.getElementById('Task').value = ""
            document.getElementById('Details').value = ""
            date = ""

        }
    })
}
Addtask()


function DeleteTask_Personal(index) {
    let tasklist
    if (localStorage.getItem('tasklist') == null) {
        tasklist = []
    }
    else {
        tasklist = JSON.parse(localStorage.getItem('tasklist'))
    }
    tasklist.splice(index, 1)
    localStorage.setItem('tasklist', JSON.stringify(tasklist))
    showdData_Personal()
}

function DeleteTask_Official(index) {
    let tasklist2
    if (localStorage.getItem('tasklist2') == null) {
        tasklist2 = []
    }
    else {
        tasklist2 = JSON.parse(localStorage.getItem('tasklist2'))
    }
    tasklist2.splice(index, 1)
    localStorage.setItem('tasklist2', JSON.stringify(tasklist2))
    showdData_Official()
}


if(localStorage.getItem('Donebtn')==null){
    localStorage.setItem('Donebtn',"OFF")
}


function DoneTask_Personal(index){
 

     if(localStorage.getItem('Donebtn')=='ONN'){
        let val = document.querySelectorAll('#personal_table tr')[index+1];
        val.style.color='green'
        localStorage.setItem('Donebtn',"OFF")
        }
    else{
        let val = document.querySelectorAll('#personal_table tr')[index+1];
        val.style.color='black'
        localStorage.setItem('Donebtn',"ONN")
        }

}

function DoneTask_Official(index) {
    if(localStorage.getItem('Donebtn')=='ONN'){
        let val = document.querySelectorAll('#Official_table tr')[index+1];
        val.style.color='green'
        localStorage.setItem('Donebtn',"OFF")
        }
    else{
        let val = document.querySelectorAll('#Official_table tr')[index+1];
        val.style.color='black'
        localStorage.setItem('Donebtn',"ONN")
        }
}


function EditTask_Official(index){

//*******update btn display****** */
document.getElementById('Add').style.display='none'
document.getElementById('Update_Official').style.display='block'

//*********value shown in input boxes */
let tasklist2
if(localStorage.getItem('tasklist2')==null){
    tasklist2=[]
}
else{
    tasklist2=JSON.parse(localStorage.getItem('tasklist2'))
}

document.querySelector('#Task').value=tasklist2[index].task
document.querySelector('#Details').value=tasklist2[index].details
document.querySelector('#Category').value=tasklist2[index].cat


//**************on update*********/
document.getElementById('Update_Official').onclick=function(){
    tasklist2[index].task=document.querySelector('#Task').value
    tasklist2[index].details=document.querySelector('#Details').value
    tasklist2[index].cat=document.querySelector('#Category').value

    localStorage.setItem('tasklist2',JSON.stringify(tasklist2))

    document.querySelector('#Task').value=""
    document.querySelector('#Details').value=""
    document.querySelector('#Category').value="Official"

   
   document.getElementById('Add').style.display='block'
   document.getElementById('Update_Official').style.display='none' 
   

   showdData_Official()
}

}

function EditTask_Personal(index){
//*******update btn display****** */
document.getElementById('Add').style.display='none'
document.getElementById('Update_personal').style.display='block'

//*********value shown in input boxes */
  let tasklist
  if(localStorage.getItem('tasklist')==null){
    tasklist=[]
  }
  else{
    tasklist=JSON.parse(localStorage.getItem("tasklist"))
  }
   document.querySelector('#Task').value=tasklist[index].task
   document.querySelector('#Category').value=tasklist[index].cat
   document.querySelector('#Details').value=tasklist[index].details
  

//**************on update*********/
document.getElementById('Update_personal').onclick=function(){
    tasklist[index].task= document.querySelector('#Task').value
    tasklist[index].cat= document.querySelector('#Category').value
    tasklist[index].details= document.querySelector('#Details').value
    
    localStorage.setItem('tasklist',JSON.stringify(tasklist))
   
    
    document.getElementById('Task').value=""
    document.getElementById('Details').value=""
    document.getElementById('Category').value="Personal"

    document.getElementById('Add').style.display='block'
    document.getElementById('Update_personal').style.display='none'

    showdData_Personal()
}

}

