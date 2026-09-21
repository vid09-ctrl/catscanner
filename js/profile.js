(function () {
  const profile = {
    name: "Yuki",
    parent: "Vidya",
    phone: "+919876543210",
    whatsapp: "919876543210",
    city: "Mira road",
    photo: "https://picsum.photos/seed/Yuki-cat/640/640.jpg"
  };
  const $ = function (selector) { return document.querySelector(selector); };

  document.title = "I'm Lost — Help " + profile.name + " Get Home";
  const photo = $("#catPhoto");
  photo.alt = "Photo of " + profile.name + " the cat";
  photo.src = profile.photo;
  photo.onerror = function () { photo.onerror = null; photo.src = PAW_PLACEHOLDER; };
  $("#catName").textContent = profile.name;
  $("#catNameDetail").textContent = profile.name;
  $("#parentName").textContent = profile.parent;
  $("#catCity").textContent = profile.city;
  $("#catPhone").textContent = profile.phone;
  $("#callBtn").href = "tel:" + profile.phone.replace(/[^\d+]/g, "");
  $("#waBtn").href = "https://wa.me/" + profile.whatsapp +
    "?text=" + encodeURIComponent("Hi! I found your cat. Please contact me so we can get them home safely. 🐾");
})();
