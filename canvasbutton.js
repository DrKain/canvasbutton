var __fh483g = {};
var __893rhj = {off: {top: 0, left: 0}};
var __mouse = {x: 0, y: 0, down: false};


var jsGetOffset = function (el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return {top: _y, left: _x};
};

var jsSetMouseTrack = function (__$canvas) {
    __893rhj.off = jsGetOffset(__$canvas);
    window.onresize = function () {
        __893rhj.off = jsGetOffset(__$canvas);
    };
    __$canvas.onmousemove = function (e) {
        var off = __893rhj.off;
        __mouse.x = e.pageX - off.left;
        __mouse.y = e.pageY - off.top;
    };
    __$canvas.onmousedown = function () {
        __mouse.down = true;
    };
    __$canvas.onmouseup = function () {
        __mouse.down = false;
    };
    __$canvas.onmouseout = function () {
        __mouse.down = false;
    };
};

var setMouseTrack = function (__$canvas) {
    if (typeof __$canvas.on === "undefined") return jsSetMouseTrack(__$canvas);
    window.onresize = function () {
        __893rhj.off = __$canvas.offset();
    };
    __893rhj.off = __$canvas.offset();
    __$canvas.on({
        mousemove: function (e) {
            var off = __893rhj.off;
            __mouse.x = e.pageX - off.left;
            __mouse.y = e.pageY - off.top;
        },
        mousedown: function () {
            __mouse.down = true;
        },
        mouseup: function () {
            __mouse.down = false;
        },
        touchstart: function () {
            __mouse.down = true;
        },
        touchend: function () {
            __mouse.down = false;
        },
        touchcancel: function () {
            __mouse.down = false;
        }
    });
};

function Button(ctx, options) {
    this.SHID = Math.random()
        .toString(36)
        .substr(2, 5);
    this.debug = false;

    __fh483g[this.SHID] = {mo: false};

    this.vars = {};
    this.killed = false;

    this.style = {
        mouseOver: false,
        _disabled: false,
        _hidden: false,

        text: "My Button",
        x: 5,
        y: 5,
        width: 100,
        height: 40,
        hover: {
            backgroundColor: "#5d8ea2",
            textColor: "#333"
        },
        radius: 5,
        backgroundColor: "skyblue",
        borderColor: "black",
        borderSize: 2,
        fontSize: "12px",
        fontFamily: "Arial",
        textColor: "#333",
        disabled : {}
    };

    this.apply(ctx, options);
    this.onClicked = function () {
    };
}

Button.prototype.remove = function () {
    this.killed = true;
    delete __fh483g[this.SHID];
};

Button.prototype.hide = function () {
    this.style._hidden = true;
};
Button.prototype.show = function () {
    this.style._hidden = false;
};

Button.prototype.disable = function () {
    this.style._disabled = true;
    if (Object.keys(this.style.disabled).length > 0) {
        // TODO: Apply Style
    }
};

Button.prototype.enable = function () {
    this.style._disabled = false;
    if (Object.keys(this.style.disabled).length > 0) {
        // TODO: Remove Disabled Style
    }
};

Button.prototype.apply = function (ctx, options) {
    for (var item in options) {
        if (this.style[item]) this.style[item] = options[item];
    }
    this.draw(ctx);
};

Button.prototype._stringVar = function (string) {
    var reg = new RegExp(/\%(.*?)\%/, "g");
    var matches = string.match(reg);
    if (matches !== null) {
        for (var i = 0; i < matches.length; i++) {
            var result = matches[i];
            var search = result.replace(/%/gi, "");
            if (typeof this.vars[search] !== "undefined")
                string = string.replace(result, this.vars[search]);
        }
    }
    return string;
};

Button.prototype.var = function (key, value) {
    if (typeof value === "undefined") return this.vars[key];
    else return (this.vars[key] = value);
};

Button.prototype.getText = function () {
    return this.style.text;
};

Button.prototype.setText = function (s) {
    this.style.text = this._stringVar(s);
};

Button.prototype.opVar = function (key, method) {
    if (method === "++") this.vars[key]++;
    if (method === "--") this.vars[key]--;
};

Button.prototype.mouseenter = function () {
    if (this.debug) console.log("Button_" + this.SHID + " => Mouse Enter");
};

Button.prototype.mouseexit = function () {
    if (this.debug) console.log("Button_" + this.SHID + " => Mouse Exit");
};

Button.prototype.clicked = function () {
    if (this.debug) console.log("Button_" + this.SHID + " was clicked!");
};

Button.prototype.moveTo = function (x, y) {
    this.style.x = x;
    this.style.y = y;
};

Button.prototype.setVar = function(key, value){
    return this.set(key, value);
};

Button.prototype.getVar = function(key){
    return this.get(key);
};

Button.prototype.get = function (key) {
    return typeof this.vars[key] !== "undefined" ? this.vars[key] : (typeof this.style[key] !== "undefined" ? this.style[key] : undefined);
};

Button.prototype.set = function(key, value){
    if(typeof this.style[key] !== "undefined") return console.error("Key is in use");
    return this.vars[key] = value;
};

Button.prototype.setStyle = function (key, value) {
    return typeof this.style[key] !== "undefined" ? this.style[key] = value : false;
};

Button.prototype.update = function (mouse, ctx) {
    if (this.killed === true) return;
    var ov = this.style.mouseOver;
    if (this._disabled !== true) {
        if (
            mouse.x >= this.style.x &&
            mouse.x <= this.style.x + (this.style.width + this.style.borderSize) &&
            mouse.y >= this.style.y &&
            mouse.y <= this.style.y + (this.style.height + this.style.borderSize)
        ) {
            this.style.mouseOver = true;
            if (this.style.mouseOver !== ov) this.mouseenter();
            __fh483g[this.SHID].mo = true;
        } else {
            this.style.mouseOver = false;
            if (this.style.mouseOver !== ov) this.mouseexit();
            __fh483g[this.SHID].mo = false;
        }
        if (
            Object.keys(__fh483g).filter(function (i) {
                return __fh483g[i].mo === true;
            }).length > 0
        )
            ctx.canvas.style.cursor = "pointer";
        else ctx.canvas.style.cursor = "default";
        if (this.style.mouseOver === true && mouse.down === true) {
            this.clicked();
            mouse.down = false;
        }
    }
    if (this._hidden !== true) this.draw(ctx);
};

Button.prototype.draw = function (ctx) {
    ctx.lineWidth = this.style.borderSize;
    ctx.strokeStyle = this.style.borderColor;
    ctx.fillStyle = this.style.mouseOver
        ? this.style.hover.backgroundColor
        : this.style.backgroundColor;
    ctx.beginPath();
    ctx.moveTo(this.style.x + this.style.radius, this.style.y);
    ctx.lineTo(
        this.style.x + this.style.width - this.style.radius,
        this.style.y
    );
    ctx.quadraticCurveTo(
        this.style.x + this.style.width,
        this.style.y,
        this.style.x + this.style.width,
        this.style.y + this.style.radius
    );
    ctx.lineTo(
        this.style.x + this.style.width,
        this.style.y + this.style.height - this.style.radius
    );
    ctx.quadraticCurveTo(
        this.style.x + this.style.width,
        this.style.y + this.style.height,
        this.style.x + this.style.width - this.style.radius,
        this.style.y + this.style.height
    );
    ctx.lineTo(
        this.style.x + this.style.radius,
        this.style.y + this.style.height
    );
    ctx.quadraticCurveTo(
        this.style.x,
        this.style.y + this.style.height,
        this.style.x,
        this.style.y + this.style.height - this.style.radius
    );
    ctx.lineTo(this.style.x, this.style.y + this.style.radius);
    ctx.quadraticCurveTo(
        this.style.x,
        this.style.y,
        this.style.x + this.style.radius,
        this.style.y
    );
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.font = this.style.fontSize + " " + this.style.fontFamily;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // TODO: Support all style options
    ctx.fillStyle = this.style.mouseOver
        ? this.style.hover.textColor
        : this.style.textColor;

    ctx.fillText(
        this.style.text,
        this.style.x + this.style.width / 2,
        this.style.y + this.style.height / 2
    );
};