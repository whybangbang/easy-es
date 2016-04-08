/// <reference path="jquery.js" />
/*
 jquery-resizable
 Version 0.17 - 3/31/2016
 © 2015 Rick Strahl, West Wind Technologies
 www.west-wind.com
 Licensed under MIT License
 */
(function($, undefined) {
  function getHandle(selector, $el) {
    if (selector.trim()[0] === ">") {
      selector = selector.trim().replace(/^>\s*/, "");

      return $el.find(selector);
    }

    return selector ? $(selector) : $el;
  }

  if ($.fn.resizable)
    return;

  $.fn.resizable = function fnResizable(options) {
    var opt = {
      // selector for handle that starts dragging
      handleSelector: null,
      // resize the width
      resizeWidth: true,
      // resize the height
      resizeHeight: true,
      // the side that the width resizing is relative to
      resizeWidthFrom: 'right',
      // the side that the height resizing is relative to
      resizeHeightFrom: 'bottom',
      // hook into start drag operation (event passed)
      onDragStart: null,
      // hook into stop drag operation (event passed)
      onDragEnd: null,
      // hook into each drag operation (event passed)
      onDrag: null,
      // disable touch-action on $handle
      // prevents browser level actions like forward back gestures
      touchActionNone: true
    };
    if (typeof options == "object") opt = $.extend(opt, options);

    return this.each(function () {
      var startPos, startTransition;

      var $el = $(this);

      var $handle = getHandle(opt.handleSelector, $el);

      if (opt.touchActionNone)
        $handle.css("touch-action", "none");

      $el.addClass("resizable");
      $handle.bind('mousedown.rsz touchstart.rsz', startDragging);

      function noop(e) {
        e.stopPropagation();
        e.preventDefault();
      };

      function startDragging(e) {
        startPos = getMousePos(e);
        startPos.width = parseInt($el.width(), 10);
        startPos.height = parseInt($el.height(), 10);

        startTransition = $el.css("transition");
        $el.css("transition", "none");

        if (opt.onDragStart) {
          if (opt.onDragStart(e, $el, opt) === false)
            return;
        }
        opt.dragFunc = doDrag;

        $(document).bind('mousemove.rsz', opt.dragFunc);
        $(document).bind('mouseup.rsz', stopDragging);
        if (window.Touch || navigator.maxTouchPoints) {
          $(document).bind('touchmove.rsz', opt.dragFunc);
          $(document).bind('touchend.rsz', stopDragging);
        }
        $(document).bind('selectstart.rsz', noop); // disable selection
      }

      function doDrag(e) {
        var pos = getMousePos(e);

        if (opt.resizeWidth) {
          if (opt.resizeWidthFrom === 'left') {
            var newWidth = startPos.width - pos.x + startPos.x;
          } else {
            var newWidth = startPos.width + pos.x - startPos.x;
          }
          $el.width(newWidth);
        }

        if (opt.resizeHeight) {
          if (opt.resizeHeightFrom === 'top') {
            var newHeight = startPos.height - pos.y + startPos.y;
          } else {
            var newHeight = startPos.height + pos.y - startPos.y;
          }
          $el.height(newHeight);
        }

        if (opt.onDrag)
          opt.onDrag(e, $el, opt);

        //console.log('dragging', e, pos, newWidth, newHeight);
      }

      function stopDragging(e) {
        e.stopPropagation();
        e.preventDefault();

        $(document).unbind('mousemove.rsz', opt.dragFunc);
        $(document).unbind('mouseup.rsz', stopDragging);

        if (window.Touch || navigator.maxTouchPoints) {
          $(document).unbind('touchmove.rsz', opt.dragFunc);
          $(document).unbind('touchend.rsz', stopDragging);
        }
        $(document).unbind('selectstart.rsz', noop);

        // reset changed values
        $el.css("transition", startTransition);

        if (opt.onDragEnd)
          opt.onDragEnd(e, $el, opt);

        return false;
      }

      function getMousePos(e) {
        var pos = { x: 0, y: 0, width: 0, height: 0 };
        if (typeof e.clientX === "number") {
          pos.x = e.clientX;
          pos.y = e.clientY;
        } else if (e.originalEvent.touches) {
          pos.x = e.originalEvent.touches[0].clientX;
          pos.y = e.originalEvent.touches[0].clientY;
        } else
          return null;

        return pos;
      }
    });
  };
})(jQuery,undefined);
