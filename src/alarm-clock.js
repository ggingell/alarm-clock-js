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