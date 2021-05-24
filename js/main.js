const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

//lodash.js
/*
onmousemove, onmouseover, onscroll 같은 이벤트는 1초 안에도 수 십 번씩 과다하게 호출될 수 있다. 
이런 이벤트에 무거운 로직을 끼워두면 당연히 웹페이지의 성능이 떨어질 수 밖에 없다. 
따라서 로직이 적당히 호출될 수 있도록 조절하는 작업이 필요한데, 이 때 간편하게 사용할 수 있는 것이 _.throttle 이다.
*/
window.addEventListener('scroll',_.throttle(function(){ 
  if(window.scrollY > 500){
    //배지 숨기기
    // badgeEl.style.display = 'none';
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });

    gsap.to(toTopEl, .2, {
      x: 0
    });

  }else{
    //배지 보이기
    // badgeEl.style.display = 'block';
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });

    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
},300));
//_.throttle(함수,시간)
toTopEl.addEventListener('click',function () {
  gsap.to(window, .7, {
    scrollTo: 0
  })
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl,index){
  // gsap.to(요소, 지속시간, 옵션);
  gsap.to(fadeEl,1,{
    delay: (index+ 1) * .7, //0.7, 1.4, 2.1, 2.7
    opacity:1
  });
});

//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container',{
  direction: 'vertical',
  autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper-container',{
  slidesPerView:3, //한번 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay:{
    delay: 5000
  },
  pagination :{
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl:'.promotion .swiper-prev',
    nextEl:'.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container',{
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click',function(){
  isHidePromotion = !isHidePromotion;
  if(isHidePromotion){
    //숨김 처리
    promotionEl.classList.add('hide');
  }else{
    //보임 처리
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject (selector, delay, size){
  //gsap.to(요소, 시간, 옵션);
  gsap.to(
      selector, //선택자
    random(1.5,2.5), //애니메이션 동작 시간
    { //옵션
      y: size,
      repeat: -1, //무한반복 옵션
      yoyo: true, //애니메이션 진행하고 돌아오는 옵션
      ease: Power1.easeInOut,
      delay: random(0,delay)
    }
  );
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

//스크롤 위치 계산 애니메이션
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
  .Scene({
    triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
    triggerHook: .8 //각 section에 수직으로 시작 0 ~ 끝 1 기준
  })
  .setClassToggle(spyEl,'show')
  .addTo(new ScrollMagic.Controller());
});