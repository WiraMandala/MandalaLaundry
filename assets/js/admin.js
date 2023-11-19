function introduceCreator() {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      showIntroduction();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          showIntroduction();
        }
      });
    }
  }
}

function showIntroduction() {
  const notification = new Notification("Halo dari Admin!", {
    body: "Halo! Saya Wira Satria Mandala. Terima kasih telah mengunjungi Mandala Laundry!",
    icon: "assets/image/admin.png",
  });

  // Atur tindakan ketika notifikasi diklik
  notification.onclick = function () {
    // Tindakan yang ingin dilakukan saat notifikasi diklik
    window.location.href = "#"; // Ganti dengan URL atau tindakan yang diinginkan
  };
}

document.querySelector(".admin").addEventListener("click", function () {
  introduceCreator();
});
