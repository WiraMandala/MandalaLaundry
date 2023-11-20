function tambahLaundry() {
  const namaInput = document.querySelector('input[name="namaPemesan"]');
  const jenisInput = document.querySelector('input[name="jenis"]');
  const beratInput = document.querySelector('input[name="berat"]');

  const namaPemesan = namaInput.value; 
  const jenis = jenisInput.value;
  const berat = parseFloat(beratInput.value);

  if (namaPemesan !== "" && jenis !== "" && !isNaN(berat) && berat > 0) {
    const harga = hitungHarga(jenis, berat);

    const table = document.getElementById("laundryList");
    const newRow = table.insertRow(table.rows.length);

    const cellNama = newRow.insertCell(0); 
    const cellJenis = newRow.insertCell(1);
    const cellBerat = newRow.insertCell(2);
    const cellHarga = newRow.insertCell(3);
    const cellAksi = newRow.insertCell(4);

    cellNama.innerHTML = namaPemesan; 
    cellJenis.innerHTML = jenis;
    cellBerat.innerHTML = berat + " Kg";
    cellHarga.innerHTML = "Rp." + harga;
    cellAksi.innerHTML =
      '<button onclick="editLaundry(this)">Edit</button> <button onclick="hapusLaundry(this)">Hapus</button>';

    hitungTotalHarga();
    const laundryTable = document.querySelector('.laundryTable');
    laundryTable.style.display = 'table';
  } else {
    alert("Mohon isi nama pemesan, jenis, dan berat laundry yang valid.");
  }
  namaInput.value = ""; 
  jenisInput.value = "";
  beratInput.value = "";
}

function hitungHarga(jenis, berat) {
  let hargaPerKg = 0;
  switch (jenis.toLowerCase()) {
    case "pakaian":
      hargaPerKg = 10000;
      break;
    case "celana":
      hargaPerKg = 12000;
      break;
    case "karpet":
      hargaPerKg = 20000;
      break;
    case "selimut":
      hargaPerKg = 17000;
      break;
    case "gorden":
      hargaPerKg = 15000;
      break;
    default:
      hargaPerKg = 0;
  }

  let totalHarga = hargaPerKg * berat;
  if (berat > 8) {
    totalHarga -= hargaPerKg; 
  }
  return totalHarga;
}

function hitungTotalHarga() {
  const table = document.getElementById("laundryList");
  let totalHarga = 0;

  for (let i = 0; i < table.rows.length; i++) {
    const harga = parseFloat(table.rows[i].cells[3].innerHTML.replace("Rp.", "").replace(",", ""));
    totalHarga += harga;
  }

  document.getElementById("totalHarga").textContent = "Total : Rp." + totalHarga;
}

function editLaundry(button) {
  const row = button.parentNode.parentNode;
  const nama = row.cells[0].innerHTML;
  const jenis = row.cells[1].innerHTML;
  const berat = parseFloat(row.cells[2].innerHTML);

  const namaInput = document.querySelector('input[name="namaPemesan"]');
  const jenisInput = document.querySelector('input[name="jenis"]');
  const beratInput = document.querySelector('input[name="berat"]');

  namaInput.value = nama;
  jenisInput.value = jenis;
  beratInput.value = berat;

  const tambahButton = document.querySelector(".btn-tambah");
  tambahButton.innerHTML = "Update";
  tambahButton.setAttribute("onclick", "updateLaundry(this)");
  tambahButton.dataset.index = row.rowIndex;
}

function hapusLaundry(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  hitungTotalHarga();
}

function updateLaundry(button) {
  const namaInput = document.querySelector('input[name="namaPemesan"]');
  const jenisInput = document.querySelector('input[name="jenis"]');
  const beratInput = document.querySelector('input[name="berat"]');
  const nama = namaInput.value;
  const jenis = jenisInput.value;
  const berat = parseFloat(beratInput.value);

  if (nama !== "" && jenis !== "" && !isNaN(berat) && berat > 0) {
    const harga = hitungHarga(jenis, berat);
    const table = document.getElementById("laundryList");
    const index = button.dataset.index;
    const row = table.rows[index - 1];

    row.cells[0].innerHTML = nama;
    row.cells[1].innerHTML = jenis;
    row.cells[2].innerHTML = berat + " Kg";
    row.cells[3].innerHTML = "Rp." + harga;

    hitungTotalHarga();
    resetInputs();
  } else {
    alert("Mohon isi data dengan benar.");
  }

  button.innerHTML = "Hitung";
  button.setAttribute("onclick", "tambahLaundry()");
  delete button.dataset.index;
}

function resetInputs() {
  const namaInput = document.querySelector('input[name="namaPemesan"]');
  const jenisInput = document.querySelector('input[name="jenis"]');
  const beratInput = document.querySelector('input[name="berat"]');
  namaInput.value = "";
  jenisInput.value = "";
  beratInput.value = "";
}
