window.events = (function(){
  var eventNode = $({});
  return {
    on: on,
    one: one,
    off: off,
    trigger: trigger
  };
  function on(){
    eventNode.on.apply(eventNode, arguments);
  }
  function one(){
    eventNode.one.apply(eventNode, arguments);
  }
  function off(){
    eventNode.off.apply(eventNode, arguments);
  }
  function trigger(){
    eventNode.trigger.apply(eventNode, arguments);
  }
})();

