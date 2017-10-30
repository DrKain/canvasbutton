function Demo(el){
    this.$el = el;
    this.mouse = { x : 0, y : 0, down : false };
    this.ctx = [];
    this.set();
}

Demo.prototype.set = function(){
    var $can = this.$el.get(0);
    $can.width = 250;
    $can.height = 250;
    this.ctx = $can.getContext('2d');
    var self = this;
    this.$el.on({
        mousemove: function (e) {
            var off = self.$el.offset();
            self.mouse.x = e.pageX - off.left;
            self.mouse.y = e.pageY - off.top;
        },
        mouseout : function(){ self.mouse.down = false; },
        mousedown: function () { self.mouse.down = true; },
        mouseup: function () { self.mouse.down = false; }
    })
};


// Setup
var demos = {};
demos.one = new Demo($("#demo1"));






// -----------------------------------------------
//                  DEMO 1
// -----------------------------------------------

var d1Button = new Button(demos.one.ctx, {
    text : "Hello!",
    x : 70, y : 50,
    width : 100,
    height : 30,
    radius : 0
});

d1Button.clicked = function(){
    alert("Demo1 Clicked!");
};

// Bad Loop
setInterval(function(){
    d1Button.update(demos.one.mouse, demos.one.ctx);

}, 1);


// Tab Switching
$(".tabs a").click(function(){
    var $p = $(this).parent();
    $p.find('a').removeClass('active');
    $p.find('code').hide();
    $p.find('code.tab-' + $(this).text().toLowerCase()).show();
    $(this).addClass('active');
});