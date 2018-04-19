function init(){

     var elements = new Array(7),
     iContainer = document.querySelector('.info-block-wrapper'),
     nav = document.querySelector('.slider-nav ul');

     for (let i = 0; i < elements.length; i++) {
          elements[i] ="<li><h2>Header " + (i+1) + "</h2> <p >Lorem ipsum dolor sit amet, consectetur adipiscing elitetur adipiscing elitetur adipiscing elitetur adipiscing elitetur adipiscing elitetur adipiscing elitetur adipiscing elit, </p></li>";
          iContainer.innerHTML += elements[i];
          nav.innerHTML += '<li><div class="dot"></div></li>';
     }

     var  modal = document.querySelector('.modal'),
          dots = document.querySelectorAll('.dot'),
          blockWidthPx =430;
          iCount = elements.length,
          currIndex = 1,
          leftArrow = document.querySelector('.left'),
          rightArrow = document.querySelector('.right'),
          closeBtn = document.querySelector('.close-element'),
          checkbox = document.querySelector('#disable-checkbox '),
          btn = document.querySelector('.btn'),
          storage = localStorage;
          console.log(blockWidthPx);

///////////////////////////////////////////////////////////////////////////////////////
     var nextSlide = function () {
          let blockWidth = parseInt(blockWidthPx);
          if (currIndex < iCount) {
               iContainer.style.left = '-'+ (blockWidth * currIndex) + 'px';
               currIndex++;
          } else if (currIndex == iCount) {
               iContainer.style.left = '0px';
               currIndex = 1;
          }
     }

     var prevSlide = function () {
          let blockWidth = parseInt(blockWidthPx);
          if (currIndex > 1) {
               currIndex = currIndex - 2;
               iContainer.style.left = '-'+ (blockWidth * currIndex) + 'px';
               currIndex++;
          } else if (currIndex == 1) {
               currIndex = iCount - 1;
               iContainer.style.left = '-'+ (blockWidth * currIndex) + 'px';
               currIndex++;
          }
     }

     var dotIndication = function (index) {
          for (let i = 0; i < dots.length; i++) {
               if (dots[i].classList.contains('active')) {
                    dots[i].classList.remove('active');
               }
          }
          dots[index-1].classList.add('active');
     }

     var close = function name(params) {
          modal.style.display = 'none';
     }

     var open = function name(params) {
          modal.style.display = 'block';
     }

     var enableM = function(state) {
          storage.setItem('isEnabled',state);
          console.log("Is modal enabled? " +storage.getItem('isEnabled'));
     }

     var keyIsUp = function(key) {
          if (key == 'ArrowRight') {
               nextSlide();
               dotIndication(currIndex);
          } else if (key == 'ArrowLeft') {
               prevSlide();
               dotIndication(currIndex);
          } else if (key == 'Escape'){
               close();
          }
     }

/////////////////////////////////////////////////////////////////////////////////////////////////
     dotIndication(currIndex);

     if (storage.getItem('isEnabled') === 'true' ) {
          setTimeout(open, 5000);
     }

     rightArrow.addEventListener('click', (e) => {nextSlide(); dotIndication(currIndex);});
     leftArrow.addEventListener('click', (e) => {prevSlide(); dotIndication(currIndex);});
     closeBtn.addEventListener('click', (e) => {close();});
     checkbox.addEventListener('click', (e) => {
          if (checkbox.checked == true) {
               enableM(false); 
          }  else {
               enableM(true);
          }
     });

     btn.addEventListener ('click', function(e) {enableM(true);});
     document.addEventListener('keyup', (e) => { keyIsUp(e.key); });
}

init();