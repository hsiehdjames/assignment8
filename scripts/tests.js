QUnit.test("test", function(assert) {
    var ds = new App.DataStore();
    //The problem with creating unit test for mytruck is initializing it
    //it needs an id and db
    var myTruck = new App.Truck('ncc-1701', new App.DataStore());
    assert.equal(ds.add('m@bond.com', 'tea'), undefined);
    assert.equal(ds.add('m@bond.com', 'tea'), undefined);
    assert.equal(ds.add('james@bond.com', 'eshpressho'), undefined);
    assert.ok(ds.getAll(), "Passed!");
    assert.equal(ds.remove('james@bond.com'), undefined);
    assert.ok(ds.getAll(), "Passed!");
    assert.equal(ds.get('m@bond.com'), "tea");
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
    assert.equal(myTruck.printOrders(), undefined);
    assert.equal(myTruck.deliverOrder('dr@no.com'), undefined);
    assert.equal(myTruck.deliverOrder('m@bond.com'), undefined);
    assert.equal(myTruck.printOrders(), undefined);
});
