function $(query) {
  return document.querySelector(query);
}

function pointFromElement(el) {
  var left = top_ = 0;
  do {
    left += el.offsetLeft;
    top_ += el.offsetTop;
  } while (el = el.offsetParent);
  return [left, top_];
}

/* Given an element with homogenously-styled text and a width 
 * in pixels, find the shortest prefix of text that occupies at
 * least the given width. Returns the length of said prefix.
 *
 * If such a prefix does not exist (i.e. the whole text is shorter 
 * than the given width), returns null.
 */
var getLengthByWidth = (function() {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  return function getLengthByWidth(givenWidth, el) {
    var style = getComputedStyle(el);
    context.font = style.fontStyle + " " + 
      style.fontsize + " " + style.fontFamily;

    var text = el.textContent;
    for(var i=0; i<text.length; i++) {
      var currentWidth = context.measureText(text.substr(0, i));
      if(currentWidth >= givenWidth) {
        return i;
      }
    }
    return null;
  }
})();
