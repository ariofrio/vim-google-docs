var target = $(".docs-texteventtarget-iframe").contentDocument;
document.addEventListener("click", reportCaret);
target.addEventListener("keyup", reportCaret);

function reportCaret() {
  console.log(findCaretElement());
}

/* Find the element over which the caret is found. */
var findCaretElement = (function() {
  var scrollContainer = $(".kix-appview-editor");
  var caret = $(".kix-cursor-caret");
  return function findCaretElement() {
    var _ = pointFromElement(caret.parentNode);
    var x = _[0] - scrollContainer.scrollLeft;
    var y = _[1] - scrollContainer.scrollTop;

    var display = caret.style.display;
    caret.style.display = "none";

    var scrollLeft = scrollTop = 0;
    if(x < 0) scrollLeft = x;
    else if(x > scrollContainer.clientWidth)
      scrollLeft = x - scrollContainer.clientWidth;
    if(y < 0) scrollTop = y;
    else if(y > scrollContainer.clientHeight)
      scrollTop = y - scrollContainer.clientHeight;

    scrollContainer.scrollLeft += scrollLeft;
    scrollContainer.scrollTop += scrollTop;
    var element = document.elementFromPoint(x - scrollLeft, y - scrollTop);
    scrollContainer.scrollLeft -= scrollLeft;
    scrollContainer.scrollTop -= scrollTop;

    caret.style.display = display;
    return element;
  }
})();

/*
target.addEventListener("keypress", function(ev) {
    ev.stopPropagation();
    ev.preventDefault();
}, true);
*/

/*
    var paras = container.querySelectorAll(".kix-paragraphrenderer");
    for(var i=0; i<paras.length; i++) {
      var blocks = paras[i].querySelectorAll(".kix-lineview > .kix-lineview-high-content > .kix-lineview-text-block > span");
      if(blocks.length != 1) {
        console.warn("expected one text block in paragraph, got " + blocks.length);
        continue;
      }
      console.log(blocks[0].childNodes);
    }
  }
  */

/*
 * Try to find current element:
 *
var caret = $(".kix-cursor-caret");
    var point = pointFromElement(caret.parentNode);
    console.log(point);

    var previousDisplay = caret.style.display;
    caret.style.display = "none";
    var el = document.elementFromPoint(point[0], point[1] + 1);
    caret.style.display = previousDisplay;
 *
 */
