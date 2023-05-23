/* eslint-env jquery */
(function ($) {
  let wpadminbar = 0;
  let headerHeight;
  const header = $('header');
  $(document).ready(init);
  function init() {
    headerHeight = header.outerHeight();
    $('html').css('scroll-padding-top', `calc(${headerHeight}px + 10px)`);
    const windowHeight = window.innerHeight;
    $('.modal').appendTo('body');
    $('section:last-child[class*="bg-"]').addClass('move');
    $('main').after($('section.move'));
    if (window.matchMedia('(max-width: 991.98px)').matches) {
      $('#mega-menu-wrap-primary .mega-menu-toggle + #mega-menu-primary').css(
        'max-height',
        `calc(${windowHeight}px - ${headerHeight}px)`
      );
    }

    if ($('section.hero.option1').next().hasClass('three-image-text section-overlap')) {
      $('section.hero.option1 .hero-content').addClass('overlap');
    }

    privacyNav();
    footerNav();
    matchHeight();
    carouselCount();
    changeButtonSize();
    stickyNav();
    cardTiles();
    if ($('#wpadminbar').length) {
      adminSize();
    }

    select();
    anchorScroll();
    cardTiles();
    bioTiles();
  }

  $(window).on('resize', resize);

  function resize() {
    headerHeight = header.outerHeight();
    const windowHeight = window.innerHeight;
    if (window.matchMedia('(max-width: 991.98px)').matches) {
      $('#mega-menu-wrap-primary .mega-menu-toggle + #mega-menu-primary').css(
        'max-height',
        `calc(${windowHeight}px - ${headerHeight}px)`
      );
    }

    footerNav();
    matchHeight();
    changeButtonSize();
    stickyNav();
    if ($('#wpadminbar').length) {
      adminSize();
    }
  }

  function adminSize() {
    $('#wpadminbar').prependTo('#wrapper-navbar');
    // eslint-disable-next-line no-unused-expressions
    window.matchMedia('(max-width: 782.98px)').matches ? (wpadminbar = 46) : (wpadminbar = 32);
  }

  function matchHeight() {
    const ctaHolderLink = $('.cta .cta-holder a');
    if (window.matchMedia('(min-width: 768px) and (max-width: 991.98px)').matches) {
      $('.three-image-text-content > div').matchHeight();
    }

    if (window.matchMedia('(max-width: 575.98px)').matches) {
      const contentHeight = $('section.hero.option3 .hero-content').outerHeight();
      const imagesHeight = $('section.hero.option3 .hero-image').outerHeight();
      const totalHeight = contentHeight + imagesHeight - 90;
      $('section.hero.option3').css('height', `${totalHeight}px`);
    }

    if (window.matchMedia('(max-width: 767.98px)').matches) {
      const tileHolder = $('.image-background-tile .tile-holder');
      const tileWidth = tileHolder.width();
      $(tileHolder).each(function () {
        $(this).children('a').css('width', `${tileWidth}px`);
      });
    } else {
      $('.image-background-tile .tile-holder a').css('width', '');
    }

    $('.four-column-text-icon .content-container .pre-title').matchHeight();
    $('.four-column-text-icon .content-container h5').matchHeight();
    $('.four-column-text-icon .content-container .description').matchHeight();
    $('.three-image-text .content-container .content-row h4').matchHeight();
    $('.three-image-text .content-container .content-row p').matchHeight();
    $('.image-background-tile .tile-holder h3').matchHeight();
    $('.image-background-tile .tile-holder p').matchHeight();
    $('.link-tiles .tile a').matchHeight();
    $('.three-col-row .content-col h4').matchHeight();
    $('.three-col-row .content-col p').matchHeight();
    $('.card-tiles .tile .front h4').matchHeight();
    $('.card-tiles .tile .front p').matchHeight();
    $('.bio-tiles .bio-tile .details-holder').matchHeight();
    ctaHolderLink.css('left', `calc(50% - ${ctaHolderLink.outerWidth() / 2}px)`);
    $('.bio-tiles.scrollable .bio-tile').each(function () {
      const tileHeight = $(this).innerHeight();
      const tile = $(this)[0].classList[1];
      $(`.description-holder.${tile}`).css('height', `${tileHeight}px`);
    });
  }

  function carouselCount() {
    $('.testimonial-holder').each(function () {
      const testimonialId = this.id;
      $(`#${testimonialId}`).on('slide.bs.carousel', (event) => {
        const nextH = $(event.relatedTarget).height();
        $(this).find('.active').parent().animate({ height: nextH }, 500);
        $(`#${testimonialId} .carousel-count .count`).text(event.to + 1);
      });
    });
  }

  function changeButtonSize() {
    $('[data-desktop="btn-sm"]').each(function () {
      if (window.matchMedia('(max-width: 991.98px)').matches) {
        $(this).removeClass('btn-sm');
      } else {
        $(this).addClass('btn-sm');
      }
    });
  }

  function stickyNav() {
    if (!$('.myObserver').length) {
      const newEl = document.createElement('div');
      newEl.classList.add('myObserver');
      const ref = document.querySelector('header');
      insertBefore(newEl, ref);
    }

    // eslint-disable-next-line unicorn/consistent-function-scoping
    function insertBefore(el, referenceNode) {
      referenceNode.parentNode.insertBefore(el, referenceNode);
    }

    const checkDiv = setInterval(() => {
      const otNoticeMenu = $('.otnotice-menu');
      if (otNoticeMenu.length > 0) {
        clearInterval(checkDiv);
        if ($('body').hasClass('parent-page-privacy-policy')) {
          const navHeight = $('#main-nav').outerHeight();
          const tocHeight = $('.toc-toggler').outerHeight();
          headerHeight = wpadminbar + navHeight + tocHeight;
        } else {
          headerHeight = header.outerHeight();
        }

        if (!$('.otnotice-menu-holder').length) {
          otNoticeMenu
            .wrap('<nav class="otnotice-menu-holder"></nav>')
            .css('top', `${headerHeight}px`);
        }

        if (!$('.otnotice-content-holder').length) {
          $('.otnotice-sections').wrap('<div class="otnotice-content-holder"></div>');
        }
      }
    }, 300); // check after 100ms every time

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio === 0) {
          $('#main-nav, #pre-nav').addClass('shrink-nav');
          if ($('body').hasClass('parent-page-privacy-policy')) {
            const navTransition = document.querySelector('#main-nav');
            navTransition.addEventListener('transitionend', () => {
              const navHeight = $('#main-nav').outerHeight();
              const tocHeight = $('.toc-toggler').outerHeight();
              headerHeight = wpadminbar + navHeight + tocHeight;
              $('.otnotice-menu').css('top', `calc(${headerHeight}px + 10px)`);
              $('html').css('scroll-padding-top', `calc(${headerHeight}px + 10px)`);
            });
          } else {
            const headerTransition = document.querySelector('header');
            headerTransition.addEventListener('transitionend', () => {
              headerHeight = header.outerHeight();
              $('.otnotice-menu').css('top', `calc(${headerHeight}px + 10px)`);
              $('html').css('scroll-padding-top', `calc(${headerHeight}px + 10px)`);
            });
          }
        } else if (entries[0].intersectionRatio === 1) {
          $('#main-nav, #pre-nav').removeClass('shrink-nav');
        }
      },
      { threshold: [0, 1] }
    );

    observer.observe(document.querySelector('.myObserver'));
    const headerClass = header[0].classList.contains('no-nav');
    if (!headerClass) {
      const element = document.querySelector('.mega-menu-toggle');
      let prevState = element.classList.contains('mega-menu-open');
      const observer2 = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          const { attributeName } = mutation;

          if (attributeName === 'class') {
            // eslint-disable-next-line unicorn/consistent-destructuring
            const currentState = mutation.target.classList.contains('mega-menu-open');
            if (prevState !== currentState) {
              prevState = currentState;
              $('body').toggleClass('blur');
              $('.custom-text-logo').toggleClass('opacity-0');
            }
          }
        }
      });
      observer2.observe(element, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }

  function select() {
    $('.form-select:not(.not-form)').attr('onchange', 'jQuery(this).removeClass("empty")');
    $('.form-select option[value=""]').attr('disabled', '');

    if ($('body').hasClass('parent-page-privacy-policy')) {
      $('#otnotice-language-dropdown').change(() => {
        $('.otnotice-menu-mobile').remove();
        $('section.content .container').hide();
        setTimeout(() => {
          stickyNav();
          privacyNav();
        }, 200);
      });
    }
  }

  function anchorScroll() {
    const anchorSelector = 'a[href^="#"]';
    const anchorList = document.querySelectorAll(anchorSelector);
    for (const link of anchorList) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        if ($('body').hasClass('parent-page-privacy-policy')) {
          const navHeight = $('#main-nav').outerHeight();
          const tocHeight = $('.toc-toggler').outerHeight();
          headerHeight = wpadminbar + navHeight + tocHeight;
          $('html').css('scroll-padding-top', `calc(${headerHeight}px + 10px)`);
        } else {
          headerHeight = header.outerHeight();
          $('html').css('scroll-padding-top', `calc(${headerHeight}px + 10px)`);
        }

        const destination = document.querySelector(this.hash);
        destination.scrollIntoView({
          behavior: 'smooth'
        });
      });
    }
  }

  function cardTiles() {
    const tile = $('.card-tiles .tile-holder');
    tile.each(function () {
      const front = $(this).children().children('div.front').outerHeight();
      $(this).children().children('div.back').css('height', `${front}px`);
    });
    $('.card-tiles .tile-holder .front').click(function () {
      $('.tile-holder').removeClass('active');
      $(this).parents('.tile-holder').addClass('active');
    });
    $('.card-tiles .tile-holder .back').click(function () {
      $(this).parents('.tile-holder').removeClass('active');
    });
  }

  function bioTiles() {
    const tile = $('.bio-tile');

    tile.find('.js-expander').click(function () {
      if ($('.bio-tiles').hasClass('scrollable')) {
        const thisTile = $(this).closest('.bio-tile');
        const cardTile = $(`.description-holder.${thisTile[0].classList[1]}`);
        if (thisTile.hasClass('is-collapsed')) {
          $('.description-holder').not(cardTile).removeClass('expand').addClass('collapse');
          cardTile.removeClass('collapse').addClass('expand');
          tile.not(thisTile).removeClass('is-expanded').addClass('is-collapsed');
          thisTile.removeClass('is-collapsed').addClass('is-expanded');
        } else {
          cardTile.removeClass('expand').addClass('collapse');
          $('.description-holder').not(cardTile).removeClass('expand').addClass('collapse');
          thisTile.removeClass('is-expanded').addClass('is-collapsed');
          tile.not(thisTile).removeClass('is-inactive');
        }
      } else {
        const thisTile = $(this).closest('.bio-tile');
        if (thisTile.hasClass('is-collapsed')) {
          tile.not(thisTile).removeClass('is-expanded').addClass('is-collapsed');
          thisTile.removeClass('is-collapsed').addClass('is-expanded');
        } else {
          thisTile.removeClass('is-expanded').addClass('is-collapsed');
          tile.not(thisTile).removeClass('is-inactive');
        }
      }
    });
  }

  function footerNav() {
    if (window.matchMedia('(max-width: 575.98px)').matches) {
      $('.site-footer-nav').each(function () {
        if (!$(this).hasClass('collapse-nav')) {
          $(this).addClass('collapse-nav');
        }

        const buttonCopy = $(this).children('h6').text().toLowerCase().replace(/ /g, '-');
        if (!$(this).children('h6').children('button').length) {
          $(this)
            .children('h6')
            .wrapInner(
              `<button class="collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${buttonCopy}-collapse" aria-expanded="false" aria-controls="${buttonCopy}-collapse"></button>`
            );
        }

        if (!$(this).children(`.menu-${buttonCopy}-container`).hasClass('collapse')) {
          $(this)
            .children(`.menu-${buttonCopy}-container`)
            .addClass('collapse')
            .attr('id', `${buttonCopy}-collapse`);
        }
      });
    } else {
      $('.site-footer-nav').each(function () {
        $(this).removeClass('collapse-nav');
        const buttonCopy = $(this).children('h6').text().toLowerCase().replace(/ /g, '-');
        $(this).children('h6').children('button').contents().unwrap();
        $(this)
          .children(`.menu-${buttonCopy}-container`)
          .removeClass('collapse')
          .removeClass('show')
          .removeAttr('id');
      });
    }
  }

  function privacyNav() {
    const checkNav = setInterval(() => {
      if ($('.otnotice-menu').length > 0) {
        // eslint-disable-next-line no-console
        console.log('ot ran');
        clearInterval(checkNav);
        $('#otnotice-collapse-expand-icon').remove();
        $('.otnotice-menu-mobile .otnotice-menu-selected-container').wrapInner(
          '<button class="toc-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target=".otnotice-menu-mobile-container" aria-controls="otnotice-menu-mobile-container" aria-expanded="false" aria-label="Toggle Privacy Table of Contents" ></button>'
        );
        const tocButton = $('.toc-toggler');
        $('.otnotice-menu-mobile .otnotice-menu-mobile-container')
          .addClass('collapse')
          .attr('style', '');
        const otNoticeMobileContainer = $('.otnotice-menu-mobile-container');
        const otNoticeDesktopLink = $('.otnotice-menu-section a');
        otNoticeMobileContainer.replaceWith(otNoticeMobileContainer.clone());
        otNoticeDesktopLink.addClass('btn btn-link-interactive btn-sm');
        $('.otnotice-menu-section-mobile a').addClass('btn btn-link-interactive btn-md');
        $('.otnotice-menu-mobile #otnotice-menu-selected').text('Table of Contents');
        $('.otnotice-menu-mobile').appendTo('header');
        headerHeight = header.outerHeight() + 10;
        $('html').css('scroll-padding-top', `${headerHeight}px`);
        otNoticeDesktopLink.click(function (e) {
          headerHeight = header.outerHeight() + 10;
          $('html').css('scroll-padding-top', `${headerHeight}px`);
          e.preventDefault();
          const desktopDestination = document.querySelector(this.hash);
          desktopDestination.scrollIntoView({
            behavior: 'smooth'
          });
          $('.otnotice-menu-section a').removeClass('active');
          $(this).addClass('active');
        });
        $('.otnotice-menu-section-mobile a').click(function (e) {
          const navHeight = $('#main-nav').outerHeight();
          const tocHeight = $('.toc-toggler').outerHeight();
          headerHeight = wpadminbar + navHeight + tocHeight;
          // eslint-disable-next-line no-console
          console.log(`header_height${headerHeight}`);
          $('html').css('scroll-padding-top', `${headerHeight}px`);
          e.preventDefault();
          const mobileDestination = document.querySelector(this.hash);
          mobileDestination.scrollIntoView({
            behavior: 'smooth'
          });
          $('.otnotice-menu-mobile #otnotice-menu-selected').text(this.textContent);
          $('.otnotice-menu-section-mobile a').removeClass('active');
          $(this).addClass('active');
          tocButton.addClass('collapsed');
          $('.otnotice-menu-mobile-container').removeClass('show');
          $('.otnotice-menu-mobile .otnotice-menu-mobile-container').attr('style', '');
        });
        const anchors = $('.otnotice-sections').find('section');

        $(window).scroll(() => {
          let i;
          headerHeight = header.outerHeight() + 20;
          const scrollTop = $(document).scrollTop();

          // highlight the last scrolled-to: set everything inactive first
          for (i = 0; i < anchors.length; i++) {
            $(`.otnotice-menu-holder ul li a[href="#${$(anchors[i]).attr('id')}"]`).removeClass(
              'active'
            );
            $(
              `.otnotice-menu-mobile-container li a[href="#${$(anchors[i]).attr('id')}"]`
            ).removeClass('active');
          }

          // then iterate backwards, on the first match highlight it and break
          for (i = anchors.length - 1; i >= 0; i--) {
            if (scrollTop > $(anchors[i]).offset().top - headerHeight) {
              $(`.otnotice-menu-holder ul li a[href="#${$(anchors[i]).attr('id')}"]`).addClass(
                'active'
              );
              $(
                `.otnotice-menu-mobile-container li a[href="#${$(anchors[i]).attr('id')}"]`
              ).addClass('active');
              break;
            }
          }
        });
      }
    }, 300); // check after 100ms every time
    setTimeout(() => {
      $('section.content .container').show();
    }, 500);
  }
})(jQuery);
