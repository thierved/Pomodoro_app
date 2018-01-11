
let timer;
// ========================= UI Contoll =======================================

$('.increment').on('click',function() {
  $(this).parent().find('.minutes')
         .text(formateIt(parseInt($(this).parent().find('.minutes').text()) + 1));
});

$('.decrement').on('click',function() {
  $(this).parent().find('.minutes')
         .text(formateIt(parseInt($(this).parent().find('.minutes').text()) - 1));
});

$('#start').on('click',() => {
  timer = new Timer(parseInt($('.focus-time .minutes').text()),
                    parseInt($('.pause-time .minutes').text()));
  timer.startTimer();
  $('.start-up-screen').addClass('disabled');
});

$('#pause').on('click',() => {
  timer.pauseTimer();
  $('#resume').on('click',() => {
    timer.resumeTimer();
    $('#resume').off();
  });
});

$('#stop').on('click',() => {
  timer.stopTimer();
  $('.start-up-screen').removeClass('disabled');
});

// =============================================================================

function Timer(duration = 25, pauseTime = 5) {
  let timerDuration = duration*60;
  let minutes;
  let seconds;
  let timerTicker;
  let display = $('.timer');
  let timerEnded = false;

  this.startTimer =() => {
    clearInterval(timerTicker);
    timerDuration = duration*60;
    timerTicker = setInterval(tick,1000);
    tick();
  }

  this.pauseTimer = () => {
    clearInterval(timerTicker);
  }

  this.resumeTimer = () => {
    clearInterval(timerTicker);
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
          $('.mode h3').css('background-color','rgba(233, 99, 44, 0.7)');
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
}


// ========================== HEILPER FUNCTIONS ==============================

  function timeFormater(min) {
      min = min < 10 ? "0" + min : min;
      return min;
  }

  function formateIt(num) {
    return num > 0 ? num : 0;
  }
