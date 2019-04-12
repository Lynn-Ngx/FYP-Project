const should = require("should");
const request = require("request");
const expect = require("chai").expect;
const baseUrl = "http://localhost:3000/api";
const util = require("util");

describe('checkAvailability_asos', async function() {
    describe('/getPrices', function() {
        it('returns price', function(done) {
            request.get({ url: baseUrl + '/getPrices' },
                function(error, response, body) {
                    const bodyObj = JSON.parse(body);
                    expect(bodyObj.prices).to.equal("21.00");
                    expect(response.statusCode).to.equal(200);
                    console.log(body);
                    done();
                });
        });
    });
})
