var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

window.addEventListener('load', function () {
  //Add class to body if IE10 or IE11
  if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
    document.body.classList.add('ie10');
  }
  if (!!window.MSInputMethodContext && !!document.documentMode) {
    document.body.classList.add('ie11');
  }

  // Matchmedia - If the screen width is < 768px
  const mq = window.matchMedia("(max-width: 768px)");
  if (mq.matches) {
    // Show nav function
    function showNav() {
      const nav = document.querySelector('.nav');
      const navToggle = document.querySelector('.nav-toggle');
      navToggle.addEventListener('click', function () {
        this.classList.toggle('nav-toggle--active')
        nav.classList.toggle('nav--visible')
      });
    }
    showNav();
  }

  // Shrink header/logo on scroll
  function resizeHeaderOnScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 150,
      header = document.querySelector('.header'),
      logo = document.querySelector('.logo');

    if (distanceY > shrinkOn) {
      header.classList.add("header--small");
      logo.classList.add("logo--small");
    } else {
      header.classList.remove("header--small");
      logo.classList.remove("logo--small");
    }
  }
  window.addEventListener('scroll', resizeHeaderOnScroll);

  // Smooth scroll nav links
  const navLinks = document.querySelectorAll('.nav__link');
  const bannerBtn = document.querySelector('.banner__btn');
  const aboutSection = document.querySelector('#about');
  const performanceSection = document.querySelector('#performance');
  const brandsSection = document.querySelector('#brands');
  const careersSection = document.querySelector('#careers');
  // Clicking banner button scrolls to careers
  if (bannerBtn !== null) {
    bannerBtn.addEventListener('click', function(e) {
      careersSection.scrollIntoView({behavior:'smooth'});
      e.preventDefault();
    })
  }
  // Clicking about link scrolls to about
  navLinks[0].addEventListener('click', function(e) {
    aboutSection.scrollIntoView({behavior:'smooth'});
    e.preventDefault();
  })
  // Clicking performance link scrolls to performance
  navLinks[1].addEventListener('click', function(e) {
    performanceSection.scrollIntoView({behavior:'smooth'});
    e.preventDefault();
  })
  // Clicking brands link scrolls to brands
  navLinks[2].addEventListener('click', function(e) {
    brandsSection.scrollIntoView({behavior:'smooth'});
    e.preventDefault();
  })
  // Clicking careers link scrolls to careers
  navLinks[3].addEventListener('click', function(e) {
    careersSection.scrollIntoView({behavior:'smooth'});
    e.preventDefault();
  })

  // Detect if element comes into the viewport - animations
  // https://alligator.io/js/intersection-observer/

  const config = {
    threshold: [0.25]
  };

  // If an element with the class 'will-animate' comes into view...
  const inView = document.querySelectorAll('.will-animate');
  var observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add('will-animate--animated');
      }
    });
  }, config);

  inView.forEach(image => {
    observer.observe(image);
  });

  // Animate odometers when they come into view
  const configOdometer = {
    threshold: [1]
  };

  const odometerInView = document.querySelectorAll('.performance__odometer');
  var observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        //Monthly page views odometer
        var odometer1 = document.querySelector('#odometer1');
        odometer1.innerHTML = 226;
        //Monthly unique users odometer, init after delay
        setTimeout(() => {
          var odometer2 = document.querySelector('#odometer2');
          odometer2.innerHTML = 29;
        }, 500);
        //Monthly sessions odometer, init after delay
        setTimeout(() => {
          var odometer3 = document.querySelector('#odometer3');
          odometer3.innerHTML = 41.9;
        }, 1000);
        //Social & Newsletter followers odometer, init after delay
        setTimeout(() => {
          var odometer4 = document.querySelector('#odometer4');
          odometer4.innerHTML = 6;
        }, 1200);
      }
    });
  }, configOdometer);

  odometerInView.forEach(image => {
    observer.observe(image);
  });

  // Making nav link active when section comes into view
  // https://codepen.io/SWBennett06/pen/bLEjJR
  const sections = document.querySelectorAll('.home-section');
  const sectionsArr = Array.from(sections);

  const navItems = document.querySelectorAll('.nav .nav__link');
  function activateNavByIndex(index) {
    if (sections[index].classList.contains('nav__link--active'))
      return;

    const currentActive = document.querySelectorAll('.nav .nav__link--active');
    for (let i = currentActive.length - 1; i >= 0; i--) {
      currentActive[i].classList.remove('nav__link--active');
    }
    navItems[index].classList.add('nav__link--active');
  }

  const scrollspy = new IntersectionObserver(entries => {
    entries.sort((a, b) => a.intersectionRatio - b.intersectionRatio).reverse();
    if (entries[0].intersectionRatio != 0) {
      activateNavByIndex(sectionsArr.indexOf(entries[0].target))
    }
  }, {
    rootMargin: '75px 0px 0px 0px'
  });

  sections.forEach(element => {
    scrollspy.observe(element);
  });

  // If the modal is open, hide overflow on body
  var careersLabel = document.querySelectorAll('.careers__label');
  if (careersLabel !== null) {
    careersLabel.forEach(function(label) {
      label.addEventListener('click', function(){
        document.documentElement.classList.add('modal-visible');
      });
    });
  }

  //If the modal close button is clicked, hide class 'body--modal-visible'
  var modalClose = document.querySelectorAll('.careers__close-label');
  if (modalClose !== null) {
    modalClose.forEach(function(closeBtn) {
      closeBtn.addEventListener('click', function(){
        document.documentElement.classList.remove('modal-visible');
      });
    });
  }

  // Footer year
  var d = new Date();
  document.querySelector('.footer__year').innerHTML = d.getFullYear();
});


}
/*
     FILE ARCHIVED ON 08:30:53 Dec 28, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:28:07 Jul 30, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 164.983
  exclusion.robots: 0.081
  exclusion.robots.policy: 0.073
  RedisCDXSource: 1.674
  esindex: 0.006
  LoadShardBlock: 145.899 (3)
  PetaboxLoader3.datanode: 82.096 (5)
  CDXLines.iter: 14.693 (3)
  PetaboxLoader3.resolve: 110.624 (4)
  load_resource: 96.227 (2)
*/