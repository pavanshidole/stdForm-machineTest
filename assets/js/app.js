const cl=console.log;


const stdForm=document.getElementById("stdForm");
const fnameControl=document.getElementById("fname");
const lnameControl=document.getElementById("lname");
const emailControl=document.getElementById("email");
const contactControl=document.getElementById("contact");
const stdContainer=document.getElementById("stdContainer");
const info=document.getElementById("info");
const card=document.getElementById("card");
const AddStd=document.getElementById("AddStd");
const updateStd=document.getElementById("updateStd");


const snackbar=((title,icon)=>{
    swal.fire({
        title:title,
        icon:icon,
        timer:3000,
    })
})

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let stdArr=JSON.parse(localStorage.getItem("stdArr")) || [];


const onEdit=(ele)=>{
    let editId=ele.closest("tr").id;
    localStorage.setItem("editId",editId);
    let getobj=stdArr.find(obj=>obj.stdId===editId);
    
    fnameControl.value=getobj.fname;
    lnameControl.value=getobj.lname;
    emailControl.value=getobj.email;
    contactControl.value=getobj.contact;

    AddStd.classList.add("d-none");
    updateStd.classList.remove("d-none");
}


const onRemove=(ele)=>{

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            
            let removeId=ele.closest("tr").id;
            let getIndex=stdArr.findIndex(obj=> obj.stdId===removeId);
        
            stdArr.splice(getIndex,1);
            localStorage.setItem("stdArr",JSON.stringify(stdArr));
        
            ele.closest("tr").remove();
            snackbar(`this  stdInfo remove is successFully!!`, `success`);
            onMsgData();
        }
      });


}

const onMsgData=()=>{
    if(stdArr.length===0){
        info.classList.remove("d-none");
        card.classList.add("d-none");
    }else{
        info.classList.add("d-none");
        card.classList.remove("d-none");
    }
}

onMsgData();

let tempArr=(arr)=>{
    let result="";
    arr.forEach((std,i)=>{
        result+=`
                <tr id="${std.stdId}">
                    
                    <td>${i+1}</td>
                    <td>${std.fname}</td>
                    <td>${std.lname}</td>
                    <td>${std.email}</td>
                    <td>${std.contact}</td>
                    <td><i class="fa-solid editBtn fa-pen-to-square text-primary" onclick="onEdit(this)"></i></td>
                    <td><i class="fa-solid removeBtn fa-trash text-danger" onclick="onRemove(this)"></i></td>
                    
                </tr>
        `
    
        stdContainer.innerHTML=result;
    })
}

if(stdArr.length > 0){
    tempArr(stdArr);
}


const createStd=(std)=>{
    let tr=document.createElement("tr");
    tr.id=std.stdId;
    tr.innerHTML=`
                    <td>${stdArr.length}</td>
                    <td>${std.fname}</td>
                    <td>${std.lname}</td>
                    <td>${std.email}</td>
                    <td>${std.contact}</td>
                    <td><i class="fa-solid editBtn fa-pen-to-square text-primary" onclick="onEdit(this)"></i></td>
                    <td><i class="fa-solid removeBtn fa-trash text-danger" onclick="onRemove(this)"></i></td> 
    `
    stdContainer.append(tr);
}

const onStdForm=(ele)=>{
    ele.preventDefault();

    let stdObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:parseInt(contactControl.value),
        stdId:uuid(),
    }

    stdArr.push(stdObj);
    
    createStd(stdObj);

    localStorage.setItem("stdArr",JSON.stringify(stdArr));
    snackbar(`the ${stdObj.fname} ${stdObj.lname} stdInfo Added is successFully!!`, `success`);

    onMsgData();
   
    cl(stdArr);

    ele.target.reset();
}



const onUpdateStd=()=>{
    let updateId=localStorage.getItem("editId");
    let updateObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:contactControl.value,
        stdId:updateId,
    }


    let getIndex=stdArr.findIndex(obj=>obj.stdId===updateId);
    
    stdArr[getIndex]=updateObj;
    localStorage.setItem("stdArr",JSON.stringify(stdArr));

    let tr=[...document.getElementById(updateId).children];

    tr[1].innerHTML=`${updateObj.fname}`;
    tr[2].innerHTML=`${updateObj.lname}`;
    tr[3].innerHTML=`${updateObj.email}`;
    tr[4].innerHTML=`${updateObj.contact}`;

    AddStd.classList.remove("d-none");
    updateStd.classList.add("d-none");

    stdForm.reset();

    snackbar(`the ${updateObj.fname} ${updateObj.lname} stdInfo update is successFully!!`, `success`);
    
}



stdForm.addEventListener("submit", onStdForm);
updateStd.addEventListener("click", onUpdateStd);