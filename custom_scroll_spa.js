  (function (window) {
    /**
     * @class
     * @classdesc A class for tracking user scroll depth on a page.
     *
     * @private
     * @param {object} _config
     * @param {Array} _tracked
     * @param {string} _eventName
     * @param {function} _tracking
     * @param {boolean} _listenerAdded
     */
    function ScrollTracker() {
      if (!(this instanceof ScrollTracker)) return new ScrollTracker();

      this._config = {};
      this._tracked = [];
      this._eventName = '';
      this._tracking = this._tracking.bind(this); // bind _tracking method to ScrollTracker instance
      this._listenerAdded = false;
    }

    /**
     * Method to track scroll depth and push an event to the data layer when certain scroll percentages are reached.
     * @private
     */
    ScrollTracker.prototype._tracking = function () {
      var _config = this._config;
      var totalHeight = this._getTotalHeight();
      var scrollPosition = this._getScrollPosition();
      var percentScroll = this._getPercentScroll(totalHeight, scrollPosition);

      var trackedPercentages = this._tracked;

      // Loop through percentages array and track if not already tracked
      for (var i = 0; i < _config.scroll_depth.length; i++) {
        var percent = _config.scroll_depth[i];

        if (percentScroll >= percent && trackedPercentages.indexOf(percent) === -1) {
          console.log('customScrollTracker tracked : ', percent + '%');
          trackedPercentages.push(percent);
          setDataLayer(this._eventName, percent);
        }
      }
    }

    /**
     * Method to start tracking scroll depth.
     * @param {Object} config - Configuration for tracking scroll depth.
     * @param {Array<number>} config.scroll_depth - Array of scroll percentages to track.
     * @param {string} eventName - Name of the event to be pushed to the data layer.
     */
    ScrollTracker.prototype.on = function (config, eventName) {
      this._config = config;
      this._eventName = eventName;

      if (!this._listenerAdded) {
        window.addEventListener('scroll', this._tracking, {
          passive: true
        });
        this._listenerAdded = true;
      }
    }

    /**
     * Method to stop tracking scroll depth.
     */
    ScrollTracker.prototype.remove = function () {
      if (this._listenerAdded) {
        window.removeEventListener('scroll', this._tracking, {
          passive: true
        });
        this._listenerAdded = false;
      }
    }

    /**
     * Method to get the total height of the document.
     * @private
     * @returns {number} The total height of the document.
     */

    ScrollTracker.prototype._getTotalHeight = function () {
      var body = document.body;
      var html = document.documentElement;

      var height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      return height - window.innerHeight;
    }

    /**
     * Method to get the current scroll position.
     * @private
     * @returns {number} The current scroll position.
     */
    ScrollTracker.prototype._getScrollPosition = function () {
      return window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
    }

    /**
     * The _getPercentScroll method calculates the percentage of the document that has been scrolled.
     * @private
     * @param {number} totalHeight - The total height of the document.
     * @param {number} scrollPosition - The current scroll position of the document.
     * @returns {number} The percentage of the document that has been scrolled.
     */
    ScrollTracker.prototype._getPercentScroll = function (h, p) {
      var scrollPercent = Math.round((p / h) * 100);

      if (scrollPercent < 0) {
        scrollPercent = 0;
      } else if (scrollPercent > 100) {
        scrollPercent = 100;
      }

      return scrollPercent;
    }

    /**
     * The setDataLayer method sets the dataLayer variable with an event name and scroll depth percentage.
     * @param {string} eventName - The event name to use for tracking.
     * @param {number} percent - The scroll depth percentage to track.
     */
    function setDataLayer(e, p) {
      window.dataLayer.push({
        'event': e,
        'scroll_depth': p
      });
    }

    window.ScrollTracker = ScrollTracker;
  })(this);

  (function (window) {
    initiateTracker();

    function initiateTracker() {
      var _customScrollTracker = window.customScrollTracker;
      //custom you want track percetage number for gtm
      var percentages = [25, 50, 75, 90];
      //custom you want track custom event for gtm
      var eventName = 'custom_scroll_tracking';

      var config = {
        scroll_depth: percentages
      };

      if (!_customScrollTracker) {
        window.customScrollTracker = new ScrollTracker();
        console.log('customScrollTracker initiated...');
      } else {
        window.customScrollTracker.remove();
        window.customScrollTracker = null;
        console.log('customScrollTracker deleted...');
        window.customScrollTracker = new ScrollTracker();
        console.log('customScrollTracker regenerated...');
      }

      window.customScrollTracker.on(config, eventName);
    }
  })(window);