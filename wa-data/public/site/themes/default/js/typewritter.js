window.onload = function() {
    const elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      const toRotate = elements[i].getAttribute('data-rotate');
      const period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // Вставить CSS
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.10em solid #fff }";
    document.body.appendChild(css);
  };