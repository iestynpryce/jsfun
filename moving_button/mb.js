var mie = (navigator.appName == "Microsoft Internet Explorer") ? true : false;

if (!mie) {
     document.captureEvents(Event.MOUSEMOVE);
     document.captureEvents(Event.MOUSEDOWN);
}

document.onmousemove = function (e) {mousePos(e);};
document.getElementById('button').onclick=function(){alert("Got me!")};


var keyClicked;

var mouseX = 0;
var mouseY = 0;
var lastMouseX = 0;
var lastMouseY = 0;

function mousePos (e) {
    if (!mie) {
        mouseX = e.pageX; 
        mouseY = e.pageY;
    }
    else {
        mouseX = e.clientX + document.body.scrollLeft;
        mouseY = e.clientY + document.body.scrollTop;
    }

    var height = Math.max(document.documentElement["clientHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"]);
    var width = Math.max(document.documentElement["clientWidth"], document.body["offsetWidth"], document.documentElement["offsetWidth"]);
    
    var target = document.getElementById('button');

    var buttonWidth  = parseInt(target.style.width,10);
    var buttonHeight = parseInt(target.style.height,10);

    currentTop = target.offsetTop;
    currentLeft = target.offsetLeft;
    target.value = target.style.height + " " + target.style.width;

    dy = (currentTop - mouseY);
    dx = (currentLeft - mouseX);
    signx = dx / Math.abs(dx);
    signy = dy / Math.abs(dy);

    d2 = Math.sqrt(dx*dx + dy*dy); 
    force = 1000/(Math.PI*d2*d2);

    moveToTop = currentTop + dy*force;
    moveToLeft = currentLeft + dx*force;

    // Ensure we don't go beyond 0,0
    moveToTop = Math.max(moveToTop, 0);
    moveToLeft = Math.max(moveToLeft, 0);

    // Ensure we don't go beyond width,height
    moveToTop = Math.min(moveToTop, height);
    moveToLeft = Math.min(moveToLeft, width);

    target.style.position = 'absolute';
    target.style.left = moveToLeft + "px";
    target.style.top = moveToTop + "px";

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    return true;
}
