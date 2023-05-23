/*!
  * FOAC v1.0.7 (https://www.financeofamerica.com)
  * Copyright 2023 FOAC Developers
  * Licensed under GPL-3.0 (undefined)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.foac = {}, global.jQuery));
})(this, (function (exports, require$$0$1) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
					var args = [null];
					args.push.apply(args, arguments);
					var Ctor = Function.bind.apply(f, args);
					return new Ctor();
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var carouselExports = {};
	var carousel$1 = {
	  get exports(){ return carouselExports; },
	  set exports(v){ carouselExports = v; },
	};

	var utilExports = {};
	var util = {
	  get exports(){ return utilExports; },
	  set exports(v){ utilExports = v; },
	};

	/*!
	  * Bootstrap index.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredUtil;

	function requireUtil () {
		if (hasRequiredUtil) return utilExports;
		hasRequiredUtil = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports) ;
			})(commonjsGlobal, function (exports) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/index.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const MAX_UID = 1000000;
			  const MILLISECONDS_MULTIPLIER = 1000;
			  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

			  const toType = object => {
			    if (object === null || object === undefined) {
			      return `${object}`;
			    }
			    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
			  };
			  /**
			   * Public Util API
			   */

			  const getUID = prefix => {
			    do {
			      prefix += Math.floor(Math.random() * MAX_UID);
			    } while (document.getElementById(prefix));
			    return prefix;
			  };
			  const getSelector = element => {
			    let selector = element.getAttribute('data-bs-target');
			    if (!selector || selector === '#') {
			      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
			      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
			      // `document.querySelector` will rightfully complain it is invalid.
			      // See https://github.com/twbs/bootstrap/issues/32273

			      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
			        return null;
			      } // Just in case some CMS puts out a full URL with the anchor appended

			      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
			        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
			      }
			      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
			    }
			    return selector;
			  };
			  const getSelectorFromElement = element => {
			    const selector = getSelector(element);
			    if (selector) {
			      return document.querySelector(selector) ? selector : null;
			    }
			    return null;
			  };
			  const getElementFromSelector = element => {
			    const selector = getSelector(element);
			    return selector ? document.querySelector(selector) : null;
			  };
			  const getTransitionDurationFromElement = element => {
			    if (!element) {
			      return 0;
			    } // Get transition-duration of the element

			    let {
			      transitionDuration,
			      transitionDelay
			    } = window.getComputedStyle(element);
			    const floatTransitionDuration = Number.parseFloat(transitionDuration);
			    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

			    if (!floatTransitionDuration && !floatTransitionDelay) {
			      return 0;
			    } // If multiple durations are defined, take the first

			    transitionDuration = transitionDuration.split(',')[0];
			    transitionDelay = transitionDelay.split(',')[0];
			    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
			  };
			  const triggerTransitionEnd = element => {
			    element.dispatchEvent(new Event(TRANSITION_END));
			  };
			  const isElement = object => {
			    if (!object || typeof object !== 'object') {
			      return false;
			    }
			    if (typeof object.jquery !== 'undefined') {
			      object = object[0];
			    }
			    return typeof object.nodeType !== 'undefined';
			  };
			  const getElement = object => {
			    // it's a jQuery object or a node element
			    if (isElement(object)) {
			      return object.jquery ? object[0] : object;
			    }
			    if (typeof object === 'string' && object.length > 0) {
			      return document.querySelector(object);
			    }
			    return null;
			  };
			  const isVisible = element => {
			    if (!isElement(element) || element.getClientRects().length === 0) {
			      return false;
			    }
			    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

			    const closedDetails = element.closest('details:not([open])');
			    if (!closedDetails) {
			      return elementIsVisible;
			    }
			    if (closedDetails !== element) {
			      const summary = element.closest('summary');
			      if (summary && summary.parentNode !== closedDetails) {
			        return false;
			      }
			      if (summary === null) {
			        return false;
			      }
			    }
			    return elementIsVisible;
			  };
			  const isDisabled = element => {
			    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
			      return true;
			    }
			    if (element.classList.contains('disabled')) {
			      return true;
			    }
			    if (typeof element.disabled !== 'undefined') {
			      return element.disabled;
			    }
			    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
			  };
			  const findShadowRoot = element => {
			    if (!document.documentElement.attachShadow) {
			      return null;
			    } // Can find the shadow root otherwise it'll return the document

			    if (typeof element.getRootNode === 'function') {
			      const root = element.getRootNode();
			      return root instanceof ShadowRoot ? root : null;
			    }
			    if (element instanceof ShadowRoot) {
			      return element;
			    } // when we don't find a shadow root

			    if (!element.parentNode) {
			      return null;
			    }
			    return findShadowRoot(element.parentNode);
			  };
			  const noop = () => {};
			  /**
			   * Trick to restart an element's animation
			   *
			   * @param {HTMLElement} element
			   * @return void
			   *
			   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
			   */

			  const reflow = element => {
			    element.offsetHeight; // eslint-disable-line no-unused-expressions
			  };

			  const getjQuery = () => {
			    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
			      return window.jQuery;
			    }
			    return null;
			  };
			  const DOMContentLoadedCallbacks = [];
			  const onDOMContentLoaded = callback => {
			    if (document.readyState === 'loading') {
			      // add listener on the first call when the document is in loading state
			      if (!DOMContentLoadedCallbacks.length) {
			        document.addEventListener('DOMContentLoaded', () => {
			          for (const callback of DOMContentLoadedCallbacks) {
			            callback();
			          }
			        });
			      }
			      DOMContentLoadedCallbacks.push(callback);
			    } else {
			      callback();
			    }
			  };
			  const isRTL = () => document.documentElement.dir === 'rtl';
			  const defineJQueryPlugin = plugin => {
			    onDOMContentLoaded(() => {
			      const $ = getjQuery();
			      /* istanbul ignore if */

			      if ($) {
			        const name = plugin.NAME;
			        const JQUERY_NO_CONFLICT = $.fn[name];
			        $.fn[name] = plugin.jQueryInterface;
			        $.fn[name].Constructor = plugin;
			        $.fn[name].noConflict = () => {
			          $.fn[name] = JQUERY_NO_CONFLICT;
			          return plugin.jQueryInterface;
			        };
			      }
			    });
			  };
			  const execute = callback => {
			    if (typeof callback === 'function') {
			      callback();
			    }
			  };
			  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
			    if (!waitForTransition) {
			      execute(callback);
			      return;
			    }
			    const durationPadding = 5;
			    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
			    let called = false;
			    const handler = ({
			      target
			    }) => {
			      if (target !== transitionElement) {
			        return;
			      }
			      called = true;
			      transitionElement.removeEventListener(TRANSITION_END, handler);
			      execute(callback);
			    };
			    transitionElement.addEventListener(TRANSITION_END, handler);
			    setTimeout(() => {
			      if (!called) {
			        triggerTransitionEnd(transitionElement);
			      }
			    }, emulatedDuration);
			  };
			  /**
			   * Return the previous/next element of a list.
			   *
			   * @param {array} list    The list of elements
			   * @param activeElement   The active element
			   * @param shouldGetNext   Choose to get next or previous element
			   * @param isCycleAllowed
			   * @return {Element|elem} The proper element
			   */

			  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
			    const listLength = list.length;
			    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
			    // depending on the direction and if cycle is allowed

			    if (index === -1) {
			      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
			    }
			    index += shouldGetNext ? 1 : -1;
			    if (isCycleAllowed) {
			      index = (index + listLength) % listLength;
			    }
			    return list[Math.max(0, Math.min(index, listLength - 1))];
			  };
			  exports.defineJQueryPlugin = defineJQueryPlugin;
			  exports.execute = execute;
			  exports.executeAfterTransition = executeAfterTransition;
			  exports.findShadowRoot = findShadowRoot;
			  exports.getElement = getElement;
			  exports.getElementFromSelector = getElementFromSelector;
			  exports.getNextActiveElement = getNextActiveElement;
			  exports.getSelectorFromElement = getSelectorFromElement;
			  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
			  exports.getUID = getUID;
			  exports.getjQuery = getjQuery;
			  exports.isDisabled = isDisabled;
			  exports.isElement = isElement;
			  exports.isRTL = isRTL;
			  exports.isVisible = isVisible;
			  exports.noop = noop;
			  exports.onDOMContentLoaded = onDOMContentLoaded;
			  exports.reflow = reflow;
			  exports.toType = toType;
			  exports.triggerTransitionEnd = triggerTransitionEnd;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (util, utilExports));
		return utilExports;
	}

	var eventHandlerExports = {};
	var eventHandler = {
	  get exports(){ return eventHandlerExports; },
	  set exports(v){ eventHandlerExports = v; },
	};

	/*!
	  * Bootstrap event-handler.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredEventHandler;

	function requireEventHandler () {
		if (hasRequiredEventHandler) return eventHandlerExports;
		hasRequiredEventHandler = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/event-handler.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */
			  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
			  const stripNameRegex = /\..*/;
			  const stripUidRegex = /::\d+$/;
			  const eventRegistry = {}; // Events storage

			  let uidEvent = 1;
			  const customEvents = {
			    mouseenter: 'mouseover',
			    mouseleave: 'mouseout'
			  };
			  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
			  /**
			   * Private methods
			   */

			  function makeEventUid(element, uid) {
			    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
			  }
			  function getElementEvents(element) {
			    const uid = makeEventUid(element);
			    element.uidEvent = uid;
			    eventRegistry[uid] = eventRegistry[uid] || {};
			    return eventRegistry[uid];
			  }
			  function bootstrapHandler(element, fn) {
			    return function handler(event) {
			      hydrateObj(event, {
			        delegateTarget: element
			      });
			      if (handler.oneOff) {
			        EventHandler.off(element, event.type, fn);
			      }
			      return fn.apply(element, [event]);
			    };
			  }
			  function bootstrapDelegationHandler(element, selector, fn) {
			    return function handler(event) {
			      const domElements = element.querySelectorAll(selector);
			      for (let {
			        target
			      } = event; target && target !== this; target = target.parentNode) {
			        for (const domElement of domElements) {
			          if (domElement !== target) {
			            continue;
			          }
			          hydrateObj(event, {
			            delegateTarget: target
			          });
			          if (handler.oneOff) {
			            EventHandler.off(element, event.type, selector, fn);
			          }
			          return fn.apply(target, [event]);
			        }
			      }
			    };
			  }
			  function findHandler(events, callable, delegationSelector = null) {
			    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
			  }
			  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
			    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

			    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
			    let typeEvent = getTypeEvent(originalTypeEvent);
			    if (!nativeEvents.has(typeEvent)) {
			      typeEvent = originalTypeEvent;
			    }
			    return [isDelegated, callable, typeEvent];
			  }
			  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
			    if (typeof originalTypeEvent !== 'string' || !element) {
			      return;
			    }
			    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
			    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

			    if (originalTypeEvent in customEvents) {
			      const wrapFunction = fn => {
			        return function (event) {
			          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
			            return fn.call(this, event);
			          }
			        };
			      };
			      callable = wrapFunction(callable);
			    }
			    const events = getElementEvents(element);
			    const handlers = events[typeEvent] || (events[typeEvent] = {});
			    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
			    if (previousFunction) {
			      previousFunction.oneOff = previousFunction.oneOff && oneOff;
			      return;
			    }
			    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
			    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
			    fn.delegationSelector = isDelegated ? handler : null;
			    fn.callable = callable;
			    fn.oneOff = oneOff;
			    fn.uidEvent = uid;
			    handlers[uid] = fn;
			    element.addEventListener(typeEvent, fn, isDelegated);
			  }
			  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
			    const fn = findHandler(events[typeEvent], handler, delegationSelector);
			    if (!fn) {
			      return;
			    }
			    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
			    delete events[typeEvent][fn.uidEvent];
			  }
			  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
			    const storeElementEvent = events[typeEvent] || {};
			    for (const handlerKey of Object.keys(storeElementEvent)) {
			      if (handlerKey.includes(namespace)) {
			        const event = storeElementEvent[handlerKey];
			        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			      }
			    }
			  }
			  function getTypeEvent(event) {
			    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
			    event = event.replace(stripNameRegex, '');
			    return customEvents[event] || event;
			  }
			  const EventHandler = {
			    on(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, false);
			    },
			    one(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, true);
			    },
			    off(element, originalTypeEvent, handler, delegationFunction) {
			      if (typeof originalTypeEvent !== 'string' || !element) {
			        return;
			      }
			      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
			      const inNamespace = typeEvent !== originalTypeEvent;
			      const events = getElementEvents(element);
			      const storeElementEvent = events[typeEvent] || {};
			      const isNamespace = originalTypeEvent.startsWith('.');
			      if (typeof callable !== 'undefined') {
			        // Simplest case: handler is passed, remove that listener ONLY.
			        if (!Object.keys(storeElementEvent).length) {
			          return;
			        }
			        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
			        return;
			      }
			      if (isNamespace) {
			        for (const elementEvent of Object.keys(events)) {
			          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
			        }
			      }
			      for (const keyHandlers of Object.keys(storeElementEvent)) {
			        const handlerKey = keyHandlers.replace(stripUidRegex, '');
			        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
			          const event = storeElementEvent[keyHandlers];
			          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			        }
			      }
			    },
			    trigger(element, event, args) {
			      if (typeof event !== 'string' || !element) {
			        return null;
			      }
			      const $ = index.getjQuery();
			      const typeEvent = getTypeEvent(event);
			      const inNamespace = event !== typeEvent;
			      let jQueryEvent = null;
			      let bubbles = true;
			      let nativeDispatch = true;
			      let defaultPrevented = false;
			      if (inNamespace && $) {
			        jQueryEvent = $.Event(event, args);
			        $(element).trigger(jQueryEvent);
			        bubbles = !jQueryEvent.isPropagationStopped();
			        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
			        defaultPrevented = jQueryEvent.isDefaultPrevented();
			      }
			      let evt = new Event(event, {
			        bubbles,
			        cancelable: true
			      });
			      evt = hydrateObj(evt, args);
			      if (defaultPrevented) {
			        evt.preventDefault();
			      }
			      if (nativeDispatch) {
			        element.dispatchEvent(evt);
			      }
			      if (evt.defaultPrevented && jQueryEvent) {
			        jQueryEvent.preventDefault();
			      }
			      return evt;
			    }
			  };
			  function hydrateObj(obj, meta) {
			    for (const [key, value] of Object.entries(meta || {})) {
			      try {
			        obj[key] = value;
			      } catch (_unused) {
			        Object.defineProperty(obj, key, {
			          configurable: true,
			          get() {
			            return value;
			          }
			        });
			      }
			    }
			    return obj;
			  }
			  return EventHandler;
			});
	} (eventHandler));
		return eventHandlerExports;
	}

	var manipulatorExports = {};
	var manipulator = {
	  get exports(){ return manipulatorExports; },
	  set exports(v){ manipulatorExports = v; },
	};

	/*!
	  * Bootstrap manipulator.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredManipulator;

	function requireManipulator () {
		if (hasRequiredManipulator) return manipulatorExports;
		hasRequiredManipulator = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/manipulator.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  function normalizeData(value) {
			    if (value === 'true') {
			      return true;
			    }
			    if (value === 'false') {
			      return false;
			    }
			    if (value === Number(value).toString()) {
			      return Number(value);
			    }
			    if (value === '' || value === 'null') {
			      return null;
			    }
			    if (typeof value !== 'string') {
			      return value;
			    }
			    try {
			      return JSON.parse(decodeURIComponent(value));
			    } catch (_unused) {
			      return value;
			    }
			  }
			  function normalizeDataKey(key) {
			    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
			  }
			  const Manipulator = {
			    setDataAttribute(element, key, value) {
			      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
			    },
			    removeDataAttribute(element, key) {
			      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
			    },
			    getDataAttributes(element) {
			      if (!element) {
			        return {};
			      }
			      const attributes = {};
			      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
			      for (const key of bsKeys) {
			        let pureKey = key.replace(/^bs/, '');
			        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
			        attributes[pureKey] = normalizeData(element.dataset[key]);
			      }
			      return attributes;
			    },
			    getDataAttribute(element, key) {
			      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
			    }
			  };
			  return Manipulator;
			});
	} (manipulator));
		return manipulatorExports;
	}

	var selectorEngineExports = {};
	var selectorEngine = {
	  get exports(){ return selectorEngineExports; },
	  set exports(v){ selectorEngineExports = v; },
	};

	/*!
	  * Bootstrap selector-engine.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSelectorEngine;

	function requireSelectorEngine () {
		if (hasRequiredSelectorEngine) return selectorEngineExports;
		hasRequiredSelectorEngine = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/selector-engine.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */
			  const SelectorEngine = {
			    find(selector, element = document.documentElement) {
			      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
			    },
			    findOne(selector, element = document.documentElement) {
			      return Element.prototype.querySelector.call(element, selector);
			    },
			    children(element, selector) {
			      return [].concat(...element.children).filter(child => child.matches(selector));
			    },
			    parents(element, selector) {
			      const parents = [];
			      let ancestor = element.parentNode.closest(selector);
			      while (ancestor) {
			        parents.push(ancestor);
			        ancestor = ancestor.parentNode.closest(selector);
			      }
			      return parents;
			    },
			    prev(element, selector) {
			      let previous = element.previousElementSibling;
			      while (previous) {
			        if (previous.matches(selector)) {
			          return [previous];
			        }
			        previous = previous.previousElementSibling;
			      }
			      return [];
			    },
			    // TODO: this is now unused; remove later along with prev()
			    next(element, selector) {
			      let next = element.nextElementSibling;
			      while (next) {
			        if (next.matches(selector)) {
			          return [next];
			        }
			        next = next.nextElementSibling;
			      }
			      return [];
			    },
			    focusableChildren(element) {
			      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
			      return this.find(focusables, element).filter(el => !index.isDisabled(el) && index.isVisible(el));
			    }
			  };
			  return SelectorEngine;
			});
	} (selectorEngine));
		return selectorEngineExports;
	}

	var swipeExports = {};
	var swipe = {
	  get exports(){ return swipeExports; },
	  set exports(v){ swipeExports = v; },
	};

	var configExports = {};
	var config = {
	  get exports(){ return configExports; },
	  set exports(v){ configExports = v; },
	};

	/*!
	  * Bootstrap config.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredConfig;

	function requireConfig () {
		if (hasRequiredConfig) return configExports;
		hasRequiredConfig = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil(), requireManipulator()) ;
			})(commonjsGlobal, function (index, Manipulator) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/config.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Class definition
			   */

			  class Config {
			    // Getters
			    static get Default() {
			      return {};
			    }
			    static get DefaultType() {
			      return {};
			    }
			    static get NAME() {
			      throw new Error('You have to implement the static method "NAME", for each component!');
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    }
			    _configAfterMerge(config) {
			      return config;
			    }
			    _mergeConfigObj(config, element) {
			      const jsonConfig = index.isElement(element) ? Manipulator__default.default.getDataAttribute(element, 'config') : {}; // try to parse

			      return {
			        ...this.constructor.Default,
			        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
			        ...(index.isElement(element) ? Manipulator__default.default.getDataAttributes(element) : {}),
			        ...(typeof config === 'object' ? config : {})
			      };
			    }
			    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
			      for (const property of Object.keys(configTypes)) {
			        const expectedTypes = configTypes[property];
			        const value = config[property];
			        const valueType = index.isElement(value) ? 'element' : index.toType(value);
			        if (!new RegExp(expectedTypes).test(valueType)) {
			          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
			        }
			      }
			    }
			  }
			  return Config;
			});
	} (config));
		return configExports;
	}

	/*!
	  * Bootstrap swipe.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSwipe;

	function requireSwipe () {
		if (hasRequiredSwipe) return swipeExports;
		hasRequiredSwipe = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireConfig(), requireEventHandler(), requireUtil()) ;
			})(commonjsGlobal, function (Config, EventHandler, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/swipe.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'swipe';
			  const EVENT_KEY = '.bs.swipe';
			  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
			  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
			  const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
			  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
			  const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
			  const POINTER_TYPE_TOUCH = 'touch';
			  const POINTER_TYPE_PEN = 'pen';
			  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
			  const SWIPE_THRESHOLD = 40;
			  const Default = {
			    endCallback: null,
			    leftCallback: null,
			    rightCallback: null
			  };
			  const DefaultType = {
			    endCallback: '(function|null)',
			    leftCallback: '(function|null)',
			    rightCallback: '(function|null)'
			  };
			  /**
			   * Class definition
			   */

			  class Swipe extends Config__default.default {
			    constructor(element, config) {
			      super();
			      this._element = element;
			      if (!element || !Swipe.isSupported()) {
			        return;
			      }
			      this._config = this._getConfig(config);
			      this._deltaX = 0;
			      this._supportPointerEvents = Boolean(window.PointerEvent);
			      this._initEvents();
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    dispose() {
			      EventHandler__default.default.off(this._element, EVENT_KEY);
			    } // Private

			    _start(event) {
			      if (!this._supportPointerEvents) {
			        this._deltaX = event.touches[0].clientX;
			        return;
			      }
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX;
			      }
			    }
			    _end(event) {
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX - this._deltaX;
			      }
			      this._handleSwipe();
			      index.execute(this._config.endCallback);
			    }
			    _move(event) {
			      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
			    }
			    _handleSwipe() {
			      const absDeltaX = Math.abs(this._deltaX);
			      if (absDeltaX <= SWIPE_THRESHOLD) {
			        return;
			      }
			      const direction = absDeltaX / this._deltaX;
			      this._deltaX = 0;
			      if (!direction) {
			        return;
			      }
			      index.execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
			    }
			    _initEvents() {
			      if (this._supportPointerEvents) {
			        EventHandler__default.default.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
			        EventHandler__default.default.on(this._element, EVENT_POINTERUP, event => this._end(event));
			        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
			      } else {
			        EventHandler__default.default.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
			        EventHandler__default.default.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
			        EventHandler__default.default.on(this._element, EVENT_TOUCHEND, event => this._end(event));
			      }
			    }
			    _eventIsPointerPenTouch(event) {
			      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
			    } // Static

			    static isSupported() {
			      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
			    }
			  }
			  return Swipe;
			});
	} (swipe));
		return swipeExports;
	}

	var baseComponentExports = {};
	var baseComponent = {
	  get exports(){ return baseComponentExports; },
	  set exports(v){ baseComponentExports = v; },
	};

	var dataExports = {};
	var data = {
	  get exports(){ return dataExports; },
	  set exports(v){ dataExports = v; },
	};

	/*!
	  * Bootstrap data.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredData;

	function requireData () {
		if (hasRequiredData) return dataExports;
		hasRequiredData = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/data.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const elementMap = new Map();
			  const data = {
			    set(element, key, instance) {
			      if (!elementMap.has(element)) {
			        elementMap.set(element, new Map());
			      }
			      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
			      // can be removed later when multiple key/instances are fine to be used

			      if (!instanceMap.has(key) && instanceMap.size !== 0) {
			        // eslint-disable-next-line no-console
			        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
			        return;
			      }
			      instanceMap.set(key, instance);
			    },
			    get(element, key) {
			      if (elementMap.has(element)) {
			        return elementMap.get(element).get(key) || null;
			      }
			      return null;
			    },
			    remove(element, key) {
			      if (!elementMap.has(element)) {
			        return;
			      }
			      const instanceMap = elementMap.get(element);
			      instanceMap.delete(key); // free up element references if there are no instances left for an element

			      if (instanceMap.size === 0) {
			        elementMap.delete(element);
			      }
			    }
			  };
			  return data;
			});
	} (data));
		return dataExports;
	}

	/*!
	  * Bootstrap base-component.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBaseComponent;

	function requireBaseComponent () {
		if (hasRequiredBaseComponent) return baseComponentExports;
		hasRequiredBaseComponent = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireData(), requireUtil(), requireEventHandler(), requireConfig()) ;
			})(commonjsGlobal, function (Data, index, EventHandler, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): base-component.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const VERSION = '5.2.3';
			  /**
			   * Class definition
			   */

			  class BaseComponent extends Config__default.default {
			    constructor(element, config) {
			      super();
			      element = index.getElement(element);
			      if (!element) {
			        return;
			      }
			      this._element = element;
			      this._config = this._getConfig(config);
			      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
			    } // Public

			    dispose() {
			      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
			      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
			      for (const propertyName of Object.getOwnPropertyNames(this)) {
			        this[propertyName] = null;
			      }
			    }
			    _queueCallback(callback, element, isAnimated = true) {
			      index.executeAfterTransition(callback, element, isAnimated);
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config, this._element);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    } // Static

			    static getInstance(element) {
			      return Data__default.default.get(index.getElement(element), this.DATA_KEY);
			    }
			    static getOrCreateInstance(element, config = {}) {
			      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
			    }
			    static get VERSION() {
			      return VERSION;
			    }
			    static get DATA_KEY() {
			      return `bs.${this.NAME}`;
			    }
			    static get EVENT_KEY() {
			      return `.${this.DATA_KEY}`;
			    }
			    static eventName(name) {
			      return `${name}${this.EVENT_KEY}`;
			    }
			  }
			  return BaseComponent;
			});
	} (baseComponent));
		return baseComponentExports;
	}

	/*!
	  * Bootstrap carousel.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireSwipe(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, Manipulator, SelectorEngine, Swipe, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const Swipe__default = /*#__PURE__*/_interopDefaultLegacy(Swipe);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): carousel.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'carousel';
		  const DATA_KEY = 'bs.carousel';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ARROW_LEFT_KEY = 'ArrowLeft';
		  const ARROW_RIGHT_KEY = 'ArrowRight';
		  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

		  const ORDER_NEXT = 'next';
		  const ORDER_PREV = 'prev';
		  const DIRECTION_LEFT = 'left';
		  const DIRECTION_RIGHT = 'right';
		  const EVENT_SLIDE = `slide${EVENT_KEY}`;
		  const EVENT_SLID = `slid${EVENT_KEY}`;
		  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
		  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
		  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
		  const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_CAROUSEL = 'carousel';
		  const CLASS_NAME_ACTIVE = 'active';
		  const CLASS_NAME_SLIDE = 'slide';
		  const CLASS_NAME_END = 'carousel-item-end';
		  const CLASS_NAME_START = 'carousel-item-start';
		  const CLASS_NAME_NEXT = 'carousel-item-next';
		  const CLASS_NAME_PREV = 'carousel-item-prev';
		  const SELECTOR_ACTIVE = '.active';
		  const SELECTOR_ITEM = '.carousel-item';
		  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
		  const SELECTOR_ITEM_IMG = '.carousel-item img';
		  const SELECTOR_INDICATORS = '.carousel-indicators';
		  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
		  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
		  const KEY_TO_DIRECTION = {
		    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
		    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
		  };
		  const Default = {
		    interval: 5000,
		    keyboard: true,
		    pause: 'hover',
		    ride: false,
		    touch: true,
		    wrap: true
		  };
		  const DefaultType = {
		    interval: '(number|boolean)',
		    // TODO:v6 remove boolean support
		    keyboard: 'boolean',
		    pause: '(string|boolean)',
		    ride: '(boolean|string)',
		    touch: 'boolean',
		    wrap: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Carousel extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._interval = null;
		      this._activeElement = null;
		      this._isSliding = false;
		      this.touchTimeout = null;
		      this._swipeHelper = null;
		      this._indicatorsElement = SelectorEngine__default.default.findOne(SELECTOR_INDICATORS, this._element);
		      this._addEventListeners();
		      if (this._config.ride === CLASS_NAME_CAROUSEL) {
		        this.cycle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    next() {
		      this._slide(ORDER_NEXT);
		    }
		    nextWhenVisible() {
		      // FIXME TODO use `document.visibilityState`
		      // Don't call next when the page isn't visible
		      // or the carousel or its parent isn't visible
		      if (!document.hidden && index.isVisible(this._element)) {
		        this.next();
		      }
		    }
		    prev() {
		      this._slide(ORDER_PREV);
		    }
		    pause() {
		      if (this._isSliding) {
		        index.triggerTransitionEnd(this._element);
		      }
		      this._clearInterval();
		    }
		    cycle() {
		      this._clearInterval();
		      this._updateInterval();
		      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
		    }
		    _maybeEnableCycle() {
		      if (!this._config.ride) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.cycle());
		        return;
		      }
		      this.cycle();
		    }
		    to(index) {
		      const items = this._getItems();
		      if (index > items.length - 1 || index < 0) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.to(index));
		        return;
		      }
		      const activeIndex = this._getItemIndex(this._getActive());
		      if (activeIndex === index) {
		        return;
		      }
		      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
		      this._slide(order, items[index]);
		    }
		    dispose() {
		      if (this._swipeHelper) {
		        this._swipeHelper.dispose();
		      }
		      super.dispose();
		    } // Private

		    _configAfterMerge(config) {
		      config.defaultInterval = config.interval;
		      return config;
		    }
		    _addEventListeners() {
		      if (this._config.keyboard) {
		        EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
		      }
		      if (this._config.pause === 'hover') {
		        EventHandler__default.default.on(this._element, EVENT_MOUSEENTER, () => this.pause());
		        EventHandler__default.default.on(this._element, EVENT_MOUSELEAVE, () => this._maybeEnableCycle());
		      }
		      if (this._config.touch && Swipe__default.default.isSupported()) {
		        this._addTouchEventListeners();
		      }
		    }
		    _addTouchEventListeners() {
		      for (const img of SelectorEngine__default.default.find(SELECTOR_ITEM_IMG, this._element)) {
		        EventHandler__default.default.on(img, EVENT_DRAG_START, event => event.preventDefault());
		      }
		      const endCallBack = () => {
		        if (this._config.pause !== 'hover') {
		          return;
		        } // If it's a touch-enabled device, mouseenter/leave are fired as
		        // part of the mouse compatibility events on first tap - the carousel
		        // would stop cycling until user tapped out of it;
		        // here, we listen for touchend, explicitly pause the carousel
		        // (as if it's the second time we tap on it, mouseenter compat event
		        // is NOT fired) and after a timeout (to allow for mouse compatibility
		        // events to fire) we explicitly restart cycling

		        this.pause();
		        if (this.touchTimeout) {
		          clearTimeout(this.touchTimeout);
		        }
		        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
		      };
		      const swipeConfig = {
		        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
		        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
		        endCallback: endCallBack
		      };
		      this._swipeHelper = new Swipe__default.default(this._element, swipeConfig);
		    }
		    _keydown(event) {
		      if (/input|textarea/i.test(event.target.tagName)) {
		        return;
		      }
		      const direction = KEY_TO_DIRECTION[event.key];
		      if (direction) {
		        event.preventDefault();
		        this._slide(this._directionToOrder(direction));
		      }
		    }
		    _getItemIndex(element) {
		      return this._getItems().indexOf(element);
		    }
		    _setActiveIndicatorElement(index) {
		      if (!this._indicatorsElement) {
		        return;
		      }
		      const activeIndicator = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
		      activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
		      activeIndicator.removeAttribute('aria-current');
		      const newActiveIndicator = SelectorEngine__default.default.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
		      if (newActiveIndicator) {
		        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE);
		        newActiveIndicator.setAttribute('aria-current', 'true');
		      }
		    }
		    _updateInterval() {
		      const element = this._activeElement || this._getActive();
		      if (!element) {
		        return;
		      }
		      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
		      this._config.interval = elementInterval || this._config.defaultInterval;
		    }
		    _slide(order, element = null) {
		      if (this._isSliding) {
		        return;
		      }
		      const activeElement = this._getActive();
		      const isNext = order === ORDER_NEXT;
		      const nextElement = element || index.getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
		      if (nextElement === activeElement) {
		        return;
		      }
		      const nextElementIndex = this._getItemIndex(nextElement);
		      const triggerEvent = eventName => {
		        return EventHandler__default.default.trigger(this._element, eventName, {
		          relatedTarget: nextElement,
		          direction: this._orderToDirection(order),
		          from: this._getItemIndex(activeElement),
		          to: nextElementIndex
		        });
		      };
		      const slideEvent = triggerEvent(EVENT_SLIDE);
		      if (slideEvent.defaultPrevented) {
		        return;
		      }
		      if (!activeElement || !nextElement) {
		        // Some weirdness is happening, so we bail
		        // todo: change tests that use empty divs to avoid this check
		        return;
		      }
		      const isCycling = Boolean(this._interval);
		      this.pause();
		      this._isSliding = true;
		      this._setActiveIndicatorElement(nextElementIndex);
		      this._activeElement = nextElement;
		      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
		      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
		      nextElement.classList.add(orderClassName);
		      index.reflow(nextElement);
		      activeElement.classList.add(directionalClassName);
		      nextElement.classList.add(directionalClassName);
		      const completeCallBack = () => {
		        nextElement.classList.remove(directionalClassName, orderClassName);
		        nextElement.classList.add(CLASS_NAME_ACTIVE);
		        activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
		        this._isSliding = false;
		        triggerEvent(EVENT_SLID);
		      };
		      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
		      if (isCycling) {
		        this.cycle();
		      }
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_SLIDE);
		    }
		    _getActive() {
		      return SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
		    }
		    _getItems() {
		      return SelectorEngine__default.default.find(SELECTOR_ITEM, this._element);
		    }
		    _clearInterval() {
		      if (this._interval) {
		        clearInterval(this._interval);
		        this._interval = null;
		      }
		    }
		    _directionToOrder(direction) {
		      if (index.isRTL()) {
		        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
		      }
		      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
		    }
		    _orderToDirection(order) {
		      if (index.isRTL()) {
		        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
		      }
		      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Carousel.getOrCreateInstance(this, config);
		        if (typeof config === 'number') {
		          data.to(config);
		          return;
		        }
		        if (typeof config === 'string') {
		          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
		      return;
		    }
		    event.preventDefault();
		    const carousel = Carousel.getOrCreateInstance(target);
		    const slideIndex = this.getAttribute('data-bs-slide-to');
		    if (slideIndex) {
		      carousel.to(slideIndex);
		      carousel._maybeEnableCycle();
		      return;
		    }
		    if (Manipulator__default.default.getDataAttribute(this, 'slide') === 'next') {
		      carousel.next();
		      carousel._maybeEnableCycle();
		      return;
		    }
		    carousel.prev();
		    carousel._maybeEnableCycle();
		  });
		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    const carousels = SelectorEngine__default.default.find(SELECTOR_DATA_RIDE);
		    for (const carousel of carousels) {
		      Carousel.getOrCreateInstance(carousel);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Carousel);
		  return Carousel;
		});
	} (carousel$1));

	var carousel = carouselExports;

	var buttonExports = {};
	var button$1 = {
	  get exports(){ return buttonExports; },
	  set exports(v){ buttonExports = v; },
	};

	/*!
	  * Bootstrap button.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): button.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'button';
		  const DATA_KEY = 'bs.button';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  /**
		   * Class definition
		   */

		  class Button extends BaseComponent__default.default {
		    // Getters
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
		      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Button.getOrCreateInstance(this);
		        if (config === 'toggle') {
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
		    event.preventDefault();
		    const button = event.target.closest(SELECTOR_DATA_TOGGLE);
		    const data = Button.getOrCreateInstance(button);
		    data.toggle();
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Button);
		  return Button;
		});
	} (button$1));

	var button = buttonExports;

	var dropdownExports = {};
	var dropdown$1 = {
	  get exports(){ return dropdownExports; },
	  set exports(v){ dropdownExports = v; },
	};

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }
	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }
	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}
	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}
	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }
	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]

	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];
	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}
	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;
	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }
	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }
	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function getUAString() {
	  var uaData = navigator.userAgentData;
	  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
	    return uaData.brands.map(function (item) {
	      return item.brand + "/" + item.version;
	    }).join(' ');
	  }
	  return navigator.userAgent;
	}

	function isLayoutViewport() {
	  return !/^((?!chrome|android).)*safari/i.test(getUAString());
	}

	function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }
	  if (isFixedStrategy === void 0) {
	    isFixedStrategy = false;
	  }
	  var clientRect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;
	  if (includeScale && isHTMLElement(element)) {
	    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
	    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	  }
	  var _ref = isElement(element) ? getWindow(element) : window,
	    visualViewport = _ref.visualViewport;
	  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	  var width = clientRect.width / scaleX;
	  var height = clientRect.height / scaleY;
	  return {
	    width: width,
	    height: height,
	    top: y,
	    right: x + width,
	    bottom: y + height,
	    left: x,
	    x: x,
	    y: y
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;
	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }
	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }
	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	    var next = child;
	    do {
	      if (next && parent.isSameNode(next)) {
	        return true;
	      } // $FlowFixMe[prop-missing]: need a better way to handle this...

	      next = next.parentNode || next.host;
	    } while (next);
	  } // Give up, the result is false

	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument :
	  // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }
	  return (
	    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot ||
	    // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || (
	    // DOM Element detected
	    isShadowRoot(element) ? element.host : null) ||
	    // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback
	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) ||
	  // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }
	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block

	function getContainingBlock(element) {
	  var isFirefox = /firefox/i.test(getUAString());
	  var isIE = /Trident/i.test(getUAString());
	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);
	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }
	  var currentNode = getParentNode(element);
	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }
	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }
	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.

	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);
	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }
	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }
	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};
	function arrow(_ref) {
	  var _state$modifiersData$;
	  var state = _ref.state,
	    name = _ref.name,
	    options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';
	  if (!arrowElement || !popperOffsets) {
	    return;
	  }
	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}
	function effect$1(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options;
	  var _options$element = options.element,
	    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
	  if (arrowElement == null) {
	    return;
	  } // CSS selector

	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);
	    if (!arrowElement) {
	      return;
	    }
	  }
	  if (!contains(state.elements.popper, arrowElement)) {
	    return;
	  }
	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules

	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref, win) {
	  var x = _ref.x,
	    y = _ref.y;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}
	function mapToStyles(_ref2) {
	  var _Object$assign2;
	  var popper = _ref2.popper,
	    popperRect = _ref2.popperRect,
	    placement = _ref2.placement,
	    variation = _ref2.variation,
	    offsets = _ref2.offsets,
	    position = _ref2.position,
	    gpuAcceleration = _ref2.gpuAcceleration,
	    adaptive = _ref2.adaptive,
	    roundOffsets = _ref2.roundOffsets,
	    isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	    x = _offsets$x === void 0 ? 0 : _offsets$x,
	    _offsets$y = offsets.y,
	    y = _offsets$y === void 0 ? 0 : _offsets$y;
	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };
	  x = _ref3.x;
	  y = _ref3.y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;
	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';
	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);
	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

	    offsetParent = offsetParent;
	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height :
	      // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }
	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width :
	      // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }
	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);
	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }, getWindow(popper)) : {
	    x: x,
	    y: y
	  };
	  x = _ref4.x;
	  y = _ref4.y;
	  if (gpuAcceleration) {
	    var _Object$assign;
	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }
	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}
	function computeStyles(_ref5) {
	  var state = _ref5.state,
	    options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	    _options$adaptive = options.adaptive,
	    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	    _options$roundOffsets = options.roundOffsets,
	    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };
	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }
	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};
	function effect(_ref) {
	  var state = _ref.state,
	    instance = _ref.instance,
	    options = _ref.options;
	  var _options$scroll = options.scroll,
	    scroll = _options$scroll === void 0 ? true : _options$scroll,
	    _options$resize = options.resize,
	    resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }
	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }
	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }
	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element, strategy) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0;
	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height;
	    var layoutViewport = isLayoutViewport();
	    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }
	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;
	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;
	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }
	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	    overflow = _getComputedStyle.overflow,
	    overflowX = _getComputedStyle.overflowX,
	    overflowY = _getComputedStyle.overflowY;
	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }
	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }
	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;
	  if (list === void 0) {
	    list = [];
	  }
	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList :
	  // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element, strategy) {
	  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}
	function getClientRectFromMixedType(element, clippingParent, strategy) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`

	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents

	function getClippingRect(element, boundary, rootBoundary, strategy) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	    element = _ref.element,
	    placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;
	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;
	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;
	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;
	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;
	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }
	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;
	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }
	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    _options$placement = _options.placement,
	    placement = _options$placement === void 0 ? state.placement : _options$placement,
	    _options$strategy = _options.strategy,
	    strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
	    _options$boundary = _options.boundary,
	    boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	    _options$rootBoundary = _options.rootBoundary,
	    rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	    _options$elementConte = _options.elementContext,
	    elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	    _options$altBoundary = _options.altBoundary,
	    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	    _options$padding = _options.padding,
	    padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }
	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    placement = _options.placement,
	    boundary = _options.boundary,
	    rootBoundary = _options.rootBoundary,
	    padding = _options.padding,
	    flipVariations = _options.flipVariations,
	    _options$allowedAutoP = _options.allowedAutoPlacements,
	    allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });
	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }
	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}
	function flip(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  if (state.modifiersData[name]._skip) {
	    return;
	  }
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	    specifiedFallbackPlacements = options.fallbackPlacements,
	    padding = options.padding,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    _options$flipVariatio = options.flipVariations,
	    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	    allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];
	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];
	    var _basePlacement = getBasePlacement(placement);
	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }
	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];
	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }
	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }
	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }
	    checksMap.set(placement, checks);
	  }
	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;
	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);
	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });
	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };
	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);
	      if (_ret === "break") break;
	    }
	  }
	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules

	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }
	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}
	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}
	function hide(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	      placement: placement
	    })) : offset,
	    skidding = _ref[0],
	    distance = _ref[1];
	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}
	function offset(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options,
	    name = _ref2.name;
	  var _options$offset = options.offset,
	    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	    x = _data$state$placement.x,
	    y = _data$state$placement.y;
	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    padding = options.padding,
	    _options$tether = options.tether,
	    tether = _options$tether === void 0 ? true : _options$tether,
	    _options$tetherOffset = options.tetherOffset,
	    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };
	  if (!popperOffsets) {
	    return;
	  }
	  if (checkMainAxis) {
	    var _offsetModifierState$;
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }
	  if (checkAltAxis) {
	    var _offsetModifierState$2;
	    var _mainSide = mainAxis === 'x' ? top : left;
	    var _altSide = mainAxis === 'x' ? bottom : right;
	    var _offset = popperOffsets[altAxis];
	    var _len = altAxis === 'y' ? 'height' : 'width';
	    var _min = _offset + overflow[_mainSide];
	    var _max = _offset - overflow[_altSide];
	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.

	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }
	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };
	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' ||
	    // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }
	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }
	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);
	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }
	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}
	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }
	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};
	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}
	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }
	  var _generatorOptions = generatorOptions,
	    _generatorOptions$def = _generatorOptions.defaultModifiers,
	    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	    _generatorOptions$def2 = _generatorOptions.defaultOptions,
	    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }
	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned
	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }
	        var _state$elements = state.elements,
	          reference = _state$elements.reference,
	          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {
	          return;
	        } // Store the reference and popper rects to be read by modifiers

	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }
	          var _state$orderedModifie = state.orderedModifiers[index],
	            fn = _state$orderedModifie.fn,
	            _state$orderedModifie2 = _state$orderedModifie.options,
	            _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	            name = _state$orderedModifie.name;
	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };
	    if (!areValidElements(reference, popper)) {
	      return instance;
	    }
	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	          _ref3$options = _ref3.options,
	          options = _ref3$options === void 0 ? {} : _ref3$options,
	          effect = _ref3.effect;
	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });
	          var noopFn = function noopFn() {};
	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }
	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }
	    return instance;
	  };
	}
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		afterMain: afterMain,
		afterRead: afterRead,
		afterWrite: afterWrite,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		auto: auto,
		basePlacements: basePlacements,
		beforeMain: beforeMain,
		beforeRead: beforeRead,
		beforeWrite: beforeWrite,
		bottom: bottom,
		clippingParents: clippingParents,
		computeStyles: computeStyles$1,
		createPopper: createPopper,
		createPopperBase: createPopper$2,
		createPopperLite: createPopper$1,
		detectOverflow: detectOverflow,
		end: end,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		left: left,
		main: main,
		modifierPhases: modifierPhases,
		offset: offset$1,
		placements: placements,
		popper: popper,
		popperGenerator: popperGenerator,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1,
		read: read,
		reference: reference,
		right: right,
		start: start,
		top: top,
		variationPlacements: variationPlacements,
		viewport: viewport,
		write: write
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

	/*!
	  * Bootstrap dropdown.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(require$$0, requireUtil(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (Popper, index, EventHandler, Manipulator, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  function _interopNamespace(e) {
		    if (e && e.__esModule) return e;
		    const n = Object.create(null, {
		      [Symbol.toStringTag]: {
		        value: 'Module'
		      }
		    });
		    if (e) {
		      for (const k in e) {
		        if (k !== 'default') {
		          const d = Object.getOwnPropertyDescriptor(e, k);
		          Object.defineProperty(n, k, d.get ? d : {
		            enumerable: true,
		            get: () => e[k]
		          });
		        }
		      }
		    }
		    n.default = e;
		    return Object.freeze(n);
		  }
		  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): dropdown.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'dropdown';
		  const DATA_KEY = 'bs.dropdown';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const TAB_KEY = 'Tab';
		  const ARROW_UP_KEY = 'ArrowUp';
		  const ARROW_DOWN_KEY = 'ArrowDown';
		  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_DROPUP = 'dropup';
		  const CLASS_NAME_DROPEND = 'dropend';
		  const CLASS_NAME_DROPSTART = 'dropstart';
		  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
		  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
		  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
		  const SELECTOR_MENU = '.dropdown-menu';
		  const SELECTOR_NAVBAR = '.navbar';
		  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
		  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
		  const PLACEMENT_TOP = index.isRTL() ? 'top-end' : 'top-start';
		  const PLACEMENT_TOPEND = index.isRTL() ? 'top-start' : 'top-end';
		  const PLACEMENT_BOTTOM = index.isRTL() ? 'bottom-end' : 'bottom-start';
		  const PLACEMENT_BOTTOMEND = index.isRTL() ? 'bottom-start' : 'bottom-end';
		  const PLACEMENT_RIGHT = index.isRTL() ? 'left-start' : 'right-start';
		  const PLACEMENT_LEFT = index.isRTL() ? 'right-start' : 'left-start';
		  const PLACEMENT_TOPCENTER = 'top';
		  const PLACEMENT_BOTTOMCENTER = 'bottom';
		  const Default = {
		    autoClose: true,
		    boundary: 'clippingParents',
		    display: 'dynamic',
		    offset: [0, 2],
		    popperConfig: null,
		    reference: 'toggle'
		  };
		  const DefaultType = {
		    autoClose: '(boolean|string)',
		    boundary: '(string|element)',
		    display: 'string',
		    offset: '(array|string|function)',
		    popperConfig: '(null|object|function)',
		    reference: '(string|element|object)'
		  };
		  /**
		   * Class definition
		   */

		  class Dropdown extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._popper = null;
		      this._parent = this._element.parentNode; // dropdown wrapper
		      // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

		      this._menu = SelectorEngine__default.default.next(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.findOne(SELECTOR_MENU, this._parent);
		      this._inNavbar = this._detectNavbar();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      return this._isShown() ? this.hide() : this.show();
		    }
		    show() {
		      if (index.isDisabled(this._element) || this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, relatedTarget);
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._createPopper(); // If this is a touch-enabled device we add extra
		      // empty mouseover listeners to the body's immediate children;
		      // only needed because of broken event delegation on iOS
		      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

		      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.on(element, 'mouseover', index.noop);
		        }
		      }
		      this._element.focus();
		      this._element.setAttribute('aria-expanded', true);
		      this._menu.classList.add(CLASS_NAME_SHOW);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      EventHandler__default.default.trigger(this._element, EVENT_SHOWN, relatedTarget);
		    }
		    hide() {
		      if (index.isDisabled(this._element) || !this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      this._completeHide(relatedTarget);
		    }
		    dispose() {
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      super.dispose();
		    }
		    update() {
		      this._inNavbar = this._detectNavbar();
		      if (this._popper) {
		        this._popper.update();
		      }
		    } // Private

		    _completeHide(relatedTarget) {
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE, relatedTarget);
		      if (hideEvent.defaultPrevented) {
		        return;
		      } // If this is a touch-enabled device we remove the extra
		      // empty mouseover listeners we added for iOS support

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.off(element, 'mouseover', index.noop);
		        }
		      }
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      this._menu.classList.remove(CLASS_NAME_SHOW);
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._element.setAttribute('aria-expanded', 'false');
		      Manipulator__default.default.removeDataAttribute(this._menu, 'popper');
		      EventHandler__default.default.trigger(this._element, EVENT_HIDDEN, relatedTarget);
		    }
		    _getConfig(config) {
		      config = super._getConfig(config);
		      if (typeof config.reference === 'object' && !index.isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
		        // Popper virtual elements require a getBoundingClientRect method
		        throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
		      }
		      return config;
		    }
		    _createPopper() {
		      if (typeof Popper__namespace === 'undefined') {
		        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
		      }
		      let referenceElement = this._element;
		      if (this._config.reference === 'parent') {
		        referenceElement = this._parent;
		      } else if (index.isElement(this._config.reference)) {
		        referenceElement = index.getElement(this._config.reference);
		      } else if (typeof this._config.reference === 'object') {
		        referenceElement = this._config.reference;
		      }
		      const popperConfig = this._getPopperConfig();
		      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
		    }
		    _isShown() {
		      return this._menu.classList.contains(CLASS_NAME_SHOW);
		    }
		    _getPlacement() {
		      const parentDropdown = this._parent;
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
		        return PLACEMENT_RIGHT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
		        return PLACEMENT_LEFT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
		        return PLACEMENT_TOPCENTER;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
		        return PLACEMENT_BOTTOMCENTER;
		      } // We need to trim the value because custom properties can also include spaces

		      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
		        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
		      }
		      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
		    }
		    _detectNavbar() {
		      return this._element.closest(SELECTOR_NAVBAR) !== null;
		    }
		    _getOffset() {
		      const {
		        offset
		      } = this._config;
		      if (typeof offset === 'string') {
		        return offset.split(',').map(value => Number.parseInt(value, 10));
		      }
		      if (typeof offset === 'function') {
		        return popperData => offset(popperData, this._element);
		      }
		      return offset;
		    }
		    _getPopperConfig() {
		      const defaultBsPopperConfig = {
		        placement: this._getPlacement(),
		        modifiers: [{
		          name: 'preventOverflow',
		          options: {
		            boundary: this._config.boundary
		          }
		        }, {
		          name: 'offset',
		          options: {
		            offset: this._getOffset()
		          }
		        }]
		      }; // Disable Popper if we have a static display or Dropdown is in Navbar

		      if (this._inNavbar || this._config.display === 'static') {
		        Manipulator__default.default.setDataAttribute(this._menu, 'popper', 'static'); // todo:v6 remove

		        defaultBsPopperConfig.modifiers = [{
		          name: 'applyStyles',
		          enabled: false
		        }];
		      }
		      return {
		        ...defaultBsPopperConfig,
		        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
		      };
		    }
		    _selectMenuItem({
		      key,
		      target
		    }) {
		      const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => index.isVisible(element));
		      if (!items.length) {
		        return;
		      } // if target isn't included in items (e.g. when expanding the dropdown)
		      // allow cycling to get the last item in case key equals ARROW_UP_KEY

		      index.getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Dropdown.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		    static clearMenus(event) {
		      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY) {
		        return;
		      }
		      const openToggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_SHOWN);
		      for (const toggle of openToggles) {
		        const context = Dropdown.getInstance(toggle);
		        if (!context || context._config.autoClose === false) {
		          continue;
		        }
		        const composedPath = event.composedPath();
		        const isMenuTarget = composedPath.includes(context._menu);
		        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
		          continue;
		        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu

		        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
		          continue;
		        }
		        const relatedTarget = {
		          relatedTarget: context._element
		        };
		        if (event.type === 'click') {
		          relatedTarget.clickEvent = event;
		        }
		        context._completeHide(relatedTarget);
		      }
		    }
		    static dataApiKeydownHandler(event) {
		      // If not an UP | DOWN | ESCAPE key => not a dropdown command
		      // If input/textarea && if key is other than ESCAPE => not a dropdown command
		      const isInput = /input|textarea/i.test(event.target.tagName);
		      const isEscapeEvent = event.key === ESCAPE_KEY;
		      const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);
		      if (!isUpOrDownEvent && !isEscapeEvent) {
		        return;
		      }
		      if (isInput && !isEscapeEvent) {
		        return;
		      }
		      event.preventDefault(); // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

		      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.findOne(SELECTOR_DATA_TOGGLE, event.delegateTarget.parentNode);
		      const instance = Dropdown.getOrCreateInstance(getToggleButton);
		      if (isUpOrDownEvent) {
		        event.stopPropagation();
		        instance.show();
		        instance._selectMenuItem(event);
		        return;
		      }
		      if (instance._isShown()) {
		        // else is escape and we check if it is shown
		        event.stopPropagation();
		        instance.hide();
		        getToggleButton.focus();
		      }
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
		  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
		  EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    event.preventDefault();
		    Dropdown.getOrCreateInstance(this).toggle();
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Dropdown);
		  return Dropdown;
		});
	} (dropdown$1));

	var dropdown = /*@__PURE__*/getDefaultExportFromCjs(dropdownExports);

	var collapseExports = {};
	var collapse$1 = {
	  get exports(){ return collapseExports; },
	  set exports(v){ collapseExports = v; },
	};

	/*!
	  * Bootstrap collapse.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): collapse.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'collapse';
		  const DATA_KEY = 'bs.collapse';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_COLLAPSE = 'collapse';
		  const CLASS_NAME_COLLAPSING = 'collapsing';
		  const CLASS_NAME_COLLAPSED = 'collapsed';
		  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
		  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
		  const WIDTH = 'width';
		  const HEIGHT = 'height';
		  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
		  const Default = {
		    parent: null,
		    toggle: true
		  };
		  const DefaultType = {
		    parent: '(null|element)',
		    toggle: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Collapse extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._isTransitioning = false;
		      this._triggerArray = [];
		      const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);
		      for (const elem of toggleList) {
		        const selector = index.getSelectorFromElement(elem);
		        const filterElement = SelectorEngine__default.default.find(selector).filter(foundElement => foundElement === this._element);
		        if (selector !== null && filterElement.length) {
		          this._triggerArray.push(elem);
		        }
		      }
		      this._initializeChildren();
		      if (!this._config.parent) {
		        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
		      }
		      if (this._config.toggle) {
		        this.toggle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      if (this._isShown()) {
		        this.hide();
		      } else {
		        this.show();
		      }
		    }
		    show() {
		      if (this._isTransitioning || this._isShown()) {
		        return;
		      }
		      let activeChildren = []; // find active children

		      if (this._config.parent) {
		        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
		          toggle: false
		        }));
		      }
		      if (activeChildren.length && activeChildren[0]._isTransitioning) {
		        return;
		      }
		      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      for (const activeInstance of activeChildren) {
		        activeInstance.hide();
		      }
		      const dimension = this._getDimension();
		      this._element.classList.remove(CLASS_NAME_COLLAPSE);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.style[dimension] = 0;
		      this._addAriaAndCollapsedClass(this._triggerArray, true);
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		        this._element.style[dimension] = '';
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
		      };
		      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
		      const scrollSize = `scroll${capitalizedDimension}`;
		      this._queueCallback(complete, this._element, true);
		      this._element.style[dimension] = `${this._element[scrollSize]}px`;
		    }
		    hide() {
		      if (this._isTransitioning || !this._isShown()) {
		        return;
		      }
		      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      const dimension = this._getDimension();
		      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		      for (const trigger of this._triggerArray) {
		        const element = index.getElementFromSelector(trigger);
		        if (element && !this._isShown(element)) {
		          this._addAriaAndCollapsedClass([trigger], false);
		        }
		      }
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE);
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._element.style[dimension] = '';
		      this._queueCallback(complete, this._element, true);
		    }
		    _isShown(element = this._element) {
		      return element.classList.contains(CLASS_NAME_SHOW);
		    } // Private

		    _configAfterMerge(config) {
		      config.toggle = Boolean(config.toggle); // Coerce string values

		      config.parent = index.getElement(config.parent);
		      return config;
		    }
		    _getDimension() {
		      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
		    }
		    _initializeChildren() {
		      if (!this._config.parent) {
		        return;
		      }
		      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);
		      for (const element of children) {
		        const selected = index.getElementFromSelector(element);
		        if (selected) {
		          this._addAriaAndCollapsedClass([element], this._isShown(selected));
		        }
		      }
		    }
		    _getFirstLevelChildren(selector) {
		      const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

		      return SelectorEngine__default.default.find(selector, this._config.parent).filter(element => !children.includes(element));
		    }
		    _addAriaAndCollapsedClass(triggerArray, isOpen) {
		      if (!triggerArray.length) {
		        return;
		      }
		      for (const element of triggerArray) {
		        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
		        element.setAttribute('aria-expanded', isOpen);
		      }
		    } // Static

		    static jQueryInterface(config) {
		      const _config = {};
		      if (typeof config === 'string' && /show|hide/.test(config)) {
		        _config.toggle = false;
		      }
		      return this.each(function () {
		        const data = Collapse.getOrCreateInstance(this, _config);
		        if (typeof config === 'string') {
		          if (typeof data[config] === 'undefined') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
		    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
		      event.preventDefault();
		    }
		    const selector = index.getSelectorFromElement(this);
		    const selectorElements = SelectorEngine__default.default.find(selector);
		    for (const element of selectorElements) {
		      Collapse.getOrCreateInstance(element, {
		        toggle: false
		      }).toggle();
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Collapse);
		  return Collapse;
		});
	} (collapse$1));

	var collapse = collapseExports;

	var modalExports = {};
	var modal$1 = {
	  get exports(){ return modalExports; },
	  set exports(v){ modalExports = v; },
	};

	var scrollbarExports = {};
	var scrollbar = {
	  get exports(){ return scrollbarExports; },
	  set exports(v){ scrollbarExports = v; },
	};

	/*!
	  * Bootstrap scrollbar.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredScrollbar;

	function requireScrollbar () {
		if (hasRequiredScrollbar) return scrollbarExports;
		hasRequiredScrollbar = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireSelectorEngine(), requireManipulator(), requireUtil()) ;
			})(commonjsGlobal, function (SelectorEngine, Manipulator, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/scrollBar.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
			  const SELECTOR_STICKY_CONTENT = '.sticky-top';
			  const PROPERTY_PADDING = 'padding-right';
			  const PROPERTY_MARGIN = 'margin-right';
			  /**
			   * Class definition
			   */

			  class ScrollBarHelper {
			    constructor() {
			      this._element = document.body;
			    } // Public

			    getWidth() {
			      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
			      const documentWidth = document.documentElement.clientWidth;
			      return Math.abs(window.innerWidth - documentWidth);
			    }
			    hide() {
			      const width = this.getWidth();
			      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width

			      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth

			      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
			      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
			    }
			    reset() {
			      this._resetElementAttributes(this._element, 'overflow');
			      this._resetElementAttributes(this._element, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
			    }
			    isOverflowing() {
			      return this.getWidth() > 0;
			    } // Private

			    _disableOverFlow() {
			      this._saveInitialAttribute(this._element, 'overflow');
			      this._element.style.overflow = 'hidden';
			    }
			    _setElementAttributes(selector, styleProperty, callback) {
			      const scrollbarWidth = this.getWidth();
			      const manipulationCallBack = element => {
			        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
			          return;
			        }
			        this._saveInitialAttribute(element, styleProperty);
			        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
			        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _saveInitialAttribute(element, styleProperty) {
			      const actualValue = element.style.getPropertyValue(styleProperty);
			      if (actualValue) {
			        Manipulator__default.default.setDataAttribute(element, styleProperty, actualValue);
			      }
			    }
			    _resetElementAttributes(selector, styleProperty) {
			      const manipulationCallBack = element => {
			        const value = Manipulator__default.default.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

			        if (value === null) {
			          element.style.removeProperty(styleProperty);
			          return;
			        }
			        Manipulator__default.default.removeDataAttribute(element, styleProperty);
			        element.style.setProperty(styleProperty, value);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _applyManipulationCallback(selector, callBack) {
			      if (index.isElement(selector)) {
			        callBack(selector);
			        return;
			      }
			      for (const sel of SelectorEngine__default.default.find(selector, this._element)) {
			        callBack(sel);
			      }
			    }
			  }
			  return ScrollBarHelper;
			});
	} (scrollbar));
		return scrollbarExports;
	}

	var backdropExports = {};
	var backdrop = {
	  get exports(){ return backdropExports; },
	  set exports(v){ backdropExports = v; },
	};

	/*!
	  * Bootstrap backdrop.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBackdrop;

	function requireBackdrop () {
		if (hasRequiredBackdrop) return backdropExports;
		hasRequiredBackdrop = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireUtil(), requireConfig()) ;
			})(commonjsGlobal, function (EventHandler, index, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/backdrop.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'backdrop';
			  const CLASS_NAME_FADE = 'fade';
			  const CLASS_NAME_SHOW = 'show';
			  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
			  const Default = {
			    className: 'modal-backdrop',
			    clickCallback: null,
			    isAnimated: false,
			    isVisible: true,
			    // if false, we use the backdrop helper without adding any element to the dom
			    rootElement: 'body' // give the choice to place backdrop under different elements
			  };

			  const DefaultType = {
			    className: 'string',
			    clickCallback: '(function|null)',
			    isAnimated: 'boolean',
			    isVisible: 'boolean',
			    rootElement: '(element|string)'
			  };
			  /**
			   * Class definition
			   */

			  class Backdrop extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isAppended = false;
			      this._element = null;
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    show(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }
			      this._append();
			      const element = this._getElement();
			      if (this._config.isAnimated) {
			        index.reflow(element);
			      }
			      element.classList.add(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        index.execute(callback);
			      });
			    }
			    hide(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }
			      this._getElement().classList.remove(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        this.dispose();
			        index.execute(callback);
			      });
			    }
			    dispose() {
			      if (!this._isAppended) {
			        return;
			      }
			      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);
			      this._element.remove();
			      this._isAppended = false;
			    } // Private

			    _getElement() {
			      if (!this._element) {
			        const backdrop = document.createElement('div');
			        backdrop.className = this._config.className;
			        if (this._config.isAnimated) {
			          backdrop.classList.add(CLASS_NAME_FADE);
			        }
			        this._element = backdrop;
			      }
			      return this._element;
			    }
			    _configAfterMerge(config) {
			      // use getElement() with the default "body" to get a fresh Element on each instantiation
			      config.rootElement = index.getElement(config.rootElement);
			      return config;
			    }
			    _append() {
			      if (this._isAppended) {
			        return;
			      }
			      const element = this._getElement();
			      this._config.rootElement.append(element);
			      EventHandler__default.default.on(element, EVENT_MOUSEDOWN, () => {
			        index.execute(this._config.clickCallback);
			      });
			      this._isAppended = true;
			    }
			    _emulateAnimation(callback) {
			      index.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
			    }
			  }
			  return Backdrop;
			});
	} (backdrop));
		return backdropExports;
	}

	var focustrapExports = {};
	var focustrap = {
	  get exports(){ return focustrapExports; },
	  set exports(v){ focustrapExports = v; },
	};

	/*!
	  * Bootstrap focustrap.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredFocustrap;

	function requireFocustrap () {
		if (hasRequiredFocustrap) return focustrapExports;
		hasRequiredFocustrap = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireSelectorEngine(), requireConfig()) ;
			})(commonjsGlobal, function (EventHandler, SelectorEngine, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/focustrap.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'focustrap';
			  const DATA_KEY = 'bs.focustrap';
			  const EVENT_KEY = `.${DATA_KEY}`;
			  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
			  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
			  const TAB_KEY = 'Tab';
			  const TAB_NAV_FORWARD = 'forward';
			  const TAB_NAV_BACKWARD = 'backward';
			  const Default = {
			    autofocus: true,
			    trapElement: null // The element to trap focus inside of
			  };

			  const DefaultType = {
			    autofocus: 'boolean',
			    trapElement: 'element'
			  };
			  /**
			   * Class definition
			   */

			  class FocusTrap extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isActive = false;
			      this._lastTabNavDirection = null;
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    activate() {
			      if (this._isActive) {
			        return;
			      }
			      if (this._config.autofocus) {
			        this._config.trapElement.focus();
			      }
			      EventHandler__default.default.off(document, EVENT_KEY); // guard against infinite focus loop

			      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
			      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
			      this._isActive = true;
			    }
			    deactivate() {
			      if (!this._isActive) {
			        return;
			      }
			      this._isActive = false;
			      EventHandler__default.default.off(document, EVENT_KEY);
			    } // Private

			    _handleFocusin(event) {
			      const {
			        trapElement
			      } = this._config;
			      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
			        return;
			      }
			      const elements = SelectorEngine__default.default.focusableChildren(trapElement);
			      if (elements.length === 0) {
			        trapElement.focus();
			      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
			        elements[elements.length - 1].focus();
			      } else {
			        elements[0].focus();
			      }
			    }
			    _handleKeydown(event) {
			      if (event.key !== TAB_KEY) {
			        return;
			      }
			      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
			    }
			  }
			  return FocusTrap;
			});
	} (focustrap));
		return focustrapExports;
	}

	var componentFunctionsExports = {};
	var componentFunctions = {
	  get exports(){ return componentFunctionsExports; },
	  set exports(v){ componentFunctionsExports = v; },
	};

	/*!
	  * Bootstrap component-functions.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredComponentFunctions;

	function requireComponentFunctions () {
		if (hasRequiredComponentFunctions) return componentFunctionsExports;
		hasRequiredComponentFunctions = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports, requireEventHandler(), requireUtil()) ;
			})(commonjsGlobal, function (exports, EventHandler, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/component-functions.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  const enableDismissTrigger = (component, method = 'hide') => {
			    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
			    const name = component.NAME;
			    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
			      if (['A', 'AREA'].includes(this.tagName)) {
			        event.preventDefault();
			      }
			      if (index.isDisabled(this)) {
			        return;
			      }
			      const target = index.getElementFromSelector(this) || this.closest(`.${name}`);
			      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

			      instance[method]();
			    });
			  };
			  exports.enableDismissTrigger = enableDismissTrigger;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (componentFunctions, componentFunctionsExports));
		return componentFunctionsExports;
	}

	/*!
	  * Bootstrap modal.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireScrollbar(), requireBaseComponent(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, ScrollBarHelper, BaseComponent, Backdrop, FocusTrap, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
		  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): modal.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'modal';
		  const DATA_KEY = 'bs.modal';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
		  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_OPEN = 'modal-open';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_STATIC = 'modal-static';
		  const OPEN_SELECTOR = '.modal.show';
		  const SELECTOR_DIALOG = '.modal-dialog';
		  const SELECTOR_MODAL_BODY = '.modal-body';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
		  const Default = {
		    backdrop: true,
		    focus: true,
		    keyboard: true
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    focus: 'boolean',
		    keyboard: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Modal extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._isShown = false;
		      this._isTransitioning = false;
		      this._scrollBar = new ScrollBarHelper__default.default();
		      this._addEventListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }
		    show(relatedTarget) {
		      if (this._isShown || this._isTransitioning) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = true;
		      this._isTransitioning = true;
		      this._scrollBar.hide();
		      document.body.classList.add(CLASS_NAME_OPEN);
		      this._adjustDialog();
		      this._backdrop.show(() => this._showElement(relatedTarget));
		    }
		    hide() {
		      if (!this._isShown || this._isTransitioning) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = false;
		      this._isTransitioning = true;
		      this._focustrap.deactivate();
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
		    }
		    dispose() {
		      for (const htmlElement of [window, this._dialog]) {
		        EventHandler__default.default.off(htmlElement, EVENT_KEY);
		      }
		      this._backdrop.dispose();
		      this._focustrap.deactivate();
		      super.dispose();
		    }
		    handleUpdate() {
		      this._adjustDialog();
		    } // Private

		    _initializeBackDrop() {
		      return new Backdrop__default.default({
		        isVisible: Boolean(this._config.backdrop),
		        // 'static' option will be translated to true, and booleans will keep their value,
		        isAnimated: this._isAnimated()
		      });
		    }
		    _initializeFocusTrap() {
		      return new FocusTrap__default.default({
		        trapElement: this._element
		      });
		    }
		    _showElement(relatedTarget) {
		      // try to append dynamic modal
		      if (!document.body.contains(this._element)) {
		        document.body.append(this._element);
		      }
		      this._element.style.display = 'block';
		      this._element.removeAttribute('aria-hidden');
		      this._element.setAttribute('aria-modal', true);
		      this._element.setAttribute('role', 'dialog');
		      this._element.scrollTop = 0;
		      const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);
		      if (modalBody) {
		        modalBody.scrollTop = 0;
		      }
		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      const transitionComplete = () => {
		        if (this._config.focus) {
		          this._focustrap.activate();
		        }
		        this._isTransitioning = false;
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };
		      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
		    }
		    _addEventListeners() {
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }
		        if (this._config.keyboard) {
		          event.preventDefault();
		          this.hide();
		          return;
		        }
		        this._triggerBackdropTransition();
		      });
		      EventHandler__default.default.on(window, EVENT_RESIZE, () => {
		        if (this._isShown && !this._isTransitioning) {
		          this._adjustDialog();
		        }
		      });
		      EventHandler__default.default.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
		        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
		        EventHandler__default.default.one(this._element, EVENT_CLICK_DISMISS, event2 => {
		          if (this._element !== event.target || this._element !== event2.target) {
		            return;
		          }
		          if (this._config.backdrop === 'static') {
		            this._triggerBackdropTransition();
		            return;
		          }
		          if (this._config.backdrop) {
		            this.hide();
		          }
		        });
		      });
		    }
		    _hideModal() {
		      this._element.style.display = 'none';
		      this._element.setAttribute('aria-hidden', true);
		      this._element.removeAttribute('aria-modal');
		      this._element.removeAttribute('role');
		      this._isTransitioning = false;
		      this._backdrop.hide(() => {
		        document.body.classList.remove(CLASS_NAME_OPEN);
		        this._resetAdjustments();
		        this._scrollBar.reset();
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      });
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_FADE);
		    }
		    _triggerBackdropTransition() {
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

		      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
		        return;
		      }
		      if (!isModalOverflowing) {
		        this._element.style.overflowY = 'hidden';
		      }
		      this._element.classList.add(CLASS_NAME_STATIC);
		      this._queueCallback(() => {
		        this._element.classList.remove(CLASS_NAME_STATIC);
		        this._queueCallback(() => {
		          this._element.style.overflowY = initialOverflowY;
		        }, this._dialog);
		      }, this._dialog);
		      this._element.focus();
		    }
		    /**
		     * The following methods are used to handle overflowing modals
		     */

		    _adjustDialog() {
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const scrollbarWidth = this._scrollBar.getWidth();
		      const isBodyOverflowing = scrollbarWidth > 0;
		      if (isBodyOverflowing && !isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingLeft' : 'paddingRight';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		      if (!isBodyOverflowing && isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingRight' : 'paddingLeft';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		    }
		    _resetAdjustments() {
		      this._element.style.paddingLeft = '';
		      this._element.style.paddingRight = '';
		    } // Static

		    static jQueryInterface(config, relatedTarget) {
		      return this.each(function () {
		        const data = Modal.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](relatedTarget);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    EventHandler__default.default.one(target, EVENT_SHOW, showEvent => {
		      if (showEvent.defaultPrevented) {
		        // only register focus restorer if modal will actually get shown
		        return;
		      }
		      EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
		        if (index.isVisible(this)) {
		          this.focus();
		        }
		      });
		    }); // avoid conflict when clicking modal toggler while another one is open

		    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
		    if (alreadyOpen) {
		      Modal.getInstance(alreadyOpen).hide();
		    }
		    const data = Modal.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  componentFunctions.enableDismissTrigger(Modal);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Modal);
		  return Modal;
		});
	} (modal$1));

	var modal = modalExports;

	var scrollspyExports = {};
	var scrollspy$1 = {
	  get exports(){ return scrollspyExports; },
	  set exports(v){ scrollspyExports = v; },
	};

	/*!
	  * Bootstrap scrollspy.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): scrollspy.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'scrollspy';
		  const DATA_KEY = 'bs.scrollspy';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
		  const EVENT_CLICK = `click${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
		  const SELECTOR_TARGET_LINKS = '[href]';
		  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
		  const SELECTOR_NAV_LINKS = '.nav-link';
		  const SELECTOR_NAV_ITEMS = '.nav-item';
		  const SELECTOR_LIST_ITEMS = '.list-group-item';
		  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
		  const SELECTOR_DROPDOWN = '.dropdown';
		  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
		  const Default = {
		    offset: null,
		    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: '0px 0px -25%',
		    smoothScroll: false,
		    target: null,
		    threshold: [0.1, 0.5, 1]
		  };
		  const DefaultType = {
		    offset: '(number|null)',
		    // TODO v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: 'string',
		    smoothScroll: 'boolean',
		    target: 'element',
		    threshold: 'array'
		  };
		  /**
		   * Class definition
		   */

		  class ScrollSpy extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config); // this._element is the observablesContainer and config.target the menu links wrapper

		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
		      this._activeTarget = null;
		      this._observer = null;
		      this._previousScrollData = {
		        visibleEntryTop: 0,
		        parentScrollTop: 0
		      };
		      this.refresh(); // initialize
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    refresh() {
		      this._initializeTargetsAndObservables();
		      this._maybeEnableSmoothScroll();
		      if (this._observer) {
		        this._observer.disconnect();
		      } else {
		        this._observer = this._getNewObserver();
		      }
		      for (const section of this._observableSections.values()) {
		        this._observer.observe(section);
		      }
		    }
		    dispose() {
		      this._observer.disconnect();
		      super.dispose();
		    } // Private

		    _configAfterMerge(config) {
		      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
		      config.target = index.getElement(config.target) || document.body; // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only

		      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
		      if (typeof config.threshold === 'string') {
		        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
		      }
		      return config;
		    }
		    _maybeEnableSmoothScroll() {
		      if (!this._config.smoothScroll) {
		        return;
		      } // unregister any previous listeners

		      EventHandler__default.default.off(this._config.target, EVENT_CLICK);
		      EventHandler__default.default.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
		        const observableSection = this._observableSections.get(event.target.hash);
		        if (observableSection) {
		          event.preventDefault();
		          const root = this._rootElement || window;
		          const height = observableSection.offsetTop - this._element.offsetTop;
		          if (root.scrollTo) {
		            root.scrollTo({
		              top: height,
		              behavior: 'smooth'
		            });
		            return;
		          } // Chrome 60 doesn't support `scrollTo`

		          root.scrollTop = height;
		        }
		      });
		    }
		    _getNewObserver() {
		      const options = {
		        root: this._rootElement,
		        threshold: this._config.threshold,
		        rootMargin: this._config.rootMargin
		      };
		      return new IntersectionObserver(entries => this._observerCallback(entries), options);
		    } // The logic of selection

		    _observerCallback(entries) {
		      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
		      const activate = entry => {
		        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
		        this._process(targetElement(entry));
		      };
		      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
		      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
		      this._previousScrollData.parentScrollTop = parentScrollTop;
		      for (const entry of entries) {
		        if (!entry.isIntersecting) {
		          this._activeTarget = null;
		          this._clearActiveClass(targetElement(entry));
		          continue;
		        }
		        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop; // if we are scrolling down, pick the bigger offsetTop

		        if (userScrollsDown && entryIsLowerThanPrevious) {
		          activate(entry); // if parent isn't scrolled, let's keep the first visible item, breaking the iteration

		          if (!parentScrollTop) {
		            return;
		          }
		          continue;
		        } // if we are scrolling up, pick the smallest offsetTop

		        if (!userScrollsDown && !entryIsLowerThanPrevious) {
		          activate(entry);
		        }
		      }
		    }
		    _initializeTargetsAndObservables() {
		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      const targetLinks = SelectorEngine__default.default.find(SELECTOR_TARGET_LINKS, this._config.target);
		      for (const anchor of targetLinks) {
		        // ensure that the anchor has an id and is not disabled
		        if (!anchor.hash || index.isDisabled(anchor)) {
		          continue;
		        }
		        const observableSection = SelectorEngine__default.default.findOne(anchor.hash, this._element); // ensure that the observableSection exists & is visible

		        if (index.isVisible(observableSection)) {
		          this._targetLinks.set(anchor.hash, anchor);
		          this._observableSections.set(anchor.hash, observableSection);
		        }
		      }
		    }
		    _process(target) {
		      if (this._activeTarget === target) {
		        return;
		      }
		      this._clearActiveClass(this._config.target);
		      this._activeTarget = target;
		      target.classList.add(CLASS_NAME_ACTIVE);
		      this._activateParents(target);
		      EventHandler__default.default.trigger(this._element, EVENT_ACTIVATE, {
		        relatedTarget: target
		      });
		    }
		    _activateParents(target) {
		      // Activate dropdown parents
		      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
		        SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_TOGGLE, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
		        return;
		      }
		      for (const listGroup of SelectorEngine__default.default.parents(target, SELECTOR_NAV_LIST_GROUP)) {
		        // Set triggered links parents as active
		        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
		        for (const item of SelectorEngine__default.default.prev(listGroup, SELECTOR_LINK_ITEMS)) {
		          item.classList.add(CLASS_NAME_ACTIVE);
		        }
		      }
		    }
		    _clearActiveClass(parent) {
		      parent.classList.remove(CLASS_NAME_ACTIVE);
		      const activeNodes = SelectorEngine__default.default.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE}`, parent);
		      for (const node of activeNodes) {
		        node.classList.remove(CLASS_NAME_ACTIVE);
		      }
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = ScrollSpy.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const spy of SelectorEngine__default.default.find(SELECTOR_DATA_SPY)) {
		      ScrollSpy.getOrCreateInstance(spy);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(ScrollSpy);
		  return ScrollSpy;
		});
	} (scrollspy$1));

	var scrollspy = scrollspyExports;

	/**
	 * File skip-link-focus-fix.js.
	 *
	 * Helps with accessibility for keyboard only users.
	 *
	 * Learn more: https://git.io/vWdr2
	 */
	(function () {
	  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
	  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
	    window.addEventListener('hashchange', function () {
	      var id = location.hash.substring(1),
	        element;
	      if (!/^[A-z0-9_-]+$/.test(id)) {
	        return;
	      }
	      element = document.getElementById(id);
	      if (element) {
	        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
	          element.tabIndex = -1;
	        }
	        element.focus();
	      }
	    }, false);
	  }
	})();

	var jquery_matchHeightExports = {};
	var jquery_matchHeight = {
	  get exports(){ return jquery_matchHeightExports; },
	  set exports(v){ jquery_matchHeightExports = v; },
	};

	/**
	* jquery-match-height 0.7.2 by @liabru
	* http://brm.io/jquery-match-height/
	* License: MIT
	*/

	(function (module) {
		(function (factory) {

		  if (module.exports) {
		    // CommonJS
		    module.exports = factory(require$$0$1);
		  } else {
		    // Global
		    factory(jQuery);
		  }
		})(function ($) {
		  /*
		  *  internal
		  */

		  var _previousResizeWidth = -1,
		    _updateTimeout = -1;

		  /*
		  *  _parse
		  *  value parse utility function
		  */

		  var _parse = function (value) {
		    // parse value and convert NaN to 0
		    return parseFloat(value) || 0;
		  };

		  /*
		  *  _rows
		  *  utility function returns array of jQuery selections representing each row
		  *  (as displayed after float wrapping applied by browser)
		  */

		  var _rows = function (elements) {
		    var tolerance = 1,
		      $elements = $(elements),
		      lastTop = null,
		      rows = [];

		    // group elements by their top position
		    $elements.each(function () {
		      var $that = $(this),
		        top = $that.offset().top - _parse($that.css('margin-top')),
		        lastRow = rows.length > 0 ? rows[rows.length - 1] : null;
		      if (lastRow === null) {
		        // first item on the row, so just push it
		        rows.push($that);
		      } else {
		        // if the row top is the same, add to the row group
		        if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
		          rows[rows.length - 1] = lastRow.add($that);
		        } else {
		          // otherwise start a new row group
		          rows.push($that);
		        }
		      }

		      // keep track of the last row top
		      lastTop = top;
		    });
		    return rows;
		  };

		  /*
		  *  _parseOptions
		  *  handle plugin options
		  */

		  var _parseOptions = function (options) {
		    var opts = {
		      byRow: true,
		      property: 'height',
		      target: null,
		      remove: false
		    };
		    if (typeof options === 'object') {
		      return $.extend(opts, options);
		    }
		    if (typeof options === 'boolean') {
		      opts.byRow = options;
		    } else if (options === 'remove') {
		      opts.remove = true;
		    }
		    return opts;
		  };

		  /*
		  *  matchHeight
		  *  plugin definition
		  */

		  var matchHeight = $.fn.matchHeight = function (options) {
		    var opts = _parseOptions(options);

		    // handle remove
		    if (opts.remove) {
		      var that = this;

		      // remove fixed height from all selected elements
		      this.css(opts.property, '');

		      // remove selected elements from all groups
		      $.each(matchHeight._groups, function (key, group) {
		        group.elements = group.elements.not(that);
		      });

		      // TODO: cleanup empty groups

		      return this;
		    }
		    if (this.length <= 1 && !opts.target) {
		      return this;
		    }

		    // keep track of this group so we can re-apply later on load and resize events
		    matchHeight._groups.push({
		      elements: this,
		      options: opts
		    });

		    // match each element's height to the tallest element in the selection
		    matchHeight._apply(this, opts);
		    return this;
		  };

		  /*
		  *  plugin global options
		  */

		  matchHeight.version = '0.7.2';
		  matchHeight._groups = [];
		  matchHeight._throttle = 80;
		  matchHeight._maintainScroll = false;
		  matchHeight._beforeUpdate = null;
		  matchHeight._afterUpdate = null;
		  matchHeight._rows = _rows;
		  matchHeight._parse = _parse;
		  matchHeight._parseOptions = _parseOptions;

		  /*
		  *  matchHeight._apply
		  *  apply matchHeight to given elements
		  */

		  matchHeight._apply = function (elements, options) {
		    var opts = _parseOptions(options),
		      $elements = $(elements),
		      rows = [$elements];

		    // take note of scroll position
		    var scrollTop = $(window).scrollTop(),
		      htmlHeight = $('html').outerHeight(true);

		    // get hidden parents
		    var $hiddenParents = $elements.parents().filter(':hidden');

		    // cache the original inline style
		    $hiddenParents.each(function () {
		      var $that = $(this);
		      $that.data('style-cache', $that.attr('style'));
		    });

		    // temporarily must force hidden parents visible
		    $hiddenParents.css('display', 'block');

		    // get rows if using byRow, otherwise assume one row
		    if (opts.byRow && !opts.target) {
		      // must first force an arbitrary equal height so floating elements break evenly
		      $elements.each(function () {
		        var $that = $(this),
		          display = $that.css('display');

		        // temporarily force a usable display value
		        if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
		          display = 'block';
		        }

		        // cache the original inline style
		        $that.data('style-cache', $that.attr('style'));
		        $that.css({
		          'display': display,
		          'padding-top': '0',
		          'padding-bottom': '0',
		          'margin-top': '0',
		          'margin-bottom': '0',
		          'border-top-width': '0',
		          'border-bottom-width': '0',
		          'height': '100px',
		          'overflow': 'hidden'
		        });
		      });

		      // get the array of rows (based on element top position)
		      rows = _rows($elements);

		      // revert original inline styles
		      $elements.each(function () {
		        var $that = $(this);
		        $that.attr('style', $that.data('style-cache') || '');
		      });
		    }
		    $.each(rows, function (key, row) {
		      var $row = $(row),
		        targetHeight = 0;
		      if (!opts.target) {
		        // skip apply to rows with only one item
		        if (opts.byRow && $row.length <= 1) {
		          $row.css(opts.property, '');
		          return;
		        }

		        // iterate the row and find the max height
		        $row.each(function () {
		          var $that = $(this),
		            style = $that.attr('style'),
		            display = $that.css('display');

		          // temporarily force a usable display value
		          if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
		            display = 'block';
		          }

		          // ensure we get the correct actual height (and not a previously set height value)
		          var css = {
		            'display': display
		          };
		          css[opts.property] = '';
		          $that.css(css);

		          // find the max height (including padding, but not margin)
		          if ($that.outerHeight(false) > targetHeight) {
		            targetHeight = $that.outerHeight(false);
		          }

		          // revert styles
		          if (style) {
		            $that.attr('style', style);
		          } else {
		            $that.css('display', '');
		          }
		        });
		      } else {
		        // if target set, use the height of the target element
		        targetHeight = opts.target.outerHeight(false);
		      }

		      // iterate the row and apply the height to all elements
		      $row.each(function () {
		        var $that = $(this),
		          verticalPadding = 0;

		        // don't apply to a target
		        if (opts.target && $that.is(opts.target)) {
		          return;
		        }

		        // handle padding and border correctly (required when not using border-box)
		        if ($that.css('box-sizing') !== 'border-box') {
		          verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
		          verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
		        }

		        // set the height (accounting for padding and border)
		        $that.css(opts.property, targetHeight - verticalPadding + 'px');
		      });
		    });

		    // revert hidden parents
		    $hiddenParents.each(function () {
		      var $that = $(this);
		      $that.attr('style', $that.data('style-cache') || null);
		    });

		    // restore scroll position if enabled
		    if (matchHeight._maintainScroll) {
		      $(window).scrollTop(scrollTop / htmlHeight * $('html').outerHeight(true));
		    }
		    return this;
		  };

		  /*
		  *  matchHeight._applyDataApi
		  *  applies matchHeight to all elements with a data-match-height attribute
		  */

		  matchHeight._applyDataApi = function () {
		    var groups = {};

		    // generate groups by their groupId set by elements using data-match-height
		    $('[data-match-height], [data-mh]').each(function () {
		      var $this = $(this),
		        groupId = $this.attr('data-mh') || $this.attr('data-match-height');
		      if (groupId in groups) {
		        groups[groupId] = groups[groupId].add($this);
		      } else {
		        groups[groupId] = $this;
		      }
		    });

		    // apply matchHeight to each group
		    $.each(groups, function () {
		      this.matchHeight(true);
		    });
		  };

		  /*
		  *  matchHeight._update
		  *  updates matchHeight on all current groups with their correct options
		  */

		  var _update = function (event) {
		    if (matchHeight._beforeUpdate) {
		      matchHeight._beforeUpdate(event, matchHeight._groups);
		    }
		    $.each(matchHeight._groups, function () {
		      matchHeight._apply(this.elements, this.options);
		    });
		    if (matchHeight._afterUpdate) {
		      matchHeight._afterUpdate(event, matchHeight._groups);
		    }
		  };
		  matchHeight._update = function (throttle, event) {
		    // prevent update if fired from a resize event
		    // where the viewport width hasn't actually changed
		    // fixes an event looping bug in IE8
		    if (event && event.type === 'resize') {
		      var windowWidth = $(window).width();
		      if (windowWidth === _previousResizeWidth) {
		        return;
		      }
		      _previousResizeWidth = windowWidth;
		    }

		    // throttle updates
		    if (!throttle) {
		      _update(event);
		    } else if (_updateTimeout === -1) {
		      _updateTimeout = setTimeout(function () {
		        _update(event);
		        _updateTimeout = -1;
		      }, matchHeight._throttle);
		    }
		  };

		  /*
		  *  bind events
		  */

		  // apply on DOM ready event
		  $(matchHeight._applyDataApi);

		  // use on or bind where supported
		  var on = $.fn.on ? 'on' : 'bind';

		  // update heights on load and resize events
		  $(window)[on]('load', function (event) {
		    matchHeight._update(false, event);
		  });

		  // throttled update heights on resize events
		  $(window)[on]('resize orientationchange', function (event) {
		    matchHeight._update(true, event);
		  });
		});
	} (jquery_matchHeight));

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
	      $('#mega-menu-wrap-primary .mega-menu-toggle + #mega-menu-primary').css('max-height', `calc(${windowHeight}px - ${headerHeight}px)`);
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
	      $('#mega-menu-wrap-primary .mega-menu-toggle + #mega-menu-primary').css('max-height', `calc(${windowHeight}px - ${headerHeight}px)`);
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
	    window.matchMedia('(max-width: 782.98px)').matches ? wpadminbar = 46 : wpadminbar = 32;
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
	      $(`#${testimonialId}`).on('slide.bs.carousel', event => {
	        const nextH = $(event.relatedTarget).height();
	        $(this).find('.active').parent().animate({
	          height: nextH
	        }, 500);
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
	          otNoticeMenu.wrap('<nav class="otnotice-menu-holder"></nav>').css('top', `${headerHeight}px`);
	        }
	        if (!$('.otnotice-content-holder').length) {
	          $('.otnotice-sections').wrap('<div class="otnotice-content-holder"></div>');
	        }
	      }
	    }, 300); // check after 100ms every time

	    const observer = new IntersectionObserver(entries => {
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
	    }, {
	      threshold: [0, 1]
	    });
	    observer.observe(document.querySelector('.myObserver'));
	    const headerClass = header[0].classList.contains('no-nav');
	    if (!headerClass) {
	      const element = document.querySelector('.mega-menu-toggle');
	      let prevState = element.classList.contains('mega-menu-open');
	      const observer2 = new MutationObserver(mutations => {
	        for (const mutation of mutations) {
	          const {
	            attributeName
	          } = mutation;
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
	          $(this).children('h6').wrapInner(`<button class="collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${buttonCopy}-collapse" aria-expanded="false" aria-controls="${buttonCopy}-collapse"></button>`);
	        }
	        if (!$(this).children(`.menu-${buttonCopy}-container`).hasClass('collapse')) {
	          $(this).children(`.menu-${buttonCopy}-container`).addClass('collapse').attr('id', `${buttonCopy}-collapse`);
	        }
	      });
	    } else {
	      $('.site-footer-nav').each(function () {
	        $(this).removeClass('collapse-nav');
	        const buttonCopy = $(this).children('h6').text().toLowerCase().replace(/ /g, '-');
	        $(this).children('h6').children('button').contents().unwrap();
	        $(this).children(`.menu-${buttonCopy}-container`).removeClass('collapse').removeClass('show').removeAttr('id');
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
	        $('.otnotice-menu-mobile .otnotice-menu-selected-container').wrapInner('<button class="toc-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target=".otnotice-menu-mobile-container" aria-controls="otnotice-menu-mobile-container" aria-expanded="false" aria-label="Toggle Privacy Table of Contents" ></button>');
	        const tocButton = $('.toc-toggler');
	        $('.otnotice-menu-mobile .otnotice-menu-mobile-container').addClass('collapse').attr('style', '');
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
	            $(`.otnotice-menu-holder ul li a[href="#${$(anchors[i]).attr('id')}"]`).removeClass('active');
	            $(`.otnotice-menu-mobile-container li a[href="#${$(anchors[i]).attr('id')}"]`).removeClass('active');
	          }

	          // then iterate backwards, on the first match highlight it and break
	          for (i = anchors.length - 1; i >= 0; i--) {
	            if (scrollTop > $(anchors[i]).offset().top - headerHeight) {
	              $(`.otnotice-menu-holder ul li a[href="#${$(anchors[i]).attr('id')}"]`).addClass('active');
	              $(`.otnotice-menu-mobile-container li a[href="#${$(anchors[i]).attr('id')}"]`).addClass('active');
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

	/**
	 * A JavaScript implementation of the SHA family of hashes - defined in FIPS PUB 180-4, FIPS PUB 202,
	 * and SP 800-185 - as well as the corresponding HMAC implementation as defined in FIPS PUB 198-1.
	 *
	 * Copyright 2008-2022 Brian Turek, 1998-2009 Paul Johnston & Contributors
	 * Distributed under the BSD License
	 * See http://caligatio.github.com/jsSHA/ for more information
	 */
	const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	function n(t, n, e, r) {
	  let i, s, o;
	  const h = n || [0],
	    u = (e = e || 0) >>> 3,
	    w = -1 === r ? 3 : 0;
	  for (i = 0; i < t.length; i += 1) o = i + u, s = o >>> 2, h.length <= s && h.push(0), h[s] |= t[i] << 8 * (w + r * (o % 4));
	  return {
	    value: h,
	    binLen: 8 * t.length + e
	  };
	}
	function e(e, r, i) {
	  switch (r) {
	    case "UTF8":
	    case "UTF16BE":
	    case "UTF16LE":
	      break;
	    default:
	      throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
	  }
	  switch (e) {
	    case "HEX":
	      return function (t, n, e) {
	        return function (t, n, e, r) {
	          let i, s, o, h;
	          if (0 != t.length % 2) throw new Error("String of HEX type must be in byte increments");
	          const u = n || [0],
	            w = (e = e || 0) >>> 3,
	            c = -1 === r ? 3 : 0;
	          for (i = 0; i < t.length; i += 2) {
	            if (s = parseInt(t.substr(i, 2), 16), isNaN(s)) throw new Error("String of HEX type contains invalid characters");
	            for (h = (i >>> 1) + w, o = h >>> 2; u.length <= o;) u.push(0);
	            u[o] |= s << 8 * (c + r * (h % 4));
	          }
	          return {
	            value: u,
	            binLen: 4 * t.length + e
	          };
	        }(t, n, e, i);
	      };
	    case "TEXT":
	      return function (t, n, e) {
	        return function (t, n, e, r, i) {
	          let s,
	            o,
	            h,
	            u,
	            w,
	            c,
	            f,
	            a,
	            l = 0;
	          const A = e || [0],
	            E = (r = r || 0) >>> 3;
	          if ("UTF8" === n) for (f = -1 === i ? 3 : 0, h = 0; h < t.length; h += 1) for (s = t.charCodeAt(h), o = [], 128 > s ? o.push(s) : 2048 > s ? (o.push(192 | s >>> 6), o.push(128 | 63 & s)) : 55296 > s || 57344 <= s ? o.push(224 | s >>> 12, 128 | s >>> 6 & 63, 128 | 63 & s) : (h += 1, s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(h)), o.push(240 | s >>> 18, 128 | s >>> 12 & 63, 128 | s >>> 6 & 63, 128 | 63 & s)), u = 0; u < o.length; u += 1) {
	            for (c = l + E, w = c >>> 2; A.length <= w;) A.push(0);
	            A[w] |= o[u] << 8 * (f + i * (c % 4)), l += 1;
	          } else for (f = -1 === i ? 2 : 0, a = "UTF16LE" === n && 1 !== i || "UTF16LE" !== n && 1 === i, h = 0; h < t.length; h += 1) {
	            for (s = t.charCodeAt(h), !0 === a && (u = 255 & s, s = u << 8 | s >>> 8), c = l + E, w = c >>> 2; A.length <= w;) A.push(0);
	            A[w] |= s << 8 * (f + i * (c % 4)), l += 2;
	          }
	          return {
	            value: A,
	            binLen: 8 * l + r
	          };
	        }(t, r, n, e, i);
	      };
	    case "B64":
	      return function (n, e, r) {
	        return function (n, e, r, i) {
	          let s,
	            o,
	            h,
	            u,
	            w,
	            c,
	            f,
	            a = 0;
	          const l = e || [0],
	            A = (r = r || 0) >>> 3,
	            E = -1 === i ? 3 : 0,
	            H = n.indexOf("=");
	          if (-1 === n.search(/^[a-zA-Z0-9=+/]+$/)) throw new Error("Invalid character in base-64 string");
	          if (n = n.replace(/=/g, ""), -1 !== H && H < n.length) throw new Error("Invalid '=' found in base-64 string");
	          for (o = 0; o < n.length; o += 4) {
	            for (w = n.substr(o, 4), u = 0, h = 0; h < w.length; h += 1) s = t.indexOf(w.charAt(h)), u |= s << 18 - 6 * h;
	            for (h = 0; h < w.length - 1; h += 1) {
	              for (f = a + A, c = f >>> 2; l.length <= c;) l.push(0);
	              l[c] |= (u >>> 16 - 8 * h & 255) << 8 * (E + i * (f % 4)), a += 1;
	            }
	          }
	          return {
	            value: l,
	            binLen: 8 * a + r
	          };
	        }(n, e, r, i);
	      };
	    case "BYTES":
	      return function (t, n, e) {
	        return function (t, n, e, r) {
	          let i, s, o, h;
	          const u = n || [0],
	            w = (e = e || 0) >>> 3,
	            c = -1 === r ? 3 : 0;
	          for (s = 0; s < t.length; s += 1) i = t.charCodeAt(s), h = s + w, o = h >>> 2, u.length <= o && u.push(0), u[o] |= i << 8 * (c + r * (h % 4));
	          return {
	            value: u,
	            binLen: 8 * t.length + e
	          };
	        }(t, n, e, i);
	      };
	    case "ARRAYBUFFER":
	      try {
	        new ArrayBuffer(0);
	      } catch (t) {
	        throw new Error("ARRAYBUFFER not supported by this environment");
	      }
	      return function (t, e, r) {
	        return function (t, e, r, i) {
	          return n(new Uint8Array(t), e, r, i);
	        }(t, e, r, i);
	      };
	    case "UINT8ARRAY":
	      try {
	        new Uint8Array(0);
	      } catch (t) {
	        throw new Error("UINT8ARRAY not supported by this environment");
	      }
	      return function (t, e, r) {
	        return n(t, e, r, i);
	      };
	    default:
	      throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
	  }
	}
	function r(n, e, r, i) {
	  switch (n) {
	    case "HEX":
	      return function (t) {
	        return function (t, n, e, r) {
	          const i = "0123456789abcdef";
	          let s,
	            o,
	            h = "";
	          const u = n / 8,
	            w = -1 === e ? 3 : 0;
	          for (s = 0; s < u; s += 1) o = t[s >>> 2] >>> 8 * (w + e * (s % 4)), h += i.charAt(o >>> 4 & 15) + i.charAt(15 & o);
	          return r.outputUpper ? h.toUpperCase() : h;
	        }(t, e, r, i);
	      };
	    case "B64":
	      return function (n) {
	        return function (n, e, r, i) {
	          let s,
	            o,
	            h,
	            u,
	            w,
	            c = "";
	          const f = e / 8,
	            a = -1 === r ? 3 : 0;
	          for (s = 0; s < f; s += 3) for (u = s + 1 < f ? n[s + 1 >>> 2] : 0, w = s + 2 < f ? n[s + 2 >>> 2] : 0, h = (n[s >>> 2] >>> 8 * (a + r * (s % 4)) & 255) << 16 | (u >>> 8 * (a + r * ((s + 1) % 4)) & 255) << 8 | w >>> 8 * (a + r * ((s + 2) % 4)) & 255, o = 0; o < 4; o += 1) c += 8 * s + 6 * o <= e ? t.charAt(h >>> 6 * (3 - o) & 63) : i.b64Pad;
	          return c;
	        }(n, e, r, i);
	      };
	    case "BYTES":
	      return function (t) {
	        return function (t, n, e) {
	          let r,
	            i,
	            s = "";
	          const o = n / 8,
	            h = -1 === e ? 3 : 0;
	          for (r = 0; r < o; r += 1) i = t[r >>> 2] >>> 8 * (h + e * (r % 4)) & 255, s += String.fromCharCode(i);
	          return s;
	        }(t, e, r);
	      };
	    case "ARRAYBUFFER":
	      try {
	        new ArrayBuffer(0);
	      } catch (t) {
	        throw new Error("ARRAYBUFFER not supported by this environment");
	      }
	      return function (t) {
	        return function (t, n, e) {
	          let r;
	          const i = n / 8,
	            s = new ArrayBuffer(i),
	            o = new Uint8Array(s),
	            h = -1 === e ? 3 : 0;
	          for (r = 0; r < i; r += 1) o[r] = t[r >>> 2] >>> 8 * (h + e * (r % 4)) & 255;
	          return s;
	        }(t, e, r);
	      };
	    case "UINT8ARRAY":
	      try {
	        new Uint8Array(0);
	      } catch (t) {
	        throw new Error("UINT8ARRAY not supported by this environment");
	      }
	      return function (t) {
	        return function (t, n, e) {
	          let r;
	          const i = n / 8,
	            s = -1 === e ? 3 : 0,
	            o = new Uint8Array(i);
	          for (r = 0; r < i; r += 1) o[r] = t[r >>> 2] >>> 8 * (s + e * (r % 4)) & 255;
	          return o;
	        }(t, e, r);
	      };
	    default:
	      throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY");
	  }
	}
	const i = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
	  s = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428],
	  o = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
	  h = "Chosen SHA variant is not supported";
	function u(t, n) {
	  let e, r;
	  const i = t.binLen >>> 3,
	    s = n.binLen >>> 3,
	    o = i << 3,
	    h = 4 - i << 3;
	  if (i % 4 != 0) {
	    for (e = 0; e < s; e += 4) r = i + e >>> 2, t.value[r] |= n.value[e >>> 2] << o, t.value.push(0), t.value[r + 1] |= n.value[e >>> 2] >>> h;
	    return (t.value.length << 2) - 4 >= s + i && t.value.pop(), {
	      value: t.value,
	      binLen: t.binLen + n.binLen
	    };
	  }
	  return {
	    value: t.value.concat(n.value),
	    binLen: t.binLen + n.binLen
	  };
	}
	function w(t) {
	  const n = {
	      outputUpper: !1,
	      b64Pad: "=",
	      outputLen: -1
	    },
	    e = t || {},
	    r = "Output length must be a multiple of 8";
	  if (n.outputUpper = e.outputUpper || !1, e.b64Pad && (n.b64Pad = e.b64Pad), e.outputLen) {
	    if (e.outputLen % 8 != 0) throw new Error(r);
	    n.outputLen = e.outputLen;
	  } else if (e.shakeLen) {
	    if (e.shakeLen % 8 != 0) throw new Error(r);
	    n.outputLen = e.shakeLen;
	  }
	  if ("boolean" != typeof n.outputUpper) throw new Error("Invalid outputUpper formatting option");
	  if ("string" != typeof n.b64Pad) throw new Error("Invalid b64Pad formatting option");
	  return n;
	}
	function c(t, n, r, i) {
	  const s = t + " must include a value and format";
	  if (!n) {
	    if (!i) throw new Error(s);
	    return i;
	  }
	  if (void 0 === n.value || !n.format) throw new Error(s);
	  return e(n.format, n.encoding || "UTF8", r)(n.value);
	}
	class f {
	  constructor(t, n, e) {
	    const r = e || {};
	    if (this.t = n, this.i = r.encoding || "UTF8", this.numRounds = r.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds) throw new Error("numRounds must a integer >= 1");
	    this.o = t, this.h = [], this.u = 0, this.l = !1, this.A = 0, this.H = !1, this.S = [], this.p = [];
	  }
	  update(t) {
	    let n,
	      e = 0;
	    const r = this.m >>> 5,
	      i = this.C(t, this.h, this.u),
	      s = i.binLen,
	      o = i.value,
	      h = s >>> 5;
	    for (n = 0; n < h; n += r) e + this.m <= s && (this.R = this.U(o.slice(n, n + r), this.R), e += this.m);
	    return this.A += e, this.h = o.slice(e >>> 5), this.u = s % this.m, this.l = !0, this;
	  }
	  getHash(t, n) {
	    let e,
	      i,
	      s = this.v;
	    const o = w(n);
	    if (this.K) {
	      if (-1 === o.outputLen) throw new Error("Output length must be specified in options");
	      s = o.outputLen;
	    }
	    const h = r(t, s, this.T, o);
	    if (this.H && this.F) return h(this.F(o));
	    for (i = this.g(this.h.slice(), this.u, this.A, this.B(this.R), s), e = 1; e < this.numRounds; e += 1) this.K && s % 32 != 0 && (i[i.length - 1] &= 16777215 >>> 24 - s % 32), i = this.g(i, s, 0, this.L(this.o), s);
	    return h(i);
	  }
	  setHMACKey(t, n, r) {
	    if (!this.M) throw new Error("Variant does not support HMAC");
	    if (this.l) throw new Error("Cannot set MAC key after calling update");
	    const i = e(n, (r || {}).encoding || "UTF8", this.T);
	    this.k(i(t));
	  }
	  k(t) {
	    const n = this.m >>> 3,
	      e = n / 4 - 1;
	    let r;
	    if (1 !== this.numRounds) throw new Error("Cannot set numRounds with MAC");
	    if (this.H) throw new Error("MAC key already set");
	    for (n < t.binLen / 8 && (t.value = this.g(t.value, t.binLen, 0, this.L(this.o), this.v)); t.value.length <= e;) t.value.push(0);
	    for (r = 0; r <= e; r += 1) this.S[r] = 909522486 ^ t.value[r], this.p[r] = 1549556828 ^ t.value[r];
	    this.R = this.U(this.S, this.R), this.A = this.m, this.H = !0;
	  }
	  getHMAC(t, n) {
	    const e = w(n);
	    return r(t, this.v, this.T, e)(this.Y());
	  }
	  Y() {
	    let t;
	    if (!this.H) throw new Error("Cannot call getHMAC without first setting MAC key");
	    const n = this.g(this.h.slice(), this.u, this.A, this.B(this.R), this.v);
	    return t = this.U(this.p, this.L(this.o)), t = this.g(n, this.v, this.m, t, this.v), t;
	  }
	}
	function a(t, n) {
	  return t << n | t >>> 32 - n;
	}
	function l(t, n) {
	  return t >>> n | t << 32 - n;
	}
	function A(t, n) {
	  return t >>> n;
	}
	function E(t, n, e) {
	  return t ^ n ^ e;
	}
	function H(t, n, e) {
	  return t & n ^ ~t & e;
	}
	function S(t, n, e) {
	  return t & n ^ t & e ^ n & e;
	}
	function b(t) {
	  return l(t, 2) ^ l(t, 13) ^ l(t, 22);
	}
	function p(t, n) {
	  const e = (65535 & t) + (65535 & n);
	  return (65535 & (t >>> 16) + (n >>> 16) + (e >>> 16)) << 16 | 65535 & e;
	}
	function d(t, n, e, r) {
	  const i = (65535 & t) + (65535 & n) + (65535 & e) + (65535 & r);
	  return (65535 & (t >>> 16) + (n >>> 16) + (e >>> 16) + (r >>> 16) + (i >>> 16)) << 16 | 65535 & i;
	}
	function m(t, n, e, r, i) {
	  const s = (65535 & t) + (65535 & n) + (65535 & e) + (65535 & r) + (65535 & i);
	  return (65535 & (t >>> 16) + (n >>> 16) + (e >>> 16) + (r >>> 16) + (i >>> 16) + (s >>> 16)) << 16 | 65535 & s;
	}
	function C(t) {
	  return l(t, 7) ^ l(t, 18) ^ A(t, 3);
	}
	function y(t) {
	  return l(t, 6) ^ l(t, 11) ^ l(t, 25);
	}
	function R(t) {
	  return [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
	}
	function U(t, n) {
	  let e, r, i, s, o, h, u;
	  const w = [];
	  for (e = n[0], r = n[1], i = n[2], s = n[3], o = n[4], u = 0; u < 80; u += 1) w[u] = u < 16 ? t[u] : a(w[u - 3] ^ w[u - 8] ^ w[u - 14] ^ w[u - 16], 1), h = u < 20 ? m(a(e, 5), H(r, i, s), o, 1518500249, w[u]) : u < 40 ? m(a(e, 5), E(r, i, s), o, 1859775393, w[u]) : u < 60 ? m(a(e, 5), S(r, i, s), o, 2400959708, w[u]) : m(a(e, 5), E(r, i, s), o, 3395469782, w[u]), o = s, s = i, i = a(r, 30), r = e, e = h;
	  return n[0] = p(e, n[0]), n[1] = p(r, n[1]), n[2] = p(i, n[2]), n[3] = p(s, n[3]), n[4] = p(o, n[4]), n;
	}
	function v(t, n, e, r) {
	  let i;
	  const s = 15 + (n + 65 >>> 9 << 4),
	    o = n + e;
	  for (; t.length <= s;) t.push(0);
	  for (t[n >>> 5] |= 128 << 24 - n % 32, t[s] = 4294967295 & o, t[s - 1] = o / 4294967296 | 0, i = 0; i < t.length; i += 16) r = U(t.slice(i, i + 16), r);
	  return r;
	}
	class K extends f {
	  constructor(t, n, r) {
	    if ("SHA-1" !== t) throw new Error(h);
	    super(t, n, r);
	    const i = r || {};
	    this.M = !0, this.F = this.Y, this.T = -1, this.C = e(this.t, this.i, this.T), this.U = U, this.B = function (t) {
	      return t.slice();
	    }, this.L = R, this.g = v, this.R = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.m = 512, this.v = 160, this.K = !1, i.hmacKey && this.k(c("hmacKey", i.hmacKey, this.T));
	  }
	}
	function T(t) {
	  let n;
	  return n = "SHA-224" == t ? s.slice() : o.slice(), n;
	}
	function F(t, n) {
	  let e, r, s, o, h, u, w, c, f, a, E;
	  const R = [];
	  for (e = n[0], r = n[1], s = n[2], o = n[3], h = n[4], u = n[5], w = n[6], c = n[7], E = 0; E < 64; E += 1) R[E] = E < 16 ? t[E] : d(l(U = R[E - 2], 17) ^ l(U, 19) ^ A(U, 10), R[E - 7], C(R[E - 15]), R[E - 16]), f = m(c, y(h), H(h, u, w), i[E], R[E]), a = p(b(e), S(e, r, s)), c = w, w = u, u = h, h = p(o, f), o = s, s = r, r = e, e = p(f, a);
	  var U;
	  return n[0] = p(e, n[0]), n[1] = p(r, n[1]), n[2] = p(s, n[2]), n[3] = p(o, n[3]), n[4] = p(h, n[4]), n[5] = p(u, n[5]), n[6] = p(w, n[6]), n[7] = p(c, n[7]), n;
	}
	class g extends f {
	  constructor(t, n, r) {
	    if ("SHA-224" !== t && "SHA-256" !== t) throw new Error(h);
	    super(t, n, r);
	    const i = r || {};
	    this.F = this.Y, this.M = !0, this.T = -1, this.C = e(this.t, this.i, this.T), this.U = F, this.B = function (t) {
	      return t.slice();
	    }, this.L = T, this.g = function (n, e, r, i) {
	      return function (t, n, e, r, i) {
	        let s, o;
	        const h = 15 + (n + 65 >>> 9 << 4),
	          u = n + e;
	        for (; t.length <= h;) t.push(0);
	        for (t[n >>> 5] |= 128 << 24 - n % 32, t[h] = 4294967295 & u, t[h - 1] = u / 4294967296 | 0, s = 0; s < t.length; s += 16) r = F(t.slice(s, s + 16), r);
	        return o = "SHA-224" === i ? [r[0], r[1], r[2], r[3], r[4], r[5], r[6]] : r, o;
	      }(n, e, r, i, t);
	    }, this.R = T(t), this.m = 512, this.v = "SHA-224" === t ? 224 : 256, this.K = !1, i.hmacKey && this.k(c("hmacKey", i.hmacKey, this.T));
	  }
	}
	class B {
	  constructor(t, n) {
	    this.N = t, this.I = n;
	  }
	}
	function L(t, n) {
	  let e;
	  return n > 32 ? (e = 64 - n, new B(t.I << n | t.N >>> e, t.N << n | t.I >>> e)) : 0 !== n ? (e = 32 - n, new B(t.N << n | t.I >>> e, t.I << n | t.N >>> e)) : t;
	}
	function M(t, n) {
	  let e;
	  return n < 32 ? (e = 32 - n, new B(t.N >>> n | t.I << e, t.I >>> n | t.N << e)) : (e = 64 - n, new B(t.I >>> n | t.N << e, t.N >>> n | t.I << e));
	}
	function k(t, n) {
	  return new B(t.N >>> n, t.I >>> n | t.N << 32 - n);
	}
	function Y(t, n, e) {
	  return new B(t.N & n.N ^ t.N & e.N ^ n.N & e.N, t.I & n.I ^ t.I & e.I ^ n.I & e.I);
	}
	function N(t) {
	  const n = M(t, 28),
	    e = M(t, 34),
	    r = M(t, 39);
	  return new B(n.N ^ e.N ^ r.N, n.I ^ e.I ^ r.I);
	}
	function I(t, n) {
	  let e, r;
	  e = (65535 & t.I) + (65535 & n.I), r = (t.I >>> 16) + (n.I >>> 16) + (e >>> 16);
	  const i = (65535 & r) << 16 | 65535 & e;
	  e = (65535 & t.N) + (65535 & n.N) + (r >>> 16), r = (t.N >>> 16) + (n.N >>> 16) + (e >>> 16);
	  return new B((65535 & r) << 16 | 65535 & e, i);
	}
	function X(t, n, e, r) {
	  let i, s;
	  i = (65535 & t.I) + (65535 & n.I) + (65535 & e.I) + (65535 & r.I), s = (t.I >>> 16) + (n.I >>> 16) + (e.I >>> 16) + (r.I >>> 16) + (i >>> 16);
	  const o = (65535 & s) << 16 | 65535 & i;
	  i = (65535 & t.N) + (65535 & n.N) + (65535 & e.N) + (65535 & r.N) + (s >>> 16), s = (t.N >>> 16) + (n.N >>> 16) + (e.N >>> 16) + (r.N >>> 16) + (i >>> 16);
	  return new B((65535 & s) << 16 | 65535 & i, o);
	}
	function z(t, n, e, r, i) {
	  let s, o;
	  s = (65535 & t.I) + (65535 & n.I) + (65535 & e.I) + (65535 & r.I) + (65535 & i.I), o = (t.I >>> 16) + (n.I >>> 16) + (e.I >>> 16) + (r.I >>> 16) + (i.I >>> 16) + (s >>> 16);
	  const h = (65535 & o) << 16 | 65535 & s;
	  s = (65535 & t.N) + (65535 & n.N) + (65535 & e.N) + (65535 & r.N) + (65535 & i.N) + (o >>> 16), o = (t.N >>> 16) + (n.N >>> 16) + (e.N >>> 16) + (r.N >>> 16) + (i.N >>> 16) + (s >>> 16);
	  return new B((65535 & o) << 16 | 65535 & s, h);
	}
	function x(t, n) {
	  return new B(t.N ^ n.N, t.I ^ n.I);
	}
	function _(t) {
	  const n = M(t, 19),
	    e = M(t, 61),
	    r = k(t, 6);
	  return new B(n.N ^ e.N ^ r.N, n.I ^ e.I ^ r.I);
	}
	function O(t) {
	  const n = M(t, 1),
	    e = M(t, 8),
	    r = k(t, 7);
	  return new B(n.N ^ e.N ^ r.N, n.I ^ e.I ^ r.I);
	}
	function P(t) {
	  const n = M(t, 14),
	    e = M(t, 18),
	    r = M(t, 41);
	  return new B(n.N ^ e.N ^ r.N, n.I ^ e.I ^ r.I);
	}
	const V = [new B(i[0], 3609767458), new B(i[1], 602891725), new B(i[2], 3964484399), new B(i[3], 2173295548), new B(i[4], 4081628472), new B(i[5], 3053834265), new B(i[6], 2937671579), new B(i[7], 3664609560), new B(i[8], 2734883394), new B(i[9], 1164996542), new B(i[10], 1323610764), new B(i[11], 3590304994), new B(i[12], 4068182383), new B(i[13], 991336113), new B(i[14], 633803317), new B(i[15], 3479774868), new B(i[16], 2666613458), new B(i[17], 944711139), new B(i[18], 2341262773), new B(i[19], 2007800933), new B(i[20], 1495990901), new B(i[21], 1856431235), new B(i[22], 3175218132), new B(i[23], 2198950837), new B(i[24], 3999719339), new B(i[25], 766784016), new B(i[26], 2566594879), new B(i[27], 3203337956), new B(i[28], 1034457026), new B(i[29], 2466948901), new B(i[30], 3758326383), new B(i[31], 168717936), new B(i[32], 1188179964), new B(i[33], 1546045734), new B(i[34], 1522805485), new B(i[35], 2643833823), new B(i[36], 2343527390), new B(i[37], 1014477480), new B(i[38], 1206759142), new B(i[39], 344077627), new B(i[40], 1290863460), new B(i[41], 3158454273), new B(i[42], 3505952657), new B(i[43], 106217008), new B(i[44], 3606008344), new B(i[45], 1432725776), new B(i[46], 1467031594), new B(i[47], 851169720), new B(i[48], 3100823752), new B(i[49], 1363258195), new B(i[50], 3750685593), new B(i[51], 3785050280), new B(i[52], 3318307427), new B(i[53], 3812723403), new B(i[54], 2003034995), new B(i[55], 3602036899), new B(i[56], 1575990012), new B(i[57], 1125592928), new B(i[58], 2716904306), new B(i[59], 442776044), new B(i[60], 593698344), new B(i[61], 3733110249), new B(i[62], 2999351573), new B(i[63], 3815920427), new B(3391569614, 3928383900), new B(3515267271, 566280711), new B(3940187606, 3454069534), new B(4118630271, 4000239992), new B(116418474, 1914138554), new B(174292421, 2731055270), new B(289380356, 3203993006), new B(460393269, 320620315), new B(685471733, 587496836), new B(852142971, 1086792851), new B(1017036298, 365543100), new B(1126000580, 2618297676), new B(1288033470, 3409855158), new B(1501505948, 4234509866), new B(1607167915, 987167468), new B(1816402316, 1246189591)];
	function Z(t) {
	  return "SHA-384" === t ? [new B(3418070365, s[0]), new B(1654270250, s[1]), new B(2438529370, s[2]), new B(355462360, s[3]), new B(1731405415, s[4]), new B(41048885895, s[5]), new B(3675008525, s[6]), new B(1203062813, s[7])] : [new B(o[0], 4089235720), new B(o[1], 2227873595), new B(o[2], 4271175723), new B(o[3], 1595750129), new B(o[4], 2917565137), new B(o[5], 725511199), new B(o[6], 4215389547), new B(o[7], 327033209)];
	}
	function j(t, n) {
	  let e, r, i, s, o, h, u, w, c, f, a, l;
	  const A = [];
	  for (e = n[0], r = n[1], i = n[2], s = n[3], o = n[4], h = n[5], u = n[6], w = n[7], a = 0; a < 80; a += 1) a < 16 ? (l = 2 * a, A[a] = new B(t[l], t[l + 1])) : A[a] = X(_(A[a - 2]), A[a - 7], O(A[a - 15]), A[a - 16]), c = z(w, P(o), (H = h, S = u, new B((E = o).N & H.N ^ ~E.N & S.N, E.I & H.I ^ ~E.I & S.I)), V[a], A[a]), f = I(N(e), Y(e, r, i)), w = u, u = h, h = o, o = I(s, c), s = i, i = r, r = e, e = I(c, f);
	  var E, H, S;
	  return n[0] = I(e, n[0]), n[1] = I(r, n[1]), n[2] = I(i, n[2]), n[3] = I(s, n[3]), n[4] = I(o, n[4]), n[5] = I(h, n[5]), n[6] = I(u, n[6]), n[7] = I(w, n[7]), n;
	}
	class q extends f {
	  constructor(t, n, r) {
	    if ("SHA-384" !== t && "SHA-512" !== t) throw new Error(h);
	    super(t, n, r);
	    const i = r || {};
	    this.F = this.Y, this.M = !0, this.T = -1, this.C = e(this.t, this.i, this.T), this.U = j, this.B = function (t) {
	      return t.slice();
	    }, this.L = Z, this.g = function (n, e, r, i) {
	      return function (t, n, e, r, i) {
	        let s, o;
	        const h = 31 + (n + 129 >>> 10 << 5),
	          u = n + e;
	        for (; t.length <= h;) t.push(0);
	        for (t[n >>> 5] |= 128 << 24 - n % 32, t[h] = 4294967295 & u, t[h - 1] = u / 4294967296 | 0, s = 0; s < t.length; s += 32) r = j(t.slice(s, s + 32), r);
	        return o = "SHA-384" === i ? [r[0].N, r[0].I, r[1].N, r[1].I, r[2].N, r[2].I, r[3].N, r[3].I, r[4].N, r[4].I, r[5].N, r[5].I] : [r[0].N, r[0].I, r[1].N, r[1].I, r[2].N, r[2].I, r[3].N, r[3].I, r[4].N, r[4].I, r[5].N, r[5].I, r[6].N, r[6].I, r[7].N, r[7].I], o;
	      }(n, e, r, i, t);
	    }, this.R = Z(t), this.m = 1024, this.v = "SHA-384" === t ? 384 : 512, this.K = !1, i.hmacKey && this.k(c("hmacKey", i.hmacKey, this.T));
	  }
	}
	const D = [new B(0, 1), new B(0, 32898), new B(2147483648, 32906), new B(2147483648, 2147516416), new B(0, 32907), new B(0, 2147483649), new B(2147483648, 2147516545), new B(2147483648, 32777), new B(0, 138), new B(0, 136), new B(0, 2147516425), new B(0, 2147483658), new B(0, 2147516555), new B(2147483648, 139), new B(2147483648, 32905), new B(2147483648, 32771), new B(2147483648, 32770), new B(2147483648, 128), new B(0, 32778), new B(2147483648, 2147483658), new B(2147483648, 2147516545), new B(2147483648, 32896), new B(0, 2147483649), new B(2147483648, 2147516424)],
	  G = [[0, 36, 3, 41, 18], [1, 44, 10, 45, 2], [62, 6, 43, 15, 61], [28, 55, 25, 21, 56], [27, 20, 39, 8, 14]];
	function J(t) {
	  let n;
	  const e = [];
	  for (n = 0; n < 5; n += 1) e[n] = [new B(0, 0), new B(0, 0), new B(0, 0), new B(0, 0), new B(0, 0)];
	  return e;
	}
	function Q(t) {
	  let n;
	  const e = [];
	  for (n = 0; n < 5; n += 1) e[n] = t[n].slice();
	  return e;
	}
	function W(t, n) {
	  let e, r, i, s;
	  const o = [],
	    h = [];
	  if (null !== t) for (r = 0; r < t.length; r += 2) n[(r >>> 1) % 5][(r >>> 1) / 5 | 0] = x(n[(r >>> 1) % 5][(r >>> 1) / 5 | 0], new B(t[r + 1], t[r]));
	  for (e = 0; e < 24; e += 1) {
	    for (s = J(), r = 0; r < 5; r += 1) o[r] = (u = n[r][0], w = n[r][1], c = n[r][2], f = n[r][3], a = n[r][4], new B(u.N ^ w.N ^ c.N ^ f.N ^ a.N, u.I ^ w.I ^ c.I ^ f.I ^ a.I));
	    for (r = 0; r < 5; r += 1) h[r] = x(o[(r + 4) % 5], L(o[(r + 1) % 5], 1));
	    for (r = 0; r < 5; r += 1) for (i = 0; i < 5; i += 1) n[r][i] = x(n[r][i], h[r]);
	    for (r = 0; r < 5; r += 1) for (i = 0; i < 5; i += 1) s[i][(2 * r + 3 * i) % 5] = L(n[r][i], G[r][i]);
	    for (r = 0; r < 5; r += 1) for (i = 0; i < 5; i += 1) n[r][i] = x(s[r][i], new B(~s[(r + 1) % 5][i].N & s[(r + 2) % 5][i].N, ~s[(r + 1) % 5][i].I & s[(r + 2) % 5][i].I));
	    n[0][0] = x(n[0][0], D[e]);
	  }
	  var u, w, c, f, a;
	  return n;
	}
	function $(t) {
	  let n,
	    e,
	    r = 0;
	  const i = [0, 0],
	    s = [4294967295 & t, t / 4294967296 & 2097151];
	  for (n = 6; n >= 0; n--) e = s[n >> 2] >>> 8 * n & 255, 0 === e && 0 === r || (i[r + 1 >> 2] |= e << 8 * (r + 1), r += 1);
	  return r = 0 !== r ? r : 1, i[0] |= r, {
	    value: r + 1 > 4 ? i : [i[0]],
	    binLen: 8 + 8 * r
	  };
	}
	function tt(t) {
	  return u($(t.binLen), t);
	}
	function nt(t, n) {
	  let e,
	    r = $(n);
	  r = u(r, t);
	  const i = n >>> 2,
	    s = (i - r.value.length % i) % i;
	  for (e = 0; e < s; e++) r.value.push(0);
	  return r.value;
	}
	class et extends f {
	  constructor(t, n, r) {
	    let i = 6,
	      s = 0;
	    super(t, n, r);
	    const o = r || {};
	    if (1 !== this.numRounds) {
	      if (o.kmacKey || o.hmacKey) throw new Error("Cannot set numRounds with MAC");
	      if ("CSHAKE128" === this.o || "CSHAKE256" === this.o) throw new Error("Cannot set numRounds for CSHAKE variants");
	    }
	    switch (this.T = 1, this.C = e(this.t, this.i, this.T), this.U = W, this.B = Q, this.L = J, this.R = J(), this.K = !1, t) {
	      case "SHA3-224":
	        this.m = s = 1152, this.v = 224, this.M = !0, this.F = this.Y;
	        break;
	      case "SHA3-256":
	        this.m = s = 1088, this.v = 256, this.M = !0, this.F = this.Y;
	        break;
	      case "SHA3-384":
	        this.m = s = 832, this.v = 384, this.M = !0, this.F = this.Y;
	        break;
	      case "SHA3-512":
	        this.m = s = 576, this.v = 512, this.M = !0, this.F = this.Y;
	        break;
	      case "SHAKE128":
	        i = 31, this.m = s = 1344, this.v = -1, this.K = !0, this.M = !1, this.F = null;
	        break;
	      case "SHAKE256":
	        i = 31, this.m = s = 1088, this.v = -1, this.K = !0, this.M = !1, this.F = null;
	        break;
	      case "KMAC128":
	        i = 4, this.m = s = 1344, this.X(r), this.v = -1, this.K = !0, this.M = !1, this.F = this._;
	        break;
	      case "KMAC256":
	        i = 4, this.m = s = 1088, this.X(r), this.v = -1, this.K = !0, this.M = !1, this.F = this._;
	        break;
	      case "CSHAKE128":
	        this.m = s = 1344, i = this.O(r), this.v = -1, this.K = !0, this.M = !1, this.F = null;
	        break;
	      case "CSHAKE256":
	        this.m = s = 1088, i = this.O(r), this.v = -1, this.K = !0, this.M = !1, this.F = null;
	        break;
	      default:
	        throw new Error(h);
	    }
	    this.g = function (t, n, e, r, o) {
	      return function (t, n, e, r, i, s, o) {
	        let h,
	          u,
	          w = 0;
	        const c = [],
	          f = i >>> 5,
	          a = n >>> 5;
	        for (h = 0; h < a && n >= i; h += f) r = W(t.slice(h, h + f), r), n -= i;
	        for (t = t.slice(h), n %= i; t.length < f;) t.push(0);
	        for (h = n >>> 3, t[h >> 2] ^= s << h % 4 * 8, t[f - 1] ^= 2147483648, r = W(t, r); 32 * c.length < o && (u = r[w % 5][w / 5 | 0], c.push(u.I), !(32 * c.length >= o));) c.push(u.N), w += 1, 0 == 64 * w % i && (W(null, r), w = 0);
	        return c;
	      }(t, n, 0, r, s, i, o);
	    }, o.hmacKey && this.k(c("hmacKey", o.hmacKey, this.T));
	  }
	  O(t, n) {
	    const e = function (t) {
	      const n = t || {};
	      return {
	        funcName: c("funcName", n.funcName, 1, {
	          value: [],
	          binLen: 0
	        }),
	        customization: c("Customization", n.customization, 1, {
	          value: [],
	          binLen: 0
	        })
	      };
	    }(t || {});
	    n && (e.funcName = n);
	    const r = u(tt(e.funcName), tt(e.customization));
	    if (0 !== e.customization.binLen || 0 !== e.funcName.binLen) {
	      const t = nt(r, this.m >>> 3);
	      for (let n = 0; n < t.length; n += this.m >>> 5) this.R = this.U(t.slice(n, n + (this.m >>> 5)), this.R), this.A += this.m;
	      return 4;
	    }
	    return 31;
	  }
	  X(t) {
	    const n = function (t) {
	      const n = t || {};
	      return {
	        kmacKey: c("kmacKey", n.kmacKey, 1),
	        funcName: {
	          value: [1128353099],
	          binLen: 32
	        },
	        customization: c("Customization", n.customization, 1, {
	          value: [],
	          binLen: 0
	        })
	      };
	    }(t || {});
	    this.O(t, n.funcName);
	    const e = nt(tt(n.kmacKey), this.m >>> 3);
	    for (let t = 0; t < e.length; t += this.m >>> 5) this.R = this.U(e.slice(t, t + (this.m >>> 5)), this.R), this.A += this.m;
	    this.H = !0;
	  }
	  _(t) {
	    const n = u({
	      value: this.h.slice(),
	      binLen: this.u
	    }, function (t) {
	      let n,
	        e,
	        r = 0;
	      const i = [0, 0],
	        s = [4294967295 & t, t / 4294967296 & 2097151];
	      for (n = 6; n >= 0; n--) e = s[n >> 2] >>> 8 * n & 255, 0 === e && 0 === r || (i[r >> 2] |= e << 8 * r, r += 1);
	      return r = 0 !== r ? r : 1, i[r >> 2] |= r << 8 * r, {
	        value: r + 1 > 4 ? i : [i[0]],
	        binLen: 8 + 8 * r
	      };
	    }(t.outputLen));
	    return this.g(n.value, n.binLen, this.A, this.B(this.R), t.outputLen);
	  }
	}
	class rt {
	  constructor(t, n, e) {
	    if ("SHA-1" == t) this.P = new K(t, n, e);else if ("SHA-224" == t || "SHA-256" == t) this.P = new g(t, n, e);else if ("SHA-384" == t || "SHA-512" == t) this.P = new q(t, n, e);else {
	      if ("SHA3-224" != t && "SHA3-256" != t && "SHA3-384" != t && "SHA3-512" != t && "SHAKE128" != t && "SHAKE256" != t && "CSHAKE128" != t && "CSHAKE256" != t && "KMAC128" != t && "KMAC256" != t) throw new Error(h);
	      this.P = new et(t, n, e);
	    }
	  }
	  update(t) {
	    return this.P.update(t), this;
	  }
	  getHash(t, n) {
	    return this.P.getHash(t, n);
	  }
	  setHMACKey(t, n, e) {
	    this.P.setHMACKey(t, n, e);
	  }
	  getHMAC(t, n) {
	    return this.P.getHMAC(t, n);
	  }
	}

	/* eslint-env jquery */
	(function ($) {
	  const body = $('body');
	  $(document).ready(analyticsEvents);
	  function analyticsEvents() {
	    const wholeTitle = document.title.split(' - ');
	    const pageTitle = 0 in wholeTitle && wholeTitle[0] !== '' ? wholeTitle[0] : document.title;
	    const fullUrl = window.location.href;
	    const pathName = new URL(fullUrl).pathname;
	    const firstLvl = pathName.split('/');
	    const contentGroup = 1 in firstLvl && firstLvl[1] !== '' ? firstLvl[1] : 'home'; /* first level  */
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
	      if (typeof curHref === 'undefined' || curHost.test(curHref) || curHref === '#' || curHref.indexOf('/') === 0 || curHref.includes('#') || typeof curHref !== 'undefined' && curHref.includes('javascript:void(0);') || typeof curHref !== 'undefined' && curHref.includes('tel:') || typeof curHref !== 'undefined' && curHref.includes('mailto:')) {
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
	            const scrollPercent = windowTop / (docHeight - windowHeight) * 100;
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
	            case 1:
	              {
	                formType = 'Lead Form';
	                break;
	              }
	            case 2:
	              {
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
	      eventObj.formFieldName = typeof ariaLabel !== 'undefined' && ariaLabel !== false ? ariaLabel : typeof autoCompleteV !== 'undefined' && autoCompleteV !== false ? autoCompleteV : _t.attr('class');
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
	      if (getSearchQ(v) || 1 in urlParts && urlParts[1] === v && 2 in urlParts) {
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
	        const errorElem = currentForm.find('.gfield_error').eq(0).find('.gfield_validation_message');
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
	            const hashedEmail = new rt('SHA-256', 'TEXT', {
	              encoding: 'utf8'
	            });
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
	        const scrollPercent = windowTop / (docHeight - windowHeight) * 100;
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
	      player.on('play', data => {
	        player.getVideoTitle().then(title => {
	          // title = The title of the video
	          // eslint-disable-next-line max-nested-callbacks
	          player.getDuration().then(duration => {
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
	      player.on('pause', data => {
	        // `data` is an object containing properties specific to that event
	        if (onlyOnce === 0) {
	          player.getVideoTitle().then(title => {
	            // eslint-disable-next-line max-nested-callbacks
	            player.getDuration().then(duration => {
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
	        if (typeof playerYTSource !== 'undefined' && playerYTSource !== false && playerYTSource.includes('youtube')) {
	          gaYoutubeVideoEvents(BasicEvent, dataLayer, dataTarget, fullUrl);
	        }
	        if (typeof playerVSource !== 'undefined' && playerVSource !== false && playerVSource.includes('vimeo')) {
	          gaVimeoVideoEvents(BasicEvent, dataLayer, dataTarget);
	        }
	      });
	    }
	  }
	})(jQuery);

	exports.Button = button;
	exports.Carousel = carousel;
	exports.Collapse = collapse;
	exports.Dropdown = dropdown;
	exports.Modal = modal;
	exports.Scrollspy = scrollspy;

}));
//# sourceMappingURL=foac.js.map
