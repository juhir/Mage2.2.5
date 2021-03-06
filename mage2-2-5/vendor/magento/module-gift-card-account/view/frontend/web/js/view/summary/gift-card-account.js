/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'ko',
    'Magento_Checkout/js/view/summary/abstract-total',
    'mage/url',
    'Magento_Checkout/js/model/totals',
    'Magento_GiftCardAccount/js/action/remove-gift-card-from-quote'
], function ($, ko, generic, url, totals, removeAction) {
    'use strict';

    return generic.extend({
        defaults: {
            template: 'Magento_GiftCardAccount/summary/gift-card-account'
        },

        /**
         * Get information about applied gift cards and their amounts
         *
         * @returns {Array}.
         */
        getAppliedGiftCards: function () {
            if (totals.getSegment('giftcardaccount')) {
                return JSON.parse(totals.getSegment('giftcardaccount')['extension_attributes']['gift_cards']);
            }

            return [];
        },

        /**
         * @return {Object|Boolean}
         */
        isAvailable: function () {
            return this.isFullMode() && totals.getSegment('giftcardaccount') &&
                totals.getSegment('giftcardaccount').value != 0; //eslint-disable-line eqeqeq
        },

        /**
         * @param {Number} usedBalance
         * @return {*|String}
         */
        getAmount: function (usedBalance) {
            return this.getFormattedPrice(usedBalance);
        },

        /**
         * @param {String} giftCardCode
         * @param {Object} event
         */
        removeGiftCard: function (giftCardCode, event) {
            event.preventDefault();

            if (giftCardCode) {
                removeAction(giftCardCode);
            }
        }
    });
});
