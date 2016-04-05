var timerText = document.getElementById('timer');
var start = document.getElementById('startButton');
var stop = document.getElementById('stopButton');
var split = document.getElementById('splitButton');
var reset = document.getElementById('resetButton');
var splitText = document.getElementById('split');


var timer = {
  msec : 0,
  sec : 0,
  min : 0,
  hour : 0,
  msecSplit : 0,
  secSplit : 0,
  minSplit : 0,
  hourSplit : 0,
  count : 1
};

function startTimer() {
  stop.style.display = 'inline-block';
  start.style.display = 'none';
  start.removeEventListener('click', startTimer);
  stop.addEventListener('click', stopTimer);
  split.addEventListener('click', splitTimer);
  reset.addEventListener('click', resetTimer);

  if (timer.msec < 996) {
    timer.msec = timer.msec + 4;
  } else {
    timer.msec = 0;
    if (timer.sec < 59) {
      timer.sec++;
    } else {
      timer.sec = 0;
      if (timer.min < 60) {
        timer.min++;
      } else {
        timer.min = 0;
        timer.hour++;
      }
    }
  }

  if (timer.msecSplit < 999) {
    timer.msecSplit = timer.msecSplit + 4;
  } else {
    timer.msecSplit = 0;
    if (timer.secSplit < 59) {
      timer.secSplit++;
    } else {
      timer.secSplit = 0;
      if (timer.minSplit < 60) {
        timer.minSplit++;
      } else {
        timer.minSplit = 0;
        timer.hourSplit++;
      }
    }
  }
  outputTimer(timer.hour, timer.min, timer.sec, timer.msec);
  timerId = setTimeout(startTimer, 4);
}

function stopTimer() {
  clearTimeout(timerId);
  stop.style.display = 'none';
  start.style.display = 'inline-block';
  stop.removeEventListener('click', stopTimer);
  split.removeEventListener('click', splitTimer);
  start.addEventListener('click', startTimer);
  addSplit('Stop');
}


function resetTimer() {
  clearTimeout(timerId);
  stop.removeEventListener('click', stopTimer);
  split.removeEventListener('click', splitTimer);
  reset.removeEventListener('click', resetTimer);
  start.addEventListener('click', startTimer);
  stop.style.display = 'none';
  start.style.display = 'inline-block';
  timerText.innerHTML = '00:00:00.000';
  timer.msec = 0;
  timer.sec = 0;
  timer.hour = 0;
  timer.min = 0;
  timer.count = 1;
  timer.msecSplit = 0;
  timer.secSplit = 0;
  timer.minSplit = 0;
  timer.hourSplit = 0;

  var splitChild = document.getElementsByClassName('splitChild');
  for (var i = splitChild.length - 1 ; i >= 0; i--) {
    splitChild[i].remove();
  }

}
function splitTimer(){
  addSplit('Split');
}

function addSplit(marker) {
  if (timer.msecSplit < 10) {
    timer.msecSplit = '00' + timer.msecSplit;
  } else if (timer.msecSplit < 100) {
    timer.msecSplit = '0' + timer.msecSplit;
  }

  if (timer.secSplit < 10) {
    timer.secSplit = '0' + timer.secSplit;
  }

  if (timer.minSplit < 10) {
    timer.minSplit = '0' + timer.minSplit;
  }

  if (timer.hourSplit < 10) {
    timer.hourSplit = '0' + timer.hourSplit;
  }

  div = document.createElement('h3');
  div.className= 'splitChild';
  div.innerHTML = timer.count + ': ' + marker + ' ' + timer.hourSplit + ":" + timer.minSplit + ":" + timer.secSplit + "." + timer.msecSplit;
  splitText.appendChild(div);
  timer.msecSplit = 0;
  timer.secSplit = 0;
  timer.minSplit = 0;
  timer.hourSplit = 0;
  timer.count++;
}


function outputTimer(hour, min, sec, msec) {
  if (msec < 10) {
    msec = '00' + msec;
  } else if (msec < 100) {
    msec = '0' + msec;
  }

  if (sec < 10) {
    sec = '0' + sec;
  }

  if (min < 10) {
    min = '0' + min;
  }

  if (hour < 10) {
    hour = '0' + hour;
  }

  timerText.innerHTML = hour + ":" + min + ":" + sec + "." + msec;
}

start.addEventListener('click', startTimer);
