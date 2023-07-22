function getElementById(node, id) {    
    return node.querySelector("#" + id);
}

function foo(html) {
    var el = document.createElement("div");

    el.innerHTML = html;

    var target = getElementById(el, "target");

    /* Do something with `target` */
    if (target) {
        console.log(target);
    }
}

foo('<div id="nottarget1"><div id="nottarget2"><div id="nottarget3"><div id="nottarget4"><div id="target">Target</div></div></div></div></div>');