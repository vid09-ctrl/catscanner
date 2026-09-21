(function () {
  const catDetailsURL = window.location.origin + "/cat-details.html";
  const qrContainer = document.getElementById("tagQr");

  if (qrContainer && window.qrcode) {
    const qr = qrcode(0, "H");
    qr.addData(catDetailsURL);
    qr.make();

    const modules = qr.getModuleCount();
    const quietZone = 4;
    const total = modules + quietZone * 2;
    let path = "";

    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        if (qr.isDark(row, col)) {
          path += "M" + (col + quietZone) + " " + (row + quietZone) + "h1v1h-1z";
        }
      }
    }

    qrContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="300" height="300" shape-rendering="crispEdges" aria-label="QR code for lost cat details">
        <rect width="${total}" height="${total}" fill="#ffffff"></rect>
        <path d="${path}" fill="#000000"></path>
      </svg>
    `;
  }

  const printButton = document.getElementById("printQr");
  if (printButton) {
    printButton.addEventListener("click", function () {
      window.print();
    });
  }

  const downloadButton = document.getElementById("downloadQr");
  if (downloadButton) {
    downloadButton.addEventListener("click", function () {
      const svg = qrContainer && qrContainer.querySelector("svg");
      if (!svg) return;

      const serializer = new XMLSerializer();
      const svgMarkup = serializer.serializeToString(svg);
      const image = new Image();
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = 1600;
      canvas.height = 1600;

      image.onload = function () {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const link = document.createElement("a");
        link.download = "mochi-lost-cat-qr.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgMarkup);
    });
  }
})();
