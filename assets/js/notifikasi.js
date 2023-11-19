// Dalam file notifikasi.js atau di bagian JavaScript yang sesuai
if ('Notification' in window) {
  // Meminta izin untuk menerima notifikasi
  Notification.requestPermission().then(function (permission) {
    if (permission === 'granted') {
      // Menampilkan notifikasi
      var notifikasi = new Notification('Pesan !!!', {
        body: 'Klik icon lonceng terdapat sebuah notifikasi masuk !!!.'
        // icon: 'url_ke_icon' // Opsional, tambahkan ikon jika diperlukan
      });

      // Event saat notifikasi diklik
      notifikasi.onclick = function () {
        console.log('Notifikasi diklik.');
        // Lakukan aksi jika notifikasi diklik
      };
    }
  });
}



function displayNotification() {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      showNotification();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          showNotification();
        }
      });
    }
  }
}

function showNotification() {
  const notification = new Notification("Diskon Tersedia!", {
    body: "Laundry Melebihi 8Kg? Dapatkan Diskon 1Kg Gratis!",
    icon: "assets/image/notifikasi.png",
  });
}

document.querySelector(".notifikasi").addEventListener("click", function () {
  displayNotification();
});
