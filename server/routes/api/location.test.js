const server = require('../../../index');
const test = require('ava');
const http = require('ava-http');
const locationApi = 'http://localhost:3000/api/locations';
//http://localhost:3000/api/locations
test('it should get locations',async t => {
    const res = await http.get(`${locationApi}`);
    t.true(typeof res === "object");
    t.is(typeof res.body,"array");
});

// test("It should return location response",t=>{

// })