// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var appConfig = {
    history: supportsHistory(),
    console: supportsConsole()
};

$(document).ready(function() {
    if (appConfig.history) {
        var everPushedSomething = false;

        $('.js-ajax-link').on('click', function() {
            history.pushState(null, '', this.href);
            everPushedSomething = true;
        });

        $(window).bind('popstate', function() {
            if (everPushedSomething) {
                $.ajax({
                    dataType: 'script',
                    cache: true,
                    url: location.href
                });

            }
            everPushedSomething = true;
        });
    }
});

/* Taken from https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js */
function supportsHistory() {
     var ua = navigator.userAgent;

    // We only want Android 2, stock browser, and not Chrome which identifies
    // itself as 'Mobile Safari' as well
    if (ua.indexOf('Android 2') !== -1 &&
        ua.indexOf('Mobile Safari') !== -1 &&
          ua.indexOf('Chrome') === -1) {
      return false;
    }

    // Return the regular check
    return (window.history && 'pushState' in history);
}

function supportsConsole() {
    return (typeof console !== "undefined" && typeof console.log !== "undefined");
}
