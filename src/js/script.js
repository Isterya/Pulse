// slider
function slider() {
   const slider = tns({
      container: '.carousel__inner',
      items: 1,
      slideBy: 'page',
      controls: false,
      nav: false,
   });

   document.querySelector('.prev').addEventListener('click', () => {
      slider.goTo('prev');
   });

   document.querySelector('.next').addEventListener('click', () => {
      slider.goTo('next');
   });
}

slider();

// tabs
function tabs() {
   const tabContent = document.querySelectorAll('.catalog__content'),
      tabWrapper = document.querySelector('.catalog__tabs'),
      tabs = document.querySelectorAll('.catalog__tab'),
      detailLinks = document.querySelectorAll('.catalog-item__link'),
      backLinks = document.querySelectorAll('.catalog-item__back');

   function hideTabContent() {
      tabContent.forEach((item) => {
         item.style.display = 'none';
      });
      tabs.forEach((item) => {
         item.classList.remove('catalog__tab_active');
      });
   }

   function showTabContent(i = 0) {
      tabContent[i].style.display = 'flex';
      tabs[i].classList.add('catalog__tab_active');
   }

   hideTabContent();
   showTabContent();

   // Handle clicks on catalog tabs
   tabWrapper.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.closest('.catalog__tab')) {
         tabs.forEach((item, i) => {
            if (target === item || target.parentElement === item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });

   // Handle clicks on detail links (open details)
   detailLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
         e.preventDefault();
         const itemWrapper = link.closest('.catalog-item__wrapper');
         const itemContent = itemWrapper.querySelector('.catalog-item__list');
         const itemContentDetail = itemWrapper.querySelector('.catalog-item__content');
         itemContent.classList.toggle('catalog-item__list_active');
         itemContentDetail.classList.toggle('catalog-item__content_active');
      });
   });

   // Handle clicks on back links (close details)
   backLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
         e.preventDefault();
         const itemWrapper = link.closest('.catalog-item__wrapper');
         const itemContent = itemWrapper.querySelector('.catalog-item__list');
         const itemContentDetail = itemWrapper.querySelector('.catalog-item__content');
         itemContent.classList.remove('catalog-item__list_active');
         itemContentDetail.classList.remove('catalog-item__content_active');
      });
   });
}

tabs();
