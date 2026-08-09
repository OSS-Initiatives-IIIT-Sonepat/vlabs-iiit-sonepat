'use strict';

/**
 * Returns true if value is neither null nor undefined.
 * @param {unknown} value
 * @returns {boolean}
 */
function isDefined(value) {
  return value !== null && value !== undefined;
}

/**
 * Returns true if value is a non-empty string.
 * @param {unknown} value
 * @returns {boolean}
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

/**
 * Returns true if value is an array with at least one element.
 * @param {unknown} value
 * @returns {boolean}
 */
function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}

module.exports = { isDefined, isNonEmptyString, isNonEmptyArray };
