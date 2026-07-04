# Atlas Oyunu V3 - Vercel Yayın Notu

Bu klasördeki dosyaları GitHub reposunun kök dizinine koyup Vercel'e bağla.

Önemli:
- Zip dosyasının kendisini Vercel'e proje olarak yükleme.
- Zip'i aç, içindeki dosyaları repo köküne koy.
- Repo kökünde `index.html`, `atlas-oyunu-v3.html`, `vercel.json`, `manifest.webmanifest` ve medya dosyaları görünmeli.
- Vercel'de Framework Preset olarak `Other` / statik site seçilebilir.
- Build command boş kalabilir.
- Output directory boş kalabilir veya `.` olabilir.

404 `DEPLOYMENT_NOT_FOUND` hatası genelde oyun kodundan değil, eski/silinmiş deployment linkinden veya yanlış deployment URL'inden kaynaklanır. Yeni deploy bittikten sonra Vercel'in verdiği güncel Production URL'i aç.
