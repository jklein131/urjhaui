import $ from "jquery";
// configure the class for runtime loading


window.jQuery = $;
window.$ = $;

/**
 * Star rating class - show 5 stars with the ability to select a rating
 */

// configure the class for runtime loading
if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function(controlClass) {
  /**
   * Star rating class
   */
  class controlStarRating extends controlClass {

    /**
     * Class configuration - return the icons & label related to this control
     * @returndefinition object
     */
    static get definition() {
      return {
        icon: '🌟',
        i18n: {
          default: 'If Condition'
        }
      };
    }

    /**
     * javascript & css to load
     */
    configure() {
      this.js = '//cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.js';
      this.css = '//cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.css';
    }

    /**
     * build a text DOM element, supporting other jquery text form-control's
     * @return {Object} DOM Element to be injected into the form.
     */
    build() {
      //
      return {
        field: this.markup('div', null, {id: this.config.name,class:""}),
        layout: 'noLabel',
      }
    }

    /**
     * onRender callback
     */
    onRender() {
      $('#'+this.config.name).text("if (nextValue === " + this.config.value + ")")
      console.log(this.config)
    }
  }

  // register this control for the following types & text subtypes
  controlClass.register('starRating', controlStarRating);
  controlClass.register(['button', 'submit', 'reset'], controlStarRating, 'starRating');
  return controlStarRating;
});


/**
 * Star rating class - show 5 stars with the ability to select a rating
 */

// configure the class for runtime loading
if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function(controlClass) {
  /**
   * Star rating class
   */
  class controlShowBetween extends controlClass {

    /**
     * Class configuration - return the icons & label related to this control
     * @returndefinition object
     */
    static get definition() {
      return {
        icon: '🌟',
        i18n: {
          default: 'Start Hidden'
        }
      };
    }

    /**
     * javascript & css to load
     */
    configure() {
      this.js = '//cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.js';
      this.css = '//cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.css';
    }

    /**
     * build a text DOM element, supporting other jquery text form-control's
     * @return {Object} DOM Element to be injected into the form.
     */
    build() {
      //
      return {
        field: this.markup('div', null, {id: this.config.name,class:""}),
        layout: 'noLabel',
      }
    }

    /**
     * onRender callback
     */
    onRender() {
      $('#'+this.config.name).text("Hidden")
      console.log(this.config)
    }
  }

  // register this control for the following types & text subtypes
  controlClass.register('showBetween', controlShowBetween);
  controlClass.register(['button', 'submit', 'reset'], controlShowBetween, 'showBetween');
  return controlShowBetween;
});
/**
 * Star rating class - show 5 stars with the ability to select a rating
 */

// configure the class for runtime loading
if (!window.fbControls) window.fbControls = [];
window.fbControls.push(function(controlClass) {
  /**
   * Star rating class
   */
  class controlEndShowBetween extends controlClass {

    /**
     * Class configuration - return the icons & label related to this control
     * @returndefinition object
     */
    static get definition() {
      return {
        icon: '🌟',
        i18n: {
          default: 'End Hidden'
        }
      };
    }

    /**
     * javascript & css to load
     */
    configure() {
      this.js = '//cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.js';
      this.css = '//cdnjs.cloudflare.com/ajax/libs/rateYo/2.2.0/jquery.rateyo.min.css';
    }

    /**
     * build a text DOM element, supporting other jquery text form-control's
     * @return {Object} DOM Element to be injected into the form.
     */
    build() {
      //
      return {
        field: this.markup('div', null, {id: this.config.name,class:""}),
        layout: 'noLabel',
      }
    }

    /**
     * onRender callback
     */
    onRender() {
      $('#'+this.config.name).text("Hidden")
      console.log(this.config)
    }
  }

  // register this control for the following types & text subtypes
  controlClass.register('endShowBetween', controlEndShowBetween);
  controlClass.register(['button', 'submit', 'reset'], controlEndShowBetween, 'endShowBetween');
  return controlEndShowBetween;
});