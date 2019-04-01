const assert = require('chai').assert;
const check = require('../scripts/checkItemAvailability/checkAvailability_asos.js');
const helper = require('../scripts/helper')

describe('checkAvailability_asos', async function() {

    const browserObject = await helper.launchBrowser();

    describe('isPageSingleViewLayout()', function () {
        it('isPageSingleViewLayout should return true', function () {
            let result = check.isPageSingleViewLayout();
            assert.equal(result, true);
        });

        it('isPageSingleViewLayout should return false', function () {
            let result = check.isPageSingleViewLayout();
            assert.equal(result, false);
        });
    })

    describe('isItemAvailable()', function () {
        it('isItemAvailable should return true', function () {
            let result = check.isItemAvailable(page, link, testName, testSize);
            assert.equal(result, true);
        });

        it('isItemAvailable should return false', function () {
            let result = check.isItemAvailable(page, link, testName, testSize);
            assert.equal(result, false);
        });

    })

    describe('getItemDetails()', function () {
        it('getItemDetails should return item detail', function () {
            let result = check.getItemDetails(page, link);
            assert.equal(result, 'item array');
        });
    })

    describe('checkItems()', function () {
        it('checkItems should return item detail of items that are available', function () {
            let result = check.checkItems(item);
            assert.equal(result, 'item array');
        });
    })
})