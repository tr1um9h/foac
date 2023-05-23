/* eslint-env jquery */
import jsSHA from 'jssha';

(function ($) {
  const body = $('body');
  $(document).ready(analyticsEvents);
  function analyticsEvents() {
    const wholeTitle = document.title.split(' - ');
    const pageTitle = 0 in wholeTitle && wholeTitle[0] !== '' ? wholeTitle[0] : document.title;
    const fullUrl = window.location.href;
    const pathName = new URL(fullUrl).pathname;
    const firstLvl = pathName.split('/');
    const contentGroup =
      1 in firstLvl && firstLvl[1] !== '' ? firstLvl[1] : 'home'; /* first level  */
    let clientID = '';
    if (document.cookie.includes('_ga')) {
      clientID = readCookie('_ga');
    } else if (document.cookie.includes('_gid')) {
      clientID = readCookie('_gid');
    }

    // eslint-disable-next-line no-restricted-globals
    const curHost = new RegExp(location.host);
    const searchArray = ['q', 's', 'search', 'query', 'keyword'];

    /* Main event, need to reset to clear all props */
    function BasicEvent() {
      this.event = 'page_view';
      this.pageTitle = pageTitle;
      this.fullUrl = fullUrl;
      this.contentGroup = contentGroup;
      this.clientID = clientID;
    }

    window.dataLayer = window.dataLayer || [];

    gaPageView(BasicEvent, window.dataLayer);

    gaBottomScrolled(BasicEvent, window.dataLayer);

    gaClickEvent(BasicEvent, window.dataLayer, curHost);

    gaFormFirstInteraction(BasicEvent, window.dataLayer);

    gaFormFieldChange(BasicEvent, window.dataLayer);

    gaSearchResults(BasicEvent, window.dataLayer, searchArray, fullUrl);

    gaGravityFormSubmit(BasicEvent, window.dataLayer);

    gaGravityFormErrorAndSteps(BasicEvent, window.dataLayer);

    gaPageLeave(BasicEvent, window.dataLayer);

    gaMultipleVideos(BasicEvent, window.dataLayer, fullUrl);
  }

  function readCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') {
        // eslint-disable-next-line unicorn/prefer-string-slice
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) === 0) {
        // eslint-disable-next-line unicorn/prefer-string-slice
        return c.substring(nameEQ.length, c.length);
      }
    }

    return null;
  }

  function getSearchQ(sParam) {
    const sPageURL = window.location.search.slice(1);
    const sURLVariables = sPageURL.split('&');
    for (const sURLVariable of sURLVariables) {
      const sParameterName = sURLVariable.split('=');
      if (sParameterName[0] === sParam) {
        return decodeURIComponent(sParameterName[1]);
      }
    }

    return false;
  }

  function changesecondstoMinutes(youtubeTime) {
    const newFormat = new Date(Number.parseFloat(youtubeTime) * 1000);
    // eslint-disable-next-line prettier/prettier
    return youtubeTime >= 3600 ? newFormat.toISOString.slice(11, 19) : newFormat.toISOString().slice(14, 19);
  }

  function gaPageView(BasicEvent, dataLayer) {
    const eventObj = new BasicEvent();
    /* event fired when a page is loaded */
    // eslint-disable-next-line no-console
    console.log(eventObj);
    dataLayer.push(eventObj);
  }

  function gaBottomScrolled(BasicEvent, dataLayer) {
    /* fires when a user scrolls to the bottom of the page */
    let justOnce = 0;
    let eventObj;
    $(window).on('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && justOnce === 0) {
        eventObj = new BasicEvent();
        eventObj.event = 'scroll';
        // eslint-disable-next-line no-console
        console.log(eventObj);
        dataLayer.push(eventObj);
        justOnce = 1;
        // return dataLayer;
      }
    });
  }

  function gaClickEvent(BasicEvent, dataLayer, curHost) {
    /* fires when a user clicks on a link that leads them off the site */
    let eventObj;
    body.on('click', 'a', function (e) {
      const _t = $(this);
      const curHref = _t.attr('href');
      const curTarget = _t.attr('target');
      const downloadAttr = _t.attr('download');
      if (typeof downloadAttr === 'undefined') {
        e.preventDefault();
      }

      if (
        typeof curHref === 'undefined' ||
        curHost.test(curHref) ||
        curHref === '#' ||
        curHref.indexOf('/') === 0 ||
        curHref.includes('#') ||
        (typeof curHref !== 'undefined' && curHref.includes('javascript:void(0);')) ||
        (typeof curHref !== 'undefined' && curHref.includes('tel:')) ||
        (typeof curHref !== 'undefined' && curHref.includes('mailto:'))
      ) {
        if (_t.parent().hasClass('mega-menu-item-has-children') || _t.hasClass('dropdown-item')) {
          _t.parent().find('select').val(_t.attr('title'));
          _t.parent().find('select').change();
        } else {
          eventObj = new BasicEvent();
          eventObj.event = 'click';
          eventObj.linkText = _t.text();
          eventObj.linkLocation = _t.attr('href');
          // eslint-disable-next-line no-console
          console.log(eventObj);
          // alert(JSON.stringify(eventObj));
          dataLayer.push(eventObj);
          if (curTarget === '_blank') {
            window.open(curHref, '_blank');
          } else {
            window.location.href = curHref;
          }
        }
      } else {
        /* fires event anytime a link is clicked with a common document, compressed file, application, video, or audio extension */
        // eslint-disable-next-line no-lonely-if
        if (typeof downloadAttr !== 'undefined' && downloadAttr !== false) {
          eventObj = new BasicEvent();
          eventObj.event = 'file_download';
          eventObj.linkText = _t.text();
          eventObj.linkLocation = curHref;
          window.dataLayer.push(eventObj);
          // eslint-disable-next-line no-console
          console.log(eventObj);
          // alert(JSON.stringify(eventObj));
        } else {
          eventObj = new BasicEvent();
          eventObj.event = 'outbound_click';
          window.dataLayer.push(eventObj);
          // eslint-disable-next-line no-console
          console.log(eventObj);

          body.addClass('will-exit');

          if (_t.hasClass('external-link')) {
            e.preventDefault();
            const windowTop = $(window).scrollTop();
            const docHeight = $(document).height();
            const windowHeight = $(window).height();
            const scrollPercent = (windowTop / (docHeight - windowHeight)) * 100;
            eventObj = new BasicEvent();
            eventObj.event = 'page_exit';
            eventObj.currentPosition = `${scrollPercent.toFixed(2)}%`;
            dataLayer.push(eventObj);
            // eslint-disable-next-line no-console
            console.log(eventObj);
            window.open(curHref, '_blank');
          }

          window.open(curHref, '_blank');
        }
      }
    });
  }

  function gaFormType(elem) {
    let formType = 'Other';
    const formIDAttr = elem.attr('id');
    if (formIDAttr !== undefined) {
      if (formIDAttr.includes('gform')) {
        const formID = Number.parseInt(formIDAttr.match(/\d+/), 10);
        /* Solutions form and Qualify, Quiz form should be other */
        if (typeof formID === 'number') {
          // eslint-disable-next-line default-case
          switch (formID) {
            case 1: {
              formType = 'Lead Form';
              break;
            }

            case 2: {
              formType = 'Donate';
              break;
            }
          }
        }
      }

      if (formIDAttr.includes('search-form')) {
        formType = 'Search Form';
      }
    }

    return formType;
  }

  function gaFormFirstInteraction(BasicEvent, dataLayer) {
    /* fires on the first interaction of a form */
    let firstInput = 0;
    let eventObj;

    $('input').on('focus', function () {
      const _t = $(this);

      if (firstInput === 0) {
        firstInput = 1;
        const currentForm = _t.parents('form');
        eventObj = new BasicEvent();
        eventObj.event = 'form_start';
        eventObj.formName = currentForm.attr('class');
        eventObj.formType = gaFormType(currentForm);
        // console.log(eventObj);
        dataLayer.push(eventObj);
      }
    });
  }

  function gaFormFieldChange(BasicEvent, dataLayer) {
    let eventObj;
    /* fires when someone changes the content of a form field (onchange) */
    body.on('change', 'input, select', function () {
      const _t = $(this);
      const ariaLabel = _t.attr('aria-label');
      const autoCompleteV = _t.attr('autocomplete');
      const currentForm = _t.parents('form');
      eventObj = new BasicEvent();
      eventObj.event = 'form_field_complete';
      eventObj.formName = currentForm.attr('class') ?? currentForm.attr('id');
      eventObj.formType = gaFormType(currentForm);
      // eslint-disable-next-line space-in-parens,prettier/prettier
      eventObj.formFieldName = ( typeof ariaLabel !== 'undefined' && ariaLabel !== false ) ? ariaLabel : (( typeof autoCompleteV !== 'undefined' && autoCompleteV !== false ) ? autoCompleteV : _t.attr('class'));
      // eslint-disable-next-line no-console
      console.log(eventObj);
      dataLayer.push(eventObj);
    });
  }

  function gaSearchResults(BasicEvent, dataLayer, searchArray, fullUrl) {
    /* fires any time a page loads with a common search query parameter in the url (q,s,search,query,keyword) */
    let eventObj;
    const urlwithoutPrefix = fullUrl.replace('https://', '');
    const urlParts = urlwithoutPrefix.split('/');
    $.each(searchArray, (i, v) => {
      if (getSearchQ(v) || (1 in urlParts && urlParts[1] === v && 2 in urlParts)) {
        const currentForm = $('#search-form');
        eventObj = new BasicEvent();
        eventObj.event = 'view_search_results';
        eventObj.formName = currentForm.attr('class');
        eventObj.formType = gaFormType(currentForm);
        eventObj.searchTerm = 2 in urlParts ? urlParts[2] : getSearchQ(v);
        // eslint-disable-next-line no-console
        console.log(eventObj);
        dataLayer.push(eventObj);
      }
    });
  }

  function gaGravityFormSubmit(BasicEvent, dataLayer) {
    /*
     * fires when someone successfully submits a form
     */
    let eventObj;
    $(document).on('gform_confirmation_loaded', (event, formId) => {
      const currentForm = $(`#gf_${formId}`);
      eventObj = new BasicEvent();
      eventObj.event = 'form_success';
      eventObj.formName = currentForm.attr('class');
      eventObj.formType = gaFormType(currentForm);
      eventObj.formSuccessMessage = formId === 2 ? 'thank you page' : '';
      // eslint-disable-next-line no-console
      console.log(eventObj);
      dataLayer.push(eventObj);
    });
  }

  function gaGravityFormErrorAndSteps(BasicEvent, dataLayer) {
    /* fires when someone attempts to submit a form but receieves an error */
    let eventObj;

    $(document).on('gform_post_render', (event, formID, currentPage) => {
      const currentForm = $(`#gform_${formID}`);
      if ($('.gform_submission_error').length > 0) {
        const errorElem = currentForm
          .find('.gfield_error')
          .eq(0)
          .find('.gfield_validation_message');
        const errorMessage = errorElem.text();
        if (errorMessage.includes('. ')) {
          errorElem.hide();
          const messageArray = errorMessage.split('.');
          errorElem.text(messageArray[1]);
          errorElem.show();
        }

        eventObj = new BasicEvent();
        eventObj.event = 'form_error';
        eventObj.formName = currentForm.attr('class');
        eventObj.formType = gaFormType(currentForm);
        eventObj.errorName = currentForm.parent().find('.gform_submission_error').text();
        eventObj.errorMessage = errorElem.text();

        currentForm.find('input[type="tel"]').on('focus', () => {
          $('.gform_validation_errors').remove();
          currentForm.find('.gfield_validation_message').remove();
          currentForm.find('.gfield').each(function () {
            $(this).removeClass('gfield_error');
          });
        });
        dataLayer.push(eventObj);
      } else {
        const formPage = currentForm.find('.gform_page');
        if (formPage.length > 0 && currentPage > 1) {
          /* fires when the user moves to the next step (primarily applies to multi-step forms).
           * For step 1, this fires on form_start.
           * In some ways, this is a proxy for a pageview on forms specifically
           */
          eventObj = new BasicEvent();
          eventObj.event = 'form_progress';
          eventObj.formName = currentForm.attr('class');
          eventObj.formType = gaFormType(currentForm);
          eventObj.formStep = currentPage;
          // eslint-disable-next-line no-console
          console.log(eventObj);
          dataLayer.push(eventObj);
        } else {
          const currentEmail = currentForm.find('input[type="email"]');
          if (currentEmail.length > 0 && currentEmail.val().length > 0) {
            // eslint-disable-next-line new-cap
            const hashedEmail = new jsSHA('SHA-256', 'TEXT', { encoding: 'utf8' });
            hashedEmail.update(currentEmail.val());
            eventObj = new BasicEvent();
            eventObj.event = 'form_submit';
            eventObj.formSuccessMessage = '';
            eventObj.formType = gaFormType(currentForm);
            eventObj.email = hashedEmail.getHash('HEX');
            // eslint-disable-next-line no-console
            console.log(eventObj);
            dataLayer.push(eventObj);
          }
        }
      }
    });
  }

  function gaPageLeave(BasicEvent, dataLayer) {
    let eventObj;
    /* Fires event on leaving the page and sends current scroll position */
    $(window).on('unload', () => {
      if (body.hasClass('will-exit')) {
        const windowTop = $(window).scrollTop();
        const docHeight = $(document).height();
        const windowHeight = $(window).height();
        const scrollPercent = (windowTop / (docHeight - windowHeight)) * 100;
        eventObj = new BasicEvent();
        eventObj.event = 'page_exit';
        eventObj.currentPosition = `${scrollPercent}%`;
        dataLayer.push(eventObj);
        // eslint-disable-next-line no-console
        console.log(eventObj);
      }
    });
  }

  function gaYoutubeVideoEvents(BasicEvent, dataLayer, targetModal, fullUrl) {
    let eventObj;
    let videoDuration = 0;
    let curProgress = 0;
    let player;
    let onlyOnce = 0;

    const playerTarget = targetModal.slice(1);

    $(targetModal).on('shown.bs.modal', () => {
      body.removeClass(`stopped-video-${playerTarget}`);
      if (typeof player !== 'undefined' && player !== false) {
        player.playVideo();
        const videoTitle = $(`${targetModal} .youtube iframe`).attr('title');
        eventObj = new BasicEvent();
        eventObj.event = 'video_start';
        eventObj.videoTitle = videoTitle;
        eventObj.videoDuration = changesecondstoMinutes(videoDuration);
        dataLayer.push(eventObj);
        // eslint-disable-next-line no-console
        console.log(eventObj);
        onlyOnce = 0;
      }

      function onYouTubeIframeAPIReady() {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = $(`${targetModal} .youtube`).attr('data-src').match(regExp);

        // eslint-disable-next-line no-undef
        player = new YT.Player(`${playerTarget}-youtube-player`, {
          height: '390',
          width: '640',
          videoId: match[2],
          playerVars: {
            playsinline: 1,
            origin: fullUrl
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        });
      }

      function onPlayerReady(event) {
        event.target.playVideo();
        body.addClass(`playerReady-${playerTarget}`);
        videoDuration = event.target.getDuration();
        const videoTitle = event.target.getVideoData().title;
        eventObj = new BasicEvent();
        eventObj.event = 'video_start';
        eventObj.videoTitle = videoTitle;
        eventObj.videoDuration = changesecondstoMinutes(videoDuration);
        dataLayer.push(eventObj);
        // eslint-disable-next-line no-console
        console.log(eventObj);
        $(`${targetModal} .youtube iframe`).attr('title', videoTitle);
      }

      function onPlayerStateChange(event) {
        curProgress = event.target.getCurrentTime();
        if (body.hasClass(`stopped-video-${playerTarget}`) && onlyOnce === 0) {
          eventObj = new BasicEvent();
          eventObj.event = 'video_complete';
          eventObj.videoTitle = $(`${targetModal} .youtube iframe`).attr('title');
          eventObj.videoDuration = changesecondstoMinutes(videoDuration);
          eventObj.videoCurrentTime = changesecondstoMinutes(curProgress);
          dataLayer.push(eventObj);
          // eslint-disable-next-line no-console
          console.log(eventObj);
          onlyOnce++;
        }
      }

      if (!body.hasClass(`playerReady-${playerTarget}`)) {
        onYouTubeIframeAPIReady();
      }
    });
    $(targetModal).on('hide.bs.modal', () => {
      player.pauseVideo();
      setTimeout(() => {
        player.stopVideo();
      }, 100);
      body.addClass(`stopped-video-${playerTarget}`);
    });
  }

  function gaVimeoVideoEvents(BasicEvent, dataLayer, targetModal) {
    let eventObj;
    let player;
    let onlyOnce = 0;
    const playerTarget = targetModal.slice(1);
    $(targetModal).on('shown.bs.modal', () => {
      // eslint-disable-next-line no-undef
      player = new Vimeo.Player(`${playerTarget}-vimeo-player`);
      player.play();
      // eslint-disable-next-line no-unused-vars
      player.on('play', (data) => {
        player.getVideoTitle().then((title) => {
          // title = The title of the video
          // eslint-disable-next-line max-nested-callbacks
          player.getDuration().then((duration) => {
            // `duration` indicates the duration of the video in seconds
            eventObj = new BasicEvent();
            eventObj.event = 'video_start';
            eventObj.videoTitle = title;
            eventObj.videoDuration = changesecondstoMinutes(duration);
            dataLayer.push(eventObj);
            // eslint-disable-next-line no-console
            console.log(eventObj);
            onlyOnce = 0;
            player.off('play');
          });
        });
      });
    });
    $(targetModal).on('hide.bs.modal', () => {
      // player.pauseVideo();
      player.pause();
      setTimeout(() => {
        player.unload();
      }, 100);
      player.on('pause', (data) => {
        // `data` is an object containing properties specific to that event
        if (onlyOnce === 0) {
          player.getVideoTitle().then((title) => {
            // eslint-disable-next-line max-nested-callbacks
            player.getDuration().then((duration) => {
              // `duration` indicates the duration of the video in seconds
              eventObj = new BasicEvent();
              eventObj.event = 'video_complete';
              eventObj.videoTitle = title;
              eventObj.videoDuration = changesecondstoMinutes(duration);
              eventObj.videoCurrentTime = changesecondstoMinutes(data.seconds);
              dataLayer.push(eventObj);
              // eslint-disable-next-line no-console
              console.log(eventObj);
              onlyOnce++;
              player.off('pause');
            });
          });
        }
      });
    });
  }

  function gaMultipleVideos(BasicEvent, dataLayer, fullUrl) {
    const video = $('button.video');
    if (video.length > 0) {
      if ($('#youtube-script').length <= 0) {
        const tag = document.createElement('script');
        tag.id = 'youtube-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      if ($('#vimeo-script').length <= 0) {
        const tag = document.createElement('script');
        tag.id = 'vimeo-script';
        tag.src = 'https://player.vimeo.com/api/player.js';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      video.each(function () {
        const _t = $(this);
        const dataTarget = _t.attr('data-bs-target');
        const playerYTSource = $(`${dataTarget} .youtube`).attr('data-src');
        const playerVSource = $(`${dataTarget} .vimeo`).attr('data-src');

        if (
          typeof playerYTSource !== 'undefined' &&
          playerYTSource !== false &&
          playerYTSource.includes('youtube')
        ) {
          gaYoutubeVideoEvents(BasicEvent, dataLayer, dataTarget, fullUrl);
        }

        if (
          typeof playerVSource !== 'undefined' &&
          playerVSource !== false &&
          playerVSource.includes('vimeo')
        ) {
          gaVimeoVideoEvents(BasicEvent, dataLayer, dataTarget);
        }
      });
    }
  }
})(jQuery);
