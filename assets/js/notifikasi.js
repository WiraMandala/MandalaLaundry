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
  alert("Diskon Tersedia!\nLaundry Melebihi 8Kg? Dapatkan Diskon 1Kg Gratis!");
}

document.querySelector(".notifikasi").addEventListener("click", function () {
  displayNotification();
});

window.addEventListener("load", function () {
  setTimeout(function () {
    alert("Ada pesan!! Klik icon lonceng.");
  }, 2000);
});
