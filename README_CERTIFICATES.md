# Panduan Penambahan Sertifikat Baru

## Cara Menambahkan Sertifikat Baru

1. Upload file PDF sertifikat Anda ke folder `Sertifikat/` di direktori utama website Anda
2. Edit file `certificates-config.json` di direktori utama website Anda
3. Tambahkan entri baru ke array `certs` di dalam file tersebut

## Contoh Struktur certificates-config.json

```json
{
  "certs": [
    {
      "name": "NamaFile.pdf",
      "title": "Judul Sertifikat",
      "date": "Tanggal Penerbitan",
      "description": "Deskripsi sertifikat"
    }
  ]
}
```

## Contoh Penambahan Sertifikat Baru

Jika Anda memiliki sertifikat dengan nama `Sertifikat_Python.pdf`, tambahkan entri berikut:

```json
{
  "certs": [
    {
      "name": "Certificate_2025_20067.pdf",
      "title": "Sertifikat 2025/20067",
      "date": "2025-01-01",
      "description": "Contoh deskripsi sertifikat"
    },
    {
      "name": "Sertifikat_Python.pdf",
      "title": "Sertifikat Python Programming",
      "date": "2025-02-15",
      "description": "Sertifikat kelulusan pelatihan Python programming"
    }
  ]
}
```

## Catatan

- File PDF harus disimpan di folder `Sertifikat/`
- Nama file dalam konfigurasi harus sama persis dengan nama file di folder
- Pastikan untuk me-refresh halaman browser setelah menambahkan sertifikat baru