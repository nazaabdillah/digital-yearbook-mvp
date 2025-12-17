const fs = require('fs');
const path = require('path');

// KONFIGURASI PABRIK
const CSV_FILENAME = 'data_simulasi.csv';
const OUTPUT_FILE = 'data/students.json';

// Fungsi Converter
function runFactory() {
  console.log("🏭 PABRIK DATA DIMULAI...");
  
  // 1. Baca File CSV
  try {
    const rawData = fs.readFileSync(CSV_FILENAME, 'utf8');
    const lines = rawData.split('\n'); // Pisah per baris
    
    // Hapus header (baris pertama) dan baris kosong
    const dataRows = lines.slice(1).filter(line => line.trim() !== '');
    
    console.log(`📦 Ditemukan ${dataRows.length} data siswa mentah.`);

    const students = [];

    // 2. Loop & Transformasi
    dataRows.forEach((row, index) => {
      // PENTING: Kita split pakai Titik Koma (;) sesuai format Excel Indo
      const cols = row.split(';');

      // Validasi sederhana: Kalau kolomnya kurang, skip aja
      if (cols.length < 8) return;

      // Mapping Data (Sesuaikan urutan kolom di CSV tadi)
      const student = {
        id: index + 1, // Generate ID baru
        nama: cols[1].trim(),
        nim: cols[2].trim(),
        kelasId: cols[3].trim().toLowerCase().replace(/\s/g, '-'), // "SI-3Z" -> "si-3z"
        quote: cols[4].trim(),
        role: cols[5].trim(),
        instagram: cols[6].trim(),
        cita_cita: cols[7].trim(),
        bio: "Mahasiswa angkatan 2025 yang penuh semangat.", // Default bio
        
        // LOGIC FOTO HYBRID:
        // Idealnya: "/images/students/" + nim + ".jpg"
        // Tapi untuk simulasi ini kita pakai Avatar DiceBear dulu biar langsung muncul gambarnya
        foto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cols[1].trim()}` 
      };

      students.push(student);
    });

    // 3. Simpan ke students.json (Timpa data lama)
    // Ingat! Ini akan MENGHAPUS data Budi/Siti sebelumnya.
    // Dalam bisnis real, biasanya kita 'append' (tambahkan), tapi untuk MVP kita replace dulu.
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(students, null, 2));

    console.log(`✅ SUKSES! ${students.length} siswa berhasil dipacking ke ${OUTPUT_FILE}`);
    console.log("🚀 Website siap direfresh!");

  } catch (err) {
    console.error("❌ PABRIK MELEDAK:", err.message);
  }
}

// Jalankan Mesin
runFactory();