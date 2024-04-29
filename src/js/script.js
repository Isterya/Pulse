document.addEventListener('DOMContentLoaded', () => {
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

   // Form validation
   function validateForms(form) {
      $(form).validate({
         rules: {
            name: {
               required: true,
               minlength: 2,
            },
            phone: 'required',
            email: {
               required: true,
               email: true,
            },
         },
         messages: {
            name: {
               required: 'Пожалуйста, введите свое имя',
               minlength: jQuery.validator.format('Введите {0} символа!'),
            },
            phone: 'Пожалуйста, введите свой номер телефона',
            email: {
               required: 'Пожалуйста, введите свою почту',
               email: 'Неправильно введен адрес почты',
            },
         },
      });
   }

   validateForms('#consultation-form');
   validateForms('#consultation form');
   validateForms('#order form');

   // tel-input
   $('input[name=phone]')
      .mask('+380 (999) 999-99-99')
      .click(function () {
         this.setSelectionRange(6, 6);
      });

   // sending email
   $('form').submit(function (e) {
      e.preventDefault();
      $.ajax({
         type: 'POST',
         url: 'mailer/smart.php',
         data: $(this).serialize(),
      }).done(function () {
         $(this).find('input').val('');
         $('#consultation, #order').fadeOut();
         $('.overlay, #thanks').fadeIn('slow');

         $('form').trigger('reset');
      });
      return false;
   });

   // Smooth scroll and pageup

   window.addEventListener('scroll', function () {
      const pageup = document.querySelector('.pageup');
      if (window.pageYOffset > 1600) {
         pageup.classList.add('fadeIn');
         pageup.style.display = 'block';
         pageup.classList.remove('fadeOut');
      } else {
         pageup.classList.add('fadeOut');
      }
   });

   const pageup = document.querySelector('.pageup');

   pageup.addEventListener('click', (event) => {
      const hash = pageup.hash;
      const targetElement = document.querySelector(hash);

      if (hash !== '' && targetElement) {
         event.preventDefault();
         const scrollTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
         const duration = 200;
         const startPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
         let startTime = null;

         const scrollToPosition = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = elapsed / duration;
            window.scrollTo(0, easeInOutQuad(startPosition, scrollTop, progress));
            elapsed < duration ? requestAnimationFrame(scrollToPosition) : (window.location.hash = hash);
         };

         const easeInOutQuad = (start, end, progress) =>
            progress < 0.5
               ? 2 * progress * progress * (end - start) + start
               : -1 + (4 - 2 * progress) * progress * (end - start) + start;

         requestAnimationFrame(scrollToPosition);
      }
   });
});
