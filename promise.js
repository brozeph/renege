/* global Promise : true */

module.exports = (function (self) {
	'use strict';

	/**
	 * A convenience method for creating Promise objects from
	 * traditional node asynchronous methods involving a callback
	 * but when the arguments for the function are known at ahead
	 * of time.
	 **/
	self.create = function () {
		var
			args = Array.prototype.slice.call(arguments),
			method = args[0],
			promise = function (fulfill, reject) {
				method.apply(null, args.slice(1).concat(function () {
					var
						args = Array.prototype.slice.call(arguments),
						err = args[0];

					if (err) {
						return reject(err);
					}

					return fulfill.apply(null, args.slice(1));
				}));
			};

		return new Promise(promise);
	};

	/**
	 * Returns a closure that builds a promise for a typical node function
	 * that accepts a callback(err, [...]) as a final argument, but allows
	 * function arguments to be late-bound and applied at run time.
	 **/
	self.promisify = function (callback) {
		return function () {
			var args = Array.prototype.slice.call(arguments);
			args.unshift(callback);

			return self.create.apply(null, args);
		};
	};

	return self;
}({}));
