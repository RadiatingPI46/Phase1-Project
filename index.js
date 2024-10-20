// Registration
const email_m=document.getElementById("User_email")
const password_m=document.getElementById("User_password")
const username_m=document.getElementById("User_name")
const reg_sub=document.getElementById("Reg_sub")

reg_sub.addEventListener("submit", (e)=>{
  e.preventDefault()

    fetch('https://phase1-project-1-mhtr.onrender.com/Members', {
        method: 'POST',
        body: JSON.stringify({
          "Member_email":email_m.value,
          "Member_userName":username_m.value,
          "Member_password":password_m.value,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          alert("Success")
          console.log(json)});
})

const login_sub=document.getElementById("login_sub")
login_sub.addEventListener("submit", (e)=>{
  e.preventDefault()

  const email_l=document.getElementById("login_email").value
  const password_l=document.getElementById("login_password").value
  const user_name_l=document.getElementById("login_user_name").value
  
  fetch('https://phase1-project-1-mhtr.onrender.com/Members')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    
    const user_data = data && data.find((user)=>{
      return (user.Member_email == email_l) && (user.Member_password == password_l) && (user.Member_userName== user_name_l)
    })
    if(user_data==undefined){
      alert("Wrong credentials")
    }

    const new_div=document.createElement("div")
    const formed_div=document.getElementById("formed_div")
    formed_div.innerHTML=new_div
    formed_div.innerHTML=`
     <div class="card">
      <p class="card-title">SCHEDULES - ${user_name_l}</p>

      <div>
         <form id="Add_schedule">
             <div class="mb-3">
               <label for="exampleInputEmail1" class="form-label">Task</label>
               <input type="text" class="form-control" id="schedule_task" aria-describedby="emailHelp" required>
             </div>
             <div class="mb-3">
               <label for="exampleInputPassword1" class="form-label">Due_date</label>
               <input type="date" class="form-control" id="schedule_due_date" required>
             </div>
             <div class="mb-3">
                 <textarea name="description" rows="4" class="form-control" id="schedule_description" required></textarea>
             </div>
             <button type="submit" class="btn btn-primary">Continue</button>
             
         </form>
         
      </div>

    </div>
    <div class="card" id="schedule_display">
    </div>
    <br>
    <div  style="text-align: center;">
        <div class="card" id="schedule_overview">
        </div>
    </div>
    `
    document.getElementById("Add_schedule").addEventListener("submit", (a)=>{
      a.preventDefault();
    
        fetch("https://phase1-project-1-mhtr.onrender.com/Schedules", {
            method: 'POST',
            body: JSON.stringify({
              "Task":document.getElementById("schedule_task").value,
              "Task_description":document.getElementById("schedule_description").value,
              "Schedule_creation_date":Date(),
              "Schedule_due_date":document.getElementById("schedule_due_date").value,
            }),
            headers: {
              'Content-type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((json) => {
              alert("Success")
              console.log(json)});
    })


    fetch("https://phase1-project-1-mhtr.onrender.com/Schedules")
  .then((response) => response.json())
  .then((data) =>{
    for(schedule of data){
       document.getElementById("schedule_display").innerHTML+=`
       <div>
       <h2>${schedule.Task}</h2>
       <li><button onclick="fetch_data ('${schedule.id}')" class="p-2" style="width: 250px;">View</button></li>
       <li><button onclick="edit_data ('${schedule.id}')" class="p-2" style="width: 250px;">Edit</button></li>
       <li><button onclick ="delete_schedule ('${schedule.id}')" class="p-2" style="width: 250px;">X</button></li>
       <hr>
       </div>
       `
    }
  });

  //Function for deleting the schedules using the button
  delete_schedule=(id)=>{
      fetch(`https://phase1-project-1-mhtr.onrender.com/Schedules/${id}`, {
          method: 'DELETE',
        })
        .then((response) => response.json())
        .then((response) =>{
          alert("Deleted successfully")
        })
  };
  // function for displaying the data of a single schedule
  fetch_data=(id)=>{
  
    fetch(`https://phase1-project-1-mhtr.onrender.com/Schedules/${id}`,{
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) =>{
      document.getElementById("schedule_overview").innerHTML+=`
      <div>
       <li>${schedule.Task}</li>
       <li>Made on ${data.Schedule_creation_date} due on ${data.Schedule_due_date}<li>
       <p>${data.Task_description}</p>
      </div>
      `
  
    });
  }

  edit_data=(id)=>{
    fetch(`https://phase1-project-1-mhtr.onrender.com/Schedules/${id}`)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("schedule_edit").innerHTML=`
      <form id="edit_schedule">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Task</label>
        <input type="text" class="form-control" id="update_schedule_task" aria-describedby="emailHelp" value="${data.Task}" required>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Due_date</label>
        <input type="date" class="form-control" id="update_schedule_due_date" value="${data.Schedule_due_date}" required>
      </div>
      <div class="mb-3">
          <textarea name="description" rows="4" class="form-control" id="update_schedule_description"  required>${data.Task_description}</textarea>
      </div>
      <button type="submit" class="btn btn-primary">Edit</button>
             
      </form>
    `
    document.getElementById("edit_schedule").addEventListener("submit",(e)=>{

      fetch(`https://phase1-project-1-mhtr.onrender.com/Schedules/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          "Task":document.getElementById("update_schedule_task").value,
          "Task_description":document.getElementById("update_schedule_description").value,
          "Schedule_creation_date":Date(),
          "Schedule_due_date":document.getElementById("update_schedule_due_date").value,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          alert("Success")
          console.log(json)});


    })

    console.log(json)});
  }





  })
})
