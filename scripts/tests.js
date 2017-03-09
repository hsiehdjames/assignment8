var QUnit;
QUnit.test('test', function(assert) {
    var App = window.App || {};
    var ds = new App.DataStore();
    
    var myTruck = new App.Truck('ncc-1701', new App.DataStore());
    assert.equal(ds.add('m@bond.com', 'tea'), undefined);
    assert.equal(ds.add('m@bond.com', 'tea'), undefined);
    assert.equal(ds.add('james@bond.com', 'eshpressho'), undefined);
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    }, 'Passed!');
    assert.equal(ds.remove('james@bond.com'), undefined);
    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea'
    }, 'Passed!');
    assert.equal(ds.get('m@bond.com'), 'tea');
    assert.equal(ds.get('james@bond.com'), undefined);
    assert.equal(myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    }), undefined);
    assert.equal(myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    }), undefined);
    assert.equal(myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    }), undefined);
    assert.deepEqual(myTruck.checkOrders(), {
        'dr@no.com': {
            'coffee': 'decaf',
            'emailAddress': 'dr@no.com'
        },
        'm@bond.com': {
            'coffee': 'earl grey',
            'emailAddress': 'm@bond.com'
        },
        'me@goldfinger.com': {
            'coffee': 'double mocha',
            'emailAddress': 'me@goldfinger.com'
        }
    }, 'Passed!');
    assert.equal(myTruck.deliverOrder('dr@no.com'), undefined);
    assert.equal(myTruck.deliverOrder('m@bond.com'), undefined);
    assert.deepEqual(myTruck.checkOrders(), {
        'me@goldfinger.com': {
            'coffee': 'double mocha',
            'emailAddress': 'me@goldfinger.com'
        }
    }, 'Passed');
});
