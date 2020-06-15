jQuery(document).ready(function (jQuery) {
  /**
   * Counter Animation for Statistics Block
   *
   * Starts Here
   *
   */

  (function ($) {
    $.fn.countTo = function (options) {
      options = options || {};

      return $(this).each(function () {
        // set options for current element
        const settings = $.extend(
          {},
          $.fn.countTo.defaults,
          {
            from: $(this).data("from"),
            to: $(this).data("to"),
            speed: $(this).data("speed"),
            refreshInterval: $(this).data("refresh-interval"),
            decimals: $(this).data("decimals"),
          },
          options
        );

        // how many times to update the value, and how much to increment the value on each update
        const loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;

        // references & variables that will change with each update
        let self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data("countTo") || {};

        $self.data("countTo", data);

        // if an existing interval can be found, clear it first
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);

        // initialize the element with the starting value
        render(value);

        function updateTimer() {
          value += increment;
          loopCount++;

          render(value);

          if (typeof settings.onUpdate === "function") {
            settings.onUpdate.call(self, value);
          }

          if (loopCount >= loops) {
            // remove the interval
            $self.removeData("countTo");
            clearInterval(data.interval);
            value = settings.to;

            if (typeof settings.onComplete === "function") {
              settings.onComplete.call(self, value);
            }
          }
        }

        function render(value) {
          const formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };

    $.fn.countTo.defaults = {
      from: 0, // the number the element should start at
      to: 0, // the number the element should end at
      speed: 1000, // how long it should take to count between the target numbers
      refreshInterval: 100, // how often the element should be updated
      decimals: 0, // the number of decimal places to show
      formatter, // handler for formatting the value before rendering
      onUpdate: null, // callback method for every time the element is updated
      onComplete: null, // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }
  })(jQuery);

  function customCounter() {
    // jQuery(function($) {
    // custom formatting example
    $(".count-number").data("countToOptions", {
      formatter(value, options) {
        return value
          .toFixed(options.decimals)
          .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
      },
    });

    // start all the timers
    $(".timer").each(count);

    function count(options) {
      const $this = $(this);
      options = $.extend({}, options || {}, $this.data("countToOptions") || {});
      $this.countTo(options);
    }
  }
  // customCounter();
  /**
   * Counter Animation for Statistics Block
   *
   * Ends Here
   *
   */

  /**
   *
   * Scroll Reveal - Custom Counter
   *
   * Starts here
   */

  (function scrollReveal() {
    window.sr = ScrollReveal();

    sr.reveal(
      "h1",
      {
        duration: 600,
        distance: "50px",
        easing: "ease-out",
        origin: "top",
        reset: false,
        scale: 1,
        viewFactor: 0,
      },
      150
    );
  })();

  ScrollReveal().watch = function (target, onEnter, onExit) {
    onExit = onExit || function () {};

    if (typeof onEnter === "function" && typeof onExit === "function") {
      const noEffect = {
        delay: 0,
        distance: 0,
        duration: 0,
        scale: 1,
        opacity: null,
        rotate: { x: 0, y: 0, z: 0 },

        reset: false,
        beforeReset: onExit,
        beforeReveal: onEnter,
      };
      this.reveal(target, noEffect);
    } else {
      throw new Error("Watch received invalid arguments.");
    }
  };

  ScrollReveal().watch(
    ".single-stat-container .stat-number",
    function onEnter(el) {
      customCounter();
    },
    function onExit(el) {}
  );

  /**
   *
   * Scroll Reveal - Custom Counter
   *
   * Ends here
   */
});
