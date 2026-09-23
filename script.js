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

      const canvasWidth = 1800;
      const canvasHeight = 2200;
      const qrSize = 1180;
      const qrX = (canvasWidth - qrSize) / 2;
      const qrY = 180;
      const firstLineY = qrY + qrSize + 170;
      const secondLineY = firstLineY + 160;

      image.onload = function () {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, qrX, qrY, qrSize, qrSize);

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#111111";
        context.font = '800 118px "Baloo 2", "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
        context.fillText("I'M LOST 🐾", canvasWidth / 2, firstLineY);

        context.font = '800 94px "Baloo 2", "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
        context.fillText("PLEASE SCAN THE QR", canvasWidth / 2, secondLineY);

        canvas.toBlob(
          function (blob) {
            if (!blob) return;

            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = "Yuki-lost-cat-qr.png";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
          },
          "image/png",
          1
        );
      };

      image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgMarkup);
    });
  }
})();
