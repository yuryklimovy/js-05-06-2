var timer = document.getElementById('timer');
var start = document.getElementById('startButton');
var stop = document.getElementById('stopButton');
var split = document.getElementById('splitButton');
var reset = document.getElementById('resetButton');
var splitText = document.getElementById('split');

var msec = 0;
var sec = 0;
var min = 0;
var hour = 0;
var msecSplit = 0;
var secSplit = 0;
var minSplit = 0;
var hourSplit = 0;
var count = 1;

function startTimer() {
  stop.style.display = 'inline-block';
  start.style.display = 'none';
  start.removeEventListener('click', startTimer);
  stop.addEventListener('click', stopTimer);
  split.addEventListener('click', splitTimer);
  reset.addEventListener('click', resetTimer);

  if (msec < 996) {
    msec = msec + 4;
  } else {
    msec = 0;
    if (sec < 59) {
      sec++;
    } else {
      sec = 0;
      if (min < 60) {
        min++;
      } else {
        min = 0;
        hour++;
      }
    }
  }

  if (msecSplit < 999) {
    msecSplit = msecSplit + 4;
  } else {
    msecSplit = 0;
    if (secSplit < 59) {
      secSplit++;
    } else {
      secSplit = 0;
      if (minSplit < 60) {
        minSplit++;
      } else {
        minSplit = 0;
        hourSplit++;
      }
    }
  }


  outputTimer(hour, min, sec, msec);
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
  timer.innerHTML = '00:00:00.000';
  msec = 0;
  sec = 0;
  hour = 0;
  min = 0;
  count = 1;
  msecSplit = 0;
  secSplit = 0;
  minSplit = 0;
  hourSplit = 0;

  var splitChild = document.getElementsByClassName('splitChild');
  for (var i = splitChild.length - 1 ; i >= 0; i--) {
    splitChild[i].remove();
  }

}
function splitTimer(){
  addSplit('Split');
}

function addSplit(marker) {
  if (msecSplit < 10) {
    msecSplit = '00' + msecSplit;
  } else if (msecSplit < 100) {
    msecSplit = '0' + msecSplit;
  }

  if (secSplit < 10) {
    secSplit = '0' + secSplit;
  }

  if (minSplit < 10) {
    minSplit = '0' + minSplit;
  }

  if (hourSplit < 10) {
    hourSplit = '0' + hourSplit;
  }

  div = document.createElement('h3');
  div.className= 'splitChild';
  div.innerHTML = count + ': ' + marker + ' ' + hourSplit + ":" + minSplit + ":" + secSplit + "." + msecSplit;
  splitText.appendChild(div);
  msecSplit = 0;
  secSplit = 0;
  minSplit = 0;
  hourSplit = 0;
  count++;
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

  timer.innerHTML = hour + ":" + min + ":" + sec + "." + msec;
}

start.addEventListener('click', startTimer);
