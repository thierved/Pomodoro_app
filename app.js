
const timer = new Timer(1, 1);

$('.increment').on('click',() => {
});



$('#start').on('click',() => {
  timer.startTimer();
  $('.start-up-screen').addClass('disabled');
});

$('#pause').on('click',() => {
  timer.pauseTimer();
  $('#resume').on('click',() => {
    timer.resumeTimer();
  });
});


$('#stop').on('click',() => {
  timer.stopTimer();
  $('.start-up-screen').removeClass('disabled');
});

// =============================================================================

function Timer(duration = 25, pauseTime) {
  let timerDuration = duration*60;
  let minutes;
  let seconds;
  let timerTicker;
  let display = $('.timer');
  let timerEnded = false;

  this.startTimer =() => {
    timerDuration = duration*60;
    timerTicker = setInterval(tick,1000);
    tick();
  }

  this.pauseTimer = () => {
    clearInterval(timerTicker);
  }

  this.resumeTimer = () => {
    timerTicker = setInterval(tick,1000);
    tick();
  }

  this.stopTimer = () => {
    clearInterval(timerTicker);
    minutes = seconds = 0;
    display.text(timeFormater(minutes) + ":" + timeFormater(seconds));
  };

  let tick = () => {
      minutes = parseInt(timerDuration / 60, 10);
      seconds = parseInt(timerDuration % 60, 10);

      if (timerDuration >= 0) {
          timerDuration--;
        if (timerDuration === -1) {
          timerDuration = pauseTime*60;
          $('.mode h3').css('background-color','red');
          $('.mode h3').text('pause time');
          setInterval(() => {
            timerEnded = true
          }, pauseTime *60*1000-1000);
        }
      }

      if (timerEnded === true ) {
        setInterval(() => {
          clearInterval(timerTicker);
        },1000);
      }
      display.text(timeFormater(minutes) + ":" + timeFormater(seconds));
  }

  // ========================== HEILPER FUNCTIONS ==============================

  function timeFormater(min) {
      min = min < 10 ? "0" + min : min;
      return min;
  }
}
