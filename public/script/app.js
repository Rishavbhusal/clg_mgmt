
// const form  = document.getElementById("form")
// form.addEventListener('submit',function(event){
//     event.preventDefault()
// })



// const Swal = require("sweetalert2")


function openWindow(){
    window.open("http://localhost:4000/web/about")
}



const registerUser = ()=>{
    // Swal.fire({
    //     title: "Good job!",
    //     text: "You clicked the button!",
    //     icon: "success"
    //   });
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const firstname = document.getElementById("firstname").value;
      const lastname = document.getElementById("lastname").value;
      const phone = document.getElementById("phonenumber").value;
      const submit =document.getElementById("submit1")
      
      
      if(email == "" || password =="" || firstname == "" || lastname == "" || phone == ""){
     
      }
      
    
    if(email ==""){
        document.getElementById("emailValidation").textContent = "email field is required!!";
        document.getElementById("emailValidation").style.color = "red";
        document.getElementById("email").style.borderColor = "red";
        
        
        if(password  == ""){
            document.getElementById("passwordValidation").innerText = "password field is required!!";
            document.getElementById("passwordValidation").style.color = "red";
            document.getElementById("password").style.borderColor = "red";
            
            
        }
    }
    // else{
        
        
    //     document.getElementById("emailValidation").style.color = "green";
    //     document.getElementById("email").style.borderColor = "green";
        
    // }

    
  
}

const loginUser = ()=>{
    const email = document.getElementById("email").value
    if(email == ""){
        document.getElementById("emailValidation").innerText = "email field is required!!"
        document.getElementById("emailValidation").style.color ="red"
       document.getElementById("email").style.borderColor = "red"
    }
}
   
    


const phone  = document.getElementById("login_number")
if(phone ==""){
    document.getElementById("phone_validation").innerText = "Phone number cant be empty!!!"
    document.getElementById("phone_validation").style.color = "red"
phone.style.borderColor ="red"
}



                //    sweetalert

                // singup

    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        Swal.fire({
            title: 'You registered Successfully!!',
        
            icon: 'success',
           

        })
        .then((result) => {
            if (result.isConfirmed) {
                // If the user confirms, submit the form
                document.getElementById('form').submit();
            }
        });
    

    })
    
    
   
                                //  destroy
            
      
  