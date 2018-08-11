// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = __webpack_require__(30);

// converts to / from base64 encoded strings
util.base64 = __webpack_require__(31);

// base class of rpc.Service
util.EventEmitter = __webpack_require__(32);

// float handling accross browsers
util.float = __webpack_require__(33);

// requires modules optionally and hides the call from bundlers
util.inquire = __webpack_require__(34);

// converts to / from utf8 encoded strings
util.utf8 = __webpack_require__(35);

// provides a node-like buffer pool in the browser
util.pool = __webpack_require__(36);

// utility to work with the low and high bits of a 64 bit value
util.LongBits = __webpack_require__(37);

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 * @const
 */
util.isNode = Boolean(global.process && global.process.versions && global.process.versions.node);

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ global.dcodeIO && /* istanbul ignore next */ global.dcodeIO.Long || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: (new Error()).stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.badgeImage = exports.liveCard = exports.mediaAd = exports.liveMediaCard = exports.Prompt = exports.liveShareInfo = exports.adSlot = exports.head = exports.ResponseRecommendLiveMediaCards = exports.RequestRecommendLiveMediaCards = exports.ResponseLiveShareInfo = exports.RequestLiveShareInfo = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/


var _minimal = __webpack_require__(28);

var $protobuf = _interopRequireWildcard(_minimal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Common aliases
var $Reader = $protobuf.Reader,
    $Writer = $protobuf.Writer,
    $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

var RequestLiveShareInfo = exports.RequestLiveShareInfo = $root.RequestLiveShareInfo = function () {

    /**
     * Properties of a RequestLiveShareInfo.
     * @exports IRequestLiveShareInfo
     * @interface IRequestLiveShareInfo
     * @property {Ihead|null} [head] RequestLiveShareInfo head
     * @property {Long|null} [liveId] RequestLiveShareInfo liveId
     */

    /**
     * Constructs a new RequestLiveShareInfo.
     * @exports RequestLiveShareInfo
     * @classdesc Represents a RequestLiveShareInfo.
     * @implements IRequestLiveShareInfo
     * @constructor
     * @param {IRequestLiveShareInfo=} [properties] Properties to set
     */
    function RequestLiveShareInfo(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * RequestLiveShareInfo head.
     * @member {Ihead|null|undefined} head
     * @memberof RequestLiveShareInfo
     * @instance
     */
    RequestLiveShareInfo.prototype.head = null;

    /**
     * RequestLiveShareInfo liveId.
     * @member {Long} liveId
     * @memberof RequestLiveShareInfo
     * @instance
     */
    RequestLiveShareInfo.prototype.liveId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * Creates a new RequestLiveShareInfo instance using the specified properties.
     * @function create
     * @memberof RequestLiveShareInfo
     * @static
     * @param {IRequestLiveShareInfo=} [properties] Properties to set
     * @returns {RequestLiveShareInfo} RequestLiveShareInfo instance
     */
    RequestLiveShareInfo.create = function create(properties) {
        return new RequestLiveShareInfo(properties);
    };

    /**
     * Encodes the specified RequestLiveShareInfo message. Does not implicitly {@link RequestLiveShareInfo.verify|verify} messages.
     * @function encode
     * @memberof RequestLiveShareInfo
     * @static
     * @param {IRequestLiveShareInfo} message RequestLiveShareInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestLiveShareInfo.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.head != null && message.hasOwnProperty("head")) $root.head.encode(message.head, writer.uint32( /* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.liveId != null && message.hasOwnProperty("liveId")) writer.uint32( /* id 2, wireType 0 =*/16).int64(message.liveId);
        return writer;
    };

    /**
     * Encodes the specified RequestLiveShareInfo message, length delimited. Does not implicitly {@link RequestLiveShareInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RequestLiveShareInfo
     * @static
     * @param {IRequestLiveShareInfo} message RequestLiveShareInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestLiveShareInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RequestLiveShareInfo message from the specified reader or buffer.
     * @function decode
     * @memberof RequestLiveShareInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RequestLiveShareInfo} RequestLiveShareInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestLiveShareInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.RequestLiveShareInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.head = $root.head.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.liveId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a RequestLiveShareInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RequestLiveShareInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RequestLiveShareInfo} RequestLiveShareInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestLiveShareInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RequestLiveShareInfo message.
     * @function verify
     * @memberof RequestLiveShareInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RequestLiveShareInfo.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.head != null && message.hasOwnProperty("head")) {
            var error = $root.head.verify(message.head);
            if (error) return "head." + error;
        }
        if (message.liveId != null && message.hasOwnProperty("liveId")) if (!$util.isInteger(message.liveId) && !(message.liveId && $util.isInteger(message.liveId.low) && $util.isInteger(message.liveId.high))) return "liveId: integer|Long expected";
        return null;
    };

    /**
     * Creates a RequestLiveShareInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RequestLiveShareInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RequestLiveShareInfo} RequestLiveShareInfo
     */
    RequestLiveShareInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.RequestLiveShareInfo) return object;
        var message = new $root.RequestLiveShareInfo();
        if (object.head != null) {
            if (_typeof(object.head) !== "object") throw TypeError(".RequestLiveShareInfo.head: object expected");
            message.head = $root.head.fromObject(object.head);
        }
        if (object.liveId != null) if ($util.Long) (message.liveId = $util.Long.fromValue(object.liveId)).unsigned = false;else if (typeof object.liveId === "string") message.liveId = parseInt(object.liveId, 10);else if (typeof object.liveId === "number") message.liveId = object.liveId;else if (_typeof(object.liveId) === "object") message.liveId = new $util.LongBits(object.liveId.low >>> 0, object.liveId.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a RequestLiveShareInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RequestLiveShareInfo
     * @static
     * @param {RequestLiveShareInfo} message RequestLiveShareInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RequestLiveShareInfo.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.head = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.liveId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else object.liveId = options.longs === String ? "0" : 0;
        }
        if (message.head != null && message.hasOwnProperty("head")) object.head = $root.head.toObject(message.head, options);
        if (message.liveId != null && message.hasOwnProperty("liveId")) if (typeof message.liveId === "number") object.liveId = options.longs === String ? String(message.liveId) : message.liveId;else object.liveId = options.longs === String ? $util.Long.prototype.toString.call(message.liveId) : options.longs === Number ? new $util.LongBits(message.liveId.low >>> 0, message.liveId.high >>> 0).toNumber() : message.liveId;
        return object;
    };

    /**
     * Converts this RequestLiveShareInfo to JSON.
     * @function toJSON
     * @memberof RequestLiveShareInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RequestLiveShareInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RequestLiveShareInfo;
}();

var ResponseLiveShareInfo = exports.ResponseLiveShareInfo = $root.ResponseLiveShareInfo = function () {

    /**
     * Properties of a ResponseLiveShareInfo.
     * @exports IResponseLiveShareInfo
     * @interface IResponseLiveShareInfo
     * @property {number|null} [rcode] ResponseLiveShareInfo rcode
     * @property {IliveShareInfo|null} [shareInfo] ResponseLiveShareInfo shareInfo
     */

    /**
     * Constructs a new ResponseLiveShareInfo.
     * @exports ResponseLiveShareInfo
     * @classdesc Represents a ResponseLiveShareInfo.
     * @implements IResponseLiveShareInfo
     * @constructor
     * @param {IResponseLiveShareInfo=} [properties] Properties to set
     */
    function ResponseLiveShareInfo(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * ResponseLiveShareInfo rcode.
     * @member {number} rcode
     * @memberof ResponseLiveShareInfo
     * @instance
     */
    ResponseLiveShareInfo.prototype.rcode = 0;

    /**
     * ResponseLiveShareInfo shareInfo.
     * @member {IliveShareInfo|null|undefined} shareInfo
     * @memberof ResponseLiveShareInfo
     * @instance
     */
    ResponseLiveShareInfo.prototype.shareInfo = null;

    /**
     * Creates a new ResponseLiveShareInfo instance using the specified properties.
     * @function create
     * @memberof ResponseLiveShareInfo
     * @static
     * @param {IResponseLiveShareInfo=} [properties] Properties to set
     * @returns {ResponseLiveShareInfo} ResponseLiveShareInfo instance
     */
    ResponseLiveShareInfo.create = function create(properties) {
        return new ResponseLiveShareInfo(properties);
    };

    /**
     * Encodes the specified ResponseLiveShareInfo message. Does not implicitly {@link ResponseLiveShareInfo.verify|verify} messages.
     * @function encode
     * @memberof ResponseLiveShareInfo
     * @static
     * @param {IResponseLiveShareInfo} message ResponseLiveShareInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ResponseLiveShareInfo.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.rcode != null && message.hasOwnProperty("rcode")) writer.uint32( /* id 1, wireType 0 =*/8).int32(message.rcode);
        if (message.shareInfo != null && message.hasOwnProperty("shareInfo")) $root.liveShareInfo.encode(message.shareInfo, writer.uint32( /* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ResponseLiveShareInfo message, length delimited. Does not implicitly {@link ResponseLiveShareInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ResponseLiveShareInfo
     * @static
     * @param {IResponseLiveShareInfo} message ResponseLiveShareInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ResponseLiveShareInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ResponseLiveShareInfo message from the specified reader or buffer.
     * @function decode
     * @memberof ResponseLiveShareInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ResponseLiveShareInfo} ResponseLiveShareInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ResponseLiveShareInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.ResponseLiveShareInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rcode = reader.int32();
                    break;
                case 2:
                    message.shareInfo = $root.liveShareInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a ResponseLiveShareInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ResponseLiveShareInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ResponseLiveShareInfo} ResponseLiveShareInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ResponseLiveShareInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ResponseLiveShareInfo message.
     * @function verify
     * @memberof ResponseLiveShareInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ResponseLiveShareInfo.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.rcode != null && message.hasOwnProperty("rcode")) if (!$util.isInteger(message.rcode)) return "rcode: integer expected";
        if (message.shareInfo != null && message.hasOwnProperty("shareInfo")) {
            var error = $root.liveShareInfo.verify(message.shareInfo);
            if (error) return "shareInfo." + error;
        }
        return null;
    };

    /**
     * Creates a ResponseLiveShareInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ResponseLiveShareInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ResponseLiveShareInfo} ResponseLiveShareInfo
     */
    ResponseLiveShareInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.ResponseLiveShareInfo) return object;
        var message = new $root.ResponseLiveShareInfo();
        if (object.rcode != null) message.rcode = object.rcode | 0;
        if (object.shareInfo != null) {
            if (_typeof(object.shareInfo) !== "object") throw TypeError(".ResponseLiveShareInfo.shareInfo: object expected");
            message.shareInfo = $root.liveShareInfo.fromObject(object.shareInfo);
        }
        return message;
    };

    /**
     * Creates a plain object from a ResponseLiveShareInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ResponseLiveShareInfo
     * @static
     * @param {ResponseLiveShareInfo} message ResponseLiveShareInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ResponseLiveShareInfo.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.rcode = 0;
            object.shareInfo = null;
        }
        if (message.rcode != null && message.hasOwnProperty("rcode")) object.rcode = message.rcode;
        if (message.shareInfo != null && message.hasOwnProperty("shareInfo")) object.shareInfo = $root.liveShareInfo.toObject(message.shareInfo, options);
        return object;
    };

    /**
     * Converts this ResponseLiveShareInfo to JSON.
     * @function toJSON
     * @memberof ResponseLiveShareInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ResponseLiveShareInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ResponseLiveShareInfo;
}();

var RequestRecommendLiveMediaCards = exports.RequestRecommendLiveMediaCards = $root.RequestRecommendLiveMediaCards = function () {

    /**
     * Properties of a RequestRecommendLiveMediaCards.
     * @exports IRequestRecommendLiveMediaCards
     * @interface IRequestRecommendLiveMediaCards
     * @property {Ihead|null} [head] RequestRecommendLiveMediaCards head
     * @property {string|null} [exId] RequestRecommendLiveMediaCards exId
     * @property {number|null} [freshType] RequestRecommendLiveMediaCards freshType
     * @property {number|null} [index] RequestRecommendLiveMediaCards index
     * @property {number|null} [count] RequestRecommendLiveMediaCards count
     * @property {number|null} [timeStamp] RequestRecommendLiveMediaCards timeStamp
     * @property {string|null} [performanceId] RequestRecommendLiveMediaCards performanceId
     * @property {Long|null} [lastLiveId] RequestRecommendLiveMediaCards lastLiveId
     * @property {number|null} [rFlag] RequestRecommendLiveMediaCards rFlag
     */

    /**
     * Constructs a new RequestRecommendLiveMediaCards.
     * @exports RequestRecommendLiveMediaCards
     * @classdesc Represents a RequestRecommendLiveMediaCards.
     * @implements IRequestRecommendLiveMediaCards
     * @constructor
     * @param {IRequestRecommendLiveMediaCards=} [properties] Properties to set
     */
    function RequestRecommendLiveMediaCards(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * RequestRecommendLiveMediaCards head.
     * @member {Ihead|null|undefined} head
     * @memberof RequestRecommendLiveMediaCards
     * @instance
     */
    RequestRecommendLiveMediaCards.prototype.head = null;

    /**
     * RequestRecommendLiveMediaCards exId.
     * @member {string} exId
     * @memberof RequestRecommendLiveMediaCards
     * @instance
     */
    RequestRecommendLiveMediaCards.prototype.exId = "";

    /**
     * RequestRecommendLiveMediaCards freshType.
     * @member {number} freshType
     * @memberof RequestRecommendLiveMediaCards
     * @instance
     */
    RequestRecommendLiveMediaCards.prototype.freshType = 0;

    /**
     * RequestRecommendLiveMediaCards index.
     * @member {number} index
     * @memberof RequestRecommendLiveMediaCards
     * @instance
     */
    RequestRecommendLiveMediaCards.prototype.index = 0;

    /**
     * RequestRecommendLiveMediaCards count.
     * @member {number} count
     * @memberof RequestRecommendLiveMediaCards
     * @instance
     */
    RequestRecommendLiveMediaCards.prototype.count = 0;

    /**
     * RequestRecommendLiveMediaCards timeStamp.
     * @member {number} timeStamp
     * @memberof RequestRecommendLiveMediaCards
     * @instance
     */
    RequestRecommendLiveMediaCards.prototype.timeStamp = 0;

    /**
     * RequestRecommendLiveMediaCards performanceId.
     * @member {string} performanceId
     * @memberof RequestRecommendLiveMediaCards
     * @instance
     */
    RequestRecommendLiveMediaCards.prototype.performanceId = "";

    /**
     * RequestRecommendLiveMediaCards lastLiveId.
     * @member {Long} lastLiveId
     * @memberof RequestRecommendLiveMediaCards
     * @instance
     */
    RequestRecommendLiveMediaCards.prototype.lastLiveId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * RequestRecommendLiveMediaCards rFlag.
     * @member {number} rFlag
     * @memberof RequestRecommendLiveMediaCards
     * @instance
     */
    RequestRecommendLiveMediaCards.prototype.rFlag = 0;

    /**
     * Creates a new RequestRecommendLiveMediaCards instance using the specified properties.
     * @function create
     * @memberof RequestRecommendLiveMediaCards
     * @static
     * @param {IRequestRecommendLiveMediaCards=} [properties] Properties to set
     * @returns {RequestRecommendLiveMediaCards} RequestRecommendLiveMediaCards instance
     */
    RequestRecommendLiveMediaCards.create = function create(properties) {
        return new RequestRecommendLiveMediaCards(properties);
    };

    /**
     * Encodes the specified RequestRecommendLiveMediaCards message. Does not implicitly {@link RequestRecommendLiveMediaCards.verify|verify} messages.
     * @function encode
     * @memberof RequestRecommendLiveMediaCards
     * @static
     * @param {IRequestRecommendLiveMediaCards} message RequestRecommendLiveMediaCards message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestRecommendLiveMediaCards.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.head != null && message.hasOwnProperty("head")) $root.head.encode(message.head, writer.uint32( /* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.exId != null && message.hasOwnProperty("exId")) writer.uint32( /* id 2, wireType 2 =*/18).string(message.exId);
        if (message.freshType != null && message.hasOwnProperty("freshType")) writer.uint32( /* id 3, wireType 0 =*/24).int32(message.freshType);
        if (message.index != null && message.hasOwnProperty("index")) writer.uint32( /* id 4, wireType 0 =*/32).int32(message.index);
        if (message.count != null && message.hasOwnProperty("count")) writer.uint32( /* id 5, wireType 0 =*/40).int32(message.count);
        if (message.timeStamp != null && message.hasOwnProperty("timeStamp")) writer.uint32( /* id 6, wireType 0 =*/48).int32(message.timeStamp);
        if (message.performanceId != null && message.hasOwnProperty("performanceId")) writer.uint32( /* id 7, wireType 2 =*/58).string(message.performanceId);
        if (message.lastLiveId != null && message.hasOwnProperty("lastLiveId")) writer.uint32( /* id 8, wireType 0 =*/64).int64(message.lastLiveId);
        if (message.rFlag != null && message.hasOwnProperty("rFlag")) writer.uint32( /* id 9, wireType 0 =*/72).int32(message.rFlag);
        return writer;
    };

    /**
     * Encodes the specified RequestRecommendLiveMediaCards message, length delimited. Does not implicitly {@link RequestRecommendLiveMediaCards.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RequestRecommendLiveMediaCards
     * @static
     * @param {IRequestRecommendLiveMediaCards} message RequestRecommendLiveMediaCards message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RequestRecommendLiveMediaCards.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RequestRecommendLiveMediaCards message from the specified reader or buffer.
     * @function decode
     * @memberof RequestRecommendLiveMediaCards
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RequestRecommendLiveMediaCards} RequestRecommendLiveMediaCards
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestRecommendLiveMediaCards.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.RequestRecommendLiveMediaCards();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.head = $root.head.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.exId = reader.string();
                    break;
                case 3:
                    message.freshType = reader.int32();
                    break;
                case 4:
                    message.index = reader.int32();
                    break;
                case 5:
                    message.count = reader.int32();
                    break;
                case 6:
                    message.timeStamp = reader.int32();
                    break;
                case 7:
                    message.performanceId = reader.string();
                    break;
                case 8:
                    message.lastLiveId = reader.int64();
                    break;
                case 9:
                    message.rFlag = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a RequestRecommendLiveMediaCards message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RequestRecommendLiveMediaCards
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RequestRecommendLiveMediaCards} RequestRecommendLiveMediaCards
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RequestRecommendLiveMediaCards.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RequestRecommendLiveMediaCards message.
     * @function verify
     * @memberof RequestRecommendLiveMediaCards
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RequestRecommendLiveMediaCards.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.head != null && message.hasOwnProperty("head")) {
            var error = $root.head.verify(message.head);
            if (error) return "head." + error;
        }
        if (message.exId != null && message.hasOwnProperty("exId")) if (!$util.isString(message.exId)) return "exId: string expected";
        if (message.freshType != null && message.hasOwnProperty("freshType")) if (!$util.isInteger(message.freshType)) return "freshType: integer expected";
        if (message.index != null && message.hasOwnProperty("index")) if (!$util.isInteger(message.index)) return "index: integer expected";
        if (message.count != null && message.hasOwnProperty("count")) if (!$util.isInteger(message.count)) return "count: integer expected";
        if (message.timeStamp != null && message.hasOwnProperty("timeStamp")) if (!$util.isInteger(message.timeStamp)) return "timeStamp: integer expected";
        if (message.performanceId != null && message.hasOwnProperty("performanceId")) if (!$util.isString(message.performanceId)) return "performanceId: string expected";
        if (message.lastLiveId != null && message.hasOwnProperty("lastLiveId")) if (!$util.isInteger(message.lastLiveId) && !(message.lastLiveId && $util.isInteger(message.lastLiveId.low) && $util.isInteger(message.lastLiveId.high))) return "lastLiveId: integer|Long expected";
        if (message.rFlag != null && message.hasOwnProperty("rFlag")) if (!$util.isInteger(message.rFlag)) return "rFlag: integer expected";
        return null;
    };

    /**
     * Creates a RequestRecommendLiveMediaCards message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RequestRecommendLiveMediaCards
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RequestRecommendLiveMediaCards} RequestRecommendLiveMediaCards
     */
    RequestRecommendLiveMediaCards.fromObject = function fromObject(object) {
        if (object instanceof $root.RequestRecommendLiveMediaCards) return object;
        var message = new $root.RequestRecommendLiveMediaCards();
        if (object.head != null) {
            if (_typeof(object.head) !== "object") throw TypeError(".RequestRecommendLiveMediaCards.head: object expected");
            message.head = $root.head.fromObject(object.head);
        }
        if (object.exId != null) message.exId = String(object.exId);
        if (object.freshType != null) message.freshType = object.freshType | 0;
        if (object.index != null) message.index = object.index | 0;
        if (object.count != null) message.count = object.count | 0;
        if (object.timeStamp != null) message.timeStamp = object.timeStamp | 0;
        if (object.performanceId != null) message.performanceId = String(object.performanceId);
        if (object.lastLiveId != null) if ($util.Long) (message.lastLiveId = $util.Long.fromValue(object.lastLiveId)).unsigned = false;else if (typeof object.lastLiveId === "string") message.lastLiveId = parseInt(object.lastLiveId, 10);else if (typeof object.lastLiveId === "number") message.lastLiveId = object.lastLiveId;else if (_typeof(object.lastLiveId) === "object") message.lastLiveId = new $util.LongBits(object.lastLiveId.low >>> 0, object.lastLiveId.high >>> 0).toNumber();
        if (object.rFlag != null) message.rFlag = object.rFlag | 0;
        return message;
    };

    /**
     * Creates a plain object from a RequestRecommendLiveMediaCards message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RequestRecommendLiveMediaCards
     * @static
     * @param {RequestRecommendLiveMediaCards} message RequestRecommendLiveMediaCards
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RequestRecommendLiveMediaCards.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.head = null;
            object.exId = "";
            object.freshType = 0;
            object.index = 0;
            object.count = 0;
            object.timeStamp = 0;
            object.performanceId = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.lastLiveId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else object.lastLiveId = options.longs === String ? "0" : 0;
            object.rFlag = 0;
        }
        if (message.head != null && message.hasOwnProperty("head")) object.head = $root.head.toObject(message.head, options);
        if (message.exId != null && message.hasOwnProperty("exId")) object.exId = message.exId;
        if (message.freshType != null && message.hasOwnProperty("freshType")) object.freshType = message.freshType;
        if (message.index != null && message.hasOwnProperty("index")) object.index = message.index;
        if (message.count != null && message.hasOwnProperty("count")) object.count = message.count;
        if (message.timeStamp != null && message.hasOwnProperty("timeStamp")) object.timeStamp = message.timeStamp;
        if (message.performanceId != null && message.hasOwnProperty("performanceId")) object.performanceId = message.performanceId;
        if (message.lastLiveId != null && message.hasOwnProperty("lastLiveId")) if (typeof message.lastLiveId === "number") object.lastLiveId = options.longs === String ? String(message.lastLiveId) : message.lastLiveId;else object.lastLiveId = options.longs === String ? $util.Long.prototype.toString.call(message.lastLiveId) : options.longs === Number ? new $util.LongBits(message.lastLiveId.low >>> 0, message.lastLiveId.high >>> 0).toNumber() : message.lastLiveId;
        if (message.rFlag != null && message.hasOwnProperty("rFlag")) object.rFlag = message.rFlag;
        return object;
    };

    /**
     * Converts this RequestRecommendLiveMediaCards to JSON.
     * @function toJSON
     * @memberof RequestRecommendLiveMediaCards
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RequestRecommendLiveMediaCards.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RequestRecommendLiveMediaCards;
}();

var ResponseRecommendLiveMediaCards = exports.ResponseRecommendLiveMediaCards = $root.ResponseRecommendLiveMediaCards = function () {

    /**
     * Properties of a ResponseRecommendLiveMediaCards.
     * @exports IResponseRecommendLiveMediaCards
     * @interface IResponseRecommendLiveMediaCards
     * @property {IPrompt|null} [prompt] ResponseRecommendLiveMediaCards prompt
     * @property {number|null} [rcode] ResponseRecommendLiveMediaCards rcode
     * @property {Array.<IliveMediaCard>|null} [liveCards] ResponseRecommendLiveMediaCards liveCards
     * @property {Array.<IadSlot>|null} [adSlots] ResponseRecommendLiveMediaCards adSlots
     * @property {number|null} [timeStamp] ResponseRecommendLiveMediaCards timeStamp
     * @property {string|null} [performanceId] ResponseRecommendLiveMediaCards performanceId
     * @property {boolean|null} [isLastPage] ResponseRecommendLiveMediaCards isLastPage
     */

    /**
     * Constructs a new ResponseRecommendLiveMediaCards.
     * @exports ResponseRecommendLiveMediaCards
     * @classdesc Represents a ResponseRecommendLiveMediaCards.
     * @implements IResponseRecommendLiveMediaCards
     * @constructor
     * @param {IResponseRecommendLiveMediaCards=} [properties] Properties to set
     */
    function ResponseRecommendLiveMediaCards(properties) {
        this.liveCards = [];
        this.adSlots = [];
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * ResponseRecommendLiveMediaCards prompt.
     * @member {IPrompt|null|undefined} prompt
     * @memberof ResponseRecommendLiveMediaCards
     * @instance
     */
    ResponseRecommendLiveMediaCards.prototype.prompt = null;

    /**
     * ResponseRecommendLiveMediaCards rcode.
     * @member {number} rcode
     * @memberof ResponseRecommendLiveMediaCards
     * @instance
     */
    ResponseRecommendLiveMediaCards.prototype.rcode = 0;

    /**
     * ResponseRecommendLiveMediaCards liveCards.
     * @member {Array.<IliveMediaCard>} liveCards
     * @memberof ResponseRecommendLiveMediaCards
     * @instance
     */
    ResponseRecommendLiveMediaCards.prototype.liveCards = $util.emptyArray;

    /**
     * ResponseRecommendLiveMediaCards adSlots.
     * @member {Array.<IadSlot>} adSlots
     * @memberof ResponseRecommendLiveMediaCards
     * @instance
     */
    ResponseRecommendLiveMediaCards.prototype.adSlots = $util.emptyArray;

    /**
     * ResponseRecommendLiveMediaCards timeStamp.
     * @member {number} timeStamp
     * @memberof ResponseRecommendLiveMediaCards
     * @instance
     */
    ResponseRecommendLiveMediaCards.prototype.timeStamp = 0;

    /**
     * ResponseRecommendLiveMediaCards performanceId.
     * @member {string} performanceId
     * @memberof ResponseRecommendLiveMediaCards
     * @instance
     */
    ResponseRecommendLiveMediaCards.prototype.performanceId = "";

    /**
     * ResponseRecommendLiveMediaCards isLastPage.
     * @member {boolean} isLastPage
     * @memberof ResponseRecommendLiveMediaCards
     * @instance
     */
    ResponseRecommendLiveMediaCards.prototype.isLastPage = false;

    /**
     * Creates a new ResponseRecommendLiveMediaCards instance using the specified properties.
     * @function create
     * @memberof ResponseRecommendLiveMediaCards
     * @static
     * @param {IResponseRecommendLiveMediaCards=} [properties] Properties to set
     * @returns {ResponseRecommendLiveMediaCards} ResponseRecommendLiveMediaCards instance
     */
    ResponseRecommendLiveMediaCards.create = function create(properties) {
        return new ResponseRecommendLiveMediaCards(properties);
    };

    /**
     * Encodes the specified ResponseRecommendLiveMediaCards message. Does not implicitly {@link ResponseRecommendLiveMediaCards.verify|verify} messages.
     * @function encode
     * @memberof ResponseRecommendLiveMediaCards
     * @static
     * @param {IResponseRecommendLiveMediaCards} message ResponseRecommendLiveMediaCards message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ResponseRecommendLiveMediaCards.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.prompt != null && message.hasOwnProperty("prompt")) $root.Prompt.encode(message.prompt, writer.uint32( /* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.rcode != null && message.hasOwnProperty("rcode")) writer.uint32( /* id 2, wireType 0 =*/16).int32(message.rcode);
        if (message.liveCards != null && message.liveCards.length) for (var i = 0; i < message.liveCards.length; ++i) {
            $root.liveMediaCard.encode(message.liveCards[i], writer.uint32( /* id 3, wireType 2 =*/26).fork()).ldelim();
        }if (message.adSlots != null && message.adSlots.length) for (var _i = 0; _i < message.adSlots.length; ++_i) {
            $root.adSlot.encode(message.adSlots[_i], writer.uint32( /* id 4, wireType 2 =*/34).fork()).ldelim();
        }if (message.timeStamp != null && message.hasOwnProperty("timeStamp")) writer.uint32( /* id 5, wireType 0 =*/40).int32(message.timeStamp);
        if (message.performanceId != null && message.hasOwnProperty("performanceId")) writer.uint32( /* id 6, wireType 2 =*/50).string(message.performanceId);
        if (message.isLastPage != null && message.hasOwnProperty("isLastPage")) writer.uint32( /* id 7, wireType 0 =*/56).bool(message.isLastPage);
        return writer;
    };

    /**
     * Encodes the specified ResponseRecommendLiveMediaCards message, length delimited. Does not implicitly {@link ResponseRecommendLiveMediaCards.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ResponseRecommendLiveMediaCards
     * @static
     * @param {IResponseRecommendLiveMediaCards} message ResponseRecommendLiveMediaCards message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ResponseRecommendLiveMediaCards.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ResponseRecommendLiveMediaCards message from the specified reader or buffer.
     * @function decode
     * @memberof ResponseRecommendLiveMediaCards
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ResponseRecommendLiveMediaCards} ResponseRecommendLiveMediaCards
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ResponseRecommendLiveMediaCards.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.ResponseRecommendLiveMediaCards();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.prompt = $root.Prompt.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.rcode = reader.int32();
                    break;
                case 3:
                    if (!(message.liveCards && message.liveCards.length)) message.liveCards = [];
                    message.liveCards.push($root.liveMediaCard.decode(reader, reader.uint32()));
                    break;
                case 4:
                    if (!(message.adSlots && message.adSlots.length)) message.adSlots = [];
                    message.adSlots.push($root.adSlot.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.timeStamp = reader.int32();
                    break;
                case 6:
                    message.performanceId = reader.string();
                    break;
                case 7:
                    message.isLastPage = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a ResponseRecommendLiveMediaCards message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ResponseRecommendLiveMediaCards
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ResponseRecommendLiveMediaCards} ResponseRecommendLiveMediaCards
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ResponseRecommendLiveMediaCards.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ResponseRecommendLiveMediaCards message.
     * @function verify
     * @memberof ResponseRecommendLiveMediaCards
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ResponseRecommendLiveMediaCards.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.prompt != null && message.hasOwnProperty("prompt")) {
            var error = $root.Prompt.verify(message.prompt);
            if (error) return "prompt." + error;
        }
        if (message.rcode != null && message.hasOwnProperty("rcode")) if (!$util.isInteger(message.rcode)) return "rcode: integer expected";
        if (message.liveCards != null && message.hasOwnProperty("liveCards")) {
            if (!Array.isArray(message.liveCards)) return "liveCards: array expected";
            for (var i = 0; i < message.liveCards.length; ++i) {
                var _error = $root.liveMediaCard.verify(message.liveCards[i]);
                if (_error) return "liveCards." + _error;
            }
        }
        if (message.adSlots != null && message.hasOwnProperty("adSlots")) {
            if (!Array.isArray(message.adSlots)) return "adSlots: array expected";
            for (var _i2 = 0; _i2 < message.adSlots.length; ++_i2) {
                var _error2 = $root.adSlot.verify(message.adSlots[_i2]);
                if (_error2) return "adSlots." + _error2;
            }
        }
        if (message.timeStamp != null && message.hasOwnProperty("timeStamp")) if (!$util.isInteger(message.timeStamp)) return "timeStamp: integer expected";
        if (message.performanceId != null && message.hasOwnProperty("performanceId")) if (!$util.isString(message.performanceId)) return "performanceId: string expected";
        if (message.isLastPage != null && message.hasOwnProperty("isLastPage")) if (typeof message.isLastPage !== "boolean") return "isLastPage: boolean expected";
        return null;
    };

    /**
     * Creates a ResponseRecommendLiveMediaCards message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ResponseRecommendLiveMediaCards
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ResponseRecommendLiveMediaCards} ResponseRecommendLiveMediaCards
     */
    ResponseRecommendLiveMediaCards.fromObject = function fromObject(object) {
        if (object instanceof $root.ResponseRecommendLiveMediaCards) return object;
        var message = new $root.ResponseRecommendLiveMediaCards();
        if (object.prompt != null) {
            if (_typeof(object.prompt) !== "object") throw TypeError(".ResponseRecommendLiveMediaCards.prompt: object expected");
            message.prompt = $root.Prompt.fromObject(object.prompt);
        }
        if (object.rcode != null) message.rcode = object.rcode | 0;
        if (object.liveCards) {
            if (!Array.isArray(object.liveCards)) throw TypeError(".ResponseRecommendLiveMediaCards.liveCards: array expected");
            message.liveCards = [];
            for (var i = 0; i < object.liveCards.length; ++i) {
                if (_typeof(object.liveCards[i]) !== "object") throw TypeError(".ResponseRecommendLiveMediaCards.liveCards: object expected");
                message.liveCards[i] = $root.liveMediaCard.fromObject(object.liveCards[i]);
            }
        }
        if (object.adSlots) {
            if (!Array.isArray(object.adSlots)) throw TypeError(".ResponseRecommendLiveMediaCards.adSlots: array expected");
            message.adSlots = [];
            for (var _i3 = 0; _i3 < object.adSlots.length; ++_i3) {
                if (_typeof(object.adSlots[_i3]) !== "object") throw TypeError(".ResponseRecommendLiveMediaCards.adSlots: object expected");
                message.adSlots[_i3] = $root.adSlot.fromObject(object.adSlots[_i3]);
            }
        }
        if (object.timeStamp != null) message.timeStamp = object.timeStamp | 0;
        if (object.performanceId != null) message.performanceId = String(object.performanceId);
        if (object.isLastPage != null) message.isLastPage = Boolean(object.isLastPage);
        return message;
    };

    /**
     * Creates a plain object from a ResponseRecommendLiveMediaCards message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ResponseRecommendLiveMediaCards
     * @static
     * @param {ResponseRecommendLiveMediaCards} message ResponseRecommendLiveMediaCards
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ResponseRecommendLiveMediaCards.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.liveCards = [];
            object.adSlots = [];
        }
        if (options.defaults) {
            object.prompt = null;
            object.rcode = 0;
            object.timeStamp = 0;
            object.performanceId = "";
            object.isLastPage = false;
        }
        if (message.prompt != null && message.hasOwnProperty("prompt")) object.prompt = $root.Prompt.toObject(message.prompt, options);
        if (message.rcode != null && message.hasOwnProperty("rcode")) object.rcode = message.rcode;
        if (message.liveCards && message.liveCards.length) {
            object.liveCards = [];
            for (var j = 0; j < message.liveCards.length; ++j) {
                object.liveCards[j] = $root.liveMediaCard.toObject(message.liveCards[j], options);
            }
        }
        if (message.adSlots && message.adSlots.length) {
            object.adSlots = [];
            for (var _j = 0; _j < message.adSlots.length; ++_j) {
                object.adSlots[_j] = $root.adSlot.toObject(message.adSlots[_j], options);
            }
        }
        if (message.timeStamp != null && message.hasOwnProperty("timeStamp")) object.timeStamp = message.timeStamp;
        if (message.performanceId != null && message.hasOwnProperty("performanceId")) object.performanceId = message.performanceId;
        if (message.isLastPage != null && message.hasOwnProperty("isLastPage")) object.isLastPage = message.isLastPage;
        return object;
    };

    /**
     * Converts this ResponseRecommendLiveMediaCards to JSON.
     * @function toJSON
     * @memberof ResponseRecommendLiveMediaCards
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ResponseRecommendLiveMediaCards.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ResponseRecommendLiveMediaCards;
}();

var head = exports.head = $root.head = function () {

    /**
     * Properties of a head.
     * @exports Ihead
     * @interface Ihead
     * @property {number|null} [clientVersion] head clientVersion
     * @property {string|null} [deviceID] head deviceID
     * @property {string|null} [deviceType] head deviceType
     * @property {string|null} [sessionKey] head sessionKey
     * @property {Long|null} [uid] head uid
     * @property {string|null} [channelID] head channelID
     * @property {string|null} [token] head token
     * @property {number|null} [appID] head appID
     * @property {number|null} [stage] head stage
     * @property {Long|null} [uniqueId] head uniqueId
     */

    /**
     * Constructs a new head.
     * @exports head
     * @classdesc Represents a head.
     * @implements Ihead
     * @constructor
     * @param {Ihead=} [properties] Properties to set
     */
    function head(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * head clientVersion.
     * @member {number} clientVersion
     * @memberof head
     * @instance
     */
    head.prototype.clientVersion = 0;

    /**
     * head deviceID.
     * @member {string} deviceID
     * @memberof head
     * @instance
     */
    head.prototype.deviceID = "";

    /**
     * head deviceType.
     * @member {string} deviceType
     * @memberof head
     * @instance
     */
    head.prototype.deviceType = "";

    /**
     * head sessionKey.
     * @member {string} sessionKey
     * @memberof head
     * @instance
     */
    head.prototype.sessionKey = "";

    /**
     * head uid.
     * @member {Long} uid
     * @memberof head
     * @instance
     */
    head.prototype.uid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * head channelID.
     * @member {string} channelID
     * @memberof head
     * @instance
     */
    head.prototype.channelID = "";

    /**
     * head token.
     * @member {string} token
     * @memberof head
     * @instance
     */
    head.prototype.token = "";

    /**
     * head appID.
     * @member {number} appID
     * @memberof head
     * @instance
     */
    head.prototype.appID = 0;

    /**
     * head stage.
     * @member {number} stage
     * @memberof head
     * @instance
     */
    head.prototype.stage = 0;

    /**
     * head uniqueId.
     * @member {Long} uniqueId
     * @memberof head
     * @instance
     */
    head.prototype.uniqueId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * Creates a new head instance using the specified properties.
     * @function create
     * @memberof head
     * @static
     * @param {Ihead=} [properties] Properties to set
     * @returns {head} head instance
     */
    head.create = function create(properties) {
        return new head(properties);
    };

    /**
     * Encodes the specified head message. Does not implicitly {@link head.verify|verify} messages.
     * @function encode
     * @memberof head
     * @static
     * @param {Ihead} message head message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    head.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.clientVersion != null && message.hasOwnProperty("clientVersion")) writer.uint32( /* id 1, wireType 0 =*/8).int32(message.clientVersion);
        if (message.deviceID != null && message.hasOwnProperty("deviceID")) writer.uint32( /* id 2, wireType 2 =*/18).string(message.deviceID);
        if (message.deviceType != null && message.hasOwnProperty("deviceType")) writer.uint32( /* id 3, wireType 2 =*/26).string(message.deviceType);
        if (message.sessionKey != null && message.hasOwnProperty("sessionKey")) writer.uint32( /* id 4, wireType 2 =*/34).string(message.sessionKey);
        if (message.uid != null && message.hasOwnProperty("uid")) writer.uint32( /* id 5, wireType 0 =*/40).int64(message.uid);
        if (message.channelID != null && message.hasOwnProperty("channelID")) writer.uint32( /* id 6, wireType 2 =*/50).string(message.channelID);
        if (message.token != null && message.hasOwnProperty("token")) writer.uint32( /* id 7, wireType 2 =*/58).string(message.token);
        if (message.appID != null && message.hasOwnProperty("appID")) writer.uint32( /* id 8, wireType 0 =*/64).int32(message.appID);
        if (message.stage != null && message.hasOwnProperty("stage")) writer.uint32( /* id 9, wireType 0 =*/72).int32(message.stage);
        if (message.uniqueId != null && message.hasOwnProperty("uniqueId")) writer.uint32( /* id 10, wireType 0 =*/80).int64(message.uniqueId);
        return writer;
    };

    /**
     * Encodes the specified head message, length delimited. Does not implicitly {@link head.verify|verify} messages.
     * @function encodeDelimited
     * @memberof head
     * @static
     * @param {Ihead} message head message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    head.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a head message from the specified reader or buffer.
     * @function decode
     * @memberof head
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {head} head
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    head.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.head();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientVersion = reader.int32();
                    break;
                case 2:
                    message.deviceID = reader.string();
                    break;
                case 3:
                    message.deviceType = reader.string();
                    break;
                case 4:
                    message.sessionKey = reader.string();
                    break;
                case 5:
                    message.uid = reader.int64();
                    break;
                case 6:
                    message.channelID = reader.string();
                    break;
                case 7:
                    message.token = reader.string();
                    break;
                case 8:
                    message.appID = reader.int32();
                    break;
                case 9:
                    message.stage = reader.int32();
                    break;
                case 10:
                    message.uniqueId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a head message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof head
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {head} head
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    head.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a head message.
     * @function verify
     * @memberof head
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    head.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.clientVersion != null && message.hasOwnProperty("clientVersion")) if (!$util.isInteger(message.clientVersion)) return "clientVersion: integer expected";
        if (message.deviceID != null && message.hasOwnProperty("deviceID")) if (!$util.isString(message.deviceID)) return "deviceID: string expected";
        if (message.deviceType != null && message.hasOwnProperty("deviceType")) if (!$util.isString(message.deviceType)) return "deviceType: string expected";
        if (message.sessionKey != null && message.hasOwnProperty("sessionKey")) if (!$util.isString(message.sessionKey)) return "sessionKey: string expected";
        if (message.uid != null && message.hasOwnProperty("uid")) if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high))) return "uid: integer|Long expected";
        if (message.channelID != null && message.hasOwnProperty("channelID")) if (!$util.isString(message.channelID)) return "channelID: string expected";
        if (message.token != null && message.hasOwnProperty("token")) if (!$util.isString(message.token)) return "token: string expected";
        if (message.appID != null && message.hasOwnProperty("appID")) if (!$util.isInteger(message.appID)) return "appID: integer expected";
        if (message.stage != null && message.hasOwnProperty("stage")) if (!$util.isInteger(message.stage)) return "stage: integer expected";
        if (message.uniqueId != null && message.hasOwnProperty("uniqueId")) if (!$util.isInteger(message.uniqueId) && !(message.uniqueId && $util.isInteger(message.uniqueId.low) && $util.isInteger(message.uniqueId.high))) return "uniqueId: integer|Long expected";
        return null;
    };

    /**
     * Creates a head message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof head
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {head} head
     */
    head.fromObject = function fromObject(object) {
        if (object instanceof $root.head) return object;
        var message = new $root.head();
        if (object.clientVersion != null) message.clientVersion = object.clientVersion | 0;
        if (object.deviceID != null) message.deviceID = String(object.deviceID);
        if (object.deviceType != null) message.deviceType = String(object.deviceType);
        if (object.sessionKey != null) message.sessionKey = String(object.sessionKey);
        if (object.uid != null) if ($util.Long) (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;else if (typeof object.uid === "string") message.uid = parseInt(object.uid, 10);else if (typeof object.uid === "number") message.uid = object.uid;else if (_typeof(object.uid) === "object") message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
        if (object.channelID != null) message.channelID = String(object.channelID);
        if (object.token != null) message.token = String(object.token);
        if (object.appID != null) message.appID = object.appID | 0;
        if (object.stage != null) message.stage = object.stage | 0;
        if (object.uniqueId != null) if ($util.Long) (message.uniqueId = $util.Long.fromValue(object.uniqueId)).unsigned = false;else if (typeof object.uniqueId === "string") message.uniqueId = parseInt(object.uniqueId, 10);else if (typeof object.uniqueId === "number") message.uniqueId = object.uniqueId;else if (_typeof(object.uniqueId) === "object") message.uniqueId = new $util.LongBits(object.uniqueId.low >>> 0, object.uniqueId.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a head message. Also converts values to other types if specified.
     * @function toObject
     * @memberof head
     * @static
     * @param {head} message head
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    head.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.clientVersion = 0;
            object.deviceID = "";
            object.deviceType = "";
            object.sessionKey = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else object.uid = options.longs === String ? "0" : 0;
            object.channelID = "";
            object.token = "";
            object.appID = 0;
            object.stage = 0;
            if ($util.Long) {
                var _long = new $util.Long(0, 0, false);
                object.uniqueId = options.longs === String ? _long.toString() : options.longs === Number ? _long.toNumber() : _long;
            } else object.uniqueId = options.longs === String ? "0" : 0;
        }
        if (message.clientVersion != null && message.hasOwnProperty("clientVersion")) object.clientVersion = message.clientVersion;
        if (message.deviceID != null && message.hasOwnProperty("deviceID")) object.deviceID = message.deviceID;
        if (message.deviceType != null && message.hasOwnProperty("deviceType")) object.deviceType = message.deviceType;
        if (message.sessionKey != null && message.hasOwnProperty("sessionKey")) object.sessionKey = message.sessionKey;
        if (message.uid != null && message.hasOwnProperty("uid")) if (typeof message.uid === "number") object.uid = options.longs === String ? String(message.uid) : message.uid;else object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
        if (message.channelID != null && message.hasOwnProperty("channelID")) object.channelID = message.channelID;
        if (message.token != null && message.hasOwnProperty("token")) object.token = message.token;
        if (message.appID != null && message.hasOwnProperty("appID")) object.appID = message.appID;
        if (message.stage != null && message.hasOwnProperty("stage")) object.stage = message.stage;
        if (message.uniqueId != null && message.hasOwnProperty("uniqueId")) if (typeof message.uniqueId === "number") object.uniqueId = options.longs === String ? String(message.uniqueId) : message.uniqueId;else object.uniqueId = options.longs === String ? $util.Long.prototype.toString.call(message.uniqueId) : options.longs === Number ? new $util.LongBits(message.uniqueId.low >>> 0, message.uniqueId.high >>> 0).toNumber() : message.uniqueId;
        return object;
    };

    /**
     * Converts this head to JSON.
     * @function toJSON
     * @memberof head
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    head.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return head;
}();

var adSlot = exports.adSlot = $root.adSlot = function () {

    /**
     * Properties of an adSlot.
     * @exports IadSlot
     * @interface IadSlot
     * @property {ImediaAd|null} [ad] adSlot ad
     * @property {number|null} [row] adSlot row
     * @property {number|null} [type] adSlot type
     */

    /**
     * Constructs a new adSlot.
     * @exports adSlot
     * @classdesc Represents an adSlot.
     * @implements IadSlot
     * @constructor
     * @param {IadSlot=} [properties] Properties to set
     */
    function adSlot(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * adSlot ad.
     * @member {ImediaAd|null|undefined} ad
     * @memberof adSlot
     * @instance
     */
    adSlot.prototype.ad = null;

    /**
     * adSlot row.
     * @member {number} row
     * @memberof adSlot
     * @instance
     */
    adSlot.prototype.row = 0;

    /**
     * adSlot type.
     * @member {number} type
     * @memberof adSlot
     * @instance
     */
    adSlot.prototype.type = 0;

    /**
     * Creates a new adSlot instance using the specified properties.
     * @function create
     * @memberof adSlot
     * @static
     * @param {IadSlot=} [properties] Properties to set
     * @returns {adSlot} adSlot instance
     */
    adSlot.create = function create(properties) {
        return new adSlot(properties);
    };

    /**
     * Encodes the specified adSlot message. Does not implicitly {@link adSlot.verify|verify} messages.
     * @function encode
     * @memberof adSlot
     * @static
     * @param {IadSlot} message adSlot message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    adSlot.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.ad != null && message.hasOwnProperty("ad")) $root.mediaAd.encode(message.ad, writer.uint32( /* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.row != null && message.hasOwnProperty("row")) writer.uint32( /* id 2, wireType 0 =*/16).int32(message.row);
        if (message.type != null && message.hasOwnProperty("type")) writer.uint32( /* id 3, wireType 0 =*/24).int32(message.type);
        return writer;
    };

    /**
     * Encodes the specified adSlot message, length delimited. Does not implicitly {@link adSlot.verify|verify} messages.
     * @function encodeDelimited
     * @memberof adSlot
     * @static
     * @param {IadSlot} message adSlot message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    adSlot.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an adSlot message from the specified reader or buffer.
     * @function decode
     * @memberof adSlot
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {adSlot} adSlot
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    adSlot.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.adSlot();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.ad = $root.mediaAd.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.row = reader.int32();
                    break;
                case 3:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes an adSlot message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof adSlot
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {adSlot} adSlot
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    adSlot.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an adSlot message.
     * @function verify
     * @memberof adSlot
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    adSlot.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.ad != null && message.hasOwnProperty("ad")) {
            var error = $root.mediaAd.verify(message.ad);
            if (error) return "ad." + error;
        }
        if (message.row != null && message.hasOwnProperty("row")) if (!$util.isInteger(message.row)) return "row: integer expected";
        if (message.type != null && message.hasOwnProperty("type")) if (!$util.isInteger(message.type)) return "type: integer expected";
        return null;
    };

    /**
     * Creates an adSlot message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof adSlot
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {adSlot} adSlot
     */
    adSlot.fromObject = function fromObject(object) {
        if (object instanceof $root.adSlot) return object;
        var message = new $root.adSlot();
        if (object.ad != null) {
            if (_typeof(object.ad) !== "object") throw TypeError(".adSlot.ad: object expected");
            message.ad = $root.mediaAd.fromObject(object.ad);
        }
        if (object.row != null) message.row = object.row | 0;
        if (object.type != null) message.type = object.type | 0;
        return message;
    };

    /**
     * Creates a plain object from an adSlot message. Also converts values to other types if specified.
     * @function toObject
     * @memberof adSlot
     * @static
     * @param {adSlot} message adSlot
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    adSlot.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.ad = null;
            object.row = 0;
            object.type = 0;
        }
        if (message.ad != null && message.hasOwnProperty("ad")) object.ad = $root.mediaAd.toObject(message.ad, options);
        if (message.row != null && message.hasOwnProperty("row")) object.row = message.row;
        if (message.type != null && message.hasOwnProperty("type")) object.type = message.type;
        return object;
    };

    /**
     * Converts this adSlot to JSON.
     * @function toJSON
     * @memberof adSlot
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    adSlot.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return adSlot;
}();

var liveShareInfo = exports.liveShareInfo = $root.liveShareInfo = function () {

    /**
     * Properties of a liveShareInfo.
     * @exports IliveShareInfo
     * @interface IliveShareInfo
     * @property {string|null} [showTitle] liveShareInfo showTitle
     * @property {string|null} [showSubtitle] liveShareInfo showSubtitle
     * @property {string|null} [title] liveShareInfo title
     * @property {string|null} [description] liveShareInfo description
     * @property {string|null} [url] liveShareInfo url
     * @property {string|null} [imageUrl] liveShareInfo imageUrl
     */

    /**
     * Constructs a new liveShareInfo.
     * @exports liveShareInfo
     * @classdesc Represents a liveShareInfo.
     * @implements IliveShareInfo
     * @constructor
     * @param {IliveShareInfo=} [properties] Properties to set
     */
    function liveShareInfo(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * liveShareInfo showTitle.
     * @member {string} showTitle
     * @memberof liveShareInfo
     * @instance
     */
    liveShareInfo.prototype.showTitle = "";

    /**
     * liveShareInfo showSubtitle.
     * @member {string} showSubtitle
     * @memberof liveShareInfo
     * @instance
     */
    liveShareInfo.prototype.showSubtitle = "";

    /**
     * liveShareInfo title.
     * @member {string} title
     * @memberof liveShareInfo
     * @instance
     */
    liveShareInfo.prototype.title = "";

    /**
     * liveShareInfo description.
     * @member {string} description
     * @memberof liveShareInfo
     * @instance
     */
    liveShareInfo.prototype.description = "";

    /**
     * liveShareInfo url.
     * @member {string} url
     * @memberof liveShareInfo
     * @instance
     */
    liveShareInfo.prototype.url = "";

    /**
     * liveShareInfo imageUrl.
     * @member {string} imageUrl
     * @memberof liveShareInfo
     * @instance
     */
    liveShareInfo.prototype.imageUrl = "";

    /**
     * Creates a new liveShareInfo instance using the specified properties.
     * @function create
     * @memberof liveShareInfo
     * @static
     * @param {IliveShareInfo=} [properties] Properties to set
     * @returns {liveShareInfo} liveShareInfo instance
     */
    liveShareInfo.create = function create(properties) {
        return new liveShareInfo(properties);
    };

    /**
     * Encodes the specified liveShareInfo message. Does not implicitly {@link liveShareInfo.verify|verify} messages.
     * @function encode
     * @memberof liveShareInfo
     * @static
     * @param {IliveShareInfo} message liveShareInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    liveShareInfo.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.showTitle != null && message.hasOwnProperty("showTitle")) writer.uint32( /* id 1, wireType 2 =*/10).string(message.showTitle);
        if (message.showSubtitle != null && message.hasOwnProperty("showSubtitle")) writer.uint32( /* id 2, wireType 2 =*/18).string(message.showSubtitle);
        if (message.title != null && message.hasOwnProperty("title")) writer.uint32( /* id 3, wireType 2 =*/26).string(message.title);
        if (message.description != null && message.hasOwnProperty("description")) writer.uint32( /* id 4, wireType 2 =*/34).string(message.description);
        if (message.url != null && message.hasOwnProperty("url")) writer.uint32( /* id 5, wireType 2 =*/42).string(message.url);
        if (message.imageUrl != null && message.hasOwnProperty("imageUrl")) writer.uint32( /* id 6, wireType 2 =*/50).string(message.imageUrl);
        return writer;
    };

    /**
     * Encodes the specified liveShareInfo message, length delimited. Does not implicitly {@link liveShareInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof liveShareInfo
     * @static
     * @param {IliveShareInfo} message liveShareInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    liveShareInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a liveShareInfo message from the specified reader or buffer.
     * @function decode
     * @memberof liveShareInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {liveShareInfo} liveShareInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    liveShareInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.liveShareInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.showTitle = reader.string();
                    break;
                case 2:
                    message.showSubtitle = reader.string();
                    break;
                case 3:
                    message.title = reader.string();
                    break;
                case 4:
                    message.description = reader.string();
                    break;
                case 5:
                    message.url = reader.string();
                    break;
                case 6:
                    message.imageUrl = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a liveShareInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof liveShareInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {liveShareInfo} liveShareInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    liveShareInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a liveShareInfo message.
     * @function verify
     * @memberof liveShareInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    liveShareInfo.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.showTitle != null && message.hasOwnProperty("showTitle")) if (!$util.isString(message.showTitle)) return "showTitle: string expected";
        if (message.showSubtitle != null && message.hasOwnProperty("showSubtitle")) if (!$util.isString(message.showSubtitle)) return "showSubtitle: string expected";
        if (message.title != null && message.hasOwnProperty("title")) if (!$util.isString(message.title)) return "title: string expected";
        if (message.description != null && message.hasOwnProperty("description")) if (!$util.isString(message.description)) return "description: string expected";
        if (message.url != null && message.hasOwnProperty("url")) if (!$util.isString(message.url)) return "url: string expected";
        if (message.imageUrl != null && message.hasOwnProperty("imageUrl")) if (!$util.isString(message.imageUrl)) return "imageUrl: string expected";
        return null;
    };

    /**
     * Creates a liveShareInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof liveShareInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {liveShareInfo} liveShareInfo
     */
    liveShareInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.liveShareInfo) return object;
        var message = new $root.liveShareInfo();
        if (object.showTitle != null) message.showTitle = String(object.showTitle);
        if (object.showSubtitle != null) message.showSubtitle = String(object.showSubtitle);
        if (object.title != null) message.title = String(object.title);
        if (object.description != null) message.description = String(object.description);
        if (object.url != null) message.url = String(object.url);
        if (object.imageUrl != null) message.imageUrl = String(object.imageUrl);
        return message;
    };

    /**
     * Creates a plain object from a liveShareInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof liveShareInfo
     * @static
     * @param {liveShareInfo} message liveShareInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    liveShareInfo.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.showTitle = "";
            object.showSubtitle = "";
            object.title = "";
            object.description = "";
            object.url = "";
            object.imageUrl = "";
        }
        if (message.showTitle != null && message.hasOwnProperty("showTitle")) object.showTitle = message.showTitle;
        if (message.showSubtitle != null && message.hasOwnProperty("showSubtitle")) object.showSubtitle = message.showSubtitle;
        if (message.title != null && message.hasOwnProperty("title")) object.title = message.title;
        if (message.description != null && message.hasOwnProperty("description")) object.description = message.description;
        if (message.url != null && message.hasOwnProperty("url")) object.url = message.url;
        if (message.imageUrl != null && message.hasOwnProperty("imageUrl")) object.imageUrl = message.imageUrl;
        return object;
    };

    /**
     * Converts this liveShareInfo to JSON.
     * @function toJSON
     * @memberof liveShareInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    liveShareInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return liveShareInfo;
}();

var Prompt = exports.Prompt = $root.Prompt = function () {

    /**
     * Properties of a Prompt.
     * @exports IPrompt
     * @interface IPrompt
     * @property {number|null} [type] Prompt type
     * @property {string|null} [msg] Prompt msg
     * @property {string|null} [action] Prompt action
     */

    /**
     * Constructs a new Prompt.
     * @exports Prompt
     * @classdesc Represents a Prompt.
     * @implements IPrompt
     * @constructor
     * @param {IPrompt=} [properties] Properties to set
     */
    function Prompt(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * Prompt type.
     * @member {number} type
     * @memberof Prompt
     * @instance
     */
    Prompt.prototype.type = 0;

    /**
     * Prompt msg.
     * @member {string} msg
     * @memberof Prompt
     * @instance
     */
    Prompt.prototype.msg = "";

    /**
     * Prompt action.
     * @member {string} action
     * @memberof Prompt
     * @instance
     */
    Prompt.prototype.action = "";

    /**
     * Creates a new Prompt instance using the specified properties.
     * @function create
     * @memberof Prompt
     * @static
     * @param {IPrompt=} [properties] Properties to set
     * @returns {Prompt} Prompt instance
     */
    Prompt.create = function create(properties) {
        return new Prompt(properties);
    };

    /**
     * Encodes the specified Prompt message. Does not implicitly {@link Prompt.verify|verify} messages.
     * @function encode
     * @memberof Prompt
     * @static
     * @param {IPrompt} message Prompt message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Prompt.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type")) writer.uint32( /* id 1, wireType 0 =*/8).int32(message.type);
        if (message.msg != null && message.hasOwnProperty("msg")) writer.uint32( /* id 2, wireType 2 =*/18).string(message.msg);
        if (message.action != null && message.hasOwnProperty("action")) writer.uint32( /* id 3, wireType 2 =*/26).string(message.action);
        return writer;
    };

    /**
     * Encodes the specified Prompt message, length delimited. Does not implicitly {@link Prompt.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Prompt
     * @static
     * @param {IPrompt} message Prompt message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Prompt.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Prompt message from the specified reader or buffer.
     * @function decode
     * @memberof Prompt
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Prompt} Prompt
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Prompt.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.Prompt();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                case 3:
                    message.action = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a Prompt message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Prompt
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Prompt} Prompt
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Prompt.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Prompt message.
     * @function verify
     * @memberof Prompt
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Prompt.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.type != null && message.hasOwnProperty("type")) if (!$util.isInteger(message.type)) return "type: integer expected";
        if (message.msg != null && message.hasOwnProperty("msg")) if (!$util.isString(message.msg)) return "msg: string expected";
        if (message.action != null && message.hasOwnProperty("action")) if (!$util.isString(message.action)) return "action: string expected";
        return null;
    };

    /**
     * Creates a Prompt message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Prompt
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Prompt} Prompt
     */
    Prompt.fromObject = function fromObject(object) {
        if (object instanceof $root.Prompt) return object;
        var message = new $root.Prompt();
        if (object.type != null) message.type = object.type | 0;
        if (object.msg != null) message.msg = String(object.msg);
        if (object.action != null) message.action = String(object.action);
        return message;
    };

    /**
     * Creates a plain object from a Prompt message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Prompt
     * @static
     * @param {Prompt} message Prompt
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Prompt.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.type = 0;
            object.msg = "";
            object.action = "";
        }
        if (message.type != null && message.hasOwnProperty("type")) object.type = message.type;
        if (message.msg != null && message.hasOwnProperty("msg")) object.msg = message.msg;
        if (message.action != null && message.hasOwnProperty("action")) object.action = message.action;
        return object;
    };

    /**
     * Converts this Prompt to JSON.
     * @function toJSON
     * @memberof Prompt
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Prompt.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Prompt;
}();

var liveMediaCard = exports.liveMediaCard = $root.liveMediaCard = function () {

    /**
     * Properties of a liveMediaCard.
     * @exports IliveMediaCard
     * @interface IliveMediaCard
     * @property {number|null} [type] liveMediaCard type
     * @property {IliveCard|null} [live] liveMediaCard live
     * @property {ImediaAd|null} [ad] liveMediaCard ad
     * @property {string|null} [badgeText] liveMediaCard badgeText
     * @property {Uint8Array|null} [reportData] liveMediaCard reportData
     * @property {IbadgeImage|null} [badgeImage] liveMediaCard badgeImage
     * @property {Long|null} [jockeyColor] liveMediaCard jockeyColor
     * @property {string|null} [anotherBadgeText] liveMediaCard anotherBadgeText
     */

    /**
     * Constructs a new liveMediaCard.
     * @exports liveMediaCard
     * @classdesc Represents a liveMediaCard.
     * @implements IliveMediaCard
     * @constructor
     * @param {IliveMediaCard=} [properties] Properties to set
     */
    function liveMediaCard(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * liveMediaCard type.
     * @member {number} type
     * @memberof liveMediaCard
     * @instance
     */
    liveMediaCard.prototype.type = 0;

    /**
     * liveMediaCard live.
     * @member {IliveCard|null|undefined} live
     * @memberof liveMediaCard
     * @instance
     */
    liveMediaCard.prototype.live = null;

    /**
     * liveMediaCard ad.
     * @member {ImediaAd|null|undefined} ad
     * @memberof liveMediaCard
     * @instance
     */
    liveMediaCard.prototype.ad = null;

    /**
     * liveMediaCard badgeText.
     * @member {string} badgeText
     * @memberof liveMediaCard
     * @instance
     */
    liveMediaCard.prototype.badgeText = "";

    /**
     * liveMediaCard reportData.
     * @member {Uint8Array} reportData
     * @memberof liveMediaCard
     * @instance
     */
    liveMediaCard.prototype.reportData = $util.newBuffer([]);

    /**
     * liveMediaCard badgeImage.
     * @member {IbadgeImage|null|undefined} badgeImage
     * @memberof liveMediaCard
     * @instance
     */
    liveMediaCard.prototype.badgeImage = null;

    /**
     * liveMediaCard jockeyColor.
     * @member {Long} jockeyColor
     * @memberof liveMediaCard
     * @instance
     */
    liveMediaCard.prototype.jockeyColor = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * liveMediaCard anotherBadgeText.
     * @member {string} anotherBadgeText
     * @memberof liveMediaCard
     * @instance
     */
    liveMediaCard.prototype.anotherBadgeText = "";

    /**
     * Creates a new liveMediaCard instance using the specified properties.
     * @function create
     * @memberof liveMediaCard
     * @static
     * @param {IliveMediaCard=} [properties] Properties to set
     * @returns {liveMediaCard} liveMediaCard instance
     */
    liveMediaCard.create = function create(properties) {
        return new liveMediaCard(properties);
    };

    /**
     * Encodes the specified liveMediaCard message. Does not implicitly {@link liveMediaCard.verify|verify} messages.
     * @function encode
     * @memberof liveMediaCard
     * @static
     * @param {IliveMediaCard} message liveMediaCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    liveMediaCard.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type")) writer.uint32( /* id 1, wireType 0 =*/8).int32(message.type);
        if (message.live != null && message.hasOwnProperty("live")) $root.liveCard.encode(message.live, writer.uint32( /* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.ad != null && message.hasOwnProperty("ad")) $root.mediaAd.encode(message.ad, writer.uint32( /* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.badgeText != null && message.hasOwnProperty("badgeText")) writer.uint32( /* id 4, wireType 2 =*/34).string(message.badgeText);
        if (message.reportData != null && message.hasOwnProperty("reportData")) writer.uint32( /* id 5, wireType 2 =*/42).bytes(message.reportData);
        if (message.badgeImage != null && message.hasOwnProperty("badgeImage")) $root.badgeImage.encode(message.badgeImage, writer.uint32( /* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.jockeyColor != null && message.hasOwnProperty("jockeyColor")) writer.uint32( /* id 7, wireType 0 =*/56).int64(message.jockeyColor);
        if (message.anotherBadgeText != null && message.hasOwnProperty("anotherBadgeText")) writer.uint32( /* id 8, wireType 2 =*/66).string(message.anotherBadgeText);
        return writer;
    };

    /**
     * Encodes the specified liveMediaCard message, length delimited. Does not implicitly {@link liveMediaCard.verify|verify} messages.
     * @function encodeDelimited
     * @memberof liveMediaCard
     * @static
     * @param {IliveMediaCard} message liveMediaCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    liveMediaCard.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a liveMediaCard message from the specified reader or buffer.
     * @function decode
     * @memberof liveMediaCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {liveMediaCard} liveMediaCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    liveMediaCard.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.liveMediaCard();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.live = $root.liveCard.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.ad = $root.mediaAd.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.badgeText = reader.string();
                    break;
                case 5:
                    message.reportData = reader.bytes();
                    break;
                case 6:
                    message.badgeImage = $root.badgeImage.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.jockeyColor = reader.int64();
                    break;
                case 8:
                    message.anotherBadgeText = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a liveMediaCard message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof liveMediaCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {liveMediaCard} liveMediaCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    liveMediaCard.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a liveMediaCard message.
     * @function verify
     * @memberof liveMediaCard
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    liveMediaCard.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.type != null && message.hasOwnProperty("type")) if (!$util.isInteger(message.type)) return "type: integer expected";
        if (message.live != null && message.hasOwnProperty("live")) {
            var error = $root.liveCard.verify(message.live);
            if (error) return "live." + error;
        }
        if (message.ad != null && message.hasOwnProperty("ad")) {
            var _error3 = $root.mediaAd.verify(message.ad);
            if (_error3) return "ad." + _error3;
        }
        if (message.badgeText != null && message.hasOwnProperty("badgeText")) if (!$util.isString(message.badgeText)) return "badgeText: string expected";
        if (message.reportData != null && message.hasOwnProperty("reportData")) if (!(message.reportData && typeof message.reportData.length === "number" || $util.isString(message.reportData))) return "reportData: buffer expected";
        if (message.badgeImage != null && message.hasOwnProperty("badgeImage")) {
            var _error4 = $root.badgeImage.verify(message.badgeImage);
            if (_error4) return "badgeImage." + _error4;
        }
        if (message.jockeyColor != null && message.hasOwnProperty("jockeyColor")) if (!$util.isInteger(message.jockeyColor) && !(message.jockeyColor && $util.isInteger(message.jockeyColor.low) && $util.isInteger(message.jockeyColor.high))) return "jockeyColor: integer|Long expected";
        if (message.anotherBadgeText != null && message.hasOwnProperty("anotherBadgeText")) if (!$util.isString(message.anotherBadgeText)) return "anotherBadgeText: string expected";
        return null;
    };

    /**
     * Creates a liveMediaCard message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof liveMediaCard
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {liveMediaCard} liveMediaCard
     */
    liveMediaCard.fromObject = function fromObject(object) {
        if (object instanceof $root.liveMediaCard) return object;
        var message = new $root.liveMediaCard();
        if (object.type != null) message.type = object.type | 0;
        if (object.live != null) {
            if (_typeof(object.live) !== "object") throw TypeError(".liveMediaCard.live: object expected");
            message.live = $root.liveCard.fromObject(object.live);
        }
        if (object.ad != null) {
            if (_typeof(object.ad) !== "object") throw TypeError(".liveMediaCard.ad: object expected");
            message.ad = $root.mediaAd.fromObject(object.ad);
        }
        if (object.badgeText != null) message.badgeText = String(object.badgeText);
        if (object.reportData != null) if (typeof object.reportData === "string") $util.base64.decode(object.reportData, message.reportData = $util.newBuffer($util.base64.length(object.reportData)), 0);else if (object.reportData.length) message.reportData = object.reportData;
        if (object.badgeImage != null) {
            if (_typeof(object.badgeImage) !== "object") throw TypeError(".liveMediaCard.badgeImage: object expected");
            message.badgeImage = $root.badgeImage.fromObject(object.badgeImage);
        }
        if (object.jockeyColor != null) if ($util.Long) (message.jockeyColor = $util.Long.fromValue(object.jockeyColor)).unsigned = false;else if (typeof object.jockeyColor === "string") message.jockeyColor = parseInt(object.jockeyColor, 10);else if (typeof object.jockeyColor === "number") message.jockeyColor = object.jockeyColor;else if (_typeof(object.jockeyColor) === "object") message.jockeyColor = new $util.LongBits(object.jockeyColor.low >>> 0, object.jockeyColor.high >>> 0).toNumber();
        if (object.anotherBadgeText != null) message.anotherBadgeText = String(object.anotherBadgeText);
        return message;
    };

    /**
     * Creates a plain object from a liveMediaCard message. Also converts values to other types if specified.
     * @function toObject
     * @memberof liveMediaCard
     * @static
     * @param {liveMediaCard} message liveMediaCard
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    liveMediaCard.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.type = 0;
            object.live = null;
            object.ad = null;
            object.badgeText = "";
            object.reportData = options.bytes === String ? "" : [];
            object.badgeImage = null;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.jockeyColor = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else object.jockeyColor = options.longs === String ? "0" : 0;
            object.anotherBadgeText = "";
        }
        if (message.type != null && message.hasOwnProperty("type")) object.type = message.type;
        if (message.live != null && message.hasOwnProperty("live")) object.live = $root.liveCard.toObject(message.live, options);
        if (message.ad != null && message.hasOwnProperty("ad")) object.ad = $root.mediaAd.toObject(message.ad, options);
        if (message.badgeText != null && message.hasOwnProperty("badgeText")) object.badgeText = message.badgeText;
        if (message.reportData != null && message.hasOwnProperty("reportData")) object.reportData = options.bytes === String ? $util.base64.encode(message.reportData, 0, message.reportData.length) : options.bytes === Array ? Array.prototype.slice.call(message.reportData) : message.reportData;
        if (message.badgeImage != null && message.hasOwnProperty("badgeImage")) object.badgeImage = $root.badgeImage.toObject(message.badgeImage, options);
        if (message.jockeyColor != null && message.hasOwnProperty("jockeyColor")) if (typeof message.jockeyColor === "number") object.jockeyColor = options.longs === String ? String(message.jockeyColor) : message.jockeyColor;else object.jockeyColor = options.longs === String ? $util.Long.prototype.toString.call(message.jockeyColor) : options.longs === Number ? new $util.LongBits(message.jockeyColor.low >>> 0, message.jockeyColor.high >>> 0).toNumber() : message.jockeyColor;
        if (message.anotherBadgeText != null && message.hasOwnProperty("anotherBadgeText")) object.anotherBadgeText = message.anotherBadgeText;
        return object;
    };

    /**
     * Converts this liveMediaCard to JSON.
     * @function toJSON
     * @memberof liveMediaCard
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    liveMediaCard.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return liveMediaCard;
}();

var mediaAd = exports.mediaAd = $root.mediaAd = function () {

    /**
     * Properties of a mediaAd.
     * @exports ImediaAd
     * @interface ImediaAd
     * @property {Long|null} [id] mediaAd id
     * @property {string|null} [title] mediaAd title
     * @property {string|null} [image] mediaAd image
     * @property {string|null} [info] mediaAd info
     * @property {string|null} [requestData] mediaAd requestData
     * @property {string|null} [action] mediaAd action
     */

    /**
     * Constructs a new mediaAd.
     * @exports mediaAd
     * @classdesc Represents a mediaAd.
     * @implements ImediaAd
     * @constructor
     * @param {ImediaAd=} [properties] Properties to set
     */
    function mediaAd(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * mediaAd id.
     * @member {Long} id
     * @memberof mediaAd
     * @instance
     */
    mediaAd.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * mediaAd title.
     * @member {string} title
     * @memberof mediaAd
     * @instance
     */
    mediaAd.prototype.title = "";

    /**
     * mediaAd image.
     * @member {string} image
     * @memberof mediaAd
     * @instance
     */
    mediaAd.prototype.image = "";

    /**
     * mediaAd info.
     * @member {string} info
     * @memberof mediaAd
     * @instance
     */
    mediaAd.prototype.info = "";

    /**
     * mediaAd requestData.
     * @member {string} requestData
     * @memberof mediaAd
     * @instance
     */
    mediaAd.prototype.requestData = "";

    /**
     * mediaAd action.
     * @member {string} action
     * @memberof mediaAd
     * @instance
     */
    mediaAd.prototype.action = "";

    /**
     * Creates a new mediaAd instance using the specified properties.
     * @function create
     * @memberof mediaAd
     * @static
     * @param {ImediaAd=} [properties] Properties to set
     * @returns {mediaAd} mediaAd instance
     */
    mediaAd.create = function create(properties) {
        return new mediaAd(properties);
    };

    /**
     * Encodes the specified mediaAd message. Does not implicitly {@link mediaAd.verify|verify} messages.
     * @function encode
     * @memberof mediaAd
     * @static
     * @param {ImediaAd} message mediaAd message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    mediaAd.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id")) writer.uint32( /* id 1, wireType 0 =*/8).int64(message.id);
        if (message.title != null && message.hasOwnProperty("title")) writer.uint32( /* id 2, wireType 2 =*/18).string(message.title);
        if (message.image != null && message.hasOwnProperty("image")) writer.uint32( /* id 3, wireType 2 =*/26).string(message.image);
        if (message.info != null && message.hasOwnProperty("info")) writer.uint32( /* id 4, wireType 2 =*/34).string(message.info);
        if (message.requestData != null && message.hasOwnProperty("requestData")) writer.uint32( /* id 5, wireType 2 =*/42).string(message.requestData);
        if (message.action != null && message.hasOwnProperty("action")) writer.uint32( /* id 6, wireType 2 =*/50).string(message.action);
        return writer;
    };

    /**
     * Encodes the specified mediaAd message, length delimited. Does not implicitly {@link mediaAd.verify|verify} messages.
     * @function encodeDelimited
     * @memberof mediaAd
     * @static
     * @param {ImediaAd} message mediaAd message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    mediaAd.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a mediaAd message from the specified reader or buffer.
     * @function decode
     * @memberof mediaAd
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {mediaAd} mediaAd
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    mediaAd.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.mediaAd();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.int64();
                    break;
                case 2:
                    message.title = reader.string();
                    break;
                case 3:
                    message.image = reader.string();
                    break;
                case 4:
                    message.info = reader.string();
                    break;
                case 5:
                    message.requestData = reader.string();
                    break;
                case 6:
                    message.action = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a mediaAd message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof mediaAd
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {mediaAd} mediaAd
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    mediaAd.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a mediaAd message.
     * @function verify
     * @memberof mediaAd
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    mediaAd.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.id != null && message.hasOwnProperty("id")) if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high))) return "id: integer|Long expected";
        if (message.title != null && message.hasOwnProperty("title")) if (!$util.isString(message.title)) return "title: string expected";
        if (message.image != null && message.hasOwnProperty("image")) if (!$util.isString(message.image)) return "image: string expected";
        if (message.info != null && message.hasOwnProperty("info")) if (!$util.isString(message.info)) return "info: string expected";
        if (message.requestData != null && message.hasOwnProperty("requestData")) if (!$util.isString(message.requestData)) return "requestData: string expected";
        if (message.action != null && message.hasOwnProperty("action")) if (!$util.isString(message.action)) return "action: string expected";
        return null;
    };

    /**
     * Creates a mediaAd message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof mediaAd
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {mediaAd} mediaAd
     */
    mediaAd.fromObject = function fromObject(object) {
        if (object instanceof $root.mediaAd) return object;
        var message = new $root.mediaAd();
        if (object.id != null) if ($util.Long) (message.id = $util.Long.fromValue(object.id)).unsigned = false;else if (typeof object.id === "string") message.id = parseInt(object.id, 10);else if (typeof object.id === "number") message.id = object.id;else if (_typeof(object.id) === "object") message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
        if (object.title != null) message.title = String(object.title);
        if (object.image != null) message.image = String(object.image);
        if (object.info != null) message.info = String(object.info);
        if (object.requestData != null) message.requestData = String(object.requestData);
        if (object.action != null) message.action = String(object.action);
        return message;
    };

    /**
     * Creates a plain object from a mediaAd message. Also converts values to other types if specified.
     * @function toObject
     * @memberof mediaAd
     * @static
     * @param {mediaAd} message mediaAd
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    mediaAd.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else object.id = options.longs === String ? "0" : 0;
            object.title = "";
            object.image = "";
            object.info = "";
            object.requestData = "";
            object.action = "";
        }
        if (message.id != null && message.hasOwnProperty("id")) if (typeof message.id === "number") object.id = options.longs === String ? String(message.id) : message.id;else object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
        if (message.title != null && message.hasOwnProperty("title")) object.title = message.title;
        if (message.image != null && message.hasOwnProperty("image")) object.image = message.image;
        if (message.info != null && message.hasOwnProperty("info")) object.info = message.info;
        if (message.requestData != null && message.hasOwnProperty("requestData")) object.requestData = message.requestData;
        if (message.action != null && message.hasOwnProperty("action")) object.action = message.action;
        return object;
    };

    /**
     * Converts this mediaAd to JSON.
     * @function toJSON
     * @memberof mediaAd
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    mediaAd.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return mediaAd;
}();

var liveCard = exports.liveCard = $root.liveCard = function () {

    /**
     * Properties of a liveCard.
     * @exports IliveCard
     * @interface IliveCard
     * @property {Long|null} [id] liveCard id
     * @property {Long|null} [radioId] liveCard radioId
     * @property {string|null} [name] liveCard name
     * @property {string|null} [image] liveCard image
     * @property {string|null} [jockey] liveCard jockey
     * @property {Long|null} [startTime] liveCard startTime
     * @property {Long|null} [endTime] liveCard endTime
     * @property {number|null} [state] liveCard state
     * @property {string|null} [lowUrl] liveCard lowUrl
     * @property {string|null} [highUrl] liveCard highUrl
     * @property {number|null} [totalListeners] liveCard totalListeners
     */

    /**
     * Constructs a new liveCard.
     * @exports liveCard
     * @classdesc Represents a liveCard.
     * @implements IliveCard
     * @constructor
     * @param {IliveCard=} [properties] Properties to set
     */
    function liveCard(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * liveCard id.
     * @member {Long} id
     * @memberof liveCard
     * @instance
     */
    liveCard.prototype.id = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * liveCard radioId.
     * @member {Long} radioId
     * @memberof liveCard
     * @instance
     */
    liveCard.prototype.radioId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * liveCard name.
     * @member {string} name
     * @memberof liveCard
     * @instance
     */
    liveCard.prototype.name = "";

    /**
     * liveCard image.
     * @member {string} image
     * @memberof liveCard
     * @instance
     */
    liveCard.prototype.image = "";

    /**
     * liveCard jockey.
     * @member {string} jockey
     * @memberof liveCard
     * @instance
     */
    liveCard.prototype.jockey = "";

    /**
     * liveCard startTime.
     * @member {Long} startTime
     * @memberof liveCard
     * @instance
     */
    liveCard.prototype.startTime = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * liveCard endTime.
     * @member {Long} endTime
     * @memberof liveCard
     * @instance
     */
    liveCard.prototype.endTime = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

    /**
     * liveCard state.
     * @member {number} state
     * @memberof liveCard
     * @instance
     */
    liveCard.prototype.state = 0;

    /**
     * liveCard lowUrl.
     * @member {string} lowUrl
     * @memberof liveCard
     * @instance
     */
    liveCard.prototype.lowUrl = "";

    /**
     * liveCard highUrl.
     * @member {string} highUrl
     * @memberof liveCard
     * @instance
     */
    liveCard.prototype.highUrl = "";

    /**
     * liveCard totalListeners.
     * @member {number} totalListeners
     * @memberof liveCard
     * @instance
     */
    liveCard.prototype.totalListeners = 0;

    /**
     * Creates a new liveCard instance using the specified properties.
     * @function create
     * @memberof liveCard
     * @static
     * @param {IliveCard=} [properties] Properties to set
     * @returns {liveCard} liveCard instance
     */
    liveCard.create = function create(properties) {
        return new liveCard(properties);
    };

    /**
     * Encodes the specified liveCard message. Does not implicitly {@link liveCard.verify|verify} messages.
     * @function encode
     * @memberof liveCard
     * @static
     * @param {IliveCard} message liveCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    liveCard.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id")) writer.uint32( /* id 1, wireType 0 =*/8).int64(message.id);
        if (message.radioId != null && message.hasOwnProperty("radioId")) writer.uint32( /* id 2, wireType 0 =*/16).int64(message.radioId);
        if (message.name != null && message.hasOwnProperty("name")) writer.uint32( /* id 3, wireType 2 =*/26).string(message.name);
        if (message.image != null && message.hasOwnProperty("image")) writer.uint32( /* id 4, wireType 2 =*/34).string(message.image);
        if (message.jockey != null && message.hasOwnProperty("jockey")) writer.uint32( /* id 5, wireType 2 =*/42).string(message.jockey);
        if (message.startTime != null && message.hasOwnProperty("startTime")) writer.uint32( /* id 6, wireType 0 =*/48).int64(message.startTime);
        if (message.endTime != null && message.hasOwnProperty("endTime")) writer.uint32( /* id 7, wireType 0 =*/56).int64(message.endTime);
        if (message.state != null && message.hasOwnProperty("state")) writer.uint32( /* id 8, wireType 0 =*/64).int32(message.state);
        if (message.lowUrl != null && message.hasOwnProperty("lowUrl")) writer.uint32( /* id 9, wireType 2 =*/74).string(message.lowUrl);
        if (message.highUrl != null && message.hasOwnProperty("highUrl")) writer.uint32( /* id 10, wireType 2 =*/82).string(message.highUrl);
        if (message.totalListeners != null && message.hasOwnProperty("totalListeners")) writer.uint32( /* id 11, wireType 0 =*/88).int32(message.totalListeners);
        return writer;
    };

    /**
     * Encodes the specified liveCard message, length delimited. Does not implicitly {@link liveCard.verify|verify} messages.
     * @function encodeDelimited
     * @memberof liveCard
     * @static
     * @param {IliveCard} message liveCard message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    liveCard.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a liveCard message from the specified reader or buffer.
     * @function decode
     * @memberof liveCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {liveCard} liveCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    liveCard.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.liveCard();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.int64();
                    break;
                case 2:
                    message.radioId = reader.int64();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.image = reader.string();
                    break;
                case 5:
                    message.jockey = reader.string();
                    break;
                case 6:
                    message.startTime = reader.int64();
                    break;
                case 7:
                    message.endTime = reader.int64();
                    break;
                case 8:
                    message.state = reader.int32();
                    break;
                case 9:
                    message.lowUrl = reader.string();
                    break;
                case 10:
                    message.highUrl = reader.string();
                    break;
                case 11:
                    message.totalListeners = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a liveCard message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof liveCard
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {liveCard} liveCard
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    liveCard.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a liveCard message.
     * @function verify
     * @memberof liveCard
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    liveCard.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.id != null && message.hasOwnProperty("id")) if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high))) return "id: integer|Long expected";
        if (message.radioId != null && message.hasOwnProperty("radioId")) if (!$util.isInteger(message.radioId) && !(message.radioId && $util.isInteger(message.radioId.low) && $util.isInteger(message.radioId.high))) return "radioId: integer|Long expected";
        if (message.name != null && message.hasOwnProperty("name")) if (!$util.isString(message.name)) return "name: string expected";
        if (message.image != null && message.hasOwnProperty("image")) if (!$util.isString(message.image)) return "image: string expected";
        if (message.jockey != null && message.hasOwnProperty("jockey")) if (!$util.isString(message.jockey)) return "jockey: string expected";
        if (message.startTime != null && message.hasOwnProperty("startTime")) if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high))) return "startTime: integer|Long expected";
        if (message.endTime != null && message.hasOwnProperty("endTime")) if (!$util.isInteger(message.endTime) && !(message.endTime && $util.isInteger(message.endTime.low) && $util.isInteger(message.endTime.high))) return "endTime: integer|Long expected";
        if (message.state != null && message.hasOwnProperty("state")) if (!$util.isInteger(message.state)) return "state: integer expected";
        if (message.lowUrl != null && message.hasOwnProperty("lowUrl")) if (!$util.isString(message.lowUrl)) return "lowUrl: string expected";
        if (message.highUrl != null && message.hasOwnProperty("highUrl")) if (!$util.isString(message.highUrl)) return "highUrl: string expected";
        if (message.totalListeners != null && message.hasOwnProperty("totalListeners")) if (!$util.isInteger(message.totalListeners)) return "totalListeners: integer expected";
        return null;
    };

    /**
     * Creates a liveCard message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof liveCard
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {liveCard} liveCard
     */
    liveCard.fromObject = function fromObject(object) {
        if (object instanceof $root.liveCard) return object;
        var message = new $root.liveCard();
        if (object.id != null) if ($util.Long) (message.id = $util.Long.fromValue(object.id)).unsigned = false;else if (typeof object.id === "string") message.id = parseInt(object.id, 10);else if (typeof object.id === "number") message.id = object.id;else if (_typeof(object.id) === "object") message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
        if (object.radioId != null) if ($util.Long) (message.radioId = $util.Long.fromValue(object.radioId)).unsigned = false;else if (typeof object.radioId === "string") message.radioId = parseInt(object.radioId, 10);else if (typeof object.radioId === "number") message.radioId = object.radioId;else if (_typeof(object.radioId) === "object") message.radioId = new $util.LongBits(object.radioId.low >>> 0, object.radioId.high >>> 0).toNumber();
        if (object.name != null) message.name = String(object.name);
        if (object.image != null) message.image = String(object.image);
        if (object.jockey != null) message.jockey = String(object.jockey);
        if (object.startTime != null) if ($util.Long) (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = false;else if (typeof object.startTime === "string") message.startTime = parseInt(object.startTime, 10);else if (typeof object.startTime === "number") message.startTime = object.startTime;else if (_typeof(object.startTime) === "object") message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
        if (object.endTime != null) if ($util.Long) (message.endTime = $util.Long.fromValue(object.endTime)).unsigned = false;else if (typeof object.endTime === "string") message.endTime = parseInt(object.endTime, 10);else if (typeof object.endTime === "number") message.endTime = object.endTime;else if (_typeof(object.endTime) === "object") message.endTime = new $util.LongBits(object.endTime.low >>> 0, object.endTime.high >>> 0).toNumber();
        if (object.state != null) message.state = object.state | 0;
        if (object.lowUrl != null) message.lowUrl = String(object.lowUrl);
        if (object.highUrl != null) message.highUrl = String(object.highUrl);
        if (object.totalListeners != null) message.totalListeners = object.totalListeners | 0;
        return message;
    };

    /**
     * Creates a plain object from a liveCard message. Also converts values to other types if specified.
     * @function toObject
     * @memberof liveCard
     * @static
     * @param {liveCard} message liveCard
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    liveCard.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else object.id = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var _long2 = new $util.Long(0, 0, false);
                object.radioId = options.longs === String ? _long2.toString() : options.longs === Number ? _long2.toNumber() : _long2;
            } else object.radioId = options.longs === String ? "0" : 0;
            object.name = "";
            object.image = "";
            object.jockey = "";
            if ($util.Long) {
                var _long3 = new $util.Long(0, 0, false);
                object.startTime = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
            } else object.startTime = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var _long4 = new $util.Long(0, 0, false);
                object.endTime = options.longs === String ? _long4.toString() : options.longs === Number ? _long4.toNumber() : _long4;
            } else object.endTime = options.longs === String ? "0" : 0;
            object.state = 0;
            object.lowUrl = "";
            object.highUrl = "";
            object.totalListeners = 0;
        }
        if (message.id != null && message.hasOwnProperty("id")) if (typeof message.id === "number") object.id = options.longs === String ? String(message.id) : message.id;else object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
        if (message.radioId != null && message.hasOwnProperty("radioId")) if (typeof message.radioId === "number") object.radioId = options.longs === String ? String(message.radioId) : message.radioId;else object.radioId = options.longs === String ? $util.Long.prototype.toString.call(message.radioId) : options.longs === Number ? new $util.LongBits(message.radioId.low >>> 0, message.radioId.high >>> 0).toNumber() : message.radioId;
        if (message.name != null && message.hasOwnProperty("name")) object.name = message.name;
        if (message.image != null && message.hasOwnProperty("image")) object.image = message.image;
        if (message.jockey != null && message.hasOwnProperty("jockey")) object.jockey = message.jockey;
        if (message.startTime != null && message.hasOwnProperty("startTime")) if (typeof message.startTime === "number") object.startTime = options.longs === String ? String(message.startTime) : message.startTime;else object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
        if (message.endTime != null && message.hasOwnProperty("endTime")) if (typeof message.endTime === "number") object.endTime = options.longs === String ? String(message.endTime) : message.endTime;else object.endTime = options.longs === String ? $util.Long.prototype.toString.call(message.endTime) : options.longs === Number ? new $util.LongBits(message.endTime.low >>> 0, message.endTime.high >>> 0).toNumber() : message.endTime;
        if (message.state != null && message.hasOwnProperty("state")) object.state = message.state;
        if (message.lowUrl != null && message.hasOwnProperty("lowUrl")) object.lowUrl = message.lowUrl;
        if (message.highUrl != null && message.hasOwnProperty("highUrl")) object.highUrl = message.highUrl;
        if (message.totalListeners != null && message.hasOwnProperty("totalListeners")) object.totalListeners = message.totalListeners;
        return object;
    };

    /**
     * Converts this liveCard to JSON.
     * @function toJSON
     * @memberof liveCard
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    liveCard.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return liveCard;
}();

var badgeImage = exports.badgeImage = $root.badgeImage = function () {

    /**
     * Properties of a badgeImage.
     * @exports IbadgeImage
     * @interface IbadgeImage
     * @property {string|null} [badgeUrl] badgeImage badgeUrl
     * @property {number|null} [badgeAspect] badgeImage badgeAspect
     */

    /**
     * Constructs a new badgeImage.
     * @exports badgeImage
     * @classdesc Represents a badgeImage.
     * @implements IbadgeImage
     * @constructor
     * @param {IbadgeImage=} [properties] Properties to set
     */
    function badgeImage(properties) {
        if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }
    }

    /**
     * badgeImage badgeUrl.
     * @member {string} badgeUrl
     * @memberof badgeImage
     * @instance
     */
    badgeImage.prototype.badgeUrl = "";

    /**
     * badgeImage badgeAspect.
     * @member {number} badgeAspect
     * @memberof badgeImage
     * @instance
     */
    badgeImage.prototype.badgeAspect = 0;

    /**
     * Creates a new badgeImage instance using the specified properties.
     * @function create
     * @memberof badgeImage
     * @static
     * @param {IbadgeImage=} [properties] Properties to set
     * @returns {badgeImage} badgeImage instance
     */
    badgeImage.create = function create(properties) {
        return new badgeImage(properties);
    };

    /**
     * Encodes the specified badgeImage message. Does not implicitly {@link badgeImage.verify|verify} messages.
     * @function encode
     * @memberof badgeImage
     * @static
     * @param {IbadgeImage} message badgeImage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    badgeImage.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.badgeUrl != null && message.hasOwnProperty("badgeUrl")) writer.uint32( /* id 1, wireType 2 =*/10).string(message.badgeUrl);
        if (message.badgeAspect != null && message.hasOwnProperty("badgeAspect")) writer.uint32( /* id 2, wireType 5 =*/21).float(message.badgeAspect);
        return writer;
    };

    /**
     * Encodes the specified badgeImage message, length delimited. Does not implicitly {@link badgeImage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof badgeImage
     * @static
     * @param {IbadgeImage} message badgeImage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    badgeImage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a badgeImage message from the specified reader or buffer.
     * @function decode
     * @memberof badgeImage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {badgeImage} badgeImage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    badgeImage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.badgeImage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.badgeUrl = reader.string();
                    break;
                case 2:
                    message.badgeAspect = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    };

    /**
     * Decodes a badgeImage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof badgeImage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {badgeImage} badgeImage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    badgeImage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a badgeImage message.
     * @function verify
     * @memberof badgeImage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    badgeImage.verify = function verify(message) {
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null) return "object expected";
        if (message.badgeUrl != null && message.hasOwnProperty("badgeUrl")) if (!$util.isString(message.badgeUrl)) return "badgeUrl: string expected";
        if (message.badgeAspect != null && message.hasOwnProperty("badgeAspect")) if (typeof message.badgeAspect !== "number") return "badgeAspect: number expected";
        return null;
    };

    /**
     * Creates a badgeImage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof badgeImage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {badgeImage} badgeImage
     */
    badgeImage.fromObject = function fromObject(object) {
        if (object instanceof $root.badgeImage) return object;
        var message = new $root.badgeImage();
        if (object.badgeUrl != null) message.badgeUrl = String(object.badgeUrl);
        if (object.badgeAspect != null) message.badgeAspect = Number(object.badgeAspect);
        return message;
    };

    /**
     * Creates a plain object from a badgeImage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof badgeImage
     * @static
     * @param {badgeImage} message badgeImage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    badgeImage.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
            object.badgeUrl = "";
            object.badgeAspect = 0;
        }
        if (message.badgeUrl != null && message.hasOwnProperty("badgeUrl")) object.badgeUrl = message.badgeUrl;
        if (message.badgeAspect != null && message.hasOwnProperty("badgeAspect")) object.badgeAspect = options.json && !isFinite(message.badgeAspect) ? String(message.badgeAspect) : message.badgeAspect;
        return object;
    };

    /**
     * Converts this badgeImage to JSON.
     * @function toJSON
     * @memberof badgeImage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    badgeImage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return badgeImage;
}();

exports.default = $root;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Writer;

var util      = __webpack_require__(0);

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = util.Buffer
    ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
            return new BufferWriter();
        })();
    }
    /* istanbul ignore next */
    : function create_array() {
        return new Writer();
    };

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Reader;

var util      = __webpack_require__(0);

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = util.Buffer
    ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer) {
            return util.Buffer.isBuffer(buffer)
                ? new BufferReader(buffer)
                /* istanbul ignore next */
                : create_array(buffer);
        })(buffer);
    }
    /* istanbul ignore next */
    : create_array;

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            do { // eslint-disable-line no-constant-condition
                if ((wireType = this.uint32() & 7) === 4)
                    break;
                this.skipType(wireType);
            } while (true);
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _AppDelegate = __webpack_require__(6);

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = __webpack_require__(7); /* global Vue */

/* weex initialized here, please do not move this line */

var App = __webpack_require__(57);
/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router: router }, App));
router.push('/');
_AppDelegate2.default.loadFontFamily();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  loadFontFamily: function loadFontFamily() {
    var platform = weex.config.env.platform.toLowerCase();
    var url = void 0;
    if (platform === 'ios') {
      url = "url('local:/LZUIKit.bundle/lizhifm.ttf')";
    } else {
      url = "url('local:///android_asset/iconfont/lizhifm.ttf')";
    }

    var dom = weex.requireModule('dom');
    dom.addRule('fontFace', {
      'fontFamily': 'iconfont',
      'src': url
    });
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vueRouter = __webpack_require__(8);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _HelloWorld = __webpack_require__(9);

var _HelloWorld2 = _interopRequireDefault(_HelloWorld);

var _Discover = __webpack_require__(53);

var _Discover2 = _interopRequireDefault(_Discover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.use(_vueRouter2.default); /* global Vue */


module.exports = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: _HelloWorld2.default
  }, {
    path: '/Discover',
    name: 'Discover',
    component: _Discover2.default
  }]
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(10)
)

/* script */
__vue_exports__ = __webpack_require__(11)

/* template */
var __vue_template__ = __webpack_require__(52)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\workSpace\\weex\\baseDemo\\weexBaseDemo\\src\\components\\HelloWorld.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1a7d3fb8"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
  "div": {
    "marginTop": "0",
    "marginRight": "0",
    "marginBottom": "0",
    "marginLeft": "0"
  },
  "photo": {
    "height": "320",
    "borderWidth": "1",
    "borderStyle": "solid",
    "borderColor": "#ADFF2F",
    "marginBottom": "40"
  },
  "Title": {
    "fontSize": "40",
    "color": "#00BFFF",
    "textAlign": "center",
    "height": "80",
    "paddingTop": "10",
    "backgroundImage": "linear-gradient(to bottom, #afddff, #ffffff)"
  },
  "logo": {
    "width": "400",
    "height": "400"
  },
  "img": {
    "width": "400",
    "height": "400"
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _NavigationBar = __webpack_require__(12);

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _SectionHead = __webpack_require__(16);

var _SectionHead2 = _interopRequireDefault(_SectionHead);

var _LZBridge = __webpack_require__(20);

var _LZBridge2 = _interopRequireDefault(_LZBridge);

var _LZITNet = __webpack_require__(24);

var _LZITNet2 = _interopRequireDefault(_LZITNet);

var _LZHttp = __webpack_require__(44);

var _LZHttp2 = _interopRequireDefault(_LZHttp);

var _LZNotice = __webpack_require__(48);

var _LZNotice2 = _interopRequireDefault(_LZNotice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var modal = weex.requireModule('modal');
exports.default = {
  components: { LZNotice: _LZNotice2.default, LZHttp: _LZHttp2.default, LZITNet: _LZITNet2.default, LZBridge: _LZBridge2.default, SectionHead: _SectionHead2.default, NavigationBar: _NavigationBar2.default },
  data: function data() {
    return {};
  },
  methods: {
    pushToDiscover: function pushToDiscover() {
      console.log('1231231');
      this.$router.push('Discover');
    },
    tojson: function tojson() {
      var use = new User("zhangsan", 12);
      var str = JSON.stringify(use);
      modal.toast({
        message: str,
        duration: 2
      });
      console.log("js==============" + str);
    }
  },
  mounted: function mounted() {
    modal.toast({
      message: weex.config.name,
      duration: 2
    });
  },
  created: function created() {
    modal.toast({
      message: weex.config.name,
      duration: 2
    });
  }
};


function User(name, age) {
  this.name = name;
  this.age = age;
  this.canFly = false;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(13)
)

/* script */
__vue_exports__ = __webpack_require__(14)

/* template */
var __vue_template__ = __webpack_require__(15)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\workSpace\\weex\\baseDemo\\weexBaseDemo\\src\\VueComponents\\NavigationBar.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-5e1e29c6"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {
  "navigationBar": {
    "backgroundColor": "#FFFFFF",
    "height": "84",
    "flexDirection": "row",
    "justifyContent": "flex-start"
  },
  "back": {
    "fontFamily": "iconfont",
    "fontSize": "64",
    "marginLeft": "10",
    "marginRight": "20"
  },
  "title": {
    "flex": 1,
    "marginTop": "10",
    "marginBottom": "10",
    "fontSize": "40",
    "textAlign": "center",
    "verticalAlign": "center",
    "color": "#000000"
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//

var lzbridge = weex.requireModule('LZBridge');
exports.default = {
  methods: {
    backAction: function backAction() {
      lzbridge.close();
    }
  },
  props: ['title']
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["navigationBar"]
  }, [_c('text', {
    staticClass: ["back"],
    staticStyle: {
      fontFamily: "iconfont"
    },
    on: {
      "click": _vm.backAction
    }
  }, [_vm._v(_vm._s(_vm.platform === 'ios' ? '' : '<'))]), _c('text', {
    staticClass: ["title"]
  }, [_vm._v(_vm._s(_vm.title))])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(17)
)

/* script */
__vue_exports__ = __webpack_require__(18)

/* template */
var __vue_template__ = __webpack_require__(19)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\workSpace\\weex\\baseDemo\\weexBaseDemo\\src\\VueComponents\\SectionHead.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-75cf42ba"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {
  "Title": {
    "fontSize": "40",
    "color": "#00BFFF",
    "textAlign": "center",
    "height": "80",
    "paddingTop": "10",
    "backgroundImage": "linear-gradient(to bottom, #afddff, #ffffff)"
  },
  "Content": {
    "fontSize": "30",
    "textAlign": "center"
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//

exports.default = {
  props: ['SectionTitle', 'SectionContent']
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["div"]
  }, [_c('text', {
    staticClass: ["Title"]
  }, [_vm._v(" " + _vm._s(_vm.SectionTitle) + " ")]), _c('text', {
    staticClass: ["Content"]
  }, [_vm._v(" " + _vm._s(_vm.SectionContent) + " ")])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(21)
)

/* script */
__vue_exports__ = __webpack_require__(22)

/* template */
var __vue_template__ = __webpack_require__(23)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\workSpace\\weex\\baseDemo\\weexBaseDemo\\src\\VueComponents\\LZBridge.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2bafa349"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {
  "BridgeScroller": {
    "height": "230",
    "flexDirection": "row"
  },
  "BridgeItem": {
    "width": "200",
    "height": "200",
    "backgroundColor": "#00BFFF",
    "marginTop": "20",
    "marginRight": "20",
    "marginBottom": "40",
    "marginLeft": "20",
    "justifyContent": "center"
  },
  "BridgeText": {
    "textAlign": "center",
    "color": "#FFFFFF"
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var modal = weex.requireModule('modal');
var lzbridge = weex.requireModule('LZBridge');
exports.default = {
  methods: {
    pushToNotice: function pushToNotice() {
      this.$router.push('Notification');
    },
    pushToDiscover: function pushToDiscover() {
      this.$router.push('discover');
    },
    pushToRechargeCenter: function pushToRechargeCenter(event) {
      lzbridge.toAction('{"type":37}', function (ret) {});
    },
    pushToLogin: function pushToLogin(event) {
      lzbridge.toAction('{"type":42}', function (ret) {});
    },
    getUserInfo: function getUserInfo(event) {
      var self = this;
      lzbridge.getSessionUser(function (ret) {
        self.userinfo = '登录信息';
        modal.toast({
          message: ret,
          duration: 0.3
        });
      });
    },
    getAppInfo: function getAppInfo() {
      var self = this;
      lzbridge.getAppInfo(function (ret) {
        self.appinfo = '应用信息';
        modal.toast({
          message: ret,
          duration: 0.3
        });
      });
    },
    getToken: function getToken() {
      var self = this;
      lzbridge.getToken('{"url":"www.lizhi.fm","needRefresh":"true"}', function (ret) {
        modal.toast({
          message: ret,
          duration: 0.3
        });
        self.token = 'Token\n' + ret;
      });
    },
    getUUID: function getUUID() {
      var self = this;
      lzbridge.getUdid(function (ret) {
        modal.toast({
          message: ret,
          duration: 0.3
        });
        self.uuid = 'UUID\n' + ret;
      });
    },
    close: function close() {
      lzbridge.close();
    },
    showPrompt: function showPrompt() {
      lzbridge.showPrompt('{"type" : 0,"msg" : "111我是提示信息的内容","action": "{\"type\":25}"}', function (ret) {});
    },
    showAlert: function showAlert() {
      lzbridge.showAlert('{"title": "标题","msg": "内容\n中间一只米老鼠","action": [{"title": "左青龙","style": 0},{"title": "右白虎","style": 2}]}', function (ret) {
        modal.toast({
          message: ret,
          duration: 0.3
        });
      });
    },
    share: function share() {
      lzbridge.share('{"showTitle": "拉票大行动", "showSubtitle": "分享给朋友吧", "url": "http://www.lizi.fm", "title": "为XXX拉票", "desc": "我正在为XXX拉票，大家帮帮我吧", "image-url": "http://cdn.lizhi.fm/images/xxxxx.png", "platforms": [22, 23], "showType" : 0}', function (ret) {});
    },
    pushToFeedBack: function pushToFeedBack() {
      lzbridge.toAction('{"type":41,"extraData":{"content":"dd","contact":"ff"}}', function (ret) {});
    },
    getSessionUser: function getSessionUser() {
      lzbridge.getSessionUser(function (ret) {
        console.log("sessionUser:", ret);
        modal.toast({
          message: "返回值：" + ret,
          duration: 0.3
        });
      });
    },
    getSessionId: function getSessionId() {
      lzbridge.getSessionID(function (ret) {
        console.log("sessionId:", ret);
        modal.toast({
          message: ret,
          duration: 0.3
        });
      });
    }
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroller', {
    staticClass: ["BridgeScroller"],
    attrs: {
      "scrollDirection": "horizontal"
    }
  }, [_c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.pushToDiscover
    }
  }, [_vm._v(" 跳转直播间首页 ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.pushToLogin
    }
  }, [_vm._v(" 跳转登录界面 ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.pushToFeedBack
    }
  }, [_vm._v(" 跳转FeedBack界面 ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.pushToRechargeCenter
    }
  }, [_vm._v(" 跳转充值中心 ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.close
    }
  }, [_vm._v(" 关闭当前页面 ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.getUserInfo
    }
  }, [_vm._v(" 获取用户信息 ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.getAppInfo
    }
  }, [_vm._v(" 获取应用信息 ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.getToken
    }
  }, [_vm._v(" 获取Token ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.getUUID
    }
  }, [_vm._v(" 获取UUID ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.showPrompt
    }
  }, [_vm._v(" 显示提示信息 ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.showAlert
    }
  }, [_vm._v(" 显示对话框 ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.share
    }
  }, [_vm._v(" 分享 ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.getSessionUser
    }
  }, [_vm._v(" 获取SessionUser ")])]), _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.getSessionId
    }
  }, [_vm._v(" 获取SessionUId ")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(25)
)

/* script */
__vue_exports__ = __webpack_require__(26)

/* template */
var __vue_template__ = __webpack_require__(43)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\workSpace\\weex\\baseDemo\\weexBaseDemo\\src\\VueComponents\\LZITNet.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-27a60f82"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = {
  "BridgeItem": {
    "backgroundColor": "#00BFFF",
    "marginTop": "20",
    "marginRight": "20",
    "marginBottom": "40",
    "marginLeft": "20",
    "justifyContent": "center"
  },
  "BridgeText": {
    "textAlign": "center",
    "color": "#FFFFFF",
    "marginBottom": "30"
  }
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//

var lzwxitnet = weex.requireModule('LZITNet');
exports.default = {
  data: function data() {
    return {
      netInfo: '',
      sessionId: ""
    };
  },
  methods: {
    sendTcpRequest: function sendTcpRequest() {
      var base64js = __webpack_require__(2);
      var Long = __webpack_require__(27);
      // var protobuf = require('protobufjs')
      // var jsonDescriptor = require('../Soure/message') // exemplary for node
      // var root = protobuf.Root.fromJSON(jsonDescriptor)
      // var RequestLiveShareInfo = root.lookupType('message.RequestLiveShareInfo')
      var RequestLiveShareInfo = __webpack_require__(1)['RequestLiveShareInfo'];

      var reqMessage = new RequestLiveShareInfo();
      reqMessage.liveId = Long.fromString('2672190807143892022');
      var requestData = RequestLiveShareInfo.encode(reqMessage).finish();
      var base64Data = base64js.fromByteArray(requestData);

      var options = {};
      options['op'] = 0x120d;
      options['data'] = base64Data;
      options['option'] = { 'TimeOut': '30' };
      this.netInfo = '发送请求：' + JSON.stringify(options);

      var self = this;
      var sceneId = lzwxitnet.fetch(JSON.stringify(options), function (ret) {
        // 判断状态
        ret = JSON.parse(ret);
        if (ret['errType'] !== 4) {
          console.log(ret['statusText']);
          return;
        }

        var responseLiveShareInfo = __webpack_require__(1)['ResponseLiveShareInfo'];
        var buffer = base64js.toByteArray(ret['data']);
        var resp = responseLiveShareInfo.decode(buffer);
        self.netInfo = self.netInfo + '\n\n收到回调结果并解析：' + JSON.stringify(resp.shareInfo.toJSON());
      });
      lzwxitnet.cancel(sceneId);
      self.netInfo = self.netInfo + '\n\n添加到队列：sceneId：' + sceneId;
    },
    addListener: function addListener() {
      var base64js = __webpack_require__(2);
      var self = this;
      lzwxitnet.addListener(0x120d, function (ret) {
        // 判断状态
        console.log("ret:" + ret);
        ret = JSON.parse(ret);
        if (ret['errType'] !== 4) {
          console.log(ret['statusText']);
          return;
        }

        var responseLiveShareInfo = __webpack_require__(1)['ResponseLiveShareInfo'];
        var buffer = base64js.toByteArray(ret['data']);
        var resp = responseLiveShareInfo.decode(buffer);
        self.netInfo = self.netInfo + '\n\n收到回调结果并解析：' + JSON.stringify(resp.shareInfo.toJSON());
      });
    },
    remove: function remove() {
      lzwxitnet.removeListener(0x120d);
    },
    removeall: function removeall() {
      lzwxitnet.removeAllListener();
    },
    cancel: function cancel() {}
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = Long;

/**
 * wasm optimizations, to do native i64 multiplication and divide
 */
var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
  ])), {}).exports;
} catch (e) {
  // no wasm support :(
}

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
function Long(low, high, unsigned) {

    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    this.low = low | 0;

    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */
    this.high = high | 0;

    /**
     * Whether unsigned or not.
     * @type {boolean}
     */
    this.unsigned = !!unsigned;
}

// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */
Long.prototype.__isLong__;

Object.defineProperty(Long.prototype, "__isLong__", { value: true });

/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */
function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}

/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */
Long.isLong = isLong;

/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */
var INT_CACHE = {};

/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */
var UINT_CACHE = {};

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}

/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromInt = fromInt;

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromNumber(value, unsigned) {
    if (isNaN(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromNumber = fromNumber;

/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}

/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromBits = fromBits;

/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
function fromString(str, unsigned, radix) {
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        // For goog.math.long compatibility
        radix = unsigned,
        unsigned = false;
    } else {
        unsigned = !! unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');

    var p;
    if ((p = str.indexOf('-')) > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));

    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i),
            value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}

/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */
Long.fromString = fromString;

/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromValue(val, unsigned) {
    if (typeof val === 'number')
        return fromNumber(val, unsigned);
    if (typeof val === 'string')
        return fromString(val, unsigned);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}

/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */
Long.fromValue = fromValue;

// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_16_DBL = 1 << 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_24_DBL = 1 << 24;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

/**
 * @type {!Long}
 * @const
 * @inner
 */
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

/**
 * @type {!Long}
 * @inner
 */
var ZERO = fromInt(0);

/**
 * Signed zero.
 * @type {!Long}
 */
Long.ZERO = ZERO;

/**
 * @type {!Long}
 * @inner
 */
var UZERO = fromInt(0, true);

/**
 * Unsigned zero.
 * @type {!Long}
 */
Long.UZERO = UZERO;

/**
 * @type {!Long}
 * @inner
 */
var ONE = fromInt(1);

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = ONE;

/**
 * @type {!Long}
 * @inner
 */
var UONE = fromInt(1, true);

/**
 * Unsigned one.
 * @type {!Long}
 */
Long.UONE = UONE;

/**
 * @type {!Long}
 * @inner
 */
var NEG_ONE = fromInt(-1);

/**
 * Signed negative one.
 * @type {!Long}
 */
Long.NEG_ONE = NEG_ONE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

/**
 * Maximum signed value.
 * @type {!Long}
 */
Long.MAX_VALUE = MAX_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

/**
 * Maximum unsigned value.
 * @type {!Long}
 */
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MIN_VALUE = fromBits(0, 0x80000000|0, false);

/**
 * Minimum signed value.
 * @type {!Long}
 */
Long.MIN_VALUE = MIN_VALUE;

/**
 * @alias Long.prototype
 * @inner
 */
var LongPrototype = Long.prototype;

/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */
LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
};

/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */
LongPrototype.toNumber = function toNumber() {
    if (this.unsigned)
        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};

/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */
LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    if (this.isZero())
        return '0';
    if (this.isNegative()) { // Unsigned Longs are never negative
        if (this.eq(MIN_VALUE)) {
            // We need to change the Long value before it can be negated, so we remove
            // the bottom-most digit in this base and then recurse to do the rest.
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
        } else
            return '-' + this.neg().toString(radix);
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
        rem = this;
    var result = '';
    while (true) {
        var remDiv = rem.div(radixToPower),
            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
            digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
            return digits + result;
        else {
            while (digits.length < 6)
                digits = '0' + digits;
            result = '' + digits + result;
        }
    }
};

/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */
LongPrototype.getHighBits = function getHighBits() {
    return this.high;
};

/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
};

/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */
LongPrototype.getLowBits = function getLowBits() {
    return this.low;
};

/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
};

/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) // Unsigned Longs are never negative
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for (var bit = 31; bit > 0; bit--)
        if ((val & (1 << bit)) != 0)
            break;
    return this.high != 0 ? bit + 33 : bit + 1;
};

/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */
LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
};

/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */
LongPrototype.eqz = LongPrototype.isZero;

/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */
LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
};

/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */
LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
};

/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */
LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
};

/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */
LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
};

/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.equals = function equals(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
        return false;
    return this.high === other.high && this.low === other.low;
};

/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.eq = LongPrototype.equals;

/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(/* validates */ other);
};

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.neq = LongPrototype.notEquals;

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ne = LongPrototype.notEquals;

/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThan = function lessThan(other) {
    return this.comp(/* validates */ other) < 0;
};

/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lt = LongPrototype.lessThan;

/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(/* validates */ other) <= 0;
};

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lte = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.le = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(/* validates */ other) > 0;
};

/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gt = LongPrototype.greaterThan;

/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(/* validates */ other) >= 0;
};

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gte = LongPrototype.greaterThanOrEqual;

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ge = LongPrototype.greaterThanOrEqual;

/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.compare = function compare(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.eq(other))
        return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
        return -1;
    if (!thisNeg && otherNeg)
        return 1;
    // At this point the sign bits are the same
    if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
    // Both are positive if at least one is unsigned
    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
};

/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.comp = LongPrototype.compare;

/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */
LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
    return this.not().add(ONE);
};

/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */
LongPrototype.neg = LongPrototype.negate;

/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */
LongPrototype.add = function add(addend) {
    if (!isLong(addend))
        addend = fromValue(addend);

    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
};

/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.sub = LongPrototype.subtract;

/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero())
        return ZERO;
    if (!isLong(multiplier))
        multiplier = fromValue(multiplier);

    // use wasm support if present
    if (wasm) {
        var low = wasm.mul(this.low,
                           this.high,
                           multiplier.low,
                           multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (multiplier.isZero())
        return ZERO;
    if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
        if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
        else
            return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();

    // If both longs are small, use float multiplication
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.mul = LongPrototype.multiply;

/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);
    if (divisor.isZero())
        throw Error('division by zero');

    // use wasm support if present
    if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned &&
            this.high === -0x80000000 &&
            divisor.low === -1 && divisor.high === -1) {
            // be consistent with non-wasm code path
            return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.eq(MIN_VALUE))
                return ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.eq(MIN_VALUE))
            return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
        res = ZERO;
    } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
        if (divisor.gt(this))
            return UZERO;
        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
            return UONE;
        res = UZERO;
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    rem = this;
    while (rem.gte(divisor)) {
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

        // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.
        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

        // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
            approxRes = fromNumber(approx),
            approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }

        // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.
        if (approxRes.isZero())
            approxRes = ONE;

        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};

/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.div = LongPrototype.divide;

/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);

    // use wasm support if present
    if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    return this.sub(this.div(divisor).mul(divisor));
};

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.mod = LongPrototype.modulo;

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.rem = LongPrototype.modulo;

/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */
LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
};

/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.and = function and(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};

/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.or = function or(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};

/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.xor = function xor(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
    else
        return fromBits(0, this.low << (numBits - 32), this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shl = LongPrototype.shiftLeft;

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
    else
        return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
};

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr = LongPrototype.shiftRight;

/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0)
        return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
        } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
        else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
    }
};

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shru = LongPrototype.shiftRightUnsigned;

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */
LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned)
        return this;
    return fromBits(this.low, this.high, false);
};

/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */
LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned)
        return this;
    return fromBits(this.low, this.high, true);
};

/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */
LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
};

/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */
LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high,
        lo = this.low;
    return [
        lo        & 0xff,
        lo >>>  8 & 0xff,
        lo >>> 16 & 0xff,
        lo >>> 24       ,
        hi        & 0xff,
        hi >>>  8 & 0xff,
        hi >>> 16 & 0xff,
        hi >>> 24
    ];
};

/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */
LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high,
        lo = this.low;
    return [
        hi >>> 24       ,
        hi >>> 16 & 0xff,
        hi >>>  8 & 0xff,
        hi        & 0xff,
        lo >>> 24       ,
        lo >>> 16 & 0xff,
        lo >>>  8 & 0xff,
        lo        & 0xff
    ];
};

/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};

/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(
        bytes[0]       |
        bytes[1] <<  8 |
        bytes[2] << 16 |
        bytes[3] << 24,
        bytes[4]       |
        bytes[5] <<  8 |
        bytes[6] << 16 |
        bytes[7] << 24,
        unsigned
    );
};

/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(
        bytes[4] << 24 |
        bytes[5] << 16 |
        bytes[6] <<  8 |
        bytes[7],
        bytes[0] << 24 |
        bytes[1] << 16 |
        bytes[2] <<  8 |
        bytes[3],
        unsigned
    );
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// minimal library entry point.


module.exports = __webpack_require__(29);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = __webpack_require__(3);
protobuf.BufferWriter = __webpack_require__(38);
protobuf.Reader       = __webpack_require__(4);
protobuf.BufferReader = __webpack_require__(39);

// Utility
protobuf.util         = __webpack_require__(0);
protobuf.rpc          = __webpack_require__(40);
protobuf.roots        = __webpack_require__(42);
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.Reader._configure(protobuf.BufferReader);
    protobuf.util._configure();
}

// Configure serialization
protobuf.Writer._configure(protobuf.BufferWriter);
configure();


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = LongBits;

var util = __webpack_require__(0);

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferWriter;

// extends Writer
var Writer = __webpack_require__(3);
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = __webpack_require__(0);

var Buffer = util.Buffer;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Buffer} Buffer
 */
BufferWriter.alloc = function alloc_buffer(size) {
    return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
};

var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set"
    ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
                           // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
        else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
    };

/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else
        buf.utf8Write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = BufferReader;

// extends Reader
var Reader = __webpack_require__(4);
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = __webpack_require__(0);

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

/* istanbul ignore else */
if (util.Buffer)
    BufferReader.prototype._slice = util.Buffer.prototype.slice;

/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = __webpack_require__(41);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

var util = __webpack_require__(0);

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.addListener
    }
  }, [_vm._v("添加op监听 ")]), _c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.remove
    }
  }, [_vm._v("移除op监听 ")]), _c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.removeall
    }
  }, [_vm._v("移除所有监听 ")]), _c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.cancel
    }
  }, [_vm._v("取消sceneId ")]), _c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.getSessionId
    }
  }, [_vm._v("获取sessionId " + _vm._s(_vm.sessionId))]), _c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.sendTcpRequest
    }
  }, [_vm._v(" 点击发送一个获取直播间分享信息的Tcp请求 ")])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(45)
)

/* script */
__vue_exports__ = __webpack_require__(46)

/* template */
var __vue_template__ = __webpack_require__(47)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\workSpace\\weex\\baseDemo\\weexBaseDemo\\src\\VueComponents\\LZHttp.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4e37bac8"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = {
  "BridgeItem": {
    "backgroundColor": "#00BFFF",
    "marginTop": "20",
    "marginRight": "20",
    "marginBottom": "40",
    "marginLeft": "20",
    "justifyContent": "center"
  },
  "BridgeText": {
    "textAlign": "center",
    "color": "#0000FF",
    "marginBottom": "10"
  }
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//

var lzwxhttp = weex.requireModule('LZHttp');
exports.default = {
  data: function data() {
    return {
      netInfo: '',
      result: 0
    };
  },
  methods: {
    sendHttpRequest: function sendHttpRequest() {
      var self = this;
      self.netInfo = '发送一个get请求，urk为：https://www.sojson.com/open/api/weather/json.shtml';
      lzwxhttp.fetch(JSON.stringify({
        method: 'GET',
        url: 'https://www.sojson.com/open/api/weather/json.shtml',
        body: JSON.stringify({
          'name': '12'
        })
      }), function (ret) {
        // ret = JSON.parse(ret)
        self.netInfo = self.netInfo + '\n\n收到回调结果并解析：' + ret;
      });
    },


    weexClick: function weexClick() {
      this.result = this.result + 1;
    },
    vueClick: function vueClick() {
      this.result = this.result + 1;
    }
  }
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.sendHttpRequest
    }
  }, [_vm._v(" 点击发送一个Http天气信息请求 ")]), _c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.pushToNotice
    }
  }, [_vm._v(" " + _vm._s(_vm.netInfo) + " ")])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(49)
)

/* script */
__vue_exports__ = __webpack_require__(50)

/* template */
var __vue_template__ = __webpack_require__(51)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\workSpace\\weex\\baseDemo\\weexBaseDemo\\src\\VueComponents\\LZNotice.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-5aac5718"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = {
  "BridgeItem": {
    "backgroundColor": "#00BFFF",
    "marginTop": "20",
    "marginRight": "20",
    "marginBottom": "40",
    "marginLeft": "20",
    "justifyContent": "center"
  },
  "BridgeText": {
    "textAlign": "center",
    "color": "#FFFFFF",
    "marginBottom": "10"
  }
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

var lzwxnotice = weex.requireModule('LZNotice');
var modal = weex.requireModule('modal');
exports.default = {
  data: function data() {
    return {
      callBackData: ''
    };
  },
  methods: {
    addobserver: function addobserver() {
      var self = this;
      lzwxnotice.addObserver('testnotice', function (ret) {
        modal.toast({
          message: '监听到回调' + ret,
          duration: 0.3
        });
        self.callBackData = self.callBackData + '\n' + ret;
      });
      modal.toast({
        message: '监听注册成功',
        duration: 0.3
      });
    },
    sendPost: function sendPost() {
      var float = Math.random() * 1000;
      lzwxnotice.post(float.toString(), 'testnotice');
    }
  }
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["BridgeItem"]
  }, [_c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.addobserver
    }
  }, [_vm._v(" 注册一个监听 ")]), _c('text', {
    staticClass: ["BridgeText"],
    on: {
      "click": _vm.sendPost
    }
  }, [_vm._v(" 发送所监听的请求 内容为一个随机数字 ")]), _c('text', {
    staticClass: ["BridgeText"]
  }, [_vm._v(" 监听回调：" + _vm._s(_vm.callBackData) + " ")])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroller', {
    staticClass: ["div"]
  }, [_c('NavigationBar', {
    attrs: {
      "title": "Weex 扩展 Module 的使用"
    }
  }), _c('text', {
    staticClass: ["Title"],
    on: {
      "click": _vm.pushToDiscover
    }
  }, [_vm._v("点击跳转到直播间首页Demo")]), _c('SectionHead', {
    attrs: {
      "SectionContent": "高斯模糊图片组件",
      "SectionTitle": "blurImage"
    }
  }), _c('blurImage', {
    staticClass: ["photo"],
    attrs: {
      "src": "http://cdn.lizhi.fm/user/2017/12/26/2643535470313154562_320x320.jpg"
    }
  }), _c('SectionHead', {
    attrs: {
      "SectionContent": "跟 H5 的 JSBridge 保持了一致的接口和功能的 Bridge Module",
      "SectionTitle": "LZBridge Module"
    }
  }), _c('LZBridge'), _c('SectionHead', {
    attrs: {
      "SectionContent": "基于原生 ITNetScene 搭建的 TCP 网络请求 Module",
      "SectionTitle": "LZITNet"
    }
  }), _c('LZITNet'), _c('SectionHead', {
    attrs: {
      "SectionContent": "基于原生 AFN 搭建的 Http 网络请求 Module",
      "SectionTitle": "LZHttp"
    }
  }), _c('LZHttp'), _c('SectionHead', {
    attrs: {
      "SectionContent": "桥接 natie 到通知中心的 Module",
      "SectionTitle": "LZNotice"
    }
  }), _c('LZNotice'), _c('text', {
    staticClass: ["text"],
    on: {
      "click": _vm.tojson
    }
  }, [_vm._v("java对象转成json")]), _c('image', {
    staticClass: ["img"],
    attrs: {
      "src": "file:///android_asset/dist/addlist_qq.png"
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(54)
)

/* script */
__vue_exports__ = __webpack_require__(55)

/* template */
var __vue_template__ = __webpack_require__(56)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\workSpace\\weex\\baseDemo\\weexBaseDemo\\src\\components\\Discover.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-71283ea6"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = {
  "body": {
    "flexDirection": "column"
  },
  "row": {
    "flexDirection": "row",
    "height": "400",
    "justifyContent": "space-around",
    "marginTop": "40"
  },
  "item": {
    "justifyContent": "center",
    "flexDirection": "column",
    "width": "300",
    "height": "400",
    "marginBottom": "30"
  },
  "image": {
    "height": "300",
    "width": "300",
    "borderRadius": "15"
  },
  "titleLabel": {
    "lines": 1,
    "fontSize": "32",
    "textOverflow": "ellipsis"
  },
  "infoLabel": {
    "lines": 1,
    "fontSize": "25",
    "width": "300",
    "textOverflow": "ellipsis",
    "color": "#828282"
  },
  "number": {
    "top": "-125",
    "left": "10",
    "color": "#FFFFFF",
    "fontSize": "28"
  },
  "badgeText": {
    "top": "-400",
    "right": "20",
    "color": "#FFFFFF",
    "fontSize": "28",
    "textAlign": "right"
  },
  "badgeImage": {
    "top": "-220",
    "left": "10"
  },
  "title": {
    "marginTop": "10",
    "marginBottom": "10",
    "fontSize": "40",
    "textAlign": "center",
    "verticalAlign": "center"
  },
  "indicator": {
    "marginTop": "16",
    "height": "40",
    "width": "40",
    "color": "#0000FF"
  },
  "indicator-text": {
    "color": "#888888",
    "fontSize": "42",
    "textAlign": "center"
  },
  "loading": {
    "width": "750",
    "display": "flex",
    "alignItems": "center"
  },
  "refresh": {
    "width": "750",
    "display": "flex",
    "alignItems": "center"
  },
  "scroller": {
    "height": "1000",
    "alignSelf": "stretch",
    "borderWidth": "3",
    "borderStyle": "solid",
    "borderColor": "rgb(162,217,192)"
  }
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var lzwxitnet = weex.requireModule('LZITNet');
var modal = weex.requireModule('modal');
exports.default = {
  data: function data() {
    return {
      list: [],
      performanceId: '',
      timeStamp: '',
      loadinging: false,
      refreshing: false,
      sheight: WXEnvironment.deviceHeight - 100
    };
  },
  methods: {
    onrefresh: function onrefresh() {
      modal.toast({ message: 'Refreshing', duration: 1 });
      this.refreshing = true;
      this.loadData(1);
    },
    onloading: function onloading() {
      modal.toast({ message: 'Loading', duration: 1 });
      this.loadinging = true;
      this.loadData(2);
    },
    backAction: function backAction() {
      this.$router.back();
    },

    loadData: function loadData(freshType) {
      var base64js = __webpack_require__(2);
      var RequestRecommendLiveMediaCards = __webpack_require__(1)['RequestRecommendLiveMediaCards'];
      var reqMessage = new RequestRecommendLiveMediaCards();
      reqMessage.exId = '0@type';
      reqMessage.freshType = freshType;
      reqMessage.rFlag = 1;
      reqMessage.timeStamp = this.timeStamp;
      reqMessage.performanceId = this.performanceId;
      console.log('发送请求: timeStamp:' + this.timeStamp + '   performanceId:' + this.performanceId);

      var requestData = RequestRecommendLiveMediaCards.encode(reqMessage).finish();
      var base64Data = base64js.fromByteArray(requestData);

      var options = {};
      options['op'] = 0x1203;
      options['data'] = base64Data;
      options['option'] = { 'TimeOut': '30' };

      var self = this;
      var sceneId = lzwxitnet.fetch(JSON.stringify(options), function (ret) {
        ret = JSON.parse(ret);
        // 判断状态
        // if (ret['errType'] !== 4) {
        //   console.log(ret['statusText'])
        //   return
        // }

        var ResponseRecommendLiveMediaCards = __webpack_require__(1)['ResponseRecommendLiveMediaCards'];
        var buffer = base64js.toByteArray(ret['data']);
        var resp = ResponseRecommendLiveMediaCards.decode(buffer);
        self.performanceId = resp.performanceId;
        self.timeStamp = resp.timeStamp;
        console.log('请求回调: timeStamp:' + resp.timeStamp + '   performanceId:' + resp.performanceId);
        if (self.list.length && freshType === 2) {
          self.list = self.list.concat(resp.liveCards);
        } else {
          self.list = resp.liveCards;
        }
        var str = 'scneId 监听到的网络回调';

        for (var i = 0; i < resp.liveCards.length; i++) {
          var card = resp.liveCards[i];
          str += card.badgeImage.badgeUrl;
        }
        console.log(str);
      });
      console.log('sceneId：' + sceneId);
      self.loadinging = false;
      self.refreshing = false;
    }
  },
  mounted: function mounted() {
    modal.toast({
      message: sheight,
      duration: 0.3
    });
    this.loadData(2);
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["body"]
  }, [_c('text', {
    staticClass: ["title"]
  }, [_vm._v("直播间首页")]), _c('text', {
    staticStyle: {
      fontFamily: "iconfont",
      fontSize: "64px",
      marginLeft: "10px",
      marginTop: "-64px"
    },
    on: {
      "click": _vm.backAction
    }
  }, [_vm._v(_vm._s(_vm.platform === 'ios' ? '' : '<'))]), _c('scroller', {
    staticClass: ["scroller"]
  }, [_c('refresh', {
    staticClass: ["refresh"],
    attrs: {
      "display": _vm.refreshing ? 'show' : 'hide'
    },
    on: {
      "refresh": _vm.onrefresh
    }
  }, [_c('text', {
    staticClass: ["indicator-text"]
  }, [_vm._v("Refreshing ...")]), _c('loading-indicator', {
    staticClass: ["indicator"]
  })]), _vm._l((_vm.list), function(v, i) {
    return (i % 2 == 0) ? _c('div', {
      key: i,
      staticClass: ["row"]
    }, [_c('div', {
      staticClass: ["item"]
    }, [(v) ? _c('image', {
      staticClass: ["image"],
      attrs: {
        "src": v.live.image
      }
    }) : _vm._e(), _c('text', {
      staticClass: ["titleLabel"]
    }, [_vm._v(_vm._s(v.live.name))]), _c('text', {
      staticClass: ["infoLabel"]
    }, [_vm._v(_vm._s(v.live.jockey))]), _c('text', {
      staticClass: ["number"]
    }, [_vm._v(_vm._s(v.live.totalListeners) + "人")]), (v.live.badgeText) ? _c('text', {
      staticClass: ["badgeText"]
    }, [_vm._v("模式：" + _vm._s(v.live.badgeText))]) : _vm._e(), _c('image', {
      staticClass: ["badgeImage"],
      staticStyle: {
        width: "100px",
        height: "50px"
      },
      attrs: {
        "src": "{{",
        "v.live.badgeImage.badgeUrl": "",
        "}}": ""
      }
    })]), (_vm.list[i + 1]) ? _c('div', {
      staticClass: ["item"]
    }, [_c('image', {
      staticClass: ["image"],
      attrs: {
        "src": _vm.list[i + 1].live.image
      }
    }), _c('text', {
      staticClass: ["titleLabel"]
    }, [_vm._v(_vm._s(_vm.list[i + 1].live.name))]), _c('text', {
      staticClass: ["infoLabel"]
    }, [_vm._v(_vm._s(_vm.list[i + 1].live.jockey))]), _c('text', {
      staticClass: ["number"]
    }, [_vm._v(_vm._s(_vm.list[i + 1].live.totalListeners) + "人")]), (_vm.list[i + 1].live.badgeText) ? _c('text', {
      staticClass: ["badgeText"]
    }, [_vm._v("模式：" + _vm._s(_vm.list[i + 1].live.badgeText))]) : _vm._e(), _c('image', {
      staticClass: ["badgeImage"],
      staticStyle: {
        width: "100px",
        height: "50px"
      },
      attrs: {
        "src": "{{",
        "list[i+1].live.badgeImage.badgeUrl": "",
        "}}": ""
      }
    })]) : _vm._e()]) : _vm._e()
  }), _c('loading', {
    staticClass: ["loading"],
    attrs: {
      "display": _vm.loadinging ? 'show' : 'hide'
    },
    on: {
      "loading": _vm.onloading
    }
  }, [_c('text', {
    staticClass: ["indicator-text"]
  }, [_vm._v("Loading ...")]), _c('loading-indicator', {
    staticClass: ["indicator"]
  })])], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* template */
var __vue_template__ = __webpack_require__(58)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\workSpace\\weex\\baseDemo\\weexBaseDemo\\src\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);