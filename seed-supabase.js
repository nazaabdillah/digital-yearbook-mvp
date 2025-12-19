require('dotenv').config(); // Panggil kunci rahasia
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 1. Koneksi ke Supabase via Terminal
const supabaseUrl = 'https://wbqsdmwseonjddmvqinc.supabase.co';
const supabaseKey = 'sb_publishable_VbogPDaIMRBmIpnzEEV-tQ_BpldufmA';

const supabase = createClient(supabaseUrl, supabaseKey);

const JSON_FILE = 'data/students.json'; // Sumber data

async function pushData() {
  console.log("🚀 MEMULAI MIGRASI DATA KE AWAN...");

  // 2. Baca File JSON
  try {
    const rawData = fs.readFileSync(JSON_FILE, 'utf8');
    const students = JSON.parse(rawData);
    
    console.log(`📦 Ditemukan ${students.length} siswa di JSON lokal.`);

    // 3. Loop & Upload
    for (const student of students) {
        // Hapus ID biar Supabase yang generate ID unik sendiri (Auto Increment)
        // Atau biarkan kalau kamu mau maksa ID-nya sama.
        // Di sini kita hapus 'id' dari objek biar aman.
        const { id, ...studentData } = student; 

        // Pastikan nama kolom di JSON cocok sama di Supabase
        // JSON kita: 'kelasId' -> Supabase butuh: 'kelas_id'
        const payload = {
            nama: studentData.nama,
            nim: studentData.nim,
            kelas_id: studentData.kelasId, // Mapping manual
            quote: studentData.quote,
            role: studentData.role,
            foto: studentData.foto,
            // Tambah kolom lain sesuai tabelmu
        };

        const { error } = await supabase
            .from('students')
            .insert(payload);

        if (error) {
            console.error(`❌ Gagal upload ${studentData.nama}:`, error.message);
        } else {
            console.log(`✅ Terupload: ${studentData.nama}`);
        }
    }

    console.log("🎉 MIGRASI SELESAI! Cek dashboard Supabase kamu.");

  } catch (err) {
    console.error("❌ Error membaca file JSON:", err.message);
  }
}

pushData();