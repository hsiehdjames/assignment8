(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        } else {
            var strVal = $('#strengthLevel')[0].value;
            $('#strengthTxt')[0].textContent = strVal;
            $('#strengthTxt').css('color', 'green');
            //console.log($('#strengthLevel')[0].value);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            if (data['size'] == 'coffee-zilla' && data['flavor'] != '' && data['strength'] == '100') {
                $('#myModal').modal('show');
                var power = '';
                $('input[name="power"]').on('click', function() {
                    power = this.value;
                });

                $('#btSave').unbind().click(function() {
                    console.log('power is ' + power);
                    data['power'] = power;
                    $('#myModal').modal('hide');
                    console.log(data);
                    fn(data);
                });
                this.reset();
                this.elements[0].focus();
                $('#strengthTxt')[0].textContent = '30';
                $('#strengthTxt').css('color', 'green');
            } else {
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
                $('#strengthTxt')[0].textContent = '30';
                $('#strengthTxt').css('color', 'green');
            }
        });
    };

    $('#strengthLevel').on('input', function() {
        //console.log('input val: ' + this.value);
        //console.log($('#strengthTxt'));
        var strVal = $('#strengthLevel')[0].value;
        $('#strengthTxt')[0].textContent = strVal;
        if (strVal <= 33) {
            $('#strengthTxt').css('color', 'green');
        } else if (strVal > 34 && strVal <= 67) {
            $('#strengthTxt').css('color', 'orange');
        } else {
            $('#strengthTxt').css('color', 'red');
        }

        //  console.log('currentColor: ' + $('#strengthTxt').css('color'));
    });

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
