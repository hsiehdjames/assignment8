(function(window) {
    'use strict';
    var App = window.App || {};
    var Validation = {
        isCompanyEmail: function(email) {
            return /.+@bignerdranch\.com$/.test(email);
        },
        decafValidation: function(word, strength) {
            //console.log('validation: ' + word + ',' + strength);
            if (word.includes('decaf') && strength >= 20) {
                console.log('too strong');
                return false;
            } else {
                console.log('ok');
                return true;
            }
        }
    };
    App.Validation = Validation;
    window.App = App;
})(window);
