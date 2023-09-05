/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

class Item {
    constructor(_name, _price, _description, _id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
        this._name = _name;
        this._price = _price;
        this._description = _description;
        this._id = _id;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    itemElement() {
        const itemContainer = document.createElement("div");
        itemContainer.innerHTML = `<div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">${this.price}</p>
            <p class="card-text">${this.description}</p>
            <a href="#" class="btn btn-success" id="add">Add To Cart<a/>
            </div>
            </div>
            `;
        const addToCart = itemContainer.querySelector("#add");
        addToCart.addEventListener("click", () => {
            Shop.myUser.addToCart(this);
        });
        return itemContainer;
    }
}
class User {
    constructor(_name, _age, _id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(), _cart = []) {
        this._name = _name;
        this._age = _age;
        this._id = _id;
        this._cart = _cart;
    }
    get cart() {
        return this._cart;
    }
    set cart(value) {
        this._cart = value;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    static loggingInUser() {
        const name = document.getElementById("name").value;
        const age = parseInt(document.getElementById("age").value);
        if (name && age > 0) {
            const turnOn = document.getElementsByClassName('is-invisible');
            for (const element of turnOn) {
                console.log("Turning on", element);
                element.classList.replace('is-invisible', 'is-visible');
            }
            return new User(name, age);
        }
        return;
    }
    cartHTMLElement() {
        const element = document.createElement('div');
        element.classList.add("cart-section");
        for (const cartItem of new Set(this.cart)) {
            const removeOne = document.createElement("button");
            removeOne.classList.add("btn", "btn-warning");
            removeOne.id = `${cartItem.id}-removeOne`;
            removeOne.innerText = "-";
            removeOne.addEventListener("click", () => {
                this.removeQuantity(cartItem, 1);
            });
            const removeAll = document.createElement("button");
            removeAll.classList.add("btn", "btn-danger");
            removeAll.id = `${cartItem.id}-removeAll`;
            removeAll.innerText = "X";
            removeAll.addEventListener("click", () => {
                this.removeFromCart(cartItem);
            });
            element.innerHTML += `<div class="cart-info"><p><strong>${cartItem.name}</strong></p>
            <p>${cartItem.price}</p>
            <p>x${this.cart.filter(item => item === cartItem).length}</p>
            <p>${removeOne.outerHTML}</p>
            <p>${removeAll.outerHTML}</p>
            </div>
            `;
        }
        element.innerHTML += "<hr>";
        element.innerHTML += `<div class="total"><p><strong>Total:</strong></p><p>${this.calcTotal().toFixed(2)}</div>`;
        return element;
    }
    addRemoveEventListeners() {
        for (const shopItem of new Set(this.cart)) {
            const removeOne = document.getElementById(`${shopItem.id}-removeOne`);
            if (removeOne) {
                removeOne.addEventListener("click", () => {
                    this.removeQuantity(shopItem, 1);
                });
            }
            const removeAll = document.getElementById(`${shopItem.id}-removeAll`);
            if (removeAll) {
                removeAll.addEventListener("click", () => {
                    this.removeFromCart(shopItem);
                });
            }
        }
    }
    addToCart(item) {
        console.log(`${this.name} has added ${item.name} to cart\n`);
        this.cart.push(item);
        this.cart.sort((n1, n2) => {
            if (n1.price > n2.price) {
                return 1;
            }
            if (n1.price < n2.price) {
                return -1;
            }
            return 0;
        });
        Shop.updateCart();
    }
    removeFromCart(shopItem) {
        const count = this.cart.filter(item => item === shopItem).length;
        this.cart.splice(this.cart.indexOf(shopItem), count);
        console.log(`Removing all ${shopItem.name}'s from cart...\n`);
        Shop.updateCart();
    }
    removeQuantity(shopItem, quantity) {
        this.cart.splice(this.cart.indexOf(shopItem), quantity);
        console.log(`Removing x${quantity} ${shopItem.name}'s from cart...\n`);
        Shop.updateCart();
    }
    calcTotal() {
        let total = 0;
        this.cart.forEach(item => {
            total += item.price;
        });
        return total;
    }
    printCart() {
        console.log(`${this.name}'s Cart: `);
        this.cart.forEach(item => {
            console.log("      " + item.name);
        });
        console.log(" ");
    }
}
class Shop {
    constructor(_item = []) {
        this._item = _item;
        this.item.push(new Item('Light Saber', 39.99, 'May the force be with you. Are you Jedi or Sith?'));
        this.item.push(new Item('MacBook Pro', 1599.99, 'Finish tasks at the speed of light. Equipped with retina display.'));
        this.item.push(new Item('Wireless Mouse', 64.99, 'Click your way to the top of the leaderboards. Do you even game?'));
        this.item.push(new Item("Witcher Mug", 14.99, "While the Witcher Slays your enemies have nice cup of victory"));
        this.item.push(new Item("Invisi-Robe", 728.99, "This robe will turn the wearer invisible. Be responsible!"));
        this.item.push(new Item("Hover Board", 3849.99, "Show us your wild side! Feel the wind in your hair!"));
        this.showItems();
    }
    get item() {
        return this._item;
    }
    set item(value) {
        this._item = value;
    }
    showItems() {
        for (const shopItem of this._item) {
            document.getElementById("shop").append(shopItem.itemElement());
        }
    }
    static updateCart() {
        const cart = document.getElementById("cart");
        if (Shop.myUser.cart.length === 0) {
            cart.innerHTML = `<h1>No items in cart</h1>`;
        }
        else {
            cart.replaceChildren(Shop.myUser.cartHTMLElement());
            Shop.myUser.addRemoveEventListeners();
        }
    }
    static loginUser(event) {
        event.preventDefault();
        Shop.myUser = User.loggingInUser();
        console.log(Shop.myUser);
        if (Shop.myUser) {
            const turnOff = document.getElementsByClassName('is-visible');
            for (const element of turnOff) {
                console.log("Turning off", element);
                element.classList.replace('is-visible', 'is-invisible');
            }
            new Shop();
            const greeting = document.querySelector(".greeting");
            const greetingDiv = document.createElement("div");
            greeting === null || greeting === void 0 ? void 0 : greeting.append(greetingDiv);
            greetingDiv.innerHTML += `<h1>Hello ${Shop.myUser.name}</h1>`;
            Shop.myUser.cart = [];
            Shop.updateCart();
        }
        console.log("This is the login USer");
    }
}
const login = document.getElementById("login-button");
login === null || login === void 0 ? void 0 : login.addEventListener("click", (event) => {
    console.log("click");
    Shop.loginUser(event);
});

})();

/******/ })()
;