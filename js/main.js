console.log("JS Loaded")
document.addEventListener("DOMContentLoaded", function(){
    const el_autohide = document.querySelector('.autohide');
    if(el_autohide){
        
        let last_scroll_top = 0;
        window.addEventListener('scroll', function() {
               let scroll_top = window.scrollY;
           if(scroll_top < last_scroll_top) {
                el_autohide.classList.remove('scrolled-down');
                el_autohide.classList.add('scrolled-up');
            }
            else {
                el_autohide.classList.remove('scrolled-up');
                el_autohide.classList.add('scrolled-down');
            }
            last_scroll_top = scroll_top;
  
        }); 
        // window.addEventListener
  
    }
    
  }); // // DOMContentLoaded  end

  const sendBtn = document.querySelector(".send");
  const email = document.querySelector(".email-validation");

  sendBtn.addEventListener("click", checkInput);

  function checkInput() {
    if (email.value.length == 0) {
        alert("Fill email")
        return
    }
    if (email.value.length < 4) {
        alert("Email is too short")
    }
    if (!email.checkValidity()) {
        email.reportValidity();
    }
  }
