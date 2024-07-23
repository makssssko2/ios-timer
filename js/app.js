//================ Урок 11 ( Секундомер ) ==============
//Вытаскиваем все нужные элементы - время, кнопки и тд в переменные для дальнейшей работы
const timerStart = document.querySelector('.timer__start');
const timerStop = document.querySelector('.timer__stop');
const timerReset = document.querySelector('.timer__reset');
const timerCircle = document.querySelector('.timer__circle');
const circlesList = document.querySelector('.circles-list');
let timerMins = document.querySelector('.timer__mins');
let timerSec = document.querySelector('.timer__sec');
let timerMs = document.querySelector('.timer__ms');
//Создаем переменные для времени и итераций внтури программы
let circleCount = 0;
let min = 0;
let sec = 0;
let ms = 0;
//Создаем объекты для хранения времени круга и изначального времени
let timeNull = {
    min: 0,
    sec: 0,
    ms: 0,
    abs: 0,
    setAbs(min,sec,ms){
        this.abs = min*60000 + sec*1000 + ms;
    },
    setValues(){
        let temp = this.abs;
        this.min = Math.trunc(this.abs/60000);
        this.abs-= this.min*60000;
        this.sec= Math.trunc(this.abs/1000);
        this.abs-= this.sec*1000;
        this.ms = this.abs;
        this.abs = temp;
    }
}
let timeNow = {
    setAbs(min,sec,ms){
        this.abs = min*60000 + sec*1000 + ms;
    },
    setValues(){
        let temp = this.abs;
        this.min = Math.trunc(this.abs/60000);
        this.abs-= this.min*60000;
        this.sec= Math.trunc(this.abs/1000);
        this.abs-= this.sec*1000;
        this.ms = this.abs;
        this.abs = temp;
    }
}
//Создаем переменную для хранения идентификатора таймера
let startTimerID;
//Создаем прослушку события 'клик' на кнопку старт
timerStart.addEventListener('click',function(){
    this.classList.add('button_none');
    timerStop.classList.remove('button_none');
    timerCircle.classList.remove('button_disabled');
    timerCircle.classList.remove('button_none');
    timerReset.classList.add('button_none');
    startTimerID = setInterval(function(){
        ms++;
        timerMins.innerText = sec == 59 && ms>99 ? (sec = 0,ms=0, timerSec.innerText = '00', min < 9 ? `0${++min}`: `${++min}`) :timerMins.textContent; 
        timerSec.innerText = ms > 99 ? (ms = 0, sec < 9 ? `0${++sec}`: `${++sec}`) : timerSec.textContent;
        timerMs.innerText = ms < 10 ? `0${ms}` : `${ms}`;
    },10);
})
//Создаем прослушку события 'клик' на кнопку стоп
timerStop.addEventListener('click',function(){
    this.classList.add('button_none');
    timerStart.classList.remove('button_none');
    timerReset.classList.remove('button_none');
    timerCircle.classList.add('button_none');
    clearInterval(startTimerID)
})
//Создаем прослушку события 'клик' на кнопку сброс
timerReset.addEventListener('click',function(){
    this.classList.add('button_none');
    timerCircle.classList.remove('button_none');
    timerCircle.classList.add('button_disabled');
    min = sec = ms = 0;
    timerMs.innerText = '00';
    timerSec.innerText = '00';
    timerMins.innerText = '00';
    const circles = document.querySelectorAll('.circles-list__row');
    for(element of circles){
        element.remove();
    }
    circleCount = 0;
    timeNull['abs'] = 0;
})
//Создаем прослушку события 'клик' на кнопку Круг
timerCircle.addEventListener('click',function(){
    timeNow['abs'] = (min*60000 + sec*1000 + ms) - timeNull['abs'];
    timeNow.setValues();
    timeNull.setAbs(min,sec,ms);
    timeNull.setValues();
    circlesList.insertAdjacentHTML('beforeend',`<li class="circles-list__row"><span>Круг ${++circleCount}</span><span> ${timeNow['min'] < 10 ? `0${timeNow['min']}`: timeNow['min']}:${timeNow['sec'] < 10 ? `0${timeNow['sec']}`: timeNow['sec']}:${timeNow['ms']>=100 ? Math.trunc(timeNow['ms']/100) : timeNow['ms']}</span></li>`);
}) 