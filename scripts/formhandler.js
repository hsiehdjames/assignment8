var strength = 30;
(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var emailList = [];
    $('#powerBody').hide();

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
            if (data['size'] == 'coffee-zilla' && data['flavor'] != '' && data['strength'] == '100' && data['email'] != '' && emailList.indexOf(data['email']) == -1) {
                $('#myModal').modal('show');
                var power = '';
                $('input[name="pFreeze"]').on('click', function() {
                    power += this.value + ' ';
                });
                $('input[name="pInv"]').on('click', function() {
                    power += this.value + ' ';
                });
                $('input[name="pMind"]').on('click', function() {
                    power += this.value + ' ';
                });
                emailList.push(data['email']);
                $('#btSave').unbind().click(function() {
                    console.log('power is ' + power);
                    data['power'] = power;
                    $('#myModal').modal('hide');
                    console.log(data);
                    fn(data);
                });
                strength = 30;
                this.reset();
                this.elements[0].focus();
                $('#strengthTxt')[0].textContent = '30';
                $('#strengthTxt').css('color', 'green');
            } else if (emailList.indexOf(data['email']) != -1) {
                var p = '';
                $('input[name="ppFreeze"]').on('click', function() {
                    p += this.value + ' ';
                });
                $('input[name="ppInv"]').on('click', function() {
                    p += this.value + ' ';
                });
                $('input[name="ppMind"]').on('click', function() {
                    p += this.value + ' ';
                });
                $('#btSave').unbind().click(function() {
                    console.log('power is ' + p);
                    data['power'] = p;
                    $('#myModal').modal('hide');
                    console.log(data);
                    fn(data);
                });
                strength = 30;
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

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            console.log(event.target.value + ', email');
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addDecafHandler = function(fn) {
        console.log('decaf validation '+strength);
        var coffeeName = '';
        var message = 'Strength too strong for decaf!';
        this.$formElement.on('input', '[name="coffee"]', function(event) {
            coffeeName = event.target.value;
            console.log($('input[name="coffee"]')[0]);
            if (fn(coffeeName, strength)) {
                console.log('text okay');
                event.target.setCustomValidity('');
                $('input[name="strength"]')[0].setCustomValidity('');
            } else {
                console.log('text not okay');
                event.target.setCustomValidity(message);
            }
        });
        this.$formElement.on('input', '[name="strength"]', function(event) {
            strength = event.target.value;
            console.log('asdfasdf' + coffeeName + ':' + strength);
            if (fn(coffeeName, strength)) {
                console.log('number okay');
                event.target.setCustomValidity('');
                $('input[name="coffee"]')[0].setCustomValidity('');
            } else {
                console.log('number not okay');
                event.target.setCustomValidity(message);
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
