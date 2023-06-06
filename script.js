const inputConatiner = document.getElementById("input-container");
const countDownForm = document.getElementById("countDownForm");
const dateEl = document.getElementById("date-picker");
const countdownEl = document.getElementById("countdown");
const countDownElTitle = document.getElementById("countdown title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeEl= document.getElementById("complete");
const completeElInfo= document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");
let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;
let countDownActive;
let savedCoundown;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;



// set Date input min  with todays date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min' , today);
// populate countDown
function updateDOM(){
countDownActive = setInterval(()=>{
    const now = new Date().getTime();
    const distance = countDownValue - now ;  
    console.log("distance" , distance);
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day)/hour);
    const minutes = Math.floor((distance % hour)/minute);
    const seconds = Math.floor((distance % minute)/second);
    console.log(days,hours,minutes,seconds);
    // Hide Input
    inputConatiner.hidden= true;
    // if the countDown has ended ,show complete
    if(distance < 0){
        countdownEl.hidden = true;
        clearInterval(countDownActive);
        completeElInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
        completeEl.hidden = false;
    }
    else {
        // else, show the countdown in progress
        countDownElTitle.textContent = `${countDownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEl.hidden = true;
        countdownEl.hidden = false;
      }

},second);

}

// take values from input
function updateCountDown(e){
    e.preventDefault();
    console.log(e);
     countDownTitle = e.srcElement[0].value;
     console.log(countDownTitle);
     countDownDate = e.srcElement[1].value;
     console.log(countDownDate);

     savedCoundown={
        title: countDownTitle,
        date: countDownDate,
     };
     console.log(savedCoundown);
     localStorage.setItem('countdown' , JSON.stringify(savedCoundown))
   if( countDownDate === ''){
    alert("Please select a date for the countdown.")
   }
   else{
     //  Get number version of current Date ,update DOM
     countDownValue = new Date(countDownDate).getTime();
     console.log("CountDown Value" ,  countDownValue);
     updateDOM();
   }
}
// Reset All value
function reset(){
    countdownEl.hidden= true;
    completeEl.hidden=true;
    inputConatiner.hidden = false;
    // Stop the countDown
    clearInterval(countDownActive);
    // Reset values

    countDownTitle= '';
    countDownDate = '';
    localStorage.removeItem('countdown')
}
function restorePreviousCountdown(){
    // Get countdown from local storage if available
    if(localStorage.getItem('countdown')){
        inputConatiner.hidden= true;
        savedCoundown=JSON.parse(localStorage.getItem('countdown')); 
        countDownTitle = savedCoundown.title;
        countDownDate = savedCoundown.date;
        countDownValue = new Date(countDownDate).getTime();
        updateDOM(); 
    }
}
// Event LIstener
countDownForm.addEventListener('submit', updateCountDown);
countdownBtn.addEventListener("click" , reset);
completeBtn.addEventListener("click" , reset);
// Onload check local storage.
restorePreviousCountdown();







