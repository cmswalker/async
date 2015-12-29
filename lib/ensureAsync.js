'use strict';

import rest from 'lodash/function/rest';

import setImmediate from './internal/setImmediate';

export default function ensureAsync(fn) {
    return rest(function (args) {
        var callback = args.pop();
        args.push(function () {
            var innerArgs = arguments;
            if (sync) {
                setImmediate(function () {
                    callback.apply(null, innerArgs);
                });
            } else {
                callback.apply(null, innerArgs);
            }
        });
        var sync = true;
        fn.apply(this, args);
        sync = false;
    });
}