// Menambahkan event listener untuk ikon cetak
document.querySelector('.cetak').addEventListener('click', function() {
    cetakDaftarLaundry();
  });
  
  // Fungsi untuk mencetak daftar laundry
  function cetakDaftarLaundry() {
    const table = document.getElementById("laundryList");
    let daftarLaundry = "Terima kasih sudah order di Mandala Laundry.\n\nDaftar Laundry :\n";
  
    for (let i = 0; i < table.rows.length; i++) {
      const nama = table.rows[i].cells[0].innerHTML;
      const jenis = table.rows[i].cells[1].innerHTML;
      const berat = table.rows[i].cells[2].innerHTML;
      daftarLaundry += `- ${nama} memesan laundry ${jenis} seberat ${berat}\n`;
    }
  
    const totalHarga = document.getElementById("totalHarga").textContent;
    daftarLaundry += `\n${totalHarga}\n`;
  
    // Memeriksa diskon
    const diskon = cekDiskon();
    if (diskon > 0) {
      daftarLaundry += `\nNotes!!!\nDiskon 1 kg gratis untuk berat laundry di atas 8 kg.`;
    }
  
    // Cetak daftar laundry menggunakan alert
    alert(daftarLaundry);
  }
  
  // Fungsi untuk memeriksa diskon
  function cekDiskon() {
    const table = document.getElementById("laundryList");
    let totalBerat = 0;
  
    for (let i = 0; i < table.rows.length; i++) {
      const berat = parseFloat(table.rows[i].cells[2].innerHTML);
      totalBerat += berat;
    }
  
    // Cek jika total berat lebih dari 8 kg, berikan diskon 1 kg gratis
    if (totalBerat > 8) {
      return 1;
    } else {
      return 0;
    }
  }
  