/**
 * RestCount v0.0.1
 */

(function($){
  var defaults = {
    charMax: 140,
    displayMax: true,
    normalStyle: {color: '#000'},
    overStyle: {color: '#f00'},
    displayPosition: 'northeast'
  }

  $.fn.restCount = function(options) {

    //support multiple elements
    if(this.length > 1){
      this.each(function(){$(this).restCount(options)});
      return this;
    }

    var settings = $.extend({}, defaults, options);
    settings.charMax = parseInt(settings.charMax);

    var textBox = this;
    var container = $("<span class='rc-container' style='position: relative; display: inline-block' />");
    container.css({
      position: 'relative',
      display: 'inline-block',
    });
    this.wrap(container);
    this.css('position', 'relative');
    var restElm = $("<span class='rc-rest' />");
    var limitElm = $("<span class='rc-limit' />");
    var dispElm = $("<span class='rc-disp' style='position: absolute' />");
    var setRest = function(available){
      restElm.html(available);
      restElm.css((available < 0) ? settings.overStyle : settings.normalStyle);
    }
    var margin = dispElm.css('line-height');

    dispElm.append(restElm).append(' / ').append(limitElm);
    limitElm.html(settings.charMax);
    setRest(settings.charMax - textBox.val().length);
    if (settings.displayPosition.indexOf('north') != -1){
      dispElm.css('top', '-' + margin);
      container.css('margin-top', margin);
    }
    if (settings.displayPosition.indexOf('south') != -1){
      dispElm.css('bottom', '-' + margin);
      container.css('margin-bottom', margin);
    }
    if (settings.displayPosition.indexOf('west') != -1){
      dispElm.css('left', 0);
    }
    if (settings.displayPosition.indexOf('east') != -1){
      dispElm.css('right', 0);
    }
    this.after(dispElm);

    this.on('keyup', function(){
      var val = textBox.val().replace(/(\r\n|\r|\n)/g, "");
      var count = val.length;
      setRest(settings.charMax - count);
    });
    return container;
  };

})(jQuery);
