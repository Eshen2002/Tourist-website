
let promptbox = document.getElementById("prompt-box");
let optdnt = document.getElementById("dnt-amount");
let msgarea = document.getElementById("msg");
let dntform = document.getElementById("formb");
let firstName = document.getElementById("firstname");
let secondName = document.getElementById("seconfname");


// buttons

let okbtn = document.getElementById("ok");
let sbt = document.getElementById("sbt");

// Submit button in donation form

dntform.addEventListener("submit",function(event){
    
    
        event.preventDefault();
        fname = firstName.value;
        promptbox.style.display="block";
        promptbox.style.animationName="prompt"
        let dopt = optdnt.options[optdnt.selectedIndex].value;
        msgarea.innerHTML=`Thank you ${fname} for your donation<br> You have donated Rs.${dopt}`
        
    }
        
)




// ok button in donation form(hides donation form when clicked)


okbtn.addEventListener("click",function(){
    promptbox.style.display="none";
    
})










