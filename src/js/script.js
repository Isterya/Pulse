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
      tabDetail = document.querySelectorAll('.catalog-item__link'),
      tabBack = document.querySelectorAll('.catalog-item__back');

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

   function tabDetailsBtn() {
      tabDetail.forEach((item) => {
         item.addEventListener('click', (e) => {
            const target = e.target;
            e.preventDefault();

            if (target && target.classList.contains('catalog-item__link')) {
               const card = target.closest('.catalog-item');
               if (card) {
                  card.querySelector('.catalog-item__content').classList.toggle('catalog-item__content_active');
                  card.querySelector('.catalog-item__list').classList.toggle('catalog-item__list_active');
               }
            }
         });
      });
   }

   function tabBackBtn() {
      tabBack.forEach((item) => {
         item.addEventListener('click', (e) => {
            const target = e.target;
            e.preventDefault();

            if (target && target.classList.contains('catalog-item__back')) {
               const card = target.closest('.catalog-item');
               if (card) {
                  card.querySelector('.catalog-item__list').classList.toggle('catalog-item__list_active');
                  card.querySelector('.catalog-item__content').classList.toggle('catalog-item__content_active');
               }
            }
         });
      });
   }

   tabDetailsBtn();
   tabBackBtn();
}

tabs();

// Modal
function modal(triggerSelector) {
   const overlay = document.querySelector('.overlay'),
      modals = document.querySelectorAll('.modal');

   function showModal(modalId) {
      overlay.style.display = 'block';
      const modal = document.getElementById(modalId);
      modal.style.display = 'block';
      modal.classList.add('fadeIn');
      document.body.style.overflow = 'hidden';
   }

   function hideModal() {
      overlay.classList.add('fadeOut');
      setTimeout(() => {
         overlay.style.display = 'none';
         overlay.classList.remove('fadeOut');
         document.body.style.overflow = '';
         modals.forEach((modal) => {
            modal.style.display = 'none';
            modal.classList.remove('fadeIn');
         });
      }, 400);
   }

   document.addEventListener('click', (e) => {
      const target = e.target;
      if (target.matches(triggerSelector)) {
         const modalId = target.dataset.modal;
         if (modalId) {
            showModal(modalId);
         }
      } else if (target.matches('.modal__close')) {
         hideModal();
      } else if (target.matches('.button_mini')) {
         const orderModalDescr = document.getElementById('order').querySelector('.modal__descr');
         const subtitle = target.closest('.catalog-item').querySelector('.catalog-item__subtitle').innerText;
         orderModalDescr.innerText = subtitle;
         showModal('order');
      } else if (target === overlay) {
         hideModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && overlay.style.display === 'block') {
         hideModal();
      }
   });
}

modal('[data-modal]');
modal('.button_mini');
