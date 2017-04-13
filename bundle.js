/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 344);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(23)
  , hide      = __webpack_require__(11)
  , redefine  = __webpack_require__(13)
  , ctx       = __webpack_require__(26)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(65)('wks')
  , uid        = __webpack_require__(41)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(1)
  , IE8_DOM_DEFINE = __webpack_require__(116)
  , toPrimitive    = __webpack_require__(25)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(32)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(19);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7)
  , createDesc = __webpack_require__(31);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , hide      = __webpack_require__(11)
  , has       = __webpack_require__(10)
  , SRC       = __webpack_require__(41)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(23).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , defined = __webpack_require__(19)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(50)
  , defined = __webpack_require__(19);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(51)
  , createDesc     = __webpack_require__(31)
  , toIObject      = __webpack_require__(15)
  , toPrimitive    = __webpack_require__(25)
  , has            = __webpack_require__(10)
  , IE8_DOM_DEFINE = __webpack_require__(116)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(10)
  , toObject    = __webpack_require__(9)
  , IE_PROTO    = __webpack_require__(87)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = id;
/* harmony export (immutable) */ __webpack_exports__["i"] = apply;
/* harmony export (immutable) */ __webpack_exports__["d"] = mixin;
/* harmony export (immutable) */ __webpack_exports__["f"] = add;
/* harmony export (immutable) */ __webpack_exports__["b"] = compose;
/* harmony export (immutable) */ __webpack_exports__["g"] = impurePush;
/* harmony export (immutable) */ __webpack_exports__["e"] = cons;
/* harmony export (immutable) */ __webpack_exports__["k"] = curry3;
/* harmony export (immutable) */ __webpack_exports__["j"] = curry2;
/* unused harmony export flip */
/* unused harmony export foldlArray */
/* harmony export (immutable) */ __webpack_exports__["l"] = foldlArray1;
/* harmony export (immutable) */ __webpack_exports__["h"] = arrayFlatten;
/* harmony export (immutable) */ __webpack_exports__["a"] = deepEqual;
function id(a) {
    return a;
}
function apply(f, a) {
    return f(a);
}
function mixin(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            if (!(name in derivedCtor) && !(name in derivedCtor.prototype)) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}
function add(n, m) {
    return n + m;
}
function compose(f, g) {
    return function (a) { return f(g(a)); };
}
function impurePush(arr, a) {
    arr.push(a);
    return arr;
}
function cons(a, as) {
    return [a].concat(as);
}
function curry3(f) {
    return function (a) { return function (b) { return function (c) { return f(a, b, c); }; }; };
}
function curry2(f) {
    return function (a) { return function (b) { return f(a, b); }; };
}
function flip(f) {
    return function (b, a) { return f(a, b); };
}
function foldlArray(f, init, a) {
    for (var i = 0; i < a.length; ++i) {
        init = f(init, a[i]);
    }
    return init;
}
function foldlArray1(f, a) {
    var init = a[0];
    for (var i = 1; i < a.length; ++i) {
        init = f(init, a[i]);
    }
    return init;
}
function arrayFlatten(m) {
    var result = [];
    for (var i = 0; i < m.length; ++i) {
        for (var j = 0; j < m[i].length; ++j) {
            result.push(m[i][j]);
        }
    }
    return result;
}
function deepEqual(a, b) {
    if (typeof a === "object" && typeof b === "object") {
        var aKeys = Object.keys(a);
        for (var _i = 0, aKeys_1 = aKeys; _i < aKeys_1.length; _i++) {
            var key = aKeys_1[_i];
            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    else {
        return a === b;
    }
}
//# sourceMappingURL=utils.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(26)
  , IObject  = __webpack_require__(50)
  , toObject = __webpack_require__(9)
  , toLength = __webpack_require__(8)
  , asc      = __webpack_require__(163);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0)
  , core    = __webpack_require__(23)
  , fails   = __webpack_require__(3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(12);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(131)
  , $export = __webpack_require__(0)
  , shared  = __webpack_require__(65)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(134)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(6)){
  var LIBRARY             = __webpack_require__(34)
    , global              = __webpack_require__(2)
    , fails               = __webpack_require__(3)
    , $export             = __webpack_require__(0)
    , $typed              = __webpack_require__(66)
    , $buffer             = __webpack_require__(94)
    , ctx                 = __webpack_require__(26)
    , anInstance          = __webpack_require__(29)
    , propertyDesc        = __webpack_require__(31)
    , hide                = __webpack_require__(11)
    , redefineAll         = __webpack_require__(38)
    , isInteger           = __webpack_require__(81)
    , toInteger           = __webpack_require__(32)
    , toLength            = __webpack_require__(8)
    , toIndex             = __webpack_require__(40)
    , toPrimitive         = __webpack_require__(25)
    , has                 = __webpack_require__(10)
    , same                = __webpack_require__(128)
    , classof             = __webpack_require__(43)
    , isObject            = __webpack_require__(4)
    , toObject            = __webpack_require__(9)
    , isArrayIter         = __webpack_require__(79)
    , create              = __webpack_require__(35)
    , getPrototypeOf      = __webpack_require__(17)
    , gOPN                = __webpack_require__(36).f
    , isIterable          = __webpack_require__(170)
    , getIterFn           = __webpack_require__(96)
    , uid                 = __webpack_require__(41)
    , wks                 = __webpack_require__(5)
    , createArrayMethod   = __webpack_require__(22)
    , createArrayIncludes = __webpack_require__(55)
    , speciesConstructor  = __webpack_require__(88)
    , ArrayIterators      = __webpack_require__(97)
    , Iterators           = __webpack_require__(33)
    , $iterDetect         = __webpack_require__(61)
    , setSpecies          = __webpack_require__(39)
    , arrayFill           = __webpack_require__(72)
    , arrayCopyWithin     = __webpack_require__(109)
    , $DP                 = __webpack_require__(7)
    , $GOPD               = __webpack_require__(16)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(41)('meta')
  , isObject = __webpack_require__(4)
  , has      = __webpack_require__(10)
  , setDesc  = __webpack_require__(7).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(3)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(1)
  , dPs         = __webpack_require__(121)
  , enumBugKeys = __webpack_require__(75)
  , IE_PROTO    = __webpack_require__(87)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(74)('iframe')
    , i      = enumBugKeys.length
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(77).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(123)
  , hiddenKeys = __webpack_require__(75).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(123)
  , enumBugKeys = __webpack_require__(75);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(13);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , dP          = __webpack_require__(7)
  , DESCRIPTORS = __webpack_require__(6)
  , SPECIES     = __webpack_require__(5)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(11)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(18)
  , TAG = __webpack_require__(5)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(26)
  , call        = __webpack_require__(117)
  , isArrayIter = __webpack_require__(79)
  , anObject    = __webpack_require__(1)
  , toLength    = __webpack_require__(8)
  , getIterFn   = __webpack_require__(96)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f
  , has = __webpack_require__(10)
  , TAG = __webpack_require__(5)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , defined = __webpack_require__(19)
  , fails   = __webpack_require__(3)
  , spaces  = __webpack_require__(92)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functor__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractApplicative; });
/* harmony export (immutable) */ __webpack_exports__["b"] = applicative;
/* harmony export (immutable) */ __webpack_exports__["c"] = of;
/* harmony export (immutable) */ __webpack_exports__["d"] = ap;
/* harmony export (immutable) */ __webpack_exports__["e"] = lift;
/* harmony export (immutable) */ __webpack_exports__["f"] = seq;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var AbstractApplicative = (function (_super) {
    __extends(AbstractApplicative, _super);
    function AbstractApplicative() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractApplicative.prototype.ap = function (f) {
        return this.lift(__WEBPACK_IMPORTED_MODULE_1__utils__["i" /* apply */], f, this);
    };
    AbstractApplicative.prototype.lift = function () {
        var f = arguments[0];
        switch (arguments.length - 1) {
            case 1:
                return arguments[1].map(f);
            case 2:
                return arguments[2].ap(arguments[1].map(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["j" /* curry2 */])(f)));
            case 3:
                return arguments[3].ap(arguments[2].ap(arguments[1].map(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["k" /* curry3 */])(f))));
        }
    };
    AbstractApplicative.prototype.map = function (f) {
        return this.ap(this.of(f));
    };
    return AbstractApplicative;
}(__WEBPACK_IMPORTED_MODULE_0__functor__["a" /* AbstractFunctor */]));

function applicative(constructor) {
    var prototype = constructor.prototype;
    if (!("of" in prototype)) {
        throw new TypeError("Can't derive applicative. `of` method missing.");
    }
    if (!("ap" in prototype) && !("lift" in prototype)) {
        throw new TypeError("Can't derive applicative. Either `lift` or `ap` method must be defined.");
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* mixin */])(constructor, [__WEBPACK_IMPORTED_MODULE_0__functor__["a" /* AbstractFunctor */], AbstractApplicative]);
}
function isArrayConstructor(a) {
    return a === Array;
}
function of(d, a) {
    if (isArrayConstructor(d)) {
        return [a];
    }
    else {
        return d.of(a);
    }
}
function arrayLift(f, args, indices) {
    if (args.length === indices.length) {
        var values = [];
        for (var i = 0; i < args.length; ++i) {
            values[i] = args[i][indices[i]];
        }
        return [f.apply(undefined, values)];
    }
    else {
        var results = [];
        for (var i = 0; i < args[indices.length].length; ++i) {
            results = results.concat(arrayLift(f, args, indices.concat(i)));
        }
        return results;
    }
}
function ap(fa, ba) {
    return ba.ap(fa);
}
// implementation
function lift(f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (Array.isArray(args[0])) {
        return arrayLift(f, args, []);
    }
    else {
        return (_a = args[0]).lift.apply(_a, [f].concat(args));
    }
    var _a;
}
function seq(a, b) {
    return ap(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__functor__["d" /* mapTo */])(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* id */], a), b);
}
//# sourceMappingURL=applicative.js.map

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__semigroup__ = __webpack_require__(105);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return __WEBPACK_IMPORTED_MODULE_0__semigroup__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monoid__ = __webpack_require__(103);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return __WEBPACK_IMPORTED_MODULE_1__monoid__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__functor__ = __webpack_require__(101);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AbstractFunctor", function() { return __WEBPACK_IMPORTED_MODULE_2__functor__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "functor", function() { return __WEBPACK_IMPORTED_MODULE_2__functor__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "map", function() { return __WEBPACK_IMPORTED_MODULE_2__functor__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "mapTo", function() { return __WEBPACK_IMPORTED_MODULE_2__functor__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "mapMap", function() { return __WEBPACK_IMPORTED_MODULE_2__functor__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applicative__ = __webpack_require__(47);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AbstractApplicative", function() { return __WEBPACK_IMPORTED_MODULE_3__applicative__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "applicative", function() { return __WEBPACK_IMPORTED_MODULE_3__applicative__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "of", function() { return __WEBPACK_IMPORTED_MODULE_3__applicative__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ap", function() { return __WEBPACK_IMPORTED_MODULE_3__applicative__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "lift", function() { return __WEBPACK_IMPORTED_MODULE_3__applicative__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "seq", function() { return __WEBPACK_IMPORTED_MODULE_3__applicative__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__monad__ = __webpack_require__(49);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AbstractMonad", function() { return __WEBPACK_IMPORTED_MODULE_4__monad__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "monad", function() { return __WEBPACK_IMPORTED_MODULE_4__monad__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return __WEBPACK_IMPORTED_MODULE_4__monad__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return __WEBPACK_IMPORTED_MODULE_4__monad__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "go", function() { return __WEBPACK_IMPORTED_MODULE_4__monad__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fgo", function() { return __WEBPACK_IMPORTED_MODULE_4__monad__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foldable__ = __webpack_require__(70);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AbstractFoldable", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "foldable", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "foldMap", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "foldr", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "foldl", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "size", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "take", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "find", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "findLast", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "findLastIndex", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "shortFoldl", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "all", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "any", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sequence_", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "foldrM", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "maximum", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "minimum", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sum", function() { return __WEBPACK_IMPORTED_MODULE_5__foldable__["u"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__traversable__ = __webpack_require__(106);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AbstractTraversable", function() { return __WEBPACK_IMPORTED_MODULE_6__traversable__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "traversable", function() { return __WEBPACK_IMPORTED_MODULE_6__traversable__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sequence", function() { return __WEBPACK_IMPORTED_MODULE_6__traversable__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "traverse", function() { return __WEBPACK_IMPORTED_MODULE_6__traversable__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "mapAccumR", function() { return __WEBPACK_IMPORTED_MODULE_6__traversable__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__maybe__ = __webpack_require__(102);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Maybe", function() { return __WEBPACK_IMPORTED_MODULE_7__maybe__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "just", function() { return __WEBPACK_IMPORTED_MODULE_7__maybe__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "nothing", function() { return __WEBPACK_IMPORTED_MODULE_7__maybe__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isNothing", function() { return __WEBPACK_IMPORTED_MODULE_7__maybe__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isJust", function() { return __WEBPACK_IMPORTED_MODULE_7__maybe__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fromMaybe", function() { return __WEBPACK_IMPORTED_MODULE_7__maybe__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "maybe", function() { return __WEBPACK_IMPORTED_MODULE_7__maybe__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__either__ = __webpack_require__(69);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EitherTag", function() { return __WEBPACK_IMPORTED_MODULE_8__either__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Either", function() { return __WEBPACK_IMPORTED_MODULE_8__either__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Left", function() { return __WEBPACK_IMPORTED_MODULE_8__either__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Right", function() { return __WEBPACK_IMPORTED_MODULE_8__either__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "left", function() { return __WEBPACK_IMPORTED_MODULE_8__either__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "right", function() { return __WEBPACK_IMPORTED_MODULE_8__either__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isLeft", function() { return __WEBPACK_IMPORTED_MODULE_8__either__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isRight", function() { return __WEBPACK_IMPORTED_MODULE_8__either__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fromEither", function() { return __WEBPACK_IMPORTED_MODULE_8__either__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__conslist__ = __webpack_require__(142);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Cons", function() { return __WEBPACK_IMPORTED_MODULE_9__conslist__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "nil", function() { return __WEBPACK_IMPORTED_MODULE_9__conslist__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "cons", function() { return __WEBPACK_IMPORTED_MODULE_9__conslist__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fromArray", function() { return __WEBPACK_IMPORTED_MODULE_9__conslist__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__infinitelist__ = __webpack_require__(146);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InfiniteList", function() { return __WEBPACK_IMPORTED_MODULE_10__infinitelist__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return __WEBPACK_IMPORTED_MODULE_10__infinitelist__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "naturals", function() { return __WEBPACK_IMPORTED_MODULE_10__infinitelist__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__io__ = __webpack_require__(147);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Call", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CallP", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ThrowE", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CatchE", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "IO", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "withEffects", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "withEffectsP", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "call", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "callP", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "throwE", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "catchE", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "doRunIO", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "runIO", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "testIO", function() { return __WEBPACK_IMPORTED_MODULE_11__io__["n"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__writer__ = __webpack_require__(148);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Writer", function() { return __WEBPACK_IMPORTED_MODULE_12__writer__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "runWriter", function() { return __WEBPACK_IMPORTED_MODULE_12__writer__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "createWriter", function() { return __WEBPACK_IMPORTED_MODULE_12__writer__["c"]; });













//# sourceMappingURL=index.js.map

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractMonad; });
/* harmony export (immutable) */ __webpack_exports__["b"] = monad;
/* harmony export (immutable) */ __webpack_exports__["c"] = flatten;
/* harmony export (immutable) */ __webpack_exports__["d"] = chain;
/* harmony export (immutable) */ __webpack_exports__["e"] = go;
/* harmony export (immutable) */ __webpack_exports__["f"] = fgo;

var AbstractMonad = (function () {
    function AbstractMonad() {
    }
    AbstractMonad.prototype.chain = function (f) {
        return this.map(f).flatten();
    };
    AbstractMonad.prototype.flatten = function () {
        return this.chain(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* id */]);
    };
    AbstractMonad.prototype.map = function (f) {
        var _this = this;
        return this.chain(function (a) { return _this.of(f(a)); });
    };
    AbstractMonad.prototype.mapTo = function (b) {
        var _this = this;
        return this.chain(function (_) { return _this.of(b); });
    };
    AbstractMonad.prototype.ap = function (m) {
        var _this = this;
        return m.chain(function (f) { return _this.chain(function (a) { return _this.of(f(a)); }); });
    };
    AbstractMonad.prototype.lift = function (f) {
        var ms = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ms[_i - 1] = arguments[_i];
        }
        var of = ms[0].of;
        switch (f.length) {
            case 1:
                return ms[0].map(f);
            case 2:
                return ms[0].chain(function (a) { return ms[1].chain(function (b) { return of(f(a, b)); }); });
            case 3:
                return ms[0].chain(function (a) { return ms[1].chain(function (b) { return ms[2].chain(function (c) { return of(f(a, b, c)); }); }); });
        }
    };
    return AbstractMonad;
}());

function monad(constructor) {
    var p = constructor.prototype;
    if (!("of" in p)) {
        throw new TypeError("Can't derive monad. `of` method missing.");
    }
    if (!("chain" in p) && !("flatten" in p && "map" in p)) {
        throw new TypeError("Can't derive monad. Either `chain` or `flatten` and `map` method must be defined.");
    }
    if (!("multi" in p)) {
        p.multi = false;
    }
    if (!("multi" in constructor)) {
        constructor.multi = false;
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* mixin */])(constructor, [AbstractMonad]);
}
function flatten(m) {
    if (Array.isArray(m)) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* arrayFlatten */])(m);
    }
    else {
        return m.flatten();
    }
}
function arrayChain(f, m) {
    var result = [];
    for (var i = 0; i < m.length; ++i) {
        var added = f(m[i]);
        for (var j = 0; j < added.length; ++j) {
            result.push(added[j]);
        }
    }
    return result;
}
function chain(f, m) {
    if (Array.isArray(m)) {
        return arrayChain(f, m);
    }
    else {
        return m.chain(f);
    }
}
function singleGo(doing, m) {
    function doRec(v) {
        var result = doing.next(v);
        if (result.done === true) {
            return m.of(result.value);
        }
        else if (typeof result.value !== "undefined") {
            return result.value.chain(doRec);
        }
        else {
            throw new Error("Expected monad value");
        }
    }
    return m.chain(doRec);
}
;
function multiGo(gen, m) {
    var doRec = function (v, stateSoFar) {
        var doing = gen();
        for (var _i = 0, stateSoFar_1 = stateSoFar; _i < stateSoFar_1.length; _i++) {
            var it_1 = stateSoFar_1[_i];
            doing.next(it_1);
        }
        var result = doing.next(v);
        if (result.done === true) {
            return m.of(result.value);
        }
        else {
            var newStateSoFar_1 = stateSoFar.concat(v);
            return result.value.chain(function (vv) { return doRec(vv, newStateSoFar_1); });
        }
    };
    return m.chain(function (vv) { return doRec(vv, [undefined]); });
}
;
function go(gen) {
    var iterator = gen();
    var result = iterator.next();
    var monad = result.value;
    if (result.done === true) {
        return monad;
    }
    else if (monad.multi === true) {
        return multiGo(gen, monad);
    }
    else {
        return singleGo(iterator, monad);
    }
}
function fgo(gen) {
    var m;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var doing = gen.apply(void 0, args);
        function doRec(v) {
            var a = doing.next(v);
            if (a.done === true) {
                return m.of(a.value);
            }
            else if (typeof a.value !== "undefined") {
                m = a.value;
                return a.value.chain(doRec);
            }
            else {
                throw new Error("Expected monad value");
            }
        }
        return doRec(undefined);
    };
}
//# sourceMappingURL=monad.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(18);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jabz_1 = __webpack_require__(48);
var frp_common_1 = __webpack_require__(100);
var future_1 = __webpack_require__(53);
var F = __webpack_require__(53);
var IncompleteObserver = (function () {
    function IncompleteObserver() {
    }
    IncompleteObserver.prototype.beginPulling = function () {
        throw new Error("beginPulling not implemented");
    };
    IncompleteObserver.prototype.endPulling = function () {
        throw new Error("beginPushing not implemented");
    };
    IncompleteObserver.prototype.push = function (a) {
        throw new Error("push not implemented");
    };
    return IncompleteObserver;
}());
var OnlyPushObserver = (function () {
    function OnlyPushObserver(cb) {
        this.cb = cb;
    }
    ;
    OnlyPushObserver.prototype.beginPulling = function () { };
    OnlyPushObserver.prototype.endPulling = function () { };
    OnlyPushObserver.prototype.push = function (a) {
        this.cb(a);
    };
    return OnlyPushObserver;
}());
/**
 * A behavior is a value that changes over time. Conceptually it can
 * be though of as a function from time to a value. I.e. `type
 * Behavior<A> = (t: Time) => A`.
 */
var Behavior = (function () {
    function Behavior() {
        this.multi = false;
        this.child = frp_common_1.noopObserver;
        this.nrOfListeners = 0;
    }
    Behavior.prototype.map = function (fn) {
        var newB = new MapBehavior(this, fn);
        this.addListener(newB);
        return newB;
    };
    Behavior.prototype.mapTo = function (v) {
        return new ConstantBehavior(v);
    };
    Behavior.of = function (v) {
        return new ConstantBehavior(v);
    };
    ;
    Behavior.prototype.of = function (v) {
        return new ConstantBehavior(v);
    };
    Behavior.prototype.ap = function (f) {
        var newB = new ApBehavior(f, this);
        f.addListener(newB);
        this.addListener(newB);
        return newB;
    };
    Behavior.prototype.lift = function () {
        // TODO: Experiment with faster specialized `lift` implementation
        var f = arguments[0];
        switch (arguments.length - 1) {
            case 1:
                return arguments[1].map(f);
            case 2:
                return arguments[2].ap(arguments[1].map(function (a) { return function (b) { return f(a, b); }; }));
            case 3:
                return arguments[3].ap(arguments[2].ap(arguments[1].map(function (a) { return function (b) { return function (c) { return f(a, b, c); }; }; })));
        }
    };
    Behavior.prototype.chain = function (fn) {
        return new ChainBehavior(this, fn);
    };
    Behavior.prototype.endPulling = function () {
        this.pushing = true;
        this.child.endPulling();
    };
    Behavior.prototype.beginPulling = function () {
        this.pushing = false;
        this.child.beginPulling();
    };
    Behavior.prototype.subscribe = function (cb) {
        var listener = new OnlyPushObserver(cb);
        this.addListener(listener);
        cb(at(this));
        return listener;
    };
    Behavior.prototype.addListener = function (c) {
        var nr = ++this.nrOfListeners;
        if (nr === 1) {
            this.child = c;
        }
        else if (nr === 2) {
            this.child = new frp_common_1.MultiObserver(this.child, c);
        }
        else {
            this.child.listeners.push(c);
        }
    };
    Behavior.prototype.removeListener = function (listener) {
        var nr = --this.nrOfListeners;
        if (nr === 0) {
            this.child = frp_common_1.noopObserver;
        }
        else if (nr === 1) {
            var l = this.child.listeners;
            this.child = l[l[0] === listener ? 1 : 0];
        }
        else {
            var l = this.child.listeners;
            // The indexOf here is O(n), where n is the number of listeners,
            // if using a linked list it should be possible to perform the
            // unsubscribe operation in constant time.
            var idx = l.indexOf(listener);
            if (idx !== -1) {
                if (idx !== l.length - 1) {
                    l[idx] = l[l.length - 1];
                }
                l.length--; // remove the last element of the list
            }
        }
    };
    Behavior.prototype.observe = function (push, beginPulling, endPulling) {
        return new CbObserver(push, beginPulling, endPulling, this);
    };
    Behavior.prototype.at = function () {
        return this.pushing === true ? this.last : this.pull();
    };
    return Behavior;
}());
Behavior.multi = false;
Behavior = __decorate([
    jabz_1.monad
], Behavior);
exports.Behavior = Behavior;
/*
 * Impure function that gets the current value of a behavior. For a
 * pure variant see `sample`.
 */
function at(b) {
    return b.at();
}
exports.at = at;
/** @private */
var ConstantBehavior = (function (_super) {
    __extends(ConstantBehavior, _super);
    function ConstantBehavior(last) {
        var _this = _super.call(this) || this;
        _this.last = last;
        _this.pushing = true;
        return _this;
    }
    ConstantBehavior.prototype.push = function () {
        throw new Error("Cannot push a value to a constant behavior");
    };
    ConstantBehavior.prototype.pull = function () {
        return this.last;
    };
    return ConstantBehavior;
}(Behavior));
/** @private */
var MapBehavior = (function (_super) {
    __extends(MapBehavior, _super);
    function MapBehavior(parent, fn) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.fn = fn;
        _this.pushing = parent.pushing;
        if (_this.pushing === true) {
            _this.last = fn(at(parent));
        }
        return _this;
    }
    MapBehavior.prototype.push = function (a) {
        this.last = this.fn(a);
        this.child.push(this.last);
    };
    MapBehavior.prototype.pull = function () {
        return this.fn(at(this.parent));
    };
    return MapBehavior;
}(Behavior));
/** @private */
var ChainOuter = (function (_super) {
    __extends(ChainOuter, _super);
    function ChainOuter(chainB) {
        var _this = _super.call(this) || this;
        _this.chainB = chainB;
        return _this;
    }
    ;
    ChainOuter.prototype.push = function (a) {
        this.chainB.pushOuter(a);
    };
    return ChainOuter;
}(IncompleteObserver));
/** @private */
var ChainBehavior = (function (_super) {
    __extends(ChainBehavior, _super);
    function ChainBehavior(outer, fn) {
        var _this = _super.call(this) || this;
        _this.outer = outer;
        _this.fn = fn;
        // Create the outer consumer
        _this.outerConsumer = new ChainOuter(_this);
        // Make the consumers listen to inner and outer behavior
        outer.addListener(_this.outerConsumer);
        if (outer.pushing === true) {
            _this.innerB = _this.fn(at(_this.outer));
            _this.pushing = _this.innerB.pushing;
            _this.innerB.addListener(_this);
            _this.last = at(_this.innerB);
        }
        return _this;
    }
    ChainBehavior.prototype.pushOuter = function (a) {
        // The outer behavior has changed. This means that we will have to
        // call our function, which will result in a new inner behavior.
        // We therefore stop listening to the old inner behavior and begin
        // listening to the new one.
        if (this.innerB !== undefined) {
            this.innerB.removeListener(this);
        }
        var newInner = this.innerB = this.fn(a);
        this.pushing = newInner.pushing;
        newInner.addListener(this);
        this.push(at(newInner));
    };
    ChainBehavior.prototype.push = function (b) {
        this.last = b;
        this.child.push(b);
    };
    ChainBehavior.prototype.pull = function () {
        return at(this.fn(at(this.outer)));
    };
    return ChainBehavior;
}(Behavior));
/** @private */
var FunctionBehavior = (function (_super) {
    __extends(FunctionBehavior, _super);
    function FunctionBehavior(fn) {
        var _this = _super.call(this) || this;
        _this.fn = fn;
        _this.pushing = false;
        return _this;
    }
    FunctionBehavior.prototype.push = function (v) {
        throw new Error("Cannot push to a FunctionBehavior");
    };
    FunctionBehavior.prototype.pull = function () {
        return this.fn();
    };
    return FunctionBehavior;
}(Behavior));
/** @private */
var ApBehavior = (function (_super) {
    __extends(ApBehavior, _super);
    function ApBehavior(fn, val) {
        var _this = _super.call(this) || this;
        _this.fn = fn;
        _this.val = val;
        _this.pushing = fn.pushing && val.pushing;
        if (_this.pushing) {
            _this.last = at(fn)(at(val));
        }
        return _this;
    }
    ApBehavior.prototype.push = function () {
        var fn = at(this.fn);
        var val = at(this.val);
        this.last = fn(val);
        this.child.push(this.last);
    };
    ApBehavior.prototype.pull = function () {
        return at(this.fn)(at(this.val));
    };
    return ApBehavior;
}(Behavior));
/**
 * Apply a function valued behavior to a value behavior.
 *
 * @param fnB behavior of functions from `A` to `B`
 * @param valB A behavior of `A`
 * @returns Behavior of the function in `fnB` applied to the value in `valB`
 */
function ap(fnB, valB) {
    return valB.ap(fnB);
}
exports.ap = ap;
/** @private */
var SinkBehavior = (function (_super) {
    __extends(SinkBehavior, _super);
    function SinkBehavior(last) {
        var _this = _super.call(this) || this;
        _this.last = last;
        _this.pushing = true;
        return _this;
    }
    SinkBehavior.prototype.push = function (v) {
        if (this.last !== v) {
            this.last = v;
            this.child.push(v);
        }
    };
    SinkBehavior.prototype.pull = function () {
        return this.last;
    };
    return SinkBehavior;
}(Behavior));
/**
 * Creates a behavior for imperative impure pushing.
 */
function sink(initialValue) {
    return new SinkBehavior(initialValue);
}
exports.sink = sink;
/**
 * A placeholder behavior is a behavior without any value. It is used
 * to do value recursion in `./framework.ts`.
 * @private
 */
var PlaceholderBehavior = (function (_super) {
    __extends(PlaceholderBehavior, _super);
    function PlaceholderBehavior() {
        var _this = _super.call(this) || this;
        // `undefined` indicates that this behavior is neither pushing nor
        // pulling
        _this.pushing = undefined;
        return _this;
    }
    PlaceholderBehavior.prototype.push = function (v) {
        this.last = v;
        this.child.push(v);
    };
    PlaceholderBehavior.prototype.pull = function () {
        return this.source.pull();
    };
    PlaceholderBehavior.prototype.replaceWith = function (b) {
        this.source = b;
        b.addListener(this);
        this.pushing = b.pushing;
        if (b.pushing === true) {
            this.push(at(b));
        }
        else {
            this.beginPulling();
        }
    };
    return PlaceholderBehavior;
}(Behavior));
exports.PlaceholderBehavior = PlaceholderBehavior;
function behaviorPlaceholder() {
    return new PlaceholderBehavior();
}
exports.behaviorPlaceholder = behaviorPlaceholder;
/** @private */
var WhenBehavior = (function (_super) {
    __extends(WhenBehavior, _super);
    function WhenBehavior(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.pushing = true;
        parent.addListener(_this);
        _this.push(at(parent));
        return _this;
    }
    WhenBehavior.prototype.push = function (val) {
        if (val === true) {
            this.last = future_1.Future.of({});
        }
        else {
            this.last = new future_1.BehaviorFuture(this.parent);
        }
    };
    WhenBehavior.prototype.pull = function () {
        return this.last;
    };
    return WhenBehavior;
}(Behavior));
function when(b) {
    return new WhenBehavior(b);
}
exports.when = when;
// FIXME: This can probably be made less ugly.
/** @private */
var SnapshotBehavior = (function (_super) {
    __extends(SnapshotBehavior, _super);
    function SnapshotBehavior(parent, future) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        if (future.occured === true) {
            // Future has occurred at some point in the past
            _this.afterFuture = true;
            _this.pushing = parent.pushing;
            parent.addListener(_this);
            _this.last = future_1.Future.of(at(parent));
        }
        else {
            _this.afterFuture = false;
            _this.pushing = true;
            _this.last = F.sinkFuture();
            future.listen(_this);
        }
        return _this;
    }
    SnapshotBehavior.prototype.push = function (val) {
        if (this.afterFuture === false) {
            // The push is coming from the Future, it has just occurred.
            this.afterFuture = true;
            this.last.resolve(at(this.parent));
            this.parent.addListener(this);
        }
        else {
            // We are recieving an update from `parent` after `future` has
            // occurred.
            this.last = future_1.Future.of(val);
        }
    };
    SnapshotBehavior.prototype.pull = function () {
        return this.last;
    };
    return SnapshotBehavior;
}(Behavior));
function snapshotAt(b, f) {
    return new SnapshotBehavior(b, f);
}
exports.snapshotAt = snapshotAt;
/** @private */
var SwitcherBehavior = (function (_super) {
    __extends(SwitcherBehavior, _super);
    function SwitcherBehavior(b, next) {
        var _this = _super.call(this) || this;
        _this.b = b;
        _this.pushing = b.pushing;
        if (_this.pushing === true) {
            _this.last = at(b);
        }
        b.addListener(_this);
        // FIXME: Using `bind` is hardly optimal for performance.
        next.subscribe(_this.doSwitch.bind(_this));
        return _this;
    }
    SwitcherBehavior.prototype.push = function (val) {
        this.last = val;
        this.child.push(val);
    };
    SwitcherBehavior.prototype.pull = function () {
        return at(this.b);
    };
    SwitcherBehavior.prototype.doSwitch = function (newB) {
        this.b.removeListener(this);
        this.b = newB;
        newB.addListener(this);
        if (newB.pushing === true) {
            if (this.pushing === false) {
                this.endPulling();
            }
            this.push(at(newB));
        }
        else if (this.pushing === true) {
            this.beginPulling();
        }
    };
    return SwitcherBehavior;
}(Behavior));
function switchTo(init, next) {
    return new SwitcherBehavior(init, next);
}
exports.switchTo = switchTo;
function switcher(init, stream) {
    return fromFunction(function () { return new SwitcherBehavior(init, stream); });
}
exports.switcher = switcher;
/** @private */
var StepperBehavior = (function (_super) {
    __extends(StepperBehavior, _super);
    function StepperBehavior(initial, steps) {
        var _this = _super.call(this) || this;
        _this.steps = steps;
        _this.pushing = true;
        _this.last = initial;
        steps.addListener(_this);
        return _this;
    }
    StepperBehavior.prototype.push = function (val) {
        this.last = val;
        this.child.push(val);
    };
    StepperBehavior.prototype.pull = function () {
        throw new Error("Cannot pull from StepperBehavior");
    };
    return StepperBehavior;
}(Behavior));
function stepper(initial, steps) {
    return new StepperBehavior(initial, steps);
}
exports.stepper = stepper;
/** @private */
var ScanBehavior = (function (_super) {
    __extends(ScanBehavior, _super);
    function ScanBehavior(initial, fn, source) {
        var _this = _super.call(this) || this;
        _this.fn = fn;
        _this.source = source;
        _this.pushing = true;
        _this.last = initial;
        source.addListener(_this);
        return _this;
    }
    ScanBehavior.prototype.push = function (val) {
        this.last = this.fn(val, this.last);
        this.child.push(this.last);
    };
    ScanBehavior.prototype.pull = function () {
        throw new Error("Cannot pull from Scan");
    };
    return ScanBehavior;
}(Behavior));
function scan(fn, init, source) {
    return fromFunction(function () { return new ScanBehavior(init, fn, source); });
}
exports.scan = scan;
function toggle(initial, turnOn, turnOff) {
    return stepper(initial, turnOn.mapTo(true).combine(turnOff.mapTo(false)));
}
exports.toggle = toggle;
function fromFunction(fn) {
    return new FunctionBehavior(fn);
}
exports.fromFunction = fromFunction;
var CbObserver = (function () {
    function CbObserver(_push, _beginPulling, _endPulling, source) {
        this._push = _push;
        this._beginPulling = _beginPulling;
        this._endPulling = _endPulling;
        this.source = source;
        source.addListener(this);
        // We explicitly checks for both `true` and `false` because
        // placeholder behavior is `undefined`
        if (source.pushing === false) {
            _beginPulling();
        }
        else if (source.pushing === true) {
            _push(source.last);
        }
    }
    CbObserver.prototype.push = function (a) {
        this._push(a);
    };
    CbObserver.prototype.beginPulling = function () {
        this._beginPulling();
    };
    CbObserver.prototype.endPulling = function () {
        this._endPulling();
    };
    return CbObserver;
}());
exports.CbObserver = CbObserver;
/**
 * Observe a behavior for the purpose of executing imperative actions
 * based on the value of the behavior.
 */
function observe(push, beginPulling, endPulling, b) {
    return b.observe(push, beginPulling, endPulling);
}
exports.observe = observe;
/**
 * Imperatively push a value into a behavior.
 */
function publish(a, b) {
    b.push(a);
}
exports.publish = publish;
function isBehavior(b) {
    return typeof b === "object" && ("observe" in b) && ("at" in b);
}
exports.isBehavior = isBehavior;
var TimeFromBehavior = (function (_super) {
    __extends(TimeFromBehavior, _super);
    function TimeFromBehavior() {
        var _this = _super.call(this) || this;
        _this.startTime = Date.now();
        _this.pushing = false;
        return _this;
    }
    TimeFromBehavior.prototype.push = function () {
        throw new Error("Cannot push to TimeFromBehavior");
    };
    TimeFromBehavior.prototype.pull = function () {
        return Date.now() - this.startTime;
    };
    return TimeFromBehavior;
}(Behavior));
exports.time = fromFunction(Date.now);
exports.timeFrom = fromFunction(function () { return new TimeFromBehavior(); });
var IntegrateBehavior = (function (_super) {
    __extends(IntegrateBehavior, _super);
    function IntegrateBehavior(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.lastPullTime = Date.now();
        _this.pushing = false;
        _this.value = 0;
        return _this;
    }
    IntegrateBehavior.prototype.push = function () {
        throw new Error("Cannot push to TimeFromBehavior");
    };
    IntegrateBehavior.prototype.pull = function () {
        var currentPullTime = Date.now();
        var deltaSeconds = (currentPullTime - this.lastPullTime) / 1000;
        this.value += deltaSeconds * at(this.parent);
        this.lastPullTime = currentPullTime;
        return this.value;
    };
    return IntegrateBehavior;
}(Behavior));
function integrate(behavior) {
    return fromFunction(function () { return new IntegrateBehavior(behavior); });
}
exports.integrate = integrate;
//# sourceMappingURL=behavior.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jabz_1 = __webpack_require__(48);
/**
 * A future is a thing that occurs at some point in time with a value.
 * It can be understood as a pair consisting of the time the future
 * occurs and its associated value. It is quite like a JavaScript
 * promise.
 */
var Future = (function () {
    function Future() {
        this.multi = false;
        this.listeners = [];
    }
    Future.prototype.listen = function (o) {
        if (this.occured !== true) {
            this.listeners.push(o);
        }
        else {
            o.push(this.value);
        }
    };
    Future.prototype.subscribe = function (f) {
        new Subscription(f, this);
    };
    Future.prototype.resolve = function (val) {
        this.occured = true;
        this.value = val;
        var listeners = this.listeners;
        for (var i = 0, l = listeners.length; i < l; ++i) {
            listeners[i].push(val);
        }
    };
    // A future is a functor, when the future occurs we can feed its
    // result through the mapping function
    Future.prototype.map = function (f) {
        return new MapFuture(f, this);
    };
    Future.prototype.mapTo = function (b) {
        return new MapToFuture(b, this);
    };
    // A future is an applicative. `of` gives a future that has always
    // occured at all points in time.
    Future.of = function (b) {
        return new PureFuture(b);
    };
    Future.prototype.of = function (b) {
        return new PureFuture(b);
    };
    Future.prototype.lift = function (f) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return f.length === 1 ? new MapFuture(f, args[0])
            : new LiftFuture(f, args);
    };
    // A future is a monad. Once the first future occurs `chain` passes
    // its value through the chain function and the future it returns is
    // the one returned by `chain`.
    Future.prototype.chain = function (f) {
        return new ChainFuture(f, this);
    };
    return Future;
}());
Future = __decorate([
    jabz_1.monad
], Future);
exports.Future = Future;
var MapFuture = (function (_super) {
    __extends(MapFuture, _super);
    function MapFuture(f, parent) {
        var _this = _super.call(this) || this;
        _this.f = f;
        _this.parent = parent;
        parent.listen(_this);
        return _this;
    }
    MapFuture.prototype.push = function (val) {
        this.resolve(this.f(val));
    };
    return MapFuture;
}(Future));
var MapToFuture = (function (_super) {
    __extends(MapToFuture, _super);
    function MapToFuture(value, parent) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.parent = parent;
        parent.listen(_this);
        return _this;
    }
    MapToFuture.prototype.push = function (_) {
        this.resolve(this.value);
    };
    return MapToFuture;
}(Future));
var PureFuture = (function (_super) {
    __extends(PureFuture, _super);
    function PureFuture(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.occured = true;
        return _this;
    }
    PureFuture.prototype.push = function (_) {
        throw new Error("A PureFuture should never be pushed to.");
    };
    return PureFuture;
}(Future));
var LiftFuture = (function (_super) {
    __extends(LiftFuture, _super);
    function LiftFuture(f, futures) {
        var _this = _super.call(this) || this;
        _this.f = f;
        _this.futures = futures;
        _this.delivered = 0;
        var l = _this.dependencies = futures.length;
        for (var i = 0; i < l; ++i) {
            futures[i].listen(_this);
        }
        return _this;
    }
    LiftFuture.prototype.push = function (_) {
        var l = this.dependencies;
        if (++this.delivered === l) {
            // All the dependencies have occurred.
            for (var i = 0; i < l; ++i) {
                this.futures[i] = this.futures[i].value;
            }
            this.resolve(this.f.apply(undefined, this.futures));
        }
    };
    return LiftFuture;
}(Future));
var ChainFuture = (function (_super) {
    __extends(ChainFuture, _super);
    function ChainFuture(f, parent) {
        var _this = _super.call(this) || this;
        _this.f = f;
        _this.parent = parent;
        _this.parentOccurred = false;
        parent.listen(_this);
        return _this;
    }
    ChainFuture.prototype.push = function (val) {
        if (this.parentOccurred === false) {
            // The first future occured. We can now call `f` with its value
            // and listen to the future it returns.
            this.parentOccurred = true;
            var newFuture = this.f(val);
            newFuture.listen(this);
        }
        else {
            this.resolve(val);
        }
    };
    return ChainFuture;
}(Future));
// A Sink is a producer that one can imperatively resolve.
var FutureSink = (function (_super) {
    __extends(FutureSink, _super);
    function FutureSink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FutureSink.prototype.push = function (val) {
        throw new Error("A sink should never be pushed to.");
    };
    return FutureSink;
}(Future));
function sinkFuture() {
    return new FutureSink();
}
exports.sinkFuture = sinkFuture;
// A subscription is a consumer that performs a side-effect
var Subscription = (function () {
    function Subscription(f, parent) {
        this.f = f;
        this.parent = parent;
        parent.listen(this);
    }
    Subscription.prototype.push = function (a) {
        this.f(a); // let `f` perform its side-effect.
    };
    return Subscription;
}());
function fromPromise(p) {
    var future = sinkFuture();
    p.then(future.resolve.bind(future));
    return future;
}
exports.fromPromise = fromPromise;
/**
 * Create a future from a pushing behavior. The future occurs when the
 * behavior pushes its next value. Constructing a BehaviorFuture is
 * impure and should not be done direcly.
 * @private
 */
var BehaviorFuture = (function (_super) {
    __extends(BehaviorFuture, _super);
    function BehaviorFuture(b) {
        var _this = _super.call(this) || this;
        _this.b = b;
        b.addListener(_this);
        return _this;
    }
    BehaviorFuture.prototype.endPulling = function () {
        throw new Error("Behavior future should never switch to pushing");
    };
    BehaviorFuture.prototype.beginPulling = function () {
        throw new Error("Behavior future does not support pushing behavior");
    };
    BehaviorFuture.prototype.push = function (a) {
        this.b.removeListener(this);
        this.resolve(a);
    };
    return BehaviorFuture;
}(Future));
exports.BehaviorFuture = BehaviorFuture;
//# sourceMappingURL=future.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @module hareactive/stream */

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var frp_common_1 = __webpack_require__(100);
var behavior_1 = __webpack_require__(52);
/**
 * A stream is a list of occurences over time. Each occurence happens
 * at a discrete point in time and has an associated value.
 * Semantically it is a list `type Stream<A> = [Time, A]`.
 */
var Stream = (function (_super) {
    __extends(Stream, _super);
    function Stream() {
        return _super.call(this) || this;
    }
    Stream.prototype.map = function (fn) {
        var s = new MapStream(fn);
        this.addListener(s);
        return s;
    };
    Stream.prototype.mapTo = function (val) {
        var s = new MapToStream(val);
        this.addListener(s);
        return s;
    };
    Stream.prototype.combine = function (otherStream) {
        var s = new SinkStream();
        this.addListener(s);
        otherStream.addListener(s);
        return s;
    };
    Stream.prototype.filter = function (fn) {
        var s = new FilterStream(fn);
        this.addListener(s);
        return s;
    };
    Stream.prototype.scanS = function (fn, startingValue) {
        var _this = this;
        return behavior_1.fromFunction(function () { return new ScanStream(fn, startingValue, _this); });
    };
    Stream.prototype.scan = function (fn, init) {
        return behavior_1.scan(fn, init, this);
    };
    Stream.prototype.delay = function (ms) {
        var s = new DelayStream(ms);
        this.addListener(s);
        return s;
    };
    Stream.prototype.throttle = function (ms) {
        var s = new ThrottleStream(ms);
        this.addListener(s);
        return s;
    };
    Stream.prototype.debounce = function (ms) {
        var s = new DebounceStream(ms);
        this.addListener(s);
        return s;
    };
    return Stream;
}(frp_common_1.Reactive));
exports.Stream = Stream;
/** @private */
var SinkStream = (function (_super) {
    __extends(SinkStream, _super);
    function SinkStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SinkStream.prototype.push = function (a) {
        this.child.push(a);
    };
    return SinkStream;
}(Stream));
exports.SinkStream = SinkStream;
var MapStream = (function (_super) {
    __extends(MapStream, _super);
    function MapStream(fn) {
        var _this = _super.call(this) || this;
        _this.fn = fn;
        return _this;
    }
    MapStream.prototype.push = function (a) {
        this.child.push(this.fn(a));
    };
    return MapStream;
}(Stream));
var MapToStream = (function (_super) {
    __extends(MapToStream, _super);
    function MapToStream(val) {
        var _this = _super.call(this) || this;
        _this.val = val;
        return _this;
    }
    MapToStream.prototype.push = function (a) {
        this.child.push(this.val);
    };
    return MapToStream;
}(Stream));
var FilterStream = (function (_super) {
    __extends(FilterStream, _super);
    function FilterStream(fn) {
        var _this = _super.call(this) || this;
        _this.fn = fn;
        return _this;
    }
    FilterStream.prototype.push = function (a) {
        if (this.fn(a) === true) {
            this.child.push(a);
        }
    };
    return FilterStream;
}(Stream));
var DelayStream = (function (_super) {
    __extends(DelayStream, _super);
    function DelayStream(ms) {
        var _this = _super.call(this) || this;
        _this.ms = ms;
        return _this;
    }
    DelayStream.prototype.push = function (a) {
        var _this = this;
        setTimeout(function () { return _this.child.push(a); }, this.ms);
    };
    return DelayStream;
}(Stream));
var ThrottleStream = (function (_super) {
    __extends(ThrottleStream, _super);
    function ThrottleStream(ms) {
        var _this = _super.call(this) || this;
        _this.ms = ms;
        _this.isSilenced = false;
        return _this;
    }
    ThrottleStream.prototype.push = function (a) {
        var _this = this;
        if (!this.isSilenced) {
            this.child.push(a);
            this.isSilenced = true;
            setTimeout(function () {
                _this.isSilenced = false;
            }, this.ms);
        }
    };
    return ThrottleStream;
}(Stream));
var DebounceStream = (function (_super) {
    __extends(DebounceStream, _super);
    function DebounceStream(ms) {
        var _this = _super.call(this) || this;
        _this.ms = ms;
        _this.timer = undefined;
        return _this;
    }
    DebounceStream.prototype.push = function (a) {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            _this.child.push(a);
        }, this.ms);
    };
    return DebounceStream;
}(Stream));
function debounce(ms, stream) {
    return stream.debounce(ms);
}
exports.debounce = debounce;
function throttle(ms, stream) {
    return stream.throttle(ms);
}
exports.throttle = throttle;
function delay(ms, stream) {
    return stream.delay(ms);
}
exports.delay = delay;
function apply(behavior, stream) {
    return stream.map(function (a) { return behavior_1.at(behavior)(a); });
}
exports.apply = apply;
/**
 * @param fn A predicate function that returns a boolean for `A`.
 * @param stream The stream to filter.
 * @returns Stream that only contains the occurences from `stream`
 * for which `fn` returns true.
 */
function filter(predicate, s) {
    return s.filter(predicate);
}
exports.filter = filter;
function split(predicate, stream) {
    // It should be possible to implement this in a faster way where
    // `predicate` is only called once for each occurrence
    return [stream.filter(predicate), stream.filter(function (a) { return !predicate(a); })];
}
exports.split = split;
function filterApply(predicate, stream) {
    return stream.filter(function (a) { return behavior_1.at(predicate)(a); });
}
exports.filterApply = filterApply;
function keepWhen(stream, behavior) {
    return stream.filter(function (_) { return behavior_1.at(behavior); });
}
exports.keepWhen = keepWhen;
var ScanStream = (function (_super) {
    __extends(ScanStream, _super);
    function ScanStream(fn, last, source) {
        var _this = _super.call(this) || this;
        _this.fn = fn;
        _this.last = last;
        source.addListener(_this);
        return _this;
    }
    ScanStream.prototype.push = function (a) {
        var val = this.last = this.fn(a, this.last);
        this.child.push(val);
    };
    return ScanStream;
}(Stream));
/**
 * The returned  initially has the initial value, on each
 * occurence in `source` the function is applied to the current value
 * of the behaviour and the value of the occurence, the returned value
 * becomes the next value of the behavior.
 */
function scanS(fn, startingValue, stream) {
    return stream.scanS(fn, startingValue);
}
exports.scanS = scanS;
var SnapshotStream = (function (_super) {
    __extends(SnapshotStream, _super);
    function SnapshotStream(behavior, stream) {
        var _this = _super.call(this) || this;
        _this.behavior = behavior;
        stream.addListener(_this);
        return _this;
    }
    SnapshotStream.prototype.push = function (a) {
        this.child.push(behavior_1.at(this.behavior));
    };
    return SnapshotStream;
}(Stream));
function snapshot(b, s) {
    return new SnapshotStream(b, s);
}
exports.snapshot = snapshot;
var SnapshotWithStream = (function (_super) {
    __extends(SnapshotWithStream, _super);
    function SnapshotWithStream(fn, behavior, stream) {
        var _this = _super.call(this) || this;
        _this.fn = fn;
        _this.behavior = behavior;
        stream.addListener(_this);
        return _this;
    }
    SnapshotWithStream.prototype.push = function (a) {
        this.child.push(this.fn(a, behavior_1.at(this.behavior)));
    };
    return SnapshotWithStream;
}(Stream));
function snapshotWith(f, b, s) {
    return new SnapshotWithStream(f, b, s);
}
exports.snapshotWith = snapshotWith;
/** @private */
var SwitchOuter = (function () {
    function SwitchOuter(s) {
        this.s = s;
    }
    ;
    SwitchOuter.prototype.beginPulling = function () {
        throw new Error("not implemented");
    };
    SwitchOuter.prototype.endPulling = function () {
        throw new Error("not implemented");
    };
    SwitchOuter.prototype.push = function (a) {
        this.s.doSwitch(a);
    };
    return SwitchOuter;
}());
var SwitchBehaviorStream = (function (_super) {
    __extends(SwitchBehaviorStream, _super);
    function SwitchBehaviorStream(b) {
        var _this = _super.call(this) || this;
        _this.b = b;
        _this.outerConsumer = new SwitchOuter(_this);
        b.addListener(_this.outerConsumer);
        var cur = _this.currentSource = behavior_1.at(b);
        cur.addListener(_this);
        return _this;
    }
    SwitchBehaviorStream.prototype.push = function (a) {
        this.child.push(a);
    };
    SwitchBehaviorStream.prototype.doSwitch = function (newStream) {
        this.currentSource.removeListener(this);
        newStream.addListener(this);
        this.currentSource = newStream;
    };
    return SwitchBehaviorStream;
}(Stream));
function switchStream(b) {
    return new SwitchBehaviorStream(b);
}
exports.switchStream = switchStream;
var ChangesStream = (function (_super) {
    __extends(ChangesStream, _super);
    function ChangesStream(b) {
        var _this = _super.call(this) || this;
        _this.b = b;
        b.addListener(_this);
        return _this;
    }
    ChangesStream.prototype.push = function (a) {
        this.child.push(a);
    };
    ChangesStream.prototype.beginPulling = function () {
        throw new Error("Cannot get changes from pulling behavior");
    };
    ChangesStream.prototype.endPulling = function () {
        throw new Error("Cannot get changes from pulling behavior");
    };
    return ChangesStream;
}(Stream));
function changes(b) {
    return new ChangesStream(b);
}
exports.changes = changes;
var PlaceholderStream = (function (_super) {
    __extends(PlaceholderStream, _super);
    function PlaceholderStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlaceholderStream.prototype.push = function (a) {
        this.child.push(a);
    };
    PlaceholderStream.prototype.replaceWith = function (s) {
        this.source = s;
        s.addListener(this);
    };
    return PlaceholderStream;
}(Stream));
exports.PlaceholderStream = PlaceholderStream;
function placeholderStream() {
    return new PlaceholderStream();
}
exports.placeholderStream = placeholderStream;
function combineList(ss) {
    // FIXME: More performant implementation with benchmark
    return ss.reduce(function (s1, s2) { return s1.combine(s2); }, empty());
}
exports.combineList = combineList;
/**
 * @returns A stream that never has any occurrences.
 */
function empty() {
    return new SinkStream();
}
exports.empty = empty;
function subscribe(fn, stream) {
    stream.subscribe(fn);
}
exports.subscribe = subscribe;
function combine(a, b) {
    return a.combine(b);
}
exports.combine = combine;
function isStream(s) {
    return typeof s === "object" && ("scanS" in s);
}
exports.isStream = isStream;
//# sourceMappingURL=stream.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15)
  , toLength  = __webpack_require__(8)
  , toIndex   = __webpack_require__(40);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , $export           = __webpack_require__(0)
  , redefine          = __webpack_require__(13)
  , redefineAll       = __webpack_require__(38)
  , meta              = __webpack_require__(30)
  , forOf             = __webpack_require__(44)
  , anInstance        = __webpack_require__(29)
  , isObject          = __webpack_require__(4)
  , fails             = __webpack_require__(3)
  , $iterDetect       = __webpack_require__(61)
  , setToStringTag    = __webpack_require__(45)
  , inheritIfRequired = __webpack_require__(78);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(11)
  , redefine = __webpack_require__(13)
  , fails    = __webpack_require__(3)
  , defined  = __webpack_require__(19)
  , wks      = __webpack_require__(5);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4)
  , cof      = __webpack_require__(18)
  , MATCH    = __webpack_require__(5)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(5)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(34)|| !__webpack_require__(3)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(2)[K];
});

/***/ }),
/* 63 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4)
  , anObject = __webpack_require__(1);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(26)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , hide   = __webpack_require__(11)
  , uid    = __webpack_require__(41)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funkia_jabz__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__funkia_hareactive___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(99);
/* harmony export (immutable) */ __webpack_exports__["a"] = isGeneratorFunction;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Component; });
/* harmony export (immutable) */ __webpack_exports__["c"] = runComponent;
/* harmony export (immutable) */ __webpack_exports__["d"] = testComponent;
/* harmony export (immutable) */ __webpack_exports__["e"] = isComponent;
/* harmony export (immutable) */ __webpack_exports__["f"] = loop;
/* harmony export (immutable) */ __webpack_exports__["g"] = modelView;
/* harmony export (immutable) */ __webpack_exports__["h"] = viewObserve;
/* harmony export (immutable) */ __webpack_exports__["i"] = isChild;
/* harmony export (immutable) */ __webpack_exports__["j"] = text;
/* harmony export (immutable) */ __webpack_exports__["k"] = toComponent;
/* harmony export (immutable) */ __webpack_exports__["l"] = dynamic;
/* harmony export (immutable) */ __webpack_exports__["m"] = list;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const supportsProxy = "Proxy" in window;
function isShowable(s) {
    return typeof s === "string" || typeof s === "number";
}
function fst(a) { return a[0]; }
function snd(a) { return a[1]; }
function isGeneratorFunction(fn) {
    return fn !== undefined
        && fn.constructor !== undefined
        && fn.constructor.name === "GeneratorFunction";
}
/**
 * A component is a function from a parent DOM node to a now
 * computation I.e. something like `type Component<A> = (p: Node) =>
 * Now<A>`. We don't define it as a type alias because we wan't to
 * make it a monad in different way than Now.
 */
let Component = Component_1 = class Component {
    constructor(content) {
        this.content = content;
        this.multi = false;
    }
    static of(b) {
        return new Component_1(() => __WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["Now"].of(b));
    }
    of(b) {
        return Component_1.of(b);
    }
    chain(f) {
        return new Component_1((parent) => {
            return this.content(parent).chain((a) => {
                return f(a).content(parent);
            });
        });
    }
};
Component.multi = false;
Component = Component_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__funkia_jabz__["monad"]
], Component);

/** Run component and the now-computation inside */
function runComponent(parent, c) {
    if (typeof parent === "string") {
        parent = document.querySelector(parent);
    }
    return c.content(parent).run();
}
function testComponent(c) {
    const dom = document.createElement("div");
    const out = runComponent(dom, c);
    return {
        out,
        dom
    };
}
function isComponent(c) {
    return c instanceof Component;
}
const placeholderProxyHandler = {
    get: function (target, name) {
        if (!(name in target)) {
            target[name] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["placeholder"])();
        }
        return target[name];
    }
};
class MfixComponentNow extends __WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["Now"] {
    constructor(f, parent, placeholderNames) {
        super();
        this.f = f;
        this.parent = parent;
        this.placeholderNames = placeholderNames;
    }
    run() {
        let placeholderObject;
        if (supportsProxy) {
            placeholderObject = new Proxy({}, placeholderProxyHandler);
        }
        else {
            placeholderObject = {};
            if (this.placeholderNames !== undefined) {
                for (const name of this.placeholderNames) {
                    placeholderObject[name] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["placeholder"])();
                }
            }
        }
        const result = this.f(placeholderObject).content(this.parent).run();
        const returned = Object.keys(result);
        for (const name of returned) {
            (placeholderObject[name]).replaceWith(result[name]);
        }
        return result;
    }
}
function loop(f, placeholderNames) {
    if (isGeneratorFunction(f)) {
        f = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__funkia_jabz__["fgo"])(f);
    }
    return new Component((parent) => new MfixComponentNow(f, parent, placeholderNames));
}
class MfixNow extends __WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["Now"] {
    constructor(fn, placeholderNames) {
        super();
        this.fn = fn;
        this.placeholderNames = placeholderNames;
    }
    ;
    run() {
        let placeholders;
        if (supportsProxy) {
            placeholders = new Proxy({}, placeholderProxyHandler);
        }
        else {
            placeholders = {};
            if (this.placeholderNames !== undefined) {
                for (const name of this.placeholderNames) {
                    placeholders[name] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["placeholder"])();
                }
            }
        }
        const [behaviors, out] = this.fn(placeholders).run();
        // Tie the recursive knot
        for (const name of Object.keys(behaviors)) {
            (placeholders[name]).replaceWith(behaviors[name]);
        }
        return [behaviors, out];
    }
    ;
}
function addErrorHandler(modelName, viewName, obj) {
    if (modelName === "") {
        modelName = "anonymous";
    }
    if (viewName === "") {
        viewName = "anonymous";
    }
    if (!supportsProxy) {
        return obj;
    }
    return new Proxy(obj, {
        get(object, prop) {
            if (prop in obj) {
                return object[prop];
            }
            throw new Error(`The model, ${modelName}, expected a property "${prop}" but the view, ${viewName}, returned an object without the property.`);
        }
    });
}
function modelView(model, view, toViewReactiveNames) {
    const modelName = model.name;
    const viewName = view.name;
    const m = isGeneratorFunction(model) ? (v) => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__funkia_jabz__["fgo"])(model)(v) : model;
    const v = isGeneratorFunction(view) ? (md) => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__funkia_jabz__["fgo"])(view)(md) : (md) => toComponent(view(md));
    return new Component((parent) => new MfixNow((bs) => v(bs).content(parent).map((o) => addErrorHandler(modelName, viewName, o)).chain(m), toViewReactiveNames).map(snd));
}
function viewObserve(update, behavior) {
    let isPulling = false;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["observe"])(update, () => {
        isPulling = true;
        function pull() {
            update(behavior.pull());
            if (isPulling) {
                requestAnimationFrame(pull);
            }
        }
        pull();
    }, () => {
        isPulling = false;
    }, behavior);
}
function isChild(a) {
    return isComponent(a) || isGeneratorFunction(a) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["isBehavior"])(a) || isShowable(a) || Array.isArray(a);
}
function text(s) {
    return new Component((parent) => {
        parent.appendChild(document.createTextNode(s.toString()));
        return __WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["Now"].of({});
    });
}
;
function toComponent(child) {
    if (isComponent(child)) {
        return child;
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["isBehavior"])(child)) {
        return dynamic(child);
    }
    else if (isGeneratorFunction(child)) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__funkia_jabz__["go"])(child);
    }
    else if (isShowable(child)) {
        return text(child);
    }
    else if (Array.isArray(child)) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__funkia_jabz__["sequence"])(Component, child.map(toComponent)).map((res) => res.reduce(__WEBPACK_IMPORTED_MODULE_2__utils__["e" /* merge */], {}));
    }
}
class DynamicComponent extends __WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["Now"] {
    constructor(parent, bChild) {
        super();
        this.parent = parent;
        this.bChild = bChild;
    }
    run() {
        const start = document.createComment("Dynamic begin");
        const end = document.createComment("Dynamic end");
        this.parent.appendChild(start);
        this.parent.appendChild(end);
        let currentlyShowable;
        let wasShowable = false;
        const performed = this.bChild.map((child) => {
            currentlyShowable = isShowable(child);
            if (currentlyShowable && wasShowable) {
                return [undefined, child];
            }
            const fragment = document.createDocumentFragment();
            const a = runComponent(fragment, toComponent(child));
            return [a, fragment];
        });
        let showableNode;
        viewObserve(([_, node]) => {
            if (currentlyShowable && wasShowable) {
                showableNode.nodeValue = node.toString();
            }
            else {
                if (currentlyShowable) {
                    showableNode = node.firstChild;
                    wasShowable = true;
                }
                else {
                    wasShowable = false;
                }
                let i = start.nextSibling;
                while (i !== end) {
                    const j = i;
                    i = i.nextSibling;
                    this.parent.removeChild(j);
                }
                this.parent.insertBefore(node, end);
            }
        }, performed);
        return performed.map(fst);
    }
}
function dynamic(behavior) {
    return new Component((p) => new DynamicComponent(p, behavior));
}
class ComponentListNow extends __WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["Now"] {
    constructor(parent, getKey, compFn, list) {
        super();
        this.parent = parent;
        this.getKey = getKey;
        this.compFn = compFn;
        this.list = list;
    }
    run() {
        // The reordering code below is neither pretty nor fast. But it at
        // least avoids recreating elements and is quite simple.
        const resultB = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__funkia_hareactive__["sink"])([]);
        const end = document.createComment("list end");
        let keyToElm = {};
        this.parent.appendChild(end);
        this.list.subscribe((newAs) => {
            const newKeyToElm = {};
            const newArray = [];
            // Re-add existing elements and new elements
            for (let i = 0; i < newAs.length; i++) {
                const a = newAs[i];
                const key = this.getKey(a, i);
                let stuff = keyToElm[key];
                if (stuff === undefined) {
                    const fragment = document.createDocumentFragment();
                    const out = runComponent(fragment, this.compFn(a));
                    // Assumes component only adds a single element
                    stuff = { out, elm: fragment.firstChild };
                }
                this.parent.insertBefore(stuff.elm, end);
                newArray.push(stuff.out);
                newKeyToElm[key] = stuff;
            }
            // Remove elements that are no longer present
            const oldKeys = Object.keys(keyToElm);
            for (const key of oldKeys) {
                if (newKeyToElm[key] === undefined) {
                    this.parent.removeChild(keyToElm[key].elm);
                }
            }
            keyToElm = newKeyToElm;
            resultB.push(newArray);
        });
        return resultB;
    }
}
function list(c, getKey, l) {
    return new Component((p) => new ComponentListNow(p, getKey, c, l));
}
var Component_1;
//# sourceMappingURL=component.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(52));
__export(__webpack_require__(54));
__export(__webpack_require__(53));
__export(__webpack_require__(140));
__export(__webpack_require__(139));
__export(__webpack_require__(141));
function map(fn, b) {
    return b.map(fn);
}
exports.map = map;
//# sourceMappingURL=index.js.map

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EitherTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Either; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Left; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Right; });
/* harmony export (immutable) */ __webpack_exports__["e"] = left;
/* harmony export (immutable) */ __webpack_exports__["f"] = right;
/* harmony export (immutable) */ __webpack_exports__["g"] = isLeft;
/* harmony export (immutable) */ __webpack_exports__["h"] = isRight;
/* harmony export (immutable) */ __webpack_exports__["i"] = fromEither;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EitherTag;
(function (EitherTag) {
    EitherTag[EitherTag["Left"] = 0] = "Left";
    EitherTag[EitherTag["Right"] = 1] = "Right";
})(EitherTag || (EitherTag = {}));
var Either = (function () {
    function Either() {
    }
    Either.of = function (b) {
        return new Right(b);
    };
    Either.prototype.of = function (b) {
        return new Right(b);
    };
    Either.prototype.ap = function (a) {
        if (a.tag === EitherTag.Left) {
            return a;
        }
        else {
            return this.map(a.val);
        }
    };
    Either.prototype.lift = function (f) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < args.length; i++) {
            if (args[i].tag === EitherTag.Left) {
                return args[i];
            }
        }
        var rights = [];
        for (var i = 0; i < args.length; i++) {
            rights.push(args[i].val);
        }
        return new Right(f.apply(void 0, rights));
    };
    return Either;
}());

var Left = (function (_super) {
    __extends(Left, _super);
    function Left(a) {
        var _this = _super.call(this) || this;
        _this.tag = EitherTag.Left;
        _this.val = a;
        return _this;
    }
    Left.prototype.match = function (m) {
        return m.left(this.val);
    };
    Left.prototype.map = function (f) {
        // return this as Left<A, C>;
        return new Left(this.val);
    };
    Left.prototype.mapTo = function (c) {
        return new Left(this.val);
    };
    return Left;
}(Either));

var Right = (function (_super) {
    __extends(Right, _super);
    function Right(b) {
        var _this = _super.call(this) || this;
        _this.tag = EitherTag.Right;
        _this.val = b;
        return _this;
    }
    Right.prototype.match = function (m) {
        return m.right(this.val);
    };
    Right.prototype.map = function (f) {
        // return this as Left<A, C>;
        return new Right(f(this.val));
    };
    Right.prototype.mapTo = function (c) {
        return new Right(c);
    };
    return Right;
}(Either));

function left(a) {
    return new Left(a);
}
function right(b) {
    return new Right(b);
}
function isLeft(a) {
    return a.tag === EitherTag.Left;
}
function isRight(a) {
    return a.tag === EitherTag.Right;
}
function fromEither(e) {
    return e.val;
}
//# sourceMappingURL=either.js.map

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__applicative__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maybe__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__either__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractFoldable; });
/* harmony export (immutable) */ __webpack_exports__["b"] = foldable;
/* harmony export (immutable) */ __webpack_exports__["c"] = foldMap;
/* harmony export (immutable) */ __webpack_exports__["d"] = foldr;
/* harmony export (immutable) */ __webpack_exports__["e"] = foldl;
/* harmony export (immutable) */ __webpack_exports__["f"] = size;
/* harmony export (immutable) */ __webpack_exports__["g"] = isEmpty;
/* harmony export (immutable) */ __webpack_exports__["h"] = take;
/* harmony export (immutable) */ __webpack_exports__["i"] = find;
/* harmony export (immutable) */ __webpack_exports__["j"] = findLast;
/* harmony export (immutable) */ __webpack_exports__["k"] = findIndex;
/* harmony export (immutable) */ __webpack_exports__["l"] = findLastIndex;
/* harmony export (immutable) */ __webpack_exports__["m"] = shortFoldl;
/* harmony export (immutable) */ __webpack_exports__["n"] = all;
/* harmony export (immutable) */ __webpack_exports__["o"] = any;
/* harmony export (immutable) */ __webpack_exports__["p"] = toArray;
/* harmony export (immutable) */ __webpack_exports__["q"] = sequence_;
/* harmony export (immutable) */ __webpack_exports__["r"] = foldrM;
/* harmony export (immutable) */ __webpack_exports__["s"] = maximum;
/* harmony export (immutable) */ __webpack_exports__["t"] = minimum;
/* harmony export (immutable) */ __webpack_exports__["u"] = sum;




function incr(_, acc) {
    return acc + 1;
}
var AbstractFoldable = (function () {
    function AbstractFoldable() {
    }
    AbstractFoldable.prototype.foldl = function (f, init) {
        return this.foldr(function (a, r) { return function (acc) { return r(f(acc, a)); }; }, __WEBPACK_IMPORTED_MODULE_3__utils__["c" /* id */])(init);
    };
    AbstractFoldable.prototype.shortFoldr = function (f, acc) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["i" /* fromEither */])(this.foldr(function (a, eb) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["h" /* isRight */])(eb) ? f(a, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["i" /* fromEither */])(eb)) : eb; }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["f" /* right */])(acc)));
    };
    AbstractFoldable.prototype.shortFoldl = function (f, acc) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["i" /* fromEither */])(this.foldl(function (eb, a) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["h" /* isRight */])(eb) ? f(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["i" /* fromEither */])(eb), a) : eb; }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["f" /* right */])(acc)));
    };
    AbstractFoldable.prototype.size = function () {
        return this.foldr(incr, 0);
    };
    AbstractFoldable.prototype.maximum = function () {
        return this.foldr(Math.max, -Infinity);
    };
    AbstractFoldable.prototype.minimum = function () {
        return this.foldr(Math.min, Infinity);
    };
    AbstractFoldable.prototype.sum = function () {
        return this.foldr(__WEBPACK_IMPORTED_MODULE_3__utils__["f" /* add */], 0);
    };
    return AbstractFoldable;
}());

function foldable(constructor) {
    var p = constructor.prototype;
    if (!("foldr" in p)) {
        throw new TypeError("Can't derive foldable. `foldr` method missing.");
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["d" /* mixin */])(constructor, [AbstractFoldable]);
}
function foldMap(f, a) {
    return foldr(function (a, b) { return f.create(a).combine(b); }, f.identity(), a);
}
function foldr(f, init, a) {
    if (a instanceof Array) {
        for (var i = a.length - 1; 0 <= i; --i) {
            init = f(a[i], init);
        }
        return init;
    }
    else {
        return a.foldr(f, init);
    }
}
function foldl(f, init, a) {
    if (a instanceof Array) {
        for (var i = 0; i < a.length; ++i) {
            init = f(init, a[i]);
        }
        return init;
    }
    else {
        return a.foldl(f, init);
    }
}
function size(a) {
    if (a instanceof Array) {
        return a.length;
    }
    else {
        return a.size();
    }
}
function isEmpty(a) {
    if (a instanceof Array) {
        return a.length === 0;
    }
    else {
        return a.shortFoldl(function (_, a) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["e" /* left */])(false); }, true);
    }
}
function take(n, t) {
    var list = [];
    if (n === 0) {
        return list;
    }
    else {
        return t.shortFoldl(function (list, a) {
            list.push(a);
            return (list.length === n ? __WEBPACK_IMPORTED_MODULE_2__either__["e" /* left */] : __WEBPACK_IMPORTED_MODULE_2__either__["f" /* right */])(list);
        }, list);
    }
}
function find(f, t) {
    return t.shortFoldl(function (acc, a) { return f(a) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["e" /* left */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__maybe__["b" /* just */])(a)) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["f" /* right */])(acc); }, __WEBPACK_IMPORTED_MODULE_1__maybe__["c" /* nothing */]);
}
function findLast(f, t) {
    return t.shortFoldr(function (a, acc) { return f(a) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["e" /* left */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__maybe__["b" /* just */])(a)) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["f" /* right */])(acc); }, __WEBPACK_IMPORTED_MODULE_1__maybe__["c" /* nothing */]);
}
function findIndex(f, t) {
    var idx = t.shortFoldl(function (idx, a) { return f(a) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["e" /* left */])(-idx) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["f" /* right */])(idx - 1); }, 0);
    return idx >= 0 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__maybe__["b" /* just */])(idx) : __WEBPACK_IMPORTED_MODULE_1__maybe__["c" /* nothing */];
}
function findLastIndex(f, t) {
    var idx = t.shortFoldr(function (a, idx) { return f(a) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["e" /* left */])(-idx) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["f" /* right */])(idx - 1); }, -1);
    return idx >= 0 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__maybe__["b" /* just */])(t.size() - idx) : __WEBPACK_IMPORTED_MODULE_1__maybe__["c" /* nothing */];
}
function shortFoldl(f, acc, l) {
    return l.shortFoldl(f, acc);
}
function all(pred, foldable) {
    return shortFoldl(function (_, val) { return pred(val) === true ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["f" /* right */])(true) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["e" /* left */])(false); }, true, foldable);
}
function any(pred, foldable) {
    return shortFoldl(function (_, val) { return pred(val) === true ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["e" /* left */])(true) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__either__["f" /* right */])(false); }, false, foldable);
}
function toArray(t) {
    if (Array.isArray(t)) {
        return t;
    }
    else {
        return t.foldl(__WEBPACK_IMPORTED_MODULE_3__utils__["g" /* impurePush */], []);
    }
}
function sequence_(d, t) {
    return foldr(__WEBPACK_IMPORTED_MODULE_0__applicative__["f" /* seq */], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__applicative__["c" /* of */])(d, undefined), t);
}
function foldrM(f, mb, t) {
    return foldr(function (a, mb) { return mb.chain(function (b) { return f(a, b); }); }, mb, t);
}
function maximum(t) {
    return t.maximum();
}
function minimum(t) {
    return t.minimum();
}
function sum(t) {
    return t.sum();
}
//# sourceMappingURL=foldable.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9)
  , toIndex  = __webpack_require__(40)
  , toLength = __webpack_require__(8);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7)
  , createDesc      = __webpack_require__(31);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 75 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(4)
  , setPrototypeOf = __webpack_require__(64).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(33)
  , ITERATOR   = __webpack_require__(5)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(18);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(35)
  , descriptor     = __webpack_require__(31)
  , setToStringTag = __webpack_require__(45)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(34)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(13)
  , hide           = __webpack_require__(11)
  , has            = __webpack_require__(10)
  , Iterators      = __webpack_require__(33)
  , $iterCreate    = __webpack_require__(82)
  , setToStringTag = __webpack_require__(45)
  , getPrototypeOf = __webpack_require__(17)
  , ITERATOR       = __webpack_require__(5)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 84 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 85 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(93).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(18)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(65)('keys')
  , uid    = __webpack_require__(41);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(1)
  , aFunction = __webpack_require__(12)
  , SPECIES   = __webpack_require__(5)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , defined   = __webpack_require__(19);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(60)
  , defined  = __webpack_require__(19);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(32)
  , defined   = __webpack_require__(19);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(26)
  , invoke             = __webpack_require__(59)
  , html               = __webpack_require__(77)
  , cel                = __webpack_require__(74)
  , global             = __webpack_require__(2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(18)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(2)
  , DESCRIPTORS    = __webpack_require__(6)
  , LIBRARY        = __webpack_require__(34)
  , $typed         = __webpack_require__(66)
  , hide           = __webpack_require__(11)
  , redefineAll    = __webpack_require__(38)
  , fails          = __webpack_require__(3)
  , anInstance     = __webpack_require__(29)
  , toInteger      = __webpack_require__(32)
  , toLength       = __webpack_require__(8)
  , gOPN           = __webpack_require__(36).f
  , dP             = __webpack_require__(7).f
  , arrayFill      = __webpack_require__(72)
  , setToStringTag = __webpack_require__(45)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , parseInt       = global.parseInt
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , min            = Math.min
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(23)
  , LIBRARY        = __webpack_require__(34)
  , wksExt         = __webpack_require__(130)
  , defineProperty = __webpack_require__(7).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(43)
  , ITERATOR  = __webpack_require__(5)('iterator')
  , Iterators = __webpack_require__(33);
module.exports = __webpack_require__(23).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(42)
  , step             = __webpack_require__(118)
  , Iterators        = __webpack_require__(33)
  , toIObject        = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(83)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funkia_hareactive__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__funkia_hareactive___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__funkia_hareactive__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(99);
/* harmony export (immutable) */ __webpack_exports__["a"] = streamDescription;
/* harmony export (immutable) */ __webpack_exports__["b"] = behaviorDescription;
/* harmony export (immutable) */ __webpack_exports__["d"] = element;



function streamDescription(eventName, f) {
    return [eventName, f]; // The third value don't exist it's for type info only
}
function behaviorDescription(eventName, f, init) {
    return [eventName, f, init]; // The fourth value don't exist it's for type info only
}
// An array of names of all DOM events
const allDomEvents = Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document)))
    .filter((i) => i.indexOf("on") === 0)
    .map((name) => name.slice(2));
/* harmony export (immutable) */ __webpack_exports__["c"] = allDomEvents;

// Output streams that _all_ elements share
const defaultStreams = {};
for (const name of allDomEvents) {
    defaultStreams[name] = streamDescription(name, __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* id */]);
}
const defaultProperties = {
    streams: defaultStreams
};
const attributeSetter = (element) => (key, value) => {
    if (value === true) {
        element.setAttribute(key, "");
    }
    else if (value === false) {
        element.removeAttribute(key);
    }
    else {
        element.setAttribute(key, value);
    }
};
const propertySetter = (element) => (key, value) => element[key] = value;
const classSetter = (element) => (key, value) => element.classList.toggle(key, value);
const styleSetter = (element) => (key, value) => element.style[key] = value;
function handleObject(object, element, createSetter) {
    if (object !== undefined) {
        const setter = createSetter(element);
        for (const key of Object.keys(object)) {
            const value = object[key];
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__funkia_hareactive__["isBehavior"])(value)) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__component__["h" /* viewObserve */])((newValue) => setter(key, newValue), value);
            }
            else {
                setter(key, value);
            }
        }
    }
}
function handleCustom(elm, isStreamActions, actionDefinitions, actions) {
    if (actions !== undefined) {
        for (const name of Object.keys(actions)) {
            const actionTrigger = actions[name];
            const actionDefinition = actionDefinitions[name];
            if (isStreamActions) {
                actionTrigger.subscribe((value) => actionDefinition(elm, value));
            }
            else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__component__["h" /* viewObserve */])((value) => actionDefinition(elm, value), actionTrigger);
            }
        }
    }
}
class CreateDomNow extends __WEBPACK_IMPORTED_MODULE_0__funkia_hareactive__["Now"] {
    constructor(parent, tagName, props, children) {
        super();
        this.parent = parent;
        this.tagName = tagName;
        this.props = props;
        this.children = children;
    }
    ;
    run() {
        let output = {};
        const elm = document.createElement(this.tagName);
        if (this.props !== undefined) {
            handleObject(this.props.style, elm, styleSetter);
            handleObject(this.props.attrs, elm, attributeSetter);
            handleObject(this.props.props, elm, propertySetter);
            handleObject(this.props.classToggle, elm, classSetter);
            if (this.props.class !== undefined) {
                const classes = this.props.class.split(" ");
                for (const name of classes) {
                    elm.classList.add(name);
                }
            }
            handleCustom(elm, true, this.props.actionDefinitions, this.props.actions);
            handleCustom(elm, false, this.props.actionDefinitions, this.props.setters);
            if (this.props.behaviors !== undefined) {
                for (const name of Object.keys(this.props.behaviors)) {
                    const [evt, extractor, initialFn] = this.props.behaviors[name];
                    let a = undefined;
                    const initial = initialFn(elm);
                    Object.defineProperty(output, name, {
                        enumerable: true,
                        get: () => {
                            if (a === undefined) {
                                a = behaviorFromEvent(evt, initial, extractor, elm);
                            }
                            return a;
                        }
                    });
                }
            }
            if (this.props.streams !== undefined) {
                for (const name of Object.keys(this.props.streams)) {
                    const [evt, extractor] = this.props.streams[name];
                    let a = undefined;
                    if (output[name] === undefined) {
                        Object.defineProperty(output, name, {
                            enumerable: true,
                            get: () => {
                                if (a === undefined) {
                                    a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__funkia_hareactive__["streamFromEvent"])(evt, elm, extractor);
                                }
                                return a;
                            }
                        });
                    }
                }
            }
        }
        if (this.children !== undefined) {
            const childOutput = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__component__["c" /* runComponent */])(elm, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__component__["k" /* toComponent */])(this.children));
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* assign */])(output, childOutput);
        }
        if (this.props.output !== undefined) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* rename */])(output, this.props.output);
        }
        this.parent.appendChild(elm);
        return output;
    }
}
function parseCSSTagname(cssTagName) {
    const parsedTag = cssTagName.split(/(?=\.)|(?=#)|(?=\[)/);
    const result = {};
    for (let i = 1; i < parsedTag.length; i++) {
        const token = parsedTag[i];
        switch (token[0]) {
            case "#":
                result.props = result.props || {};
                result.props.id = token.slice(1);
                break;
            case ".":
                result.classToggle = result.classToggle || {};
                result.classToggle[token.slice(1)] = true;
                break;
            case "[":
                result.attrs = result.attrs || {};
                const attr = token.slice(1, -1).split("=");
                result.attrs[attr[0]] = attr[1] || "";
                break;
            default:
                throw new Error("Unknown symbol");
        }
    }
    return [parsedTag[0], result];
}
function element(tagName, props) {
    const [parsedTagName, tagProps] = parseCSSTagname(tagName);
    props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* mergeDeep */])(props, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* mergeDeep */])(defaultProperties, tagProps));
    function createElement(newPropsOrChildren, newChildrenOrUndefined) {
        if (newChildrenOrUndefined === undefined && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__component__["i" /* isChild */])(newPropsOrChildren)) {
            return new __WEBPACK_IMPORTED_MODULE_1__component__["b" /* Component */]((p) => new CreateDomNow(p, parsedTagName, props, newPropsOrChildren));
        }
        else {
            const newProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* mergeDeep */])(props, newPropsOrChildren);
            return new __WEBPACK_IMPORTED_MODULE_1__component__["b" /* Component */]((p) => new CreateDomNow(p, parsedTagName, newProps, newChildrenOrUndefined));
        }
    }
    return createElement;
}
function behaviorFromEvent(eventName, initial, extractor, dom) {
    const b = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__funkia_hareactive__["sink"])(initial);
    dom.addEventListener(eventName, (ev) => b.push(extractor(ev)));
    return b;
}
//# sourceMappingURL=dom-builder.js.map

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export get */
/* harmony export (immutable) */ __webpack_exports__["b"] = assign;
/* harmony export (immutable) */ __webpack_exports__["e"] = merge;
/* harmony export (immutable) */ __webpack_exports__["d"] = mergeDeep;
/* harmony export (immutable) */ __webpack_exports__["c"] = rename;
/* harmony export (immutable) */ __webpack_exports__["a"] = id;
function arrayConcat(arr1, arr2) {
    const result = [];
    for (let i = 0; i < arr1.length; ++i) {
        result.push(arr1[i]);
    }
    for (let i = 0; i < arr2.length; ++i) {
        result.push(arr2[i]);
    }
    return result;
}
function isObject(item) {
    return typeof item === "object" && !Array.isArray(item);
}
function get(prop) {
    return (obj) => obj[prop];
}
function assign(a, b) {
    for (const key of Object.keys(b)) {
        if (!(key in a)) {
            a[key] = b[key];
        }
    }
    return a;
}
function merge(a, b) {
    const c = {};
    for (const key of Object.keys(a)) {
        c[key] = a[key];
    }
    for (const key of Object.keys(b)) {
        c[key] = b[key];
    }
    return c;
}
function mergeDeep(...objects) {
    const result = {};
    for (const source of objects) {
        if (isObject(source)) {
            const keys = Object.keys(source);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const nextItem = source[key];
                if (Array.isArray(source[key]) && Array.isArray(result[key])) {
                    result[key] = arrayConcat(result[key], source[key]);
                }
                else if (isObject(source[key])) {
                    const subKeys = Object.keys(source[key]);
                    result[key] = result[key] || {};
                    for (let j = 0; j < subKeys.length; j++) {
                        const nextSubKey = subKeys[j];
                        result[key][nextSubKey] = nextItem[nextSubKey];
                    }
                }
                else {
                    result[key] = nextItem;
                }
            }
        }
    }
    return result;
}
;
// Note this function mutates `source`
function rename(source, renames) {
    for (const newName of Object.keys(renames)) {
        const name = renames[newName];
        source[newName] = source[name];
    }
}
function id(a) { return a; }
;
//# sourceMappingURL=utils.js.map

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NoopConsumer = (function () {
    function NoopConsumer() {
    }
    NoopConsumer.prototype.push = function () { };
    ;
    return NoopConsumer;
}());
exports.NoopConsumer = NoopConsumer;
exports.noopConsumer = new NoopConsumer();
var MultiConsumer = (function () {
    function MultiConsumer(c1, c2) {
        this.listeners = [c1, c2];
    }
    MultiConsumer.prototype.push = function (a) {
        for (var i = 0; i < this.listeners.length; ++i) {
            this.listeners[i].push(a);
        }
    };
    return MultiConsumer;
}());
exports.MultiConsumer = MultiConsumer;
var Reactive = (function () {
    function Reactive() {
        this.child = exports.noopConsumer;
        this.nrOfListeners = 0;
    }
    Reactive.prototype.subscribe = function (fn) {
        var listener = { push: fn };
        this.addListener(listener);
        return listener;
    };
    Reactive.prototype.addListener = function (c) {
        var nr = ++this.nrOfListeners;
        if (nr === 1) {
            this.child = c;
        }
        else if (nr === 2) {
            this.child = new MultiConsumer(this.child, c);
        }
        else {
            this.child.listeners.push(c);
        }
    };
    Reactive.prototype.removeListener = function (listener) {
        var nr = --this.nrOfListeners;
        if (nr === 0) {
            this.child = exports.noopConsumer;
        }
        else if (nr === 1) {
            var l = this.child.listeners;
            this.child = l[l[0] === listener ? 1 : 0];
        }
        else {
            var l = this.child.listeners;
            // The indexOf here is O(n), where n is the number of listeners,
            // if using a linked list it should be possible to perform the
            // unsubscribe operation in constant time.
            var idx = l.indexOf(listener);
            if (idx !== -1) {
                if (idx !== l.length - 1) {
                    l[idx] = l[l.length - 1];
                }
                l.length--; // remove the last element of the list
            }
        }
    };
    return Reactive;
}());
exports.Reactive = Reactive;
var MultiObserver = (function () {
    function MultiObserver(c1, c2) {
        this.listeners = [c1, c2];
    }
    MultiObserver.prototype.beginPulling = function () {
        for (var i = 0; i < this.listeners.length; ++i) {
            this.listeners[i].beginPulling();
        }
    };
    MultiObserver.prototype.endPulling = function () {
        for (var i = 0; i < this.listeners.length; ++i) {
            this.listeners[i].endPulling();
        }
    };
    MultiObserver.prototype.push = function (a) {
        for (var i = 0; i < this.listeners.length; ++i) {
            this.listeners[i].push(a);
        }
    };
    return MultiObserver;
}());
exports.MultiObserver = MultiObserver;
var NoopObserver = (function () {
    function NoopObserver() {
    }
    NoopObserver.prototype.beginPulling = function () { };
    NoopObserver.prototype.endPulling = function () { };
    NoopObserver.prototype.push = function (a) { };
    return NoopObserver;
}());
exports.noopObserver = new NoopObserver();
//# sourceMappingURL=frp-common.js.map

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractFunctor; });
/* harmony export (immutable) */ __webpack_exports__["b"] = functor;
/* harmony export (immutable) */ __webpack_exports__["c"] = map;
/* harmony export (immutable) */ __webpack_exports__["d"] = mapTo;
/* harmony export (immutable) */ __webpack_exports__["e"] = mapMap;

function arrayMap(f, as) {
    var newArr = [];
    for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
        var a = as_1[_i];
        newArr.push(f(a));
    }
    return newArr;
}
function repeat(a, length) {
    var newArr = [];
    for (var i = 0; i < length; ++i) {
        newArr.push(a);
    }
    return newArr;
}
var AbstractFunctor = (function () {
    function AbstractFunctor() {
    }
    AbstractFunctor.prototype.mapTo = function (b) {
        return this.map(function (_) { return b; });
    };
    return AbstractFunctor;
}());

function functor(constructor) {
    if (!("map" in constructor.prototype)) {
        throw new TypeError("Can't derive functor. `map` method missing.");
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* mixin */])(constructor, [AbstractFunctor]);
}
function map(f, functor) {
    if (Array.isArray(functor)) {
        return arrayMap(f, functor);
    }
    else {
        return functor.map(f);
    }
}
function mapTo(b, functor) {
    if (Array.isArray(functor)) {
        return repeat(b, functor.length);
    }
    else {
        return functor.mapTo(b);
    }
}
function mapMap(f, functor) {
    return map(function (fa) { return map(f, fa); }, functor);
}
//# sourceMappingURL=functor.js.map

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foldable__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Maybe; });
/* harmony export (immutable) */ __webpack_exports__["b"] = just;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return nothing; });
/* harmony export (immutable) */ __webpack_exports__["d"] = isNothing;
/* harmony export (immutable) */ __webpack_exports__["e"] = isJust;
/* harmony export (immutable) */ __webpack_exports__["f"] = fromMaybe;
/* harmony export (immutable) */ __webpack_exports__["g"] = maybe;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var Maybe = (function () {
    function Maybe() {
        this.multi = false;
    }
    Maybe.prototype.of = function (v) {
        return just(v);
    };
    Maybe.of = function (v) {
        return just(v);
    };
    Maybe.prototype.flatten = function () {
        return this.match({
            nothing: function () { return nothing; },
            just: __WEBPACK_IMPORTED_MODULE_1__utils__["c" /* id */]
        });
    };
    Maybe.prototype.lift = function () {
        var f = arguments[0];
        for (var i = 1; i < arguments.length; ++i) {
            if (isNothing(arguments[i])) {
                return nothing;
            }
        }
        switch (arguments.length - 1) {
            case 1:
                return just(f(arguments[1].val));
            case 2:
                return just(f(arguments[1].val, arguments[2].val));
            case 3:
                return just(f(arguments[1].val, arguments[2].val, arguments[3].val));
        }
    };
    Maybe.prototype.sequence = function (a, m) {
        return m.match({
            nothing: function () { return a.of(nothing); },
            just: function (v) { return v.map(just); }
        });
    };
    return Maybe;
}());

Maybe.multi = false;
var Nothing = (function (_super) {
    __extends(Nothing, _super);
    function Nothing() {
        return _super.call(this) || this;
    }
    ;
    Nothing.prototype.match = function (m) {
        return m.nothing();
    };
    Nothing.prototype.chain = function (f) {
        return this;
    };
    Nothing.prototype.map = function (f) {
        return nothing;
    };
    Nothing.prototype.mapTo = function (b) {
        return nothing;
    };
    Nothing.prototype.ap = function (a) {
        return nothing;
    };
    Nothing.prototype.foldr = function (f, acc) {
        return acc;
    };
    Nothing.prototype.foldl = function (f, acc) {
        return acc;
    };
    Nothing.prototype.size = function () {
        return 0;
    };
    Nothing.prototype.traverse = function (a, f) {
        return a.of(nothing);
    };
    return Nothing;
}(Maybe));
Nothing = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__foldable__["b" /* foldable */]
], Nothing);
var Just = Just_1 = (function (_super) {
    __extends(Just, _super);
    function Just(val) {
        var _this = _super.call(this) || this;
        _this.val = val;
        return _this;
    }
    Just.prototype.match = function (m) {
        return m.just(this.val);
    };
    Just.prototype.chain = function (f) {
        return f(this.val);
    };
    Just.prototype.map = function (f) {
        return new Just_1(f(this.val));
        ;
    };
    Just.prototype.mapTo = function (b) {
        return new Just_1(b);
    };
    Just.prototype.ap = function (m) {
        var _this = this;
        return m.match({
            nothing: function () { return nothing; },
            just: function (f) { return new Just_1(f(_this.val)); }
        });
    };
    Just.prototype.foldr = function (f, init) {
        return f(this.val, init);
    };
    Just.prototype.foldl = function (f, init) {
        return f(init, this.val);
    };
    Just.prototype.size = function () {
        return 1;
    };
    Just.prototype.traverse = function (a, f) {
        return f(this.val).map(just);
    };
    return Just;
}(Maybe));
Just = Just_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__foldable__["b" /* foldable */]
], Just);
function just(v) {
    return new Just(v);
}
var nothing = new Nothing();
function isNothing(m) {
    return m === nothing;
}
function isJust(m) {
    return m !== nothing;
}
function fromMaybe(a, m) {
    return m === nothing ? a : m.val;
}
function maybe(b, f, m) {
    return m === nothing ? b : f(m.val);
}
var Just_1;
//# sourceMappingURL=maybe.js.map

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__semigroup__ = __webpack_require__(105);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__semigroup__["a"]; });
/* harmony export (immutable) */ __webpack_exports__["a"] = identity;

function identity(m) {
    if (m === Array) {
        return [];
    }
    else if (m === String) {
        return "";
    }
    else {
        return m.identity();
    }
}

//# sourceMappingURL=monoid.js.map

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(21);

var Endo = (function () {
    function Endo(fn) {
        this.fn = fn;
    }
    ;
    Endo.identity = function () {
        return endoId;
    };
    ;
    Endo.prototype.identity = function () {
        return endoId;
    };
    ;
    Endo.prototype.combine = function (e) {
        return new Endo(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* compose */])(this.fn, e.fn));
    };
    Endo.create = function (f) {
        return new Endo(f);
    };
    Endo.toFunction = function (e) {
        return e.fn;
    };
    return Endo;
}());
/* harmony default export */ __webpack_exports__["a"] = (Endo);
var endoId = new Endo(function (x) { return x; });
//# sourceMappingURL=endo.js.map

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(21);
/* harmony export (immutable) */ __webpack_exports__["a"] = combine;

function combineTwo(a, b) {
    return a.combine(b);
}
function combine() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    if (Array.isArray(a[0])) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* arrayFlatten */])(a);
    }
    else if (typeof a[0] === "string") {
        return a.join("");
    }
    else {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["l" /* foldlArray1 */])(combineTwo, a);
    }
}
//# sourceMappingURL=semigroup.js.map

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foldable__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__applicative__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__identity__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monoids_endo__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__const__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractTraversable; });
/* harmony export (immutable) */ __webpack_exports__["b"] = traversable;
/* harmony export (immutable) */ __webpack_exports__["c"] = sequence;
/* harmony export (immutable) */ __webpack_exports__["d"] = traverse;
/* harmony export (immutable) */ __webpack_exports__["e"] = mapAccumR;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var AbstractTraversable = (function (_super) {
    __extends(AbstractTraversable, _super);
    function AbstractTraversable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractTraversable.prototype.map = function (f) {
        return this.traverse(__WEBPACK_IMPORTED_MODULE_2__identity__["a" /* default */], function (a) { return __WEBPACK_IMPORTED_MODULE_2__identity__["a" /* default */].of(f(a)); }).extract();
    };
    AbstractTraversable.prototype.mapTo = function (b) {
        return this.map(function (_) { return b; });
    };
    AbstractTraversable.prototype.traverse = function (a, f) {
        return this.sequence(a, this.map(f));
    };
    AbstractTraversable.prototype.sequence = function (a, t) {
        return t.traverse(a, __WEBPACK_IMPORTED_MODULE_5__utils__["c" /* id */]);
    };
    AbstractTraversable.prototype.foldr = function (f, acc) {
        var f2 = function (a) { return new __WEBPACK_IMPORTED_MODULE_4__const__["a" /* ConstEndo */](new __WEBPACK_IMPORTED_MODULE_3__monoids_endo__["a" /* default */](function (b) { return f(a, b); })); };
        return __WEBPACK_IMPORTED_MODULE_3__monoids_endo__["a" /* default */].toFunction(this.traverse(__WEBPACK_IMPORTED_MODULE_4__const__["a" /* ConstEndo */], f2).get())(acc);
    };
    return AbstractTraversable;
}(__WEBPACK_IMPORTED_MODULE_0__foldable__["a" /* AbstractFoldable */]));

function traversable(constructor) {
    var p = constructor.prototype;
    if (!("map" in p && "sequence" in p) && !("traverse" in p)) {
        throw new TypeError("Can't derive traversable. Either `traverse` or `map` and `sequence` must be defined.");
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils__["d" /* mixin */])(constructor, [AbstractTraversable, __WEBPACK_IMPORTED_MODULE_0__foldable__["a" /* AbstractFoldable */]]);
}
function arraySequence(a, t) {
    var result = a.of([]);
    var lift = result.lift;
    for (var i = t.length - 1; i >= 0; --i) {
        result = lift(__WEBPACK_IMPORTED_MODULE_5__utils__["e" /* cons */], t[i], result);
    }
    return result;
}
function arrayTraverse(a, f, t) {
    var result = a.of([]);
    var lift = result.lift;
    for (var i = t.length - 1; i >= 0; --i) {
        result = lift(__WEBPACK_IMPORTED_MODULE_5__utils__["e" /* cons */], f(t[i]), result);
    }
    return result;
}
function sequence(a, t) {
    if (t instanceof Array) {
        return arraySequence(a, t);
    }
    else {
        return t.sequence(a, t);
    }
}
function traverse(a, f, t) {
    if (t instanceof Array) {
        return arrayTraverse(a, f, t);
    }
    else {
        return t.traverse(a, f);
    }
}
var AnApplicative = (function (_super) {
    __extends(AnApplicative, _super);
    function AnApplicative(f) {
        var _this = _super.call(this) || this;
        _this.f = f;
        return _this;
    }
    AnApplicative.prototype.of = function (b) {
        return new AnApplicative(function (a) { return [a, b]; });
    };
    AnApplicative.of = function (b) {
        return new AnApplicative(function (a) { return [a, b]; });
    };
    AnApplicative.prototype.ap = function (fa) {
        var _this = this;
        return new AnApplicative(function (a) {
            var _a = _this.f(a), a1 = _a[0], b = _a[1];
            var _b = fa.f(a1), a2 = _b[0], f = _b[1];
            return [a2, f(b)];
        });
    };
    AnApplicative.prototype.run = function (a) {
        return this.f(a);
    };
    return AnApplicative;
}(__WEBPACK_IMPORTED_MODULE_1__applicative__["a" /* AbstractApplicative */]));
function mapAccumR(f, init, t) {
    return t.traverse(AnApplicative, function (a) { return new AnApplicative(function (c) { return f(c, a); }); }).run(init);
}
//# sourceMappingURL=traversable.js.map

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function circle(radius, x, y) {
    return [{ radius, x, y }];
}
exports.circle = circle;
function stack(...images) {
    return images.reduce((imgs, img) => imgs.concat(img), []);
}
exports.stack = stack;
function translate(dx, dy, image) {
    return image.map(({ radius, x, y }) => ({ radius, x: x + dx, y: y + dy }));
}
exports.translate = translate;
function renderCircle(ctx, width, height, { radius, x, y }) {
    ctx.beginPath();
    ctx.arc(width / 2 + x, height / 2 - y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
}
function render(ctx, width, height, circles) {
    for (const circle of circles) {
        renderCircle(ctx, width, height, circle);
    }
}
exports.render = render;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(18);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9)
  , toIndex  = __webpack_require__(40)
  , toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(44);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(12)
  , toObject  = __webpack_require__(9)
  , IObject   = __webpack_require__(50)
  , toLength  = __webpack_require__(8);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(12)
  , isObject   = __webpack_require__(4)
  , invoke     = __webpack_require__(59)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(7).f
  , create      = __webpack_require__(35)
  , hide        = __webpack_require__(11)
  , redefineAll = __webpack_require__(38)
  , ctx         = __webpack_require__(26)
  , anInstance  = __webpack_require__(29)
  , defined     = __webpack_require__(19)
  , forOf       = __webpack_require__(44)
  , $iterDefine = __webpack_require__(83)
  , step        = __webpack_require__(118)
  , setSpecies  = __webpack_require__(39)
  , DESCRIPTORS = __webpack_require__(6)
  , fastKey     = __webpack_require__(30).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(43)
  , from    = __webpack_require__(110);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(38)
  , getWeak           = __webpack_require__(30).getWeak
  , anObject          = __webpack_require__(1)
  , isObject          = __webpack_require__(4)
  , anInstance        = __webpack_require__(29)
  , forOf             = __webpack_require__(44)
  , createArrayMethod = __webpack_require__(22)
  , $has              = __webpack_require__(10)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(74)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 119 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(37)
  , gOPS     = __webpack_require__(63)
  , pIE      = __webpack_require__(51)
  , toObject = __webpack_require__(9)
  , IObject  = __webpack_require__(50)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(7)
  , anObject = __webpack_require__(1)
  , getKeys  = __webpack_require__(37);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15)
  , gOPN      = __webpack_require__(36).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(10)
  , toIObject    = __webpack_require__(15)
  , arrayIndexOf = __webpack_require__(55)(false)
  , IE_PROTO     = __webpack_require__(87)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(37)
  , toIObject = __webpack_require__(15)
  , isEnum    = __webpack_require__(51).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(36)
  , gOPS     = __webpack_require__(63)
  , anObject = __webpack_require__(1)
  , Reflect  = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat
  , $trim       = __webpack_require__(46).trim;

module.exports = 1 / $parseFloat(__webpack_require__(92) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt
  , $trim     = __webpack_require__(46).trim
  , ws        = __webpack_require__(92)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 128 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8)
  , repeat   = __webpack_require__(91)
  , defined  = __webpack_require__(19);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(113);

// 23.1 Map Objects
module.exports = __webpack_require__(56)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(6) && /./g.flags != 'g')__webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(58)
});

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(113);

// 23.2 Set Objects
module.exports = __webpack_require__(56)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(22)(0)
  , redefine     = __webpack_require__(13)
  , meta         = __webpack_require__(30)
  , assign       = __webpack_require__(120)
  , weak         = __webpack_require__(115)
  , isObject     = __webpack_require__(4)
  , has          = __webpack_require__(10)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(56)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(160);
const src_1 = __webpack_require__(150);
const graphics_1 = __webpack_require__(107);
// import {World, display} from "./src/simple-driver";
const funnel_driver_1 = __webpack_require__(149);
function animation0(w) {
    return src_1.lift(t => graphics_1.circle(20, t * 100 - 260, 0), src_1.timeB);
}
function animation1(w) {
    return src_1.lift(t => graphics_1.circle(20, t * 100 - 260, 50 * Math.sin(3 * t)), src_1.timeB);
}
function animation2(w) {
    return src_1.lift(({ x, y }) => graphics_1.circle(20, x, y), w.mouse);
}
function animation3(w) {
    const movingCircle = animation1(w);
    return src_1.lift(graphics_1.stack, movingCircle, src_1.delay(1, movingCircle), src_1.slower(2, movingCircle), src_1.slower(4, movingCircle));
}
function animation4(w) {
    return src_1.stepper(graphics_1.circle(10, 0, 0), src_1.map(({ x, y }) => graphics_1.circle(10, x, y), w.clicks));
}
function animation5(w) {
    const mouseCircle = src_1.lift(({ x, y }) => graphics_1.circle(20, x, y), w.mouse);
    return src_1.lift(graphics_1.stack, mouseCircle, src_1.delay(.5, mouseCircle), src_1.slower(2, mouseCircle));
}
function notanimation4(w) {
    const sinTime = src_1.lift(t => 100 * Math.sin(t), src_1.timeB);
    const cosTime = src_1.lift(t => 100 * Math.cos(t), src_1.timeB);
    const movingSquare = src_1.lift((x, y) => graphics_1.circle(20, x, y), sinTime, cosTime);
    const slowerMovingSquare = src_1.slower(15, movingSquare);
    return src_1.lift(graphics_1.stack, src_1.switcher(movingSquare, src_1.map(({ x, y }) => src_1.constB(graphics_1.circle(25, x, y)), w.clicks)), src_1.delay(400, movingSquare), slowerMovingSquare);
}
function orbit(radius, t, image) {
    return graphics_1.translate(100 * Math.sin(t), 100 * Math.cos(t), image);
}
function animation6(w) {
    const size = src_1.scan((_, s) => s + 3, 20, w.clicks);
    return src_1.lift(s => graphics_1.circle(s, 0, 0), size);
}
function notanimation5(w) {
    const planet = src_1.lift(orbit, src_1.constB(100), src_1.timeB, src_1.constB(graphics_1.circle(10, 0, 0)));
    const circles = src_1.lift(graphics_1.stack, planet, src_1.slower(2, planet));
    return src_1.lift(graphics_1.stack, circles);
}
funnel_driver_1.display({
    animation: animation0,
    element: document.getElementById("animation0"),
    duration: 6
});
funnel_driver_1.display({
    animation: animation1,
    element: document.getElementById("animation1"),
    duration: 6
});
funnel_driver_1.display({
    animation: animation2,
    element: document.getElementById("animation2"),
    duration: 12
});
funnel_driver_1.display({
    animation: animation3,
    element: document.getElementById("animation3"),
    duration: 12
});
funnel_driver_1.display({
    animation: animation4,
    element: document.getElementById("animation4"),
    duration: 12
});
funnel_driver_1.display({
    animation: animation5,
    element: document.getElementById("animation5"),
    duration: 12
});
funnel_driver_1.display({
    animation: animation6,
    element: document.getElementById("animation6"),
    duration: 12
});

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(342);

__webpack_require__(343);

__webpack_require__(161);

/* eslint max-len: 0 */

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

// Should be removed in the next major release:

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)))

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_builder__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component__ = __webpack_require__(67);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "text", function() { return __WEBPACK_IMPORTED_MODULE_1__component__["j"]; });

const input = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("input", {
    actionDefinitions: {
        focus: (element) => element.focus()
    },
    behaviors: {
        inputValue: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["b" /* behaviorDescription */])("input", (evt) => evt.target.value, (elm) => elm.value)
    }
});
/* harmony export (immutable) */ __webpack_exports__["input"] = input;

function getTargetChecked(event) {
    return event.target.checked;
}
const checkbox = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("input[type=checkbox]", {
    behaviors: {
        checked: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["b" /* behaviorDescription */])("change", getTargetChecked, (elm) => elm.checked)
    },
    streams: {
        checkedChange: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["a" /* streamDescription */])("change", getTargetChecked)
    }
});
/* harmony export (immutable) */ __webpack_exports__["checkbox"] = checkbox;

const button = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("button");
/* harmony export (immutable) */ __webpack_exports__["button"] = button;

const a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("a");
/* harmony export (immutable) */ __webpack_exports__["a"] = a;

const label = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("label");
/* harmony export (immutable) */ __webpack_exports__["label"] = label;

const br = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("br")();
/* harmony export (immutable) */ __webpack_exports__["br"] = br;

const span = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("span");
/* harmony export (immutable) */ __webpack_exports__["span"] = span;

const div = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("div");
/* harmony export (immutable) */ __webpack_exports__["div"] = div;

const p = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("p");
/* harmony export (immutable) */ __webpack_exports__["p"] = p;

const h1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("h1");
/* harmony export (immutable) */ __webpack_exports__["h1"] = h1;

const ul = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("ul");
/* harmony export (immutable) */ __webpack_exports__["ul"] = ul;

const li = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("li");
/* harmony export (immutable) */ __webpack_exports__["li"] = li;

const strong = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("strong");
/* harmony export (immutable) */ __webpack_exports__["strong"] = strong;

const section = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("section");
/* harmony export (immutable) */ __webpack_exports__["section"] = section;

const header = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("header");
/* harmony export (immutable) */ __webpack_exports__["header"] = header;

const footer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dom_builder__["d" /* element */])("footer");
/* harmony export (immutable) */ __webpack_exports__["footer"] = footer;


//# sourceMappingURL=elements.js.map

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__(67);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isGeneratorFunction", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "runComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "testComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "loop", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "modelView", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "viewObserve", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isChild", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "text", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "toComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "dynamic", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "list", function() { return __WEBPACK_IMPORTED_MODULE_0__component__["m"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom_builder__ = __webpack_require__(98);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "streamDescription", function() { return __WEBPACK_IMPORTED_MODULE_1__dom_builder__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "behaviorDescription", function() { return __WEBPACK_IMPORTED_MODULE_1__dom_builder__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "allDomEvents", function() { return __WEBPACK_IMPORTED_MODULE_1__dom_builder__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "element", function() { return __WEBPACK_IMPORTED_MODULE_1__dom_builder__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__elements__ = __webpack_require__(137);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "elements", function() { return __WEBPACK_IMPORTED_MODULE_2__elements__; });




//# sourceMappingURL=index.js.map

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = __webpack_require__(54);
function streamFromEvent(eventName, element, extractor) {
    var s = stream_1.empty();
    var hasExtractor = extractor !== undefined;
    element.addEventListener(eventName, function (ev) {
        s.push(hasExtractor ? extractor(ev, element) : ev);
    });
    return s;
}
exports.streamFromEvent = streamFromEvent;
//# sourceMappingURL=dom.js.map

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jabz_1 = __webpack_require__(48);
var future_1 = __webpack_require__(53);
var behavior_1 = __webpack_require__(52);
var stream_1 = __webpack_require__(54);
var Now = (function () {
    function Now() {
        this.multi = false;
    }
    Now.prototype.of = function (b) {
        return new OfNow(b);
    };
    Now.of = function (b) {
        return new OfNow(b);
    };
    Now.prototype.chain = function (f) {
        return new ChainNow(this, f);
    };
    return Now;
}());
Now.multi = false;
Now = __decorate([
    jabz_1.monad
], Now);
exports.Now = Now;
var OfNow = (function (_super) {
    __extends(OfNow, _super);
    function OfNow(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    OfNow.prototype.run = function () {
        return this.value;
    };
    return OfNow;
}(Now));
var ChainNow = (function (_super) {
    __extends(ChainNow, _super);
    function ChainNow(first, f) {
        var _this = _super.call(this) || this;
        _this.first = first;
        _this.f = f;
        return _this;
    }
    ChainNow.prototype.run = function () {
        return this.f(this.first.run()).run();
    };
    return ChainNow;
}(Now));
var AsyncNow = (function (_super) {
    __extends(AsyncNow, _super);
    function AsyncNow(comp) {
        var _this = _super.call(this) || this;
        _this.comp = comp;
        return _this;
    }
    AsyncNow.prototype.run = function () {
        return future_1.fromPromise(jabz_1.runIO(this.comp));
    };
    return AsyncNow;
}(Now));
function async(comp) {
    return new AsyncNow(comp);
}
exports.async = async;
var SampleNow = (function (_super) {
    __extends(SampleNow, _super);
    function SampleNow(b) {
        var _this = _super.call(this) || this;
        _this.b = b;
        return _this;
    }
    SampleNow.prototype.run = function () {
        return behavior_1.at(this.b);
    };
    return SampleNow;
}(Now));
function sample(b) {
    return new SampleNow(b);
}
exports.sample = sample;
var PerformIOStream = (function (_super) {
    __extends(PerformIOStream, _super);
    function PerformIOStream(s) {
        var _this = _super.call(this) || this;
        s.addListener(_this);
        return _this;
    }
    PerformIOStream.prototype.push = function (io) {
        var _this = this;
        jabz_1.runIO(io).then(function (a) { return _this.child.push(a); });
    };
    return PerformIOStream;
}(stream_1.Stream));
var PerformStreamNow = (function (_super) {
    __extends(PerformStreamNow, _super);
    function PerformStreamNow(s) {
        var _this = _super.call(this) || this;
        _this.s = s;
        return _this;
    }
    PerformStreamNow.prototype.run = function () {
        return new PerformIOStream(this.s);
    };
    return PerformStreamNow;
}(Now));
function performStream(s) {
    return new PerformStreamNow(s);
}
exports.performStream = performStream;
var PerformIOStreamLatest = (function (_super) {
    __extends(PerformIOStreamLatest, _super);
    function PerformIOStreamLatest(s) {
        var _this = _super.call(this) || this;
        _this.next = 0;
        _this.newest = 0;
        _this.running = 0;
        s.addListener(_this);
        return _this;
    }
    PerformIOStreamLatest.prototype.push = function (io) {
        var _this = this;
        var time = ++this.next;
        this.running++;
        jabz_1.runIO(io).then(function (a) {
            _this.running--;
            if (time > _this.newest) {
                if (_this.running === 0) {
                    _this.next = 0;
                    _this.newest = 0;
                }
                else {
                    _this.newest = time;
                }
                _this.child.push(a);
            }
        });
    };
    return PerformIOStreamLatest;
}(stream_1.Stream));
var PerformStreamNowLatest = (function (_super) {
    __extends(PerformStreamNowLatest, _super);
    function PerformStreamNowLatest(s) {
        var _this = _super.call(this) || this;
        _this.s = s;
        return _this;
    }
    PerformStreamNowLatest.prototype.run = function () {
        return new PerformIOStreamLatest(this.s);
    };
    return PerformStreamNowLatest;
}(Now));
function performStreamLatest(s) {
    return new PerformStreamNowLatest(s);
}
exports.performStreamLatest = performStreamLatest;
var PerformIOStreamOrdered = (function (_super) {
    __extends(PerformIOStreamOrdered, _super);
    function PerformIOStreamOrdered(s) {
        var _this = _super.call(this) || this;
        _this.nextId = 0;
        _this.next = 0;
        _this.buffer = []; // Object-wrapper to support a result as undefined
        s.addListener(_this);
        return _this;
    }
    PerformIOStreamOrdered.prototype.push = function (io) {
        var _this = this;
        var id = this.nextId++;
        jabz_1.runIO(io).then(function (a) {
            if (id === _this.next) {
                _this.buffer[0] = { value: a };
                _this.pushFromBuffer();
            }
            else {
                _this.buffer[id - _this.next] = { value: a };
            }
        });
    };
    PerformIOStreamOrdered.prototype.pushFromBuffer = function () {
        while (this.buffer[0] !== undefined) {
            var value = this.buffer.shift().value;
            this.child.push(value);
            this.next++;
        }
    };
    return PerformIOStreamOrdered;
}(stream_1.Stream));
var PerformStreamNowOrdered = (function (_super) {
    __extends(PerformStreamNowOrdered, _super);
    function PerformStreamNowOrdered(s) {
        var _this = _super.call(this) || this;
        _this.s = s;
        return _this;
    }
    PerformStreamNowOrdered.prototype.run = function () {
        return new PerformIOStreamOrdered(this.s);
    };
    return PerformStreamNowOrdered;
}(Now));
function performStreamOrdered(s) {
    return new PerformStreamNowOrdered(s);
}
exports.performStreamOrdered = performStreamOrdered;
function run(now) {
    return now.run();
}
var PlanNow = (function (_super) {
    __extends(PlanNow, _super);
    function PlanNow(future) {
        var _this = _super.call(this) || this;
        _this.future = future;
        return _this;
    }
    PlanNow.prototype.run = function () {
        return this.future.map(run);
    };
    return PlanNow;
}(Now));
function plan(future) {
    return new PlanNow(future);
}
exports.plan = plan;
function runNow(now) {
    return new Promise(function (resolve, reject) {
        now.run().subscribe(resolve);
    });
}
exports.runNow = runNow;
//# sourceMappingURL=now.js.map

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var behavior_1 = __webpack_require__(52);
var stream_1 = __webpack_require__(54);
var Placeholder = (function () {
    function Placeholder(methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.methodName = methodName;
        this.children = [];
        this.args = args;
    }
    Placeholder.prototype.replaceWith = function (parent) {
        this.source = this.methodName === undefined ? parent : parent[this.methodName].apply(parent, this.args);
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var c = _a[_i];
            c.replaceWith(this.source);
        }
        this.children = undefined;
    };
    return Placeholder;
}());
exports.Placeholder = Placeholder;
function definePlaceholderMethod(methodName) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.source !== undefined) {
            return (_a = this.source)[methodName].apply(_a, args);
        }
        else {
            var p = new (Placeholder.bind.apply(Placeholder, [void 0, methodName].concat(args)))();
            this.children.push(p);
            return p;
        }
        var _a;
    };
}
function defineBehaviorMethod(methodName) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.source !== undefined) {
            return (_a = this.source)[methodName].apply(_a, args);
        }
        else {
            var p = behavior_1.behaviorPlaceholder();
            this.children.push(p);
            return p[methodName].apply(p, args);
        }
        var _a;
    };
}
function defineStreamMethod(methodName) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.source !== undefined) {
            return (_a = this.source)[methodName].apply(_a, args);
        }
        else {
            var p = stream_1.placeholderStream();
            this.children.push(p);
            return p[methodName].apply(p, args);
        }
        var _a;
    };
}
var commonMethods = [
    "map", "mapTo", "subscribe", "addListener"
];
var streamMethods = [
    "combine", "filter", "filterApply", "scanS", "delay", "throttle", "debounce"
];
var behaviorMethods = [
    "ap", "lift", "chain", "push", "pull", "beginPulling", "endPulling",
    "observe", "at", "flatten"
];
for (var _i = 0, commonMethods_1 = commonMethods; _i < commonMethods_1.length; _i++) {
    var name_1 = commonMethods_1[_i];
    Placeholder.prototype[name_1] = definePlaceholderMethod(name_1);
}
for (var _a = 0, streamMethods_1 = streamMethods; _a < streamMethods_1.length; _a++) {
    var name_2 = streamMethods_1[_a];
    Placeholder.prototype[name_2] = defineStreamMethod(name_2);
}
for (var _b = 0, behaviorMethods_1 = behaviorMethods; _b < behaviorMethods_1.length; _b++) {
    var name_3 = behaviorMethods_1[_b];
    Placeholder.prototype[name_3] = defineBehaviorMethod(name_3);
}
function placeholder() {
    return new Placeholder();
}
exports.placeholder = placeholder;
//# sourceMappingURL=placeholder.js.map

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__applicative__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__traversable__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__monad__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return nil; });
/* harmony export (immutable) */ __webpack_exports__["c"] = cons;
/* harmony export (immutable) */ __webpack_exports__["d"] = fromArray;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Cons = (function () {
    function Cons(val, tail) {
        this.val = val;
        this.tail = tail;
    }
    Cons.prototype.combine = function (c) {
        return this === nil ? c : cons(this.val, this.tail.combine(c));
    };
    Cons.prototype.identity = function () {
        return nil;
    };
    Cons.prototype.of = function (b) {
        return cons(b, nil);
    };
    Cons.prototype.chain = function (f) {
        return this === nil ? nil : f(this.val).combine(this.tail.chain(f));
    };
    Cons.prototype.traverse = function (a, f) {
        return this === nil ? a.of(nil) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__applicative__["e" /* lift */])(cons, f(this.val), this.tail.traverse(a, f));
    };
    return Cons;
}());
Cons = __decorate([
    __WEBPACK_IMPORTED_MODULE_2__monad__["b" /* monad */], __WEBPACK_IMPORTED_MODULE_1__traversable__["b" /* traversable */]
], Cons);

var nil = new Cons(undefined, undefined);
function cons(a, as) {
    return new Cons(a, as);
}
function fromArray(as) {
    return as.length === 0 ? nil : cons(as[0], fromArray(as.slice(1)));
}
//# sourceMappingURL=conslist.js.map

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__applicative__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monoids_endo__ = __webpack_require__(104);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstEndo; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ConstEndo = (function (_super) {
    __extends(ConstEndo, _super);
    function ConstEndo(m) {
        var _this = _super.call(this) || this;
        _this.m = m;
        return _this;
    }
    ConstEndo.prototype.map = function (f) {
        return this;
    };
    ConstEndo.of = function (b) {
        return new ConstEndo(__WEBPACK_IMPORTED_MODULE_1__monoids_endo__["a" /* default */].identity());
    };
    ConstEndo.prototype.of = function (b) {
        return new ConstEndo(__WEBPACK_IMPORTED_MODULE_1__monoids_endo__["a" /* default */].identity());
    };
    ConstEndo.prototype.ap = function (a) {
        return new ConstEndo(a.m.combine(this.m));
    };
    ConstEndo.prototype.get = function () {
        return this.m;
    };
    return ConstEndo;
}(__WEBPACK_IMPORTED_MODULE_0__applicative__["a" /* AbstractApplicative */]));

//# sourceMappingURL=const.js.map

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__monad__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Freer; });
/* unused harmony export Pure */
/* unused harmony export Bind */
/* harmony export (immutable) */ __webpack_exports__["b"] = liftF;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Freer = (function (_super) {
    __extends(Freer, _super);
    function Freer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Freer.of = function (b) {
        return new Pure(b);
    };
    Freer.prototype.of = function (b) {
        return new Pure(b);
    };
    return Freer;
}(__WEBPACK_IMPORTED_MODULE_0__monad__["a" /* AbstractMonad */]));

Freer.multi = false;
var Pure = Pure_1 = (function (_super) {
    __extends(Pure, _super);
    function Pure(a) {
        var _this = _super.call(this) || this;
        _this.a = a;
        return _this;
    }
    ;
    Pure.prototype.match = function (m) {
        return m.pure(this.a);
    };
    Pure.prototype.map = function (f) {
        return new Pure_1(f(this.a));
    };
    Pure.prototype.chain = function (f) {
        return f(this.a);
    };
    return Pure;
}(Freer));
Pure = Pure_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__monad__["b" /* monad */]
], Pure);

function pure(a) {
    return new Pure(a);
}
var Bind = Bind_1 = (function (_super) {
    __extends(Bind, _super);
    function Bind(val, f) {
        var _this = _super.call(this) || this;
        _this.val = val;
        _this.f = f;
        return _this;
    }
    Bind.prototype.match = function (m) {
        return m.bind(this.val, this.f);
    };
    Bind.prototype.map = function (f) {
        var _this = this;
        return new Bind_1(this.val, function (a) { return _this.f(a).map(f); });
    };
    Bind.prototype.chain = function (f) {
        var _this = this;
        return new Bind_1(this.val, function (a) { return _this.f(a).chain(f); });
    };
    return Bind;
}(Freer));
Bind = Bind_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__monad__["b" /* monad */]
], Bind);

function liftF(fa) {
    return new Bind(fa, pure);
}
var Pure_1, Bind_1;
//# sourceMappingURL=freer.js.map

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__monad__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Identity = Identity_1 = (function () {
    function Identity(val) {
        this.val = val;
        this.multi = false;
    }
    ;
    Identity.of = function (a) {
        return new Identity_1(a);
    };
    Identity.prototype.of = function (a) {
        return new Identity_1(a);
    };
    Identity.prototype.ap = function (f) {
        return new Identity_1(f.val(this.val));
    };
    Identity.prototype.extract = function () {
        return this.val;
    };
    Identity.prototype.map = function (f) {
        return new Identity_1(f(this.val));
    };
    Identity.prototype.mapTo = function (b) {
        return this.of(b);
    };
    Identity.prototype.flatten = function () {
        return this.val;
    };
    Identity.prototype.chain = function (f) {
        return f(this.val);
    };
    return Identity;
}());
Identity.multi = false;
Identity = Identity_1 = __decorate([
    __WEBPACK_IMPORTED_MODULE_0__monad__["b" /* monad */]
], Identity);
/* harmony default export */ __webpack_exports__["a"] = (Identity);
var Identity_1;
//# sourceMappingURL=identity.js.map

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__either__ = __webpack_require__(69);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteList; });
/* harmony export (immutable) */ __webpack_exports__["b"] = repeat;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return naturals; });


var InfiniteList = (function () {
    function InfiniteList(fn) {
        this.fn = fn;
    }
    ;
    InfiniteList.prototype.map = function (f) {
        return new InfiniteList(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* compose */])(f, this.fn));
    };
    InfiniteList.prototype.mapTo = function (b) {
        return repeat(b);
    };
    InfiniteList.prototype.of = function (b) {
        return repeat(b);
    };
    InfiniteList.prototype.ap = function (a) {
        var _this = this;
        return new InfiniteList(function (i) { return a.fn(i)(_this.fn(i)); });
    };
    InfiniteList.prototype.lift = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new InfiniteList(function (i) {
            var vals = [];
            for (var j = 1; j < args.length; ++j) {
                vals[j - 1] = args[j].fn(i);
            }
            return args[0].apply(undefined, vals);
        });
    };
    InfiniteList.prototype.foldr = function (f, init) {
        throw new Error("Cannot perform strict foldr on infinite list");
    };
    InfiniteList.prototype.foldl = function (f, init) {
        throw new Error("Cannot perform strict foldl on infinite list");
    };
    InfiniteList.prototype.shortFoldr = function (f, init) {
        throw new Error("Cannot call shortFoldr on infinite list");
    };
    InfiniteList.prototype.shortFoldl = function (f, init) {
        var acc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__either__["f" /* right */])(init);
        var idx = 0;
        while (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__either__["h" /* isRight */])(acc)) {
            acc = f(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__either__["i" /* fromEither */])(acc), this.fn(idx));
            idx++;
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__either__["i" /* fromEither */])(acc);
    };
    InfiniteList.prototype.size = function () {
        return Infinity;
    };
    InfiniteList.prototype.maximum = function () {
        return Infinity;
    };
    InfiniteList.prototype.minimum = function () {
        return 0;
    };
    InfiniteList.prototype.sum = function () {
        return Infinity;
    };
    return InfiniteList;
}());

function repeat(a) {
    return new InfiniteList(function (_) { return a; });
}
var naturals = new InfiniteList(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* id */]);
//# sourceMappingURL=infinitelist.js.map

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freer__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Call; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CallP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ThrowE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CatchE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return IO; });
/* harmony export (immutable) */ __webpack_exports__["f"] = withEffects;
/* harmony export (immutable) */ __webpack_exports__["g"] = withEffectsP;
/* harmony export (immutable) */ __webpack_exports__["h"] = call;
/* harmony export (immutable) */ __webpack_exports__["i"] = callP;
/* harmony export (immutable) */ __webpack_exports__["j"] = throwE;
/* harmony export (immutable) */ __webpack_exports__["k"] = catchE;
/* harmony export (immutable) */ __webpack_exports__["l"] = doRunIO;
/* harmony export (immutable) */ __webpack_exports__["m"] = runIO;
/* harmony export (immutable) */ __webpack_exports__["n"] = testIO;


var Call = (function () {
    function Call(fn, args) {
        this.fn = fn;
        this.args = args;
        this.type = "call";
    }
    return Call;
}());

var CallP = (function () {
    function CallP(fn, args) {
        this.fn = fn;
        this.args = args;
        this.type = "callP";
    }
    return CallP;
}());

var ThrowE = (function () {
    function ThrowE(error) {
        this.error = error;
        this.type = "throwE";
    }
    return ThrowE;
}());

var CatchE = (function () {
    function CatchE(handler, io) {
        this.handler = handler;
        this.io = io;
        this.type = "catchE";
    }
    return CatchE;
}());

var IO = __WEBPACK_IMPORTED_MODULE_0__freer__["a" /* Freer */];
function withEffects(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new Call(fn, args));
    };
}
function withEffectsP(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new CallP(fn, args));
    };
}
function call(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new Call(fn, args));
}
function callP(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new CallP(fn, args));
}
function throwE(error) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new ThrowE(error));
}
function catchE(errorHandler, io) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__freer__["b" /* liftF */])(new CatchE(errorHandler, io));
}
function doRunIO(e) {
    return e.match({
        pure: function (a) { return Promise.resolve(a); },
        bind: function (io, cont) {
            switch (io.type) {
                case "call":
                    return runIO(cont(io.fn.apply(io, io.args)));
                case "callP":
                    return io.fn.apply(io, io.args).then(function (a) { return runIO(cont(a)); });
                case "catchE":
                    return doRunIO(io.io)
                        .then(function (a) { return runIO(cont(a)); })
                        .catch(function (err) { return doRunIO(io.handler(err)); });
                case "throwE":
                    return Promise.reject(io.error);
            }
        }
    });
}
function runIO(e) {
    return doRunIO(e);
}
function doTestIO(e, arr, ending, idx) {
    e.match({
        pure: function (a2) {
            if (ending !== a2) {
                throw new Error("Pure value invalid, expected " + ending + " but saw " + a2);
            }
        },
        bind: function (io, cont) {
            var _a = arr[idx], io2 = _a[0].val, a = _a[1];
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* deepEqual */])(io, io2)) {
                throw new Error("Value invalid, expected " + io2 + " but saw " + io);
            }
            else {
                doTestIO(cont(a), arr, ending, idx + 1);
            }
        }
    });
}
function testIO(e, arr, a) {
    doTestIO(e, arr, a, 0);
}
//# sourceMappingURL=io.js.map

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__monoid__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__monad__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Writer; });
/* harmony export (immutable) */ __webpack_exports__["b"] = runWriter;
/* harmony export (immutable) */ __webpack_exports__["c"] = createWriter;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Writer = (function (_super) {
    __extends(Writer, _super);
    function Writer(identity, state, value) {
        var _this = _super.call(this) || this;
        _this.identity = identity;
        _this.state = state;
        _this.value = value;
        _this.multi = false;
        return _this;
    }
    Writer.prototype.of = function (a) {
        return new Writer(this.identity, this.identity, a);
    };
    Writer.prototype.chain = function (f) {
        var _a = f(this.value), state = _a.state, value = _a.value;
        return new Writer(this.identity, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__monoid__["b" /* combine */])(this.state, state), value);
    };
    return Writer;
}(__WEBPACK_IMPORTED_MODULE_1__monad__["a" /* AbstractMonad */]));

function runWriter(w) {
    return [w.state, w.value];
}
function createWriter(mc) {
    var identityElm = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__monoid__["a" /* identity */])(mc);
    return {
        tell: function (w) {
            return new Writer(identityElm, w, {});
        },
        listen: function (m) {
            var value = [m.value, m.state];
            return new Writer(identityElm, m.state, value);
        },
        of: function (a) {
            return new Writer(identityElm, identityElm, a);
        },
        multi: false
    };
}
//# sourceMappingURL=writer.js.map

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
const hareactive_1 = __webpack_require__(68);
const jabz_1 = __webpack_require__(48);
const funnel_1 = __webpack_require__(138);
const { div, button, a } = funnel_1.elements;
const graphics_1 = __webpack_require__(107);
// Create global events
const body = document.querySelector("body");
const bodyMouseup = hareactive_1.streamFromEvent("mouseup", body);
const bodyMousemove = hareactive_1.streamFromEvent("mousemove", body);
const canvasHeight = 200;
const canvasWidth = 600;
const canvas = funnel_1.element("canvas", {
    actionDefinitions: {
        render: (elm, image) => {
            const ctx = elm.getContext("2d");
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            graphics_1.render(ctx, canvasWidth, canvasHeight, image);
        }
    }
});
const icon = funnel_1.element("i", { class: "material-icons" });
const slider = ({ position }) => jabz_1.go(function* () {
    const pixelPosition = position.map(n => n * canvasWidth);
    const { mousedown } = yield div({
        class: "slider"
    }, [div({
        class: "slider-progress",
        style: { width: pixelPosition.map(n => `${n + 5}px`) }
    })]);
    const mouseOffsetX = bodyMousemove.map(e => e.offsetX);
    const mousePressed = hareactive_1.toggle(false, mousedown, bodyMouseup);
    const setPositionS = jabz_1.combine(mousedown.map(e => e.offsetX / canvasWidth), hareactive_1.keepWhen(mouseOffsetX.map(x => x / canvasWidth), mousePressed));
    return { setPositionS };
});
function findMousemove(evs) {
    return time => {
        let idx = evs.length - 1;
        while (idx >= 0 && evs[idx].time > time) {
            idx--;
        }
        const before = idx !== -1 ? evs[idx] : { time: 0, x: 0, y: 0 };
        const last = evs[idx + 1];
        if (last !== undefined) {
            // Linear interpolation
            const factor = (time - before.time) / (last.time - before.time);
            return {
                x: before.x + (last.x - before.x) * factor,
                y: before.y + (last.y - before.y) * factor
            };
        } else {
            return before;
        }
    };
}
function prepend(elm, elms) {
    return elms.concat([elm]);
}
/**
 * Samples the behavior in the current moment and whenever the stream has an
 * occurrence.
 * @param behavior A behavior of a behavior to sample.
 * @param stream A stream whose occurrences will trigger a sample.
 */
function sampleOn(behavior, stream) {
    return hareactive_1.sample(behavior).chain(b => hareactive_1.sample(hareactive_1.switcher(b, hareactive_1.snapshot(behavior, stream))));
}
const model = (animation, duration) => jabz_1.fgo(function* model({ playPauseS, replayS, setPositionS, clickS, canvasMousemove, playing }) {
    const doPlay = hareactive_1.keepWhen(clickS, playing.map(b => !b));
    doPlay.map(b => console.log("do play fucktard", b));
    const jumpToTime = jabz_1.combine(setPositionS, replayS.mapTo(0)).map(n => n * duration);
    const playing_ = yield hareactive_1.sample(hareactive_1.scan((_, b) => !b, false, jabz_1.combine(playPauseS, doPlay)));
    const speed = jabz_1.map(b => b ? 1 : 0, playing_);
    const initialTimeB = yield hareactive_1.sample(hareactive_1.integrate(speed));
    const playFromBS = hareactive_1.snapshotWith((from, int) => int.map(n => n + from), hareactive_1.integrate(speed), jumpToTime);
    const timeB = yield hareactive_1.sample(hareactive_1.switcher(initialTimeB, playFromBS));
    const clickOccurrences = hareactive_1.snapshotWith((click, time) => ({
        time, value: { x: click.offsetX - canvasWidth / 2, y: canvasHeight / 2 - click.offsetY }
    }), timeB, hareactive_1.keepWhen(clickS, playing_));
    const worldClicksB = yield sampleOn(hareactive_1.scan(prepend, [], clickOccurrences), replayS);
    const moveOccurrence = hareactive_1.snapshotWith((move, time) => ({
        time, x: move.offsetX - canvasWidth / 2, y: canvasHeight / 2 - move.offsetY
    }), timeB, hareactive_1.keepWhen(canvasMousemove, playing_));
    const worldMousemoves = yield sampleOn(hareactive_1.scan((move, moves) => moves.concat([move]), [{ time: 0, x: 0, y: 0 }], moveOccurrence), replayS);
    const worldMouse = worldMousemoves.map(findMousemove);
    const positionB = timeB.map(t => t / duration);
    const worldB = jabz_1.lift((clicks, mouse) => ({ clicks, mouse }), worldClicksB, worldMouse);
    const animationB = worldB.map(animation);
    const imageB = jabz_1.lift((currentAnimation, t) => currentAnimation(t), animationB, timeB);
    return [{ imageB, positionB, playing: playing_ }, {}];
});
const view = ({ playing, imageB, positionB }) => div({
    class: "animation",
    style: { width: canvasWidth + "px", cursor: playing.map(b => b ? "default" : "pointer") }
}, [canvas({
    props: { width: canvasWidth, height: canvasHeight },
    setters: { render: imageB },
    output: { clickCanvas: "click", canvasMousemove: "mousemove" }
}), icon({
    class: "material-icons play-overlay",
    output: { clickPlay: "click" },
    style: { visibility: playing.map(b => b ? "hidden" : "visible") }
}, "play_arrow"), div({ class: "control-buttons" }, [button({
    output: { playPauseS: "click" }
}, icon(playing.map(b => b ? "pause" : "play_arrow"))), button({ output: { replayS: "click" } }, icon("replay"))]), slider({ position: positionB })]).map(out => Object.assign({}, out, { clickS: jabz_1.combine(out.clickCanvas, out.clickPlay), playing }));
const app = (animation, duration) => funnel_1.modelView(model(animation, duration), view);
function display({ animation, element, duration }) {
    if (element) {
        funnel_1.runComponent(element, app(animation, duration));
    }
}
exports.display = display;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.timeB = t => t;
exports.constB = a => t => a;
function lift1(f, a) {
    return t => f(a(t));
}
exports.lift1 = lift1;
exports.lift2 = (f, a, b) => t => f(a(t), b(t));
exports.lift3 = (f, a, b, c) => t => f(a(t), b(t), c(t));
function lift(f, ...behaviors) {
    return t => f(...behaviors.map(b => b(t)));
}
exports.lift = lift;
function map(f, stream) {
    return stream.map(({ time, value }) => ({ time, value: f(value) }));
}
exports.map = map;
function filter(predicate, stream) {
    return stream.filter(({ value }) => predicate(value));
}
exports.filter = filter;
function delay(delta, b) {
    return t => b(t - delta);
}
exports.delay = delay;
function slower(n, b) {
    return t => b(t / n);
}
exports.slower = slower;
function findOccurrence(t, e) {
    return e.filter(({ time }) => time < t).reverse()[0];
}
function switcher(b, e) {
    return t => {
        const occ = findOccurrence(t, e);
        return occ !== undefined ? occ.value(t) : b(t);
    };
}
exports.switcher = switcher;
function stepper(initialValue, stream) {
    return switcher(exports.constB(initialValue), map(exports.constB, stream));
}
exports.stepper = stepper;
function scan(f, init, source) {
    return t => {
        const occurrencesBeforeT = source.filter(({ time }) => time < t);
        const values = occurrencesBeforeT.map(({ value }) => value);
        return values.reduce((b, a) => f(a, b), init);
    };
}
exports.scan = scan;

/***/ }),
/* 151 */
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

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(151)
var ieee754 = __webpack_require__(155)
var isArray = __webpack_require__(156)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71)))

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(154)(undefined);
// imports


// module
exports.push([module.i, "canvas {\n  display: block; }\n\n.noselect, .animation {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Safari */\n  -khtml-user-select: none;\n  /* Konqueror HTML */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  supported by Chrome and Opera */ }\n\nbutton {\n  border: none;\n  background: none; }\n  button:hover {\n    cursor: pointer; }\n\n.animation {\n  border: 1px solid #dcdcdc;\n  margin: 1em 0;\n  position: relative; }\n\n.play-overlay {\n  color: #cccccc;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  font-size: 148px !important;\n  margin: -74px 0 0 -74px; }\n\n.control-buttons {\n  position: absolute;\n  bottom: 0;\n  margin-bottom: 6px;\n  line-height: 1em; }\n\n.slider {\n  position: absolute;\n  bottom: 0;\n  height: 6px;\n  display: flex;\n  align-items: center;\n  width: 100%;\n  overflow: hidden;\n  cursor: pointer;\n  background-color: rgba(140, 139, 139, 0.7); }\n  .slider .slider-line {\n    position: absolute;\n    height: 6px;\n    width: 100%; }\n  .slider .slider-progress {\n    background-color: #aa7777;\n    height: 6px;\n    position: absolute;\n    width: 40%; }\n  .slider .slider-thumb {\n    position: absolute;\n    background-color: #aa7777;\n    background-image: radial-gradient(circle at 60% 40%, #c29d9d 10%, #aa7777 90%);\n    left: 0;\n    cursor: pointer;\n    display: inline-block;\n    width: 16px;\n    height: 16px;\n    margin-left: -8px;\n    border-radius: 9px; }\n", ""]);

// exports


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(152).Buffer))

/***/ }),
/* 155 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 156 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 157 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(159);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 159 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(153);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(158)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(171);
module.exports = __webpack_require__(23).RegExp.escape;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , isArray  = __webpack_require__(80)
  , SPECIES  = __webpack_require__(5)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(162);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(25)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(37)
  , gOPS    = __webpack_require__(63)
  , pIE     = __webpack_require__(51);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(37)
  , toIObject = __webpack_require__(15);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(168)
  , invoke    = __webpack_require__(59)
  , aFunction = __webpack_require__(12);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ }),
/* 169 */
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(43)
  , ITERATOR  = __webpack_require__(5)('iterator')
  , Iterators = __webpack_require__(33);
module.exports = __webpack_require__(23).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0)
  , $re     = __webpack_require__(169)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(109)});

__webpack_require__(42)('copyWithin');

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $every  = __webpack_require__(22)(4);

$export($export.P + $export.F * !__webpack_require__(20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {fill: __webpack_require__(72)});

__webpack_require__(42)('fill');

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $filter = __webpack_require__(22)(2);

$export($export.P + $export.F * !__webpack_require__(20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(22)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(42)(KEY);

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(22)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(42)(KEY);

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(0)
  , $forEach = __webpack_require__(22)(0)
  , STRICT   = __webpack_require__(20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(26)
  , $export        = __webpack_require__(0)
  , toObject       = __webpack_require__(9)
  , call           = __webpack_require__(117)
  , isArrayIter    = __webpack_require__(79)
  , toLength       = __webpack_require__(8)
  , createProperty = __webpack_require__(73)
  , getIterFn      = __webpack_require__(96);

$export($export.S + $export.F * !__webpack_require__(61)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , $indexOf      = __webpack_require__(55)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', {isArray: __webpack_require__(80)});

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(15)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(50) != Object || !__webpack_require__(20)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , toIObject     = __webpack_require__(15)
  , toInteger     = __webpack_require__(32)
  , toLength      = __webpack_require__(8)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $map    = __webpack_require__(22)(1);

$export($export.P + $export.F * !__webpack_require__(20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(0)
  , createProperty = __webpack_require__(73);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(111);

$export($export.P + $export.F * !__webpack_require__(20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(111);

$export($export.P + $export.F * !__webpack_require__(20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(0)
  , html       = __webpack_require__(77)
  , cof        = __webpack_require__(18)
  , toIndex    = __webpack_require__(40)
  , toLength   = __webpack_require__(8)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $some   = __webpack_require__(22)(3);

$export($export.P + $export.F * !__webpack_require__(20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(12)
  , toObject  = __webpack_require__(9)
  , fails     = __webpack_require__(3)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39)('Array');

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(0)
  , toObject    = __webpack_require__(9)
  , toPrimitive = __webpack_require__(25);

$export($export.P + $export.F * __webpack_require__(3)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(11)(proto, TO_PRIMITIVE, __webpack_require__(164));

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(13)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', {bind: __webpack_require__(112)});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(4)
  , getPrototypeOf = __webpack_require__(17)
  , HAS_INSTANCE   = __webpack_require__(5)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(7).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7).f
  , createDesc = __webpack_require__(31)
  , has        = __webpack_require__(10)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0)
  , log1p   = __webpack_require__(119)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0)
  , sign    = __webpack_require__(85);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0)
  , $expm1  = __webpack_require__(84);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(0)
  , sign      = __webpack_require__(85)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {log1p: __webpack_require__(119)});

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {sign: __webpack_require__(85)});

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(84)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(84)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , has               = __webpack_require__(10)
  , cof               = __webpack_require__(18)
  , inheritIfRequired = __webpack_require__(78)
  , toPrimitive       = __webpack_require__(25)
  , fails             = __webpack_require__(3)
  , gOPN              = __webpack_require__(36).f
  , gOPD              = __webpack_require__(16).f
  , dP                = __webpack_require__(7).f
  , $trim             = __webpack_require__(46).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(35)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(13)(global, NUMBER, $Number);
}

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(0)
  , _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {isInteger: __webpack_require__(81)});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(0)
  , isInteger = __webpack_require__(81)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(126);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(127);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , anInstance   = __webpack_require__(29)
  , toInteger    = __webpack_require__(32)
  , aNumberValue = __webpack_require__(108)
  , repeat       = __webpack_require__(91)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $fails       = __webpack_require__(3)
  , aNumberValue = __webpack_require__(108)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(120)});

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(35)});

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperties: __webpack_require__(121)});

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperty: __webpack_require__(7).f});

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(30).onFreeze;

__webpack_require__(24)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(15)
  , $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(24)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(24)('getOwnPropertyNames', function(){
  return __webpack_require__(122).f;
});

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(9)
  , $getPrototypeOf = __webpack_require__(17);

__webpack_require__(24)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(24)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(24)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(24)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {is: __webpack_require__(128)});

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9)
  , $keys    = __webpack_require__(37);

__webpack_require__(24)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(30).onFreeze;

__webpack_require__(24)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(30).onFreeze;

__webpack_require__(24)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(64).set});

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(43)
  , test    = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(13)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(126);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(127);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(34)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(26)
  , classof            = __webpack_require__(43)
  , $export            = __webpack_require__(0)
  , isObject           = __webpack_require__(4)
  , anObject           = __webpack_require__(1)
  , aFunction          = __webpack_require__(12)
  , anInstance         = __webpack_require__(29)
  , forOf              = __webpack_require__(44)
  , setProto           = __webpack_require__(64).set
  , speciesConstructor = __webpack_require__(88)
  , task               = __webpack_require__(93).set
  , microtask          = __webpack_require__(86)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(38)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(45)($Promise, PROMISE);
__webpack_require__(39)(PROMISE);
Wrapper = __webpack_require__(23)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(61)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(12)
  , anObject  = __webpack_require__(1)
  , _apply    = Function.apply;

$export($export.S, 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(aFunction(target), thisArgument, anObject(argumentsList));
  }
});

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export   = __webpack_require__(0)
  , create    = __webpack_require__(35)
  , aFunction = __webpack_require__(12)
  , anObject  = __webpack_require__(1)
  , isObject  = __webpack_require__(4)
  , bind      = __webpack_require__(112);

// MS Edge supports only 2 arguments
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
$export($export.S + $export.F * __webpack_require__(3)(function(){
  function F(){}
  return !(Reflect.construct(function(){}, [], F) instanceof F);
}), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(7)
  , $export     = __webpack_require__(0)
  , anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(25);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(0)
  , gOPD     = __webpack_require__(16).f
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(82)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(16)
  , $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(0)
  , getProto = __webpack_require__(17)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(16)
  , getPrototypeOf = __webpack_require__(17)
  , has            = __webpack_require__(10)
  , $export        = __webpack_require__(0)
  , isObject       = __webpack_require__(4)
  , anObject       = __webpack_require__(1);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(0)
  , anObject      = __webpack_require__(1)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(125)});

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(0)
  , anObject           = __webpack_require__(1)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(0)
  , setProto = __webpack_require__(64);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(7)
  , gOPD           = __webpack_require__(16)
  , getPrototypeOf = __webpack_require__(17)
  , has            = __webpack_require__(10)
  , $export        = __webpack_require__(0)
  , createDesc     = __webpack_require__(31)
  , anObject       = __webpack_require__(1)
  , isObject       = __webpack_require__(4);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(2)
  , inheritIfRequired = __webpack_require__(78)
  , dP                = __webpack_require__(7).f
  , gOPN              = __webpack_require__(36).f
  , isRegExp          = __webpack_require__(60)
  , $flags            = __webpack_require__(58)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function(){
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(13)(global, 'RegExp', $RegExp);
}

__webpack_require__(39)('RegExp');

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(57)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(57)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(57)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(57)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(60)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(132);
var anObject    = __webpack_require__(1)
  , $flags      = __webpack_require__(58)
  , DESCRIPTORS = __webpack_require__(6)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(3)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(14)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(14)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(14)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(14)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $at     = __webpack_require__(89)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(0)
  , toLength  = __webpack_require__(8)
  , context   = __webpack_require__(90)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(76)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(14)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(14)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(14)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(0)
  , toIndex        = __webpack_require__(40)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(0)
  , context  = __webpack_require__(90)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(76)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(14)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(89)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(83)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(14)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(15)
  , toLength  = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(91)
});

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(14)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(0)
  , toLength    = __webpack_require__(8)
  , context     = __webpack_require__(90)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(76)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(14)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(14)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(14)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(46)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(10)
  , DESCRIPTORS    = __webpack_require__(6)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(13)
  , META           = __webpack_require__(30).KEY
  , $fails         = __webpack_require__(3)
  , shared         = __webpack_require__(65)
  , setToStringTag = __webpack_require__(45)
  , uid            = __webpack_require__(41)
  , wks            = __webpack_require__(5)
  , wksExt         = __webpack_require__(130)
  , wksDefine      = __webpack_require__(95)
  , keyOf          = __webpack_require__(166)
  , enumKeys       = __webpack_require__(165)
  , isArray        = __webpack_require__(80)
  , anObject       = __webpack_require__(1)
  , toIObject      = __webpack_require__(15)
  , toPrimitive    = __webpack_require__(25)
  , createDesc     = __webpack_require__(31)
  , _create        = __webpack_require__(35)
  , gOPNExt        = __webpack_require__(122)
  , $GOPD          = __webpack_require__(16)
  , $DP            = __webpack_require__(7)
  , $keys          = __webpack_require__(37)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(36).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(51).f  = $propertyIsEnumerable;
  __webpack_require__(63).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(34)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $typed       = __webpack_require__(66)
  , buffer       = __webpack_require__(94)
  , anObject     = __webpack_require__(1)
  , toIndex      = __webpack_require__(40)
  , toLength     = __webpack_require__(8)
  , isObject     = __webpack_require__(4)
  , TYPED_ARRAY  = __webpack_require__(5)('typed_array')
  , ArrayBuffer  = __webpack_require__(2).ArrayBuffer
  , speciesConstructor = __webpack_require__(88)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(39)(ARRAY_BUFFER);

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(66).ABV, {
  DataView: __webpack_require__(94).DataView
});

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(115);

// 23.4 WeakSet Objects
__webpack_require__(56)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(0)
  , $includes = __webpack_require__(55)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(42)('includes');

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(0)
  , microtask = __webpack_require__(86)()
  , process   = __webpack_require__(2).process
  , isNode    = __webpack_require__(18)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0)
  , cof     = __webpack_require__(18);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(114)('Map')});

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(9)
  , aFunction       = __webpack_require__(12)
  , $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(62), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(9)
  , aFunction       = __webpack_require__(12)
  , $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(62), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(0)
  , $entries = __webpack_require__(124)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(0)
  , ownKeys        = __webpack_require__(125)
  , toIObject      = __webpack_require__(15)
  , gOPD           = __webpack_require__(16)
  , createProperty = __webpack_require__(73);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key, D;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(9)
  , toPrimitive              = __webpack_require__(25)
  , getPrototypeOf           = __webpack_require__(17)
  , getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(62), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(9)
  , toPrimitive              = __webpack_require__(25)
  , getPrototypeOf           = __webpack_require__(17)
  , getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(62), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0)
  , $values = __webpack_require__(124)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(0)
  , global      = __webpack_require__(2)
  , core        = __webpack_require__(23)
  , microtask   = __webpack_require__(86)()
  , OBSERVABLE  = __webpack_require__(5)('observable')
  , aFunction   = __webpack_require__(12)
  , anObject    = __webpack_require__(1)
  , anInstance  = __webpack_require__(29)
  , redefineAll = __webpack_require__(38)
  , hide        = __webpack_require__(11)
  , forOf       = __webpack_require__(44)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(39)('Observable');

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(27)
  , anObject                  = __webpack_require__(1)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(27)
  , anObject               = __webpack_require__(1)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(133)
  , from                    = __webpack_require__(110)
  , metadata                = __webpack_require__(27)
  , anObject                = __webpack_require__(1)
  , getPrototypeOf          = __webpack_require__(17)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(27)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(17)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(27)
  , anObject                = __webpack_require__(1)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(27)
  , anObject               = __webpack_require__(1)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(27)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(17)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(27)
  , anObject               = __webpack_require__(1)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(27)
  , anObject                  = __webpack_require__(1)
  , aFunction                 = __webpack_require__(12)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(114)('Set')});

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0)
  , $at     = __webpack_require__(89)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(0)
  , defined     = __webpack_require__(19)
  , toLength    = __webpack_require__(8)
  , isRegExp    = __webpack_require__(60)
  , getFlags    = __webpack_require__(58)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(82)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(129);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(129);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(46)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(46)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95)('asyncIterator');

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95)('observable');

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', {global: __webpack_require__(2)});

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(97)
  , redefine      = __webpack_require__(13)
  , global        = __webpack_require__(2)
  , hide          = __webpack_require__(11)
  , Iterators     = __webpack_require__(33)
  , wks           = __webpack_require__(5)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , $task   = __webpack_require__(93);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(2)
  , $export    = __webpack_require__(0)
  , invoke     = __webpack_require__(59)
  , partial    = __webpack_require__(167)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(291);
__webpack_require__(230);
__webpack_require__(232);
__webpack_require__(231);
__webpack_require__(234);
__webpack_require__(236);
__webpack_require__(241);
__webpack_require__(235);
__webpack_require__(233);
__webpack_require__(243);
__webpack_require__(242);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(237);
__webpack_require__(229);
__webpack_require__(240);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(197);
__webpack_require__(199);
__webpack_require__(198);
__webpack_require__(247);
__webpack_require__(246);
__webpack_require__(217);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(278);
__webpack_require__(283);
__webpack_require__(290);
__webpack_require__(281);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(279);
__webpack_require__(284);
__webpack_require__(286);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(280);
__webpack_require__(282);
__webpack_require__(285);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(192);
__webpack_require__(194);
__webpack_require__(193);
__webpack_require__(196);
__webpack_require__(195);
__webpack_require__(181);
__webpack_require__(179);
__webpack_require__(185);
__webpack_require__(182);
__webpack_require__(188);
__webpack_require__(190);
__webpack_require__(178);
__webpack_require__(184);
__webpack_require__(175);
__webpack_require__(189);
__webpack_require__(173);
__webpack_require__(187);
__webpack_require__(186);
__webpack_require__(180);
__webpack_require__(183);
__webpack_require__(172);
__webpack_require__(174);
__webpack_require__(177);
__webpack_require__(176);
__webpack_require__(191);
__webpack_require__(97);
__webpack_require__(263);
__webpack_require__(268);
__webpack_require__(132);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(248);
__webpack_require__(131);
__webpack_require__(133);
__webpack_require__(134);
__webpack_require__(303);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(298);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(296);
__webpack_require__(299);
__webpack_require__(297);
__webpack_require__(300);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(256);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(262);
__webpack_require__(261);
__webpack_require__(304);
__webpack_require__(330);
__webpack_require__(333);
__webpack_require__(332);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(331);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(315);
__webpack_require__(318);
__webpack_require__(314);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(307);
__webpack_require__(329);
__webpack_require__(338);
__webpack_require__(306);
__webpack_require__(308);
__webpack_require__(310);
__webpack_require__(309);
__webpack_require__(311);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(323);
__webpack_require__(322);
__webpack_require__(325);
__webpack_require__(324);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(305);
__webpack_require__(319);
__webpack_require__(341);
__webpack_require__(340);
__webpack_require__(339);
module.exports = __webpack_require__(23);

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return Promise.resolve(value.arg).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(71), __webpack_require__(157)))

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(136);
module.exports = __webpack_require__(135);


/***/ })
/******/ ]);