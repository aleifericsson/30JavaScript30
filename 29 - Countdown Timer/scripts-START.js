let counter;//just a variable to store the interval
const display = document.querySelector('.display__time-left')
const end_disp = document.querySelector('.display__end-time');
const butt_list = document.querySelectorAll('[data-time]'); //[] means attribute

function timedown(secs){
    clearInterval(counter); //clears everything except current
    const curr = Date.now(); //current time in millisex
    const until = curr + secs*1000; //plus the input
    end_time(until);
    disp_time(secs) //runs once before set interval because that doesn't run on the first second or somethign
    
    counter = setInterval(()=>{ //interval only for update display, doesn't count time in case it skips an update
        const secs_left = Math.round((until - Date.now())/1000);
        if(secs_left<0){
            clearInterval(counter);//stops counter
            return;
        }
        disp_time(secs_left)
    },1000);
}

function disp_time(secs){
    const hr = Math.floor(secs/3600);
    const min = Math.floor((secs - hr*3600)/60)
    const sec = (secs-hr*60)%60;
    const min0 = min < 10 ? '0':''; //stupid shorthand to say that if min is less than ten, min0 is 0 otherwise its nothing
    const sec0 = sec < 10 ? '0':''; //stupid shorthand to say that if sec is less than ten, sec0 is 0 otherwise its nothing
    const text = `${hr}:${min0}${min}:${sec0}${sec}`;
    display.textContent = text;
    document.title = text;
}

function end_time(time){
    const fin = new Date(time);//convert milisex back to time
    const hr = fin.getHours()
    const min = fin.getMinutes(); 
    const min0 = min < 10 ? '0':'';
    end_disp.textContent = `Countdown finishes at ${hr}:${min0}${min}`;
}

function start(){
    timedown(parseInt(this.dataset.time));
}

butt_list.forEach(butt=>butt.addEventListener('click',start));

document.customForm.addEventListener('submit',function(e){
    e.preventDefault(); //stops page reload when submit form
    const mins = this.minutes.value;//minutes is the textinput name, value is the textcontent of that
    timedown(mins*60);
    this.reset()//clears form
}) //since customForm is a name, it can be directly selected using js without document.queryselect