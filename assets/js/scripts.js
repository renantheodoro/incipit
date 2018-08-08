// BANNER VIDEO PLAY

function banner_video_play() {
  if( $('#video_apresentation').prop('duration') != NaN ) {
    $('#video_apresentation').trigger('play');
    return true
  } else {
    return false;
  }
}

var video_check_interval = setInterval(function(){
  if( banner_video_play() ) {
    clearInterval(video_check_interval)
  }
}, 100)

//==========BANNER=========
$('#banner').css('height', $(window).height());
$('.section').css('height', $(window).height());

$(document).on('click', '#nextStartup', function(){
  ativaMenuStartUp();
});

//MOUSE WHEEL
function handle(delta) {

  banner_video_play()

    if (delta < 0) {
        /* EVENTO COM O MOUSE WHEEL DESCENDO */
        //action header
        if (!$('#header').hasClass('active')) {
            //coloca menu fixo
            setTimeout(function() {
                if (!$('#menuFixed').hasClass('active')) {
                    $('#menuFixed').addClass('active');
                }
            }, 500);

            $('#toTop').fadeIn();
        }

        ativaMenuStartUp();

        fpNav();

        muda_cor()

        if($('#house').offset().top == 0) {
          ativaCount();
        }



    } else {
        /* EVENTO COM O MOUSE WHEEL SUBINDO */
        if ($('#header').hasClass('active')) {
            //tira menu fixo
            $('#menuFixed').removeClass('active');

            $('#toTop').fadeOut();
        }

        ativaMenuStartUp();

        fpNav();

        muda_cor()

        if($('#house').hasClass('active')) {
          ativaCount();
        }
    }
}

function wheel(event) {
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
    } else if (event.detail) {
        delta = -event.detail / 3;
    }
    if (delta) handle(delta);
    if (event.preventDefault) event.preventDefault();
    event.returnValue = false;
}
if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

//count number
function setCount(qtd, id){
  var num = 0;
    setInterval(function(){
      if( num < qtd ) {
        num = num + 1;
        $('#' + id).html('');
        $('#' + id).html(num);
      }
    }, 8);
}

function ativaCount(){
  $('big').each(function(){
    var quant = parseInt($(this).attr('data-value'));
    var attrId = $(this).attr('id');
    setCount(quant, attrId);
  })
}

//bolinhas de navegação
function fpNav(){
  if (
      $('.section.active').hasClass('step')
  ) {
      if ($('li.startupArea').is(":visible")) {
        $('li.startupArea').fadeOut();
      }
      if ($('li.stepArea').is(":hidden")) {
          $('li.stepArea').fadeIn();
      }
  } else if (
      $('.section.active').hasClass('detail')
  ) {
      if ($('li.stepArea').is(":visible")) {
        $('li.startupArea').fadeOut();
      }
      if ($('li.startupArea').is(":hidden")) {
          $('li.startupArea').fadeIn();
      }
  } else {
      $('#fp-nav ul li').fadeOut();
  }
}

//ativa menu start up
function ativaMenuStartUp() {
  if ($('.section.active').hasClass('detail')) {
      if (!$('#menu-start').hasClass('active')) {
          $('#menu-start').addClass('active');
      }
  } else {
      $('#menu-start').removeClass('active');
  }
}

//muda cor botao toTop
function muda_cor() {
  if( $('.section.active').hasClass('atvWhite') ) {
    $('#toTop').removeClass('hide');
    $('#toTop').removeClass('black').addClass('white');
  } else if ( $('.section.active').hasClass('atvBlack') ) {
    $('#toTop').removeClass('hide');
    $('#toTop').removeClass('white').addClass('black');
  } else if ( $('.section.active').hasClass('atvBlack') ) {
    $('#toTop').removeClass('white').removeClass('black').addClass('hide');
  } else if( $('.section.active').attr('data-anchor') == 'contato' ) {
    if( $('#toTop:visible') ) {
      $('#toTop').addClass('hide');
    }
  } else {
    $('#toTop').removeClass('white').removeClass('black');
  }
}

//menu mobile
$(document).on('click', '.actionMenu', function(){

  if( $(this).hasClass('fa-bars') ) {
    $('#filter-menu').fadeIn();
    $(this).removeClass('fa-bars').addClass('fa-times');
  } else {
    $('#filter-menu').fadeOut();
    $(this).addClass('fa-bars').removeClass('fa-times');
  }

  $('#menu-mobile, #menuFixed').toggleClass('visible');


});

$(document).on('click', '#filter-menu', function(){
  $(this).fadeOut();
  $('#menu-mobile, #menuFixed').removeClass('visible');
  $('.actionMenu').addClass('fa-bars').removeClass('fa-times');
});

//menu fixo nas ancoras
$(document).on('click', 'a', function(){
  if( $(this).attr('href') == '#home' ) {
    $('#menuFixed').removeClass('active');
    $('#toTop').fadeOut();
  } else if(
    $(this).attr('href') == '#zero13' ||
    $(this).attr('href') == '#escoladireta' ||
    $(this).attr('href') == '#wemex' ||
    $(this).attr('href') == '#boats' ||
    $(this).attr('href') == '#coach'
  ) {
    $('#menu-start').addClass('active');
    $('#toTop').fadeIn();
  } else {
    $('#menuFixed').addClass('active');
    $('#menu-start').removeClass('active');
    $('#toTop').fadeIn();
  }
});

//square info
$(document).on('click', '#square-info', function(){
  $(this).addClass('active');
});


//open modal
$(document).on('click', '.openModal', function(e){
  e.preventDefault();
  $('.modal#' + $(this).attr('href')).addClass('active');
});
$(document).on('click', '.closeModal', function(){
  $('.modal').removeClass('active');
});
