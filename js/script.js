(function () {
  const PROFILE_URL = "cat.html";
  const qrBox = document.querySelector("#tagQr");
  const quietZone = 4;

  function buildSvg(qr, size) {
    const modules = qr.getModuleCount();
    const total = modules + quietZone * 2;
    let path = "";
    for (let row = 0; row < modules; row++) {
      for (let column = 0; column < modules; column++) {
        if (qr.isDark(row, column)) {
          path += "M" + (column + quietZone) + " " + (row + quietZone) + "h1v1h-1z";
        }
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size +
      '" height="' + size + '" viewBox="0 0 ' + total + " " + total +
      '" shape-rendering="crispEdges"><rect width="' + total +
      '" height="' + total + '" fill="#fff"/><path d="' + path +
      '" fill="#000"/></svg>';
  }

  const qr = qrcode(0, "H");
  qr.addData(new URL(PROFILE_URL, location.href).href);
  qr.make();
  qrBox.innerHTML = buildSvg(qr, 1000);

  document.querySelector("#printQr").addEventListener("click", function () {
    window.print();
  });

  document.querySelector("#downloadQr").addEventListener("click", function () {
    const svg = qrBox.querySelector("svg");
    const image = new Image();
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1600;
    image.onload = function () {
      const context = canvas.getContext("2d");
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const link = document.createElement("a");
      link.download = "mochi-lost-cat-qr.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
      new XMLSerializer().serializeToString(svg)
    );
  });
})();
