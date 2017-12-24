(function () {
    //为原生js简单的扩展一些东西，方便使用
    "use strict";
    let Premise = function Premise(value, obj) {
        let Pre = {
            writable: false,
            enumerable: false,
            configurable: false,
            value: value
        };
        if (obj) {
            obj.IsEach(function (n, v, k) {
                Pre[n] = v;
            })
        }
        return Pre;
    };
    //对象部分
    Object.defineProperties(Object.prototype, {
        length: {
            writable: false,
            enumerable: false,
            configurable: false,
            value: function length() {
                //返回对象的键值对个数
                return Object.keys(this).length;
            }
        },
        IsIndex: {
            writable: false,
            enumerable: false,
            configurable: false,
            value: function IsIndex(n, b, c) {
                //返回对象中第n个键值对的值或者是这个键值对，若是返回键值对则是数组形式也可以是对象形式
                let s = 0, l = false;
                for (let i in this) {
                    if (s === Number(n)) {
                        c !== undefined ? this[i] = c : null;
                        if (b === "object") {
                            s = {};
                            s[i] = this[i];
                        } else {
                            s = b === "array" ? [i, this[i]] : this[i];
                        }
                        l = true;
                        break;
                    } else {
                        s++;
                    }
                }
                return l ? s : undefined;
            }
        },
        IsEach: {
            writable: false,
            enumerable: false,
            configurable: false,
            value: function IsEach(callback) {
                let arr = [];
                for (let i = 0; i < this.length(); i++) {
                    arr.push(callback(this.IsIndex(i, "array")[0], this.IsIndex(i, "array")[1], i));
                }
                return arr;
            }
        },
        IsClone: {
            writable: false,
            enumerable: false,
            configurable: false,
            value: function IsClone(b) {
                //返回一个新的对象，当前对象的复制品
                let Mod = Object(),
                    Rep = function Rep(obj, callback) {
                        for (let i in obj) {
                            if (typeof v === "object" && b) {
                                callback[i] = Object();
                                Rep(obj[i], callback[i])
                            } else {
                                callback[i] = obj[i];
                            }
                        }
                    };
                Rep(this, Mod);
                return Mod
            }
        }
    });

    //字符串部分
    Object.defineProperties(String.prototype, {
        toElement: Premise(
            function toElement() {
                let dark = IsBox.getNode("div");
                dark.innerHTML = this;
                return dark.children.GoArray();
            }
        ),
        Division: Premise(
            function Division() {
                if (typeof this !== "number") {
                    return [Number(this.replace(/[a-z]/g, "")), this.replace(/[.\-0-9]/g, "")]
                } else {
                    return [this];
                }
            }
        )
    });
    //数组部分
    Object.defineProperties(Array.prototype, {
        AllAnimate: Premise(
            function AllAnimate(config, s, callback) {
                //对数组中所有节点施加动画
                this.forEach(function (v, key) {
                    let a;
                    if(typeof s!=='number'){
                        a=s.indexOf(s.sort(function (a, b) {return b - a})[0]);
                    }
                    a=this.length-1;
                    v.animate(String(config) === "[object Object]" ? config : config[key], typeof s === "number" ? s : s[key], typeof callback === "function" && Number(key) ===a  ? callback : typeof callback === "object" ? callback[key] : null);
                }.bind(this));
                return this
            }
        ),
        IsIndex: Premise(
            function IsIndex(o) {
                let a = [];
                this.forEach(function (v, key) {
                    if (o === v) {
                        a.push(key)
                    }
                });
                return a
            }
        ),
        delTarget: Premise(
            function delIndex(i) {
                for (let a = this.length - 1; a > -1; a--) {
                    let k = "IsQuery";
                    for (let s = this.length - 1; s > -1; s--) {
                        this[s] === i ? k = s : null;
                    }
                    k !== "IsQuery" ? this.splice(k, 1) : null;
                }
                return this
            }
        ),
        delRepeat: Premise(
            function delRepeat() {
                //为数组添加去重方法
                let a = new Array(0), b = new Array(0);
                this.forEach(function (n, k) {
                    typeof n === "object" ? b[JSON.stringify(n)] = k : b[n] = k;
                });
                Object.keys(b).map(function (m) {
                    a.push(this[b[m]]);
                }.bind(this));
                return a
            }
        ),
        AllIsStyle: Premise(
            function AllIsStyle(config) {
                //修改数组中所有dom元素的style
                this.forEach(function (v, key) {
                    v.IsStyle(String(config) === "[object Object]" ? config : config[key])
                });
                return this
            }
        ),
        IsScreen: Premise(
            function IsScreen(type) {
                //筛选HTMLCollection对象或者数组中所有符合类型的元素,返回数组
                switch (type[0]) {
                    case ".":
                        return function iGalaxy(v, t, e) {
                            let arr = [];
                            for (let i = 0; i < v.length; i++) {
                                for (let s = 0; s < v[i].attributes.length; s++) {
                                    if (v[i].attributes[s].nodeName === t) {
                                        if (v[i].attributes[s].nodeValue.match(new RegExp("(\\s|^)" + e + "(\\s|$)"))) {
                                            arr.push(v[i]);
                                        }
                                    }
                                }
                            }
                            return arr
                        }(this, "class", String(type).substring(1, type.length));
                        break;
                    default:
                        return function iAtom(v, t) {
                            let arr = [];
                            for (let i = 0; i < v.length; i++) {
                                if (v[i].nodeName === t.toUpperCase()) {
                                    arr.push(v[i])
                                }
                            }
                            return arr
                        }(this, type);
                        break;
                }
            }
        ),
        AllremoveClass: Premise(
            function AllremoveClass(type) {
                this.forEach(function (v,key) {
                    v.removeClass(typeof type==="string"? type:type[key]);
                });
                return this
            }
        ),
        AlladdClass: Premise(
            function AlladdClass(type) {
                this.forEach(function (v) {
                    v.addClass(typeof type==="string"? type:type[key]);
                });
                return this
            }
        ),
        AlltoggleClass: Premise(
            function AlltoggleClass(type) {
                this.forEach(function (v) {
                    v.toggleClass(typeof type==="string"? type:type[key]);
                });
                return this
            }
        ),
        delText: Premise(
            function delText() {
                return NodeList.prototype.delText.call(this);
            }
        ),
        Allclick: Premise(
            function Allclick(callback, b) {
                this.forEach(function (v,key) {
                    let back=typeof callback==="function"? callback:callback[key],
                    d=b? b.length? b.length===this.length? b[key]:b:b:v;
                    v.onclick = back.bind(d);
                }.bind(this));
                return this;
            }
        ),
        Allchildren: Premise(
            function Allchildren(type) {
                let arr = [];
                this.forEach(function (v) {
                    arr = arr.concat(v.childNodes.GoArray());
                });
                return arr.IsScreen(type);
            }
        )
    });

    //HTMLCollection类数组对象部分
    Object.defineProperties(HTMLCollection.prototype, {
        GoArray: Premise(
            function GoArray() {
                //将HTMLCollection类数组对象转换为数组
                return Object.keys(this).map(function (k) {
                    return this[k];
                }.bind(this));
            }
        ),
        delText: Premise(
            function delText() {
                return NodeList.prototype.delText.call(this.GoArray());
            }
        ),
        IsScreen: Premise(
            function IsScreen(type) {
                //筛选HTMLCollection对象或者数组中所有符合类型的元素,返回数组
                return this.GoArray().IsScreen(type);
            }
        ),
        AllremoveClass: Premise(
            function AllremoveClass(type) {
                this.GoArray().AllremoveClass(type);
                return this
            }
        ),
        AlladdClass: Premise(
            function AlladdClass(type) {
                this.GoArray().AlladdClass(type);
                return this
            }
        ),
        AlltoggleClass: Premise(
            function AlltoggleClass(type) {
                this.GoArray().AlltoggleClass(type);
                return this
            }
        ),
        AllAnimate: Premise(
            function AllAnimate(config, s, callback) {
                this.GoArray().AllAnimate(config, s, callback);
                return this
            }
        )
    });

    //NodeList
    Object.defineProperties(NodeList.prototype, {
        delText: Premise(
            function delText() {
                let arr = [];
                this.forEach(function (v) {
                    v.nodeType !== 3 ? arr.push(v) : null
                });
                return arr
            }
        ),
        GoArray: Premise(
            function GoArray() {
                return HTMLCollection.prototype.GoArray.call(this);
            }
        )
    });
    //所有dom节点对象
    Object.defineProperties(Element.prototype, {
        repeat: Premise(
            function repeat(d) {
                let base = this.nextElementSibling === null ? [this.parentNode, "parent"] : [this.nextElementSibling, "next"],
                    Template = this.toElementStr(),
                    reg = /{{(.*?)}}/g,
                    msg = [];
                this.parentNode.removeChild(this);
                d.forEach(function (v, key) {
                    let node = Template.replace(reg, function (math, k) {
                        return function () {
                            let dark = d[key];
                            k.split(".").forEach(function (v) {
                                dark = dark[v];
                                return dark
                            });
                            return dark
                        }();
                    });
                    msg.push(node.toElement()[0]);
                    if (base[1] === "next"&&base[0] !== undefined) {
                        base[0].parentNode.insertBefore(msg[msg.length - 1], base[0]);
                    } else if(base[0] !== undefined){
                        base[0].appendChild(msg[msg.length - 1]);
                    }
                });
                return msg;
            }
        ),
        toElementStr: Premise(
            function toElementStr() {
                let dark = IsBox.getNode("div");
                dark.appendChild(this.cloneNode(true));
                return dark.innerHTML
            }
        ),

        replace: Premise(
            function replace(el) {
                this.parentNode.insertBefore(el, this);
                this.parentNode.removeChild(this);
                return el;
            }
        ),
        IsStyle: Premise(
            function IsStyle(s) {
                //接受对象形式的style样式，赋予dom元素
                let ak = [], am = [], reg = /[A-Z]/;
                for (let x in s) {
                    ak.push(s[x]);
                    am.push(x);
                }
                for (let i = 0; i < am.length; i++) {
                    for (let j = 0; j < am[i].length; j++) {
                        if (reg.test(am[i][j])) {
                            am[i] = am[i].replace(am[i][j], "-" + am[i][j].toLowerCase());
                        }
                    }
                }
                for (let k = 0; k < am.length; k++) {
                    this.style.cssText += am[k] + ":" + ak[k];
                }
                return this;
            }
        ),
        getStyle: Premise(
            function getStyle(attribute) {
                return this.currentStyle ? this.currentStyle[attribute] : document.defaultView.getComputedStyle(this, true)[attribute];
            }
        ),
        IsIndex: Premise(
            function IsIndex(b) {
                let a = [], list = this.parentNode.childNodes;
                !b ? list = list.delText() : null;
                list.forEach(function (v, key) {
                    if (this === v) {
                        a.push(key)
                    }
                }.bind(this));
                return a
            }
        ),
        animate: Premise(
            function animate(style, time, callback) {
                //为节点添加animate方法---动画
                let animate = function (c, s, callback, el) {
                    return this.init(c, s, callback, el);
                };
                animate.prototype = {
                    init: function (c, s, cb, el) {
                        this.count = 0;
                        this.con = 0;
                        this.el = el;
                        this.s = s;
                        this.cBack = cb;
                        this.el.Stop(true);
                        window.IsAnimateBox30017.push([this.el, {
                            style: c,
                            time: this.s,
                            callback: this.cBack
                        }, null, []]);
                        Object.keys(c).map(function (m) {
                            if (typeof this[m] === "function") {
                                this.count++;
                                this.con++;
                                this[m](c[m]);
                            } else {
                                this.el.IsStyle(c.IsIndex(this.con, "object"));
                            }
                        }.bind(this));
                        return el;
                    },
                    callback: function () {
                        this.count--;
                        if (this.count === 0) {
                            this.cBack(this.el);
                        }
                    },
                    isTime: function (m, n, t, fn, callback, iscall) {
                        this.isTime.prototype = {
                            init: function (config) {
                                this.Is = setInterval(function () {
                                    this.Start.bind(this)(config);
                                }.bind(this), 10);
                            },
                            Start: function (c) {
                                c.Boo ? c.Start -= c.Memory : c.Start += -c.Memory;
                                c.Boo && c.Start <= c.End || !c.Boo && c.Start >= c.End ? c.Start = c.End : null;
                                this.Run(c.Ment, c.Start, c.End, c.Callback, c.IsCall);
                            },
                            Run: function (m, s, e, c, a) {
                                m(s);
                                s === e ? this.Stop(c, a) : null;
                            },
                            Stop: function (c, a) {
                                c ? c.bind(a)() : null;
                                clearInterval(this.Is);
                                a.el.Stop(true);
                                this.Is = null;
                            }
                        };
                        this.isTime.prototype.init.prototype = this.isTime.prototype;
                        return new this.isTime.prototype.init({
                            Boo: m >= n,
                            Memory: (m - n) / t * 10,
                            Start: m,
                            End: n,
                            Ment: fn,
                            Callback: callback,
                            IsCall: iscall || window
                        });
                    },
                    dio: function Division(str) {
                        if (typeof str !== "number") {
                            return [Number(str.replace(/[a-z]/g, "")), str.replace(/[.\-0-9]/g, "")]
                        } else {
                            return [str];
                        }
                    },
                    Usual: function (m, n, t, d) {
                        let obj = this.isTime(m, n, this.s, function (m) {
                            this.el.style[t] = m + d;
                            window.IsAnimateBox30017.forEach(function (v) {
                                if (v[0] === this.el) {
                                    v[1].ani = true;
                                    v[1].time -= 10;
                                }
                            }.bind(this));
                        }.bind(this), function () {
                            window.IsAnimateBox30017.forEach(function (v) {
                                if (v[0] === this.el) {
                                    v[3].pop();
                                }
                            }.bind(this));
                            this.callback();
                        }, this);
                        window.IsAnimateBox30017.forEach(function (v) {
                            if (v[0] === this.el) {
                                v[2] = obj.Is;
                                v[3].push(1);
                            }
                        }.bind(this));
                    },
                    wiHe: function wiHe(c, t, p) {
                        this.Usual(this.el.getStyle(t) === "auto" ? 0 : this.dio(this.el.getStyle(t))[0], function () {
                            let obb = this.dio(c)[0];
                            switch (this.dio(c)[1]) {
                                case "%":
                                    obb = obb * this.dio(this.el.parentNode.getStyle(t) === "auto" ? 0 : this.el.parentNode.getStyle(t))[0] / 100;
                                    break;
                                case "rem":
                                    obb = obb * this.dio(document.getElementsByTagName("html")[0].getStyle("fontSize"))[0];
                                    break;
                                case "em":
                                    obb = obb * this.dio(this.el.parentNode.getStyle("fontSize"))[0];
                                    break;
                            }
                            return obb;
                        }.bind(this)(), t, p)
                    },
                    width: function (s) {
                        this.wiHe(s, "width", "px");
                    },
                    height: function (s) {
                        this.wiHe(s, "height", "px");
                    },
                    opacity: function (s) {
                        this.wiHe(s, "opacity", "");
                    },
                    zIndex: function (s) {
                        this.wiHe(s, "zIndex", "");
                    },
                    borderWidth: function (s) {
                        this.wiHe(s, "borderWidth", "px");
                    },
                    top: function (s) {
                        this.wiHe(s, "top", "px");
                    },
                    left: function (s) {
                        this.wiHe(s, "left", "px");
                    },
                    right: function (s) {
                        this.wiHe(s, "right", "px");
                    },
                    bottom: function (s) {
                        this.wiHe(s, "bottom", "px");
                    },
                    margin: function (s) {
                        this.wiHe(s, "margin", "px");
                    },
                    padding: function (s) {
                        this.wiHe(s, "padding", "px");
                    },
                    marginTop: function (s) {
                        this.wiHe(s, "marginTop", "px");
                    },
                    marginBottom: function (s) {
                        this.wiHe(s, "marginBottom", "px");
                    },
                    marginLeft: function (s) {
                        this.wiHe(s, "marginLeft", "px");
                    },
                    marginRight: function (s) {
                        this.wiHe(s, "marginRight", "px");
                    },
                    paddingTop: function (s) {
                        this.wiHe(s, "paddingTop", "px");
                    },
                    paddingBottom: function (s) {
                        this.wiHe(s, "paddingBottom", "px");
                    },
                    paddingLeft: function (s) {
                        this.wiHe(s, "paddingLeft", "px");
                    },
                    paddingRight: function (s) {
                        this.wiHe(s, "paddingRight", "px");
                    },
                    lineHeight: function (s) {
                        this.wiHe(s, "lineHeight", "px");
                    },
                    fontSize: function (s) {
                        this.wiHe(s, "fontSize", "px");
                    }
                };
                return new animate(style, typeof time === "number" ? time : 0, typeof time === "function" ? time : callback || function () {

                    }, this);
            }
        ),
        Stop: Premise(
            function Stop(b) {
                for (let i = window.IsAnimateBox30017.length - 1; i > -1; i--) {
                    if (b===true) {
                        let k = "no";
                        for (let s = window.IsAnimateBox30017.length - 1; s > -1; s--) {
                            if (window.IsAnimateBox30017[s][0] === this && window.IsAnimateBox30017[s][3].length === 0) {
                                window.IsAnimateBox30017[s][2] !== null ? clearInterval(window.IsAnimateBox30017[s][2]) : null;
                                window.IsAnimateBox30017[s][2] = null;
                                k = s;
                            }
                        }
                        k !== "no" ? window.IsAnimateBox30017.splice(k, 1) : null
                    } else {
                        if (window.IsAnimateBox30017[i][0] === this && window.IsAnimateBox30017[i][1].ani === true) {
                            window.IsAnimateBox30017[i][1].ani = false;
                            clearInterval(window.IsAnimateBox30017[i][2]);
                            window.IsAnimateBox30017[i][2] = null;
                        }
                    }
                }
            }
        ),
        Start: Premise(
            function Start() {
                this.Stop();
                window.IsAnimateBox30017.forEach(function (v) {
                    if (v[0] === this && v[1].ani === false) {
                        this.animate(v[1].style, v[1].time, v[1].callback);
                    }
                }.bind(this));
            }
        ),
        wrap: Premise(
            function wrap(el) {
                //为原生dom元素添加wrap操作---包裹
                return function (el, newel) {
                    let nel = function (str) {
                            let pNode = IsBox.getNode("div");
                            pNode.innerHTML = str;
                            return pNode.children;
                        }(newel)[0] || newel;
                    el.parentNode.insertBefore(nel, el);
                    +function (el) {
                        let childEl;

                        function most(obj) {
                            if (obj.children[0]) {
                                most(obj.children[0]);
                            } else {
                                childEl = obj
                            }
                        }

                        most(el);
                        return [childEl];
                    }(nel)[0].appendChild(el);
                    return nel;
                }(this, el);
            }
        ),
        siblings: Premise(
            function siblings(type) {
                //返回元素的所有兄弟节点，支持匹配类型
                return this.prevAll(type).reverse().concat(this.nextAll(type));
            }
        ),
        nextAll: Premise(
            function nextAll(type) {
                //当前结点后面所有节点，不包含文本节点空节点，支持匹配类型
                let arr = [], sibling = this;
                for (let s = 0; s < 2;) {
                    if (sibling.nextElementSibling !== null) {
                        arr.push(sibling = sibling.nextElementSibling)
                    } else {
                        break;
                    }
                }

                return type ? arr.IsScreen(type) : arr;
            }
        ),
        prevAll: Premise(
            function nextAll(type) {
                //当前结点前面所有节点，不包含文本节点空节点，支持匹配类型
                let arr = [], sibling = this;
                for (let s = 0; s < 2;) {
                    if (sibling.previousElementSibling !== null) {
                        arr.push(sibling = sibling.previousElementSibling)
                    } else {
                        break;
                    }
                }
                return type ? arr.IsScreen(type) : arr;
            }
        ),
        removeClass: Premise(
            function removeClass(c) {
                this.className = this.className.replace(new RegExp("(\\s|^)" + c + "(\\s|$)"), "");
                return this
            }
        ),
        addClass: Premise(
            function addClass(c) {
                !this.className.match(new RegExp("(\\s|^)" + c + "(\\s|$)")) ? this.className += " " + c : null;
                return this
            }
        ),
        toggleClass: Premise(
            function toggleClass(c) {
                this.className.match(new RegExp("(\\s|^)" + c + "(\\s|$)")) ? this.removeClass(c) : this.addClass(c);
                return this
            }
        ),
        IsScroll: Premise(
            function IsScroll(callbackUp, callbackDown) {
                let scroll = function (e, up, down) {
                    this.callbackUp = up;
                    this.callbackDown = down;
                    if (e.addEventListener) {
                        e.addEventListener('DOMMouseScroll', this.init.bind(this), false);
                    }
                    e.onmousewheel = e.onmousewheel = this.init.bind(this);
                    return e;
                };
                scroll.prototype = {
                    init: function (event) {
                        event = event || window.event;
                        if (event.wheelDelta) {
                            //IE/Opera/Chrome
                            if (event.wheelDelta === 120) {
                                this.callbackUp();
                            } else if (event.wheelDelta === -120) {
                                this.callbackDown();
                            }
                        } else if (event.detail) {
                            //Firefox
                            if (event.detail === -3) {
                                this.callbackUp();
                            } else if (event.detail === 3) {
                                this.callbackDown();
                            }
                        }
                    }
                };
                return new scroll(this, callbackUp, callbackDown);
            }
        )
    });

    //因为某些原因
    let IsBox = function IsBox() {
        return {
            IsNullFunction: function () {

            },
            getNode: function (type) {
                return document.createElement(type);
            }
        }
    }();

    window.setCookie = function setCookie(name, value, date) {
        let IsDate = new Date();
        if (typeof date === "object") {
            date = {
                Year: (Number(date.Year) || 0) + IsDate.getFullYear(),
                Month: (Number(date.Month) || 0) + IsDate.getMonth(),
                Date: (Number(date.Date) || 0) + IsDate.getDate(),
                Hours: (Number(date.Hours) || 0) + IsDate.getHours(),
                Minutes: (Number(date.Minutes) || 0) + IsDate.getMinutes(),
                Seconds: (Number(date.Seconds) || 0) + IsDate.getSeconds()
            };
            let prev = 0, limit = [9999, 11, 31, 23, 59, 59];
            for (let i = date.length() - 1; i > -1; i--) {
                prev = IsReform(date.IsIndex(i) + prev, limit[i]);
                date.IsIndex(i, undefined, prev[0]);
                prev = prev[1];
            }
            IsDate.setFullYear(date.Year);
            IsDate.setMonth(date.Month);
            IsDate.setDate(date.Date);
            IsDate.setHours(date.Hours);
            IsDate.setMinutes(date.Minutes);
            IsDate.setSeconds(date.Seconds);
        } else if (typeof date === "number") {
            IsDate.setDate(IsDate.getDate() + date);
        }
        document.cookie = name + "=" + value + ((date === null) ? "" : ";expires=" + IsDate.toGMTString());
    };
    window.getCookie = function getCookie(name) {
        if (document.cookie.length > 0) {
            let cookie = document.cookie.split("; ");
            for (let i = 0; i < cookie.length; i++) {
                if (cookie[i].split("=")[0] === name) {
                    return cookie[i].split("=")[1];
                }
            }
        } else {
            return null;
        }
    };
    window.delCookie = function delCookie(name) {
        setCookie(name, getCookie(name), -1);
    };
    window.IsReform = function IsReform(N, limit) {
        let c = 0;
        for (let i = 0; i < 2;) {
            if (N >= limit) {
                c++;
                N = N - limit;
            } else {
                return [N, c]
            }
        }
    };
    window.IsAdded=true;
    window.IsAnimateBox30017 = [];
})();