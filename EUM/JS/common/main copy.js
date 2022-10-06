$(function(){
    $('#fullpage').fullpage({
		//options here
		autoScrolling:true,
		scrollHorizontally: true,
    
    navigation: true,
    navigationPosition:'right',
    sectionsColor : ['#fff','#FFEDDB', '#fff', '#E3B7A0'],
    afterLoad: function(anchorLink, index){
        console.log("지금 섹션은" + index);
        if(index == 5){
            alert("마지막 입니다.")
        }
    }
	});

    $('.headerLogo').on("click", function() {
        $.fn.fullpage.moveTo(1);
    });
});

t = 53;
p = 0;
pm = $('.cards_inner__card').length;

$('.cards_inner__card').mousedown(function(){
  var ct = $(this).css('transform');
  var cts = ct.split(',')
  ctse = (cts[cts.length - 2] + 'px')
})

function on(){
  $('.cards_inner__card').draggable({
    start: function( event, ui ) {
      startPosition = ui.position.left;
    },
    drag:function(e, ui){
      if(ui.position.left > startPosition){
        ui.position.left = startPosition;
      }
      if(ui.position.left < -250){
        ui.position.left = -250;
      }
      x = ui.position.left;
      $(this).css('transform',' rotate(' + x/36 + 'deg)')
    },
    revert:function(valid) {
      if(x > 60 || x < - 60) {
        el = $(this)
        setTimeout(function(){
          el_class = el.attr('class').split(' ');
          el_class_end = el_class[1]
          el.addClass('invalid')
          if(p < 3){
            $('.points').find('.active').removeClass('active').next().addClass('active') 
            p++
          } else {
            $('.points').find('.active').removeClass('active')
            $('.points').find('.first').addClass('active') 
            p=0
          }
        },10)
        setTimeout(function(){
          $('.cards_inner__card').each(function(){
            $(this).addClass('animate');
            var ct = $(this).css('transform');
            var cts = ct.split(',')
            ctse = (parseInt(cts[cts.length - 2]) + 60 + 'px')
            $(this).css('transform','translateZ(' + ctse + ')');
          });
          $('.cards_inner .wrap').prepend('<div class="cards_inner__card ' + el_class_end + ' card_in"><div class="logo"></div></div>')
          el.remove();
          $('.cards_inner__card').removeClass('animate');
          on();
        },160);
        setTimeout(function(){
          $('.card_in').removeClass('card_in')
        },500);
      } else {
        $(this).css('transform','rotate(0deg)')
        return !valid;
      }
    },
    axis:'x',
    containment:'.cards_inner'
  });

  $('.cards_inner__card:nth-of-type(1)').draggable( 'disable' )
  $('.cards_inner__card:nth-of-type(2)').draggable( 'disable' )
  $('.cards_inner__card:nth-of-type(3)').draggable( 'disable' )
  $('.cards_inner__card:nth-of-type(4)').draggable( 'enable' )
}

on();

var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  direction: "vertical",
  autoplay: true,
  loop: true,
});

var divs = document.querySelectorAll(".best_product");
divs.forEach(function (elm) {
	elm.addEventListener("mouseenter", function () {
		var panel = document.querySelector(".highlight");
		panel.classList.toggle("highlight");
		elm.classList.toggle("highlight");
	});
});

window.addEventListener("keyup", function (e) {
	var panel = document.querySelector(".highlight");
	if (
		(e.keyCode == 37 || e.keyCode == 38) &&
		panel != document.querySelectorAll(".best_product")[0]
	) {
		panel.previousElementSibling.classList.toggle("highlight");
		panel.classList.toggle("highlight");
	}
	if (
		(e.keyCode == 39 || e.keyCode == 40) &&
		panel != document.querySelectorAll(".best_product")[3]
	) {
		panel.nextElementSibling.classList.toggle("highlight");
		panel.classList.toggle("highlight");
	}
});

window.focus();



// 하얀 달력
const init = {
  monList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  dayList: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  today: new Date(),
  monForChange: new Date().getMonth(),
  activeDate: new Date(),
  getFirstDay: (yy, mm) => new Date(yy, mm, 1),
  getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
  nextMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(++this.monForChange);
    this.activeDate = d;
    return d;
  },
  prevMonth: function () {
    let d = new Date();
    d.setDate(1);
    d.setMonth(--this.monForChange);
    this.activeDate = d;
    return d;
  },
  addZero: (num) => (num < 10) ? '0' + num : num,
  activeDTag: null,
  getIndex: function (node) {
    let index = 0;
    while (node = node.previousElementSibling) {
      index++;
    }
    return index;
  }
};

const $calBody = document.querySelector('.cal-body');
const $btnNext = document.querySelector('.btn-cal.next');
const $btnPrev = document.querySelector('.btn-cal.prev');

/**
 * @param {number} date
 * @param {number} dayIn
*/
function loadDate (date, dayIn) {
  document.querySelector('.cal-date').textContent = date;
  document.querySelector('.cal-day').textContent = init.dayList[dayIn];
}

/**
 * @param {date} fullDate
 */
function loadYYMM (fullDate) {
  let yy = fullDate.getFullYear();
  let mm = fullDate.getMonth();
  let firstDay = init.getFirstDay(yy, mm);
  let lastDay = init.getLastDay(yy, mm);
  let markToday;  // for marking today date
  
  if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
    markToday = init.today.getDate();
  }

  document.querySelector('.cal-month').textContent = init.monList[mm];
  document.querySelector('.cal-year').textContent = yy;

  let trtd = '';
  let startCount;
  let countDay = 0;
  for (let i = 0; i < 6; i++) {
    trtd += '<tr>';
    for (let j = 0; j < 7; j++) {
      if (i === 0 && !startCount && j === firstDay.getDay()) {
        startCount = 1;
      }
      if (!startCount) {
        trtd += '<td>'
      } else {
        let fullDate = yy + '.' + init.addZero(mm + 1) + '.' + init.addZero(countDay + 1);
        trtd += '<td class="day';
        trtd += (markToday && markToday === countDay + 1) ? ' today" ' : '"';
        trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
      }
      trtd += (startCount) ? ++countDay : '';
      if (countDay === lastDay.getDate()) { 
        startCount = 0; 
      }
      trtd += '</td>';
    }
    trtd += '</tr>';
  }
  $calBody.innerHTML = trtd;
}

/**
 * @param {string} val
 */
function createNewList (val) {
  let id = new Date().getTime() + '';
  let yy = init.activeDate.getFullYear();
  let mm = init.activeDate.getMonth() + 1;
  let dd = init.activeDate.getDate();
  const $target = $calBody.querySelector(`.day[data-date="${dd}"]`);

  let date = yy + '.' + init.addZero(mm) + '.' + init.addZero(dd);

  let eventData = {};
  eventData['date'] = date;
  eventData['memo'] = val;
  eventData['complete'] = false;
  eventData['id'] = id;
  init.event.push(eventData);
  $todoList.appendChild(createLi(id, val, date));
}

loadYYMM(init.today);
loadDate(init.today.getDate(), init.today.getDay());

$btnNext.addEventListener('click', () => loadYYMM(init.nextMonth()));
$btnPrev.addEventListener('click', () => loadYYMM(init.prevMonth()));

$calBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('day')) {
    if (init.activeDTag) {
      init.activeDTag.classList.remove('day-active');
    }
    let day = Number(e.target.textContent);
    loadDate(day, e.target.cellIndex);
    e.target.classList.add('day-active');
    init.activeDTag = e.target;
    init.activeDate.setDate(day);
    reloadTodo();
  }
});