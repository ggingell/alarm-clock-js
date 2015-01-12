(function() {

AlarmClock.prototype = {
  
}




if ( typeof define === 'function' && define.amd ) {

  define('alarm-clock', [], function () {

    return AlarmClock;

  });

} else if ( window && typeof window === 'object' ) {

  window.AlarmClock = AlarmClock;

}

})();
(function() {

if(AlarmClock) {
  var ac = new AlarmClock();
} else {
  alert('AlarmClock Falsy!');
}

})();