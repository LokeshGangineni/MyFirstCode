
document.getElementById('form').addEventListener('submit', function(event) {
    console.log("came");
    
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmpassword"]').value;
    const errorMessage = document.getElementById('errorMsg');

    if (password !== confirmPassword) {
        event.preventDefault(); // prevent form from submitting
        errorMessage.textContent = "Passwords do not match.";
    }    
    var alllabels=document.getElementsByTagName("label")
    var allinputs=document.getElementsByTagName('input');
    console.log(allinputs);
    console.log(alllabels);
    for( i=0;i<allinputs.length;i++)
    {
        if(allinputs[i].value.trim()==='')
        {
            event.preventDefault();
            errorMessage.innerHTML=`${alllabels[i].textContent.trim()} field is required`;
        }
        
    }
    
     // Radio button check (e.g., gender)
     const radios = document.getElementsByName('gender'); // Change 'gender' to your radio name
     let isRadioChecked = false;
     for (let i = 0; i < radios.length; i++) {
         if (radios[i].checked) {
             isRadioChecked = true;
             break;
         }
     }
 
     if (!isRadioChecked) {
         event.preventDefault();
         errorMessage.textContent = "Please select a gender option."; // customize message
         return;
     }
    
});


