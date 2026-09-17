/* ============================================================
   1. NAVIGATION & PAGE SWITCHING
   ============================================================ */

function switchPage(pageName) {
    // Sembunyikan semua section
    document.querySelectorAll(".page-section").forEach((section) => {
        section.classList.remove("active-page");
    });

    // Off-kan semua class active pada nav-link utama
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
    });

    // Off-kan semua class active pada nav-link footer
    document.querySelectorAll(".footer-nav-links a").forEach((link) => {
        link.classList.remove("footer-active");
    });

    const headerOffset = 60; // Tinggi header fixed

    // Logika perpindahan halaman & sinkronisasi status aktif footer
    if (pageName === "home") {
        document.getElementById("page-home").classList.add("active-page");
        document.getElementById("nav-home").classList.add("active");
        if (document.getElementById("footer-nav-home"))
            document.getElementById("footer-nav-home").classList.add("footer-active");
    } else if (pageName === "menu") {
        document.getElementById("page-menu").classList.add("active-page");
        document.getElementById("nav-menu").classList.add("active");
        if (document.getElementById("footer-nav-menu"))
            document.getElementById("footer-nav-menu").classList.add("footer-active");
    } else if (pageName === "testi") {
        document.getElementById("page-menu").classList.add("active-page");
        document.getElementById("nav-testi").classList.add("active");
        if (document.getElementById("footer-nav-testi"))
            document.getElementById("footer-nav-testi").classList.add("footer-active");

        // Scroll presisi dengan offset header
        const target = document.getElementById("testi-anchor");
        if (target) {
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    } else if (pageName === "gallery") {
        document.getElementById("page-gallery").classList.add("active-page");
        document.getElementById("nav-gallery").classList.add("active");
        if (document.getElementById("footer-nav-gallery"))
            document.getElementById("footer-nav-gallery").classList.add("footer-active");
    } else if (pageName === "location") {
        document.getElementById("page-gallery").classList.add("active-page");
        document.getElementById("nav-location").classList.add("active");
        if (document.getElementById("footer-nav-location"))
            document.getElementById("footer-nav-location").classList.add("footer-active");

        // Scroll presisi dengan offset header
        const target = document.getElementById("location-anchor");
        if (target) {
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    }

    // Scroll ke posisi konten saat berpindah menu utama, khusus home tetap dari atas
    if (pageName !== "testi" && pageName !== "location") {
        if (pageName === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo({ top: 260, behavior: "smooth" });
        }
    }

    // Refresh observer setiap kali ganti halaman
    setTimeout(() => {
        if (typeof initScrollObserver === "function") {
            initScrollObserver();
        }
    }, 80);
}

/* ============================================================
   2. GALLERY SYSTEM (INIT & TOGGLE SMOOTH ANIMATION)
   ============================================================ */

// Inisialisasi tampilan galeri pertama kali
function initGallery() {
    const galleryImages = document.querySelectorAll(".gallery-grid img");
    
    galleryImages.forEach((img, index) => {
        if (index >= 4) {
            img.classList.add("hidden-gallery");
        } else {
            img.classList.remove("hidden-gallery");
            img.classList.add("show-photo");
        }
    });
}

// Fungsi Smooth Toggle Gallery
function toggleGallery() {
    const allImages = document.querySelectorAll(".gallery-grid img");
    const btn = document.getElementById("btn-toggle-gallery");
    const isExpanding = btn && btn.innerText.includes("Full View");

    if (isExpanding) {
        // TAMPILKAN SEMUA FOTO DENGAN ANIMASI FADE-IN
        allImages.forEach((img, index) => {
            if (index >= 4) {
                img.classList.remove("hidden-gallery", "hide-photo");
                img.classList.add("show-photo");
            }
        });
        if (btn) btn.innerText = "Show Less";
    } else {
        // SEMBUNYIKAN FOTO DENGAN ANIMASI FADE-OUT
        allImages.forEach((img, index) => {
            if (index >= 4) {
                img.classList.remove("show-photo");
                img.classList.add("hide-photo");

                // Beri jeda animasi fade-out selesai baru dipasang 'hidden-gallery'
                setTimeout(() => {
                    img.classList.add("hidden-gallery");
                    img.classList.remove("hide-photo");
                }, 380);
            }
        });
        if (btn) btn.innerText = "Full View Gallery";
    }

    setTimeout(() => {
        if (typeof initScrollObserver === "function") {
            initScrollObserver();
        }
    }, 100);
}

/* ============================================================
   3. AUTO-DETEKSI SCROLL (TESTIMONI & LOKASI)
   ============================================================ */

window.addEventListener("scroll", () => {
    const pageMenu = document.getElementById("page-menu");
    const testiAnchor = document.getElementById("testi-anchor");

    if (pageMenu && pageMenu.classList.contains("active-page") && testiAnchor) {
        const testiPosition = testiAnchor.getBoundingClientRect().top;
        const navMenu = document.getElementById("nav-menu");
        const navTesti = document.getElementById("nav-testi");
        const footerNavMenu = document.getElementById("footer-nav-menu");
        const footerNavTesti = document.getElementById("footer-nav-testi");

        if (testiPosition <= 100) {
            if (navMenu) navMenu.classList.remove("active");
            if (navTesti) navTesti.classList.add("active");
            if (footerNavMenu) footerNavMenu.classList.remove("footer-active");
            if (footerNavTesti) footerNavTesti.classList.add("footer-active");
        } else {
            if (navMenu) navMenu.classList.add("active");
            if (navTesti) navTesti.classList.remove("active");
            if (footerNavMenu) footerNavMenu.classList.add("footer-active");
            if (footerNavTesti) footerNavTesti.classList.remove("footer-active");
        }
    }

    const pageGallery = document.getElementById("page-gallery");
    const locationAnchor = document.getElementById("location-anchor");

    if (pageGallery && pageGallery.classList.contains("active-page") && locationAnchor) {
        const locationPosition = locationAnchor.getBoundingClientRect().top;
        const navGallery = document.getElementById("nav-gallery");
        const navLocation = document.getElementById("nav-location");
        const footerNavGallery = document.getElementById("footer-nav-gallery");
        const footerNavLocation = document.getElementById("footer-nav-location");

        if (locationPosition <= 100) {
            if (navGallery) navGallery.classList.remove("active");
            if (navLocation) navLocation.classList.add("active");
            if (footerNavGallery) footerNavGallery.classList.remove("footer-active");
            if (footerNavLocation) footerNavLocation.classList.add("footer-active");
        } else {
            if (navGallery) navGallery.classList.add("active");
            if (navLocation) navLocation.classList.remove("active");
            if (footerNavGallery) footerNavGallery.classList.add("footer-active");
            if (footerNavLocation) footerNavLocation.classList.remove("footer-active");
        }
    }
});

/* ============================================================
   4. ANIMASI REPETITIF BERULANG SAAT DISCROLL
   ============================================================ */

let scrollObserver;

function initScrollObserver() {
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.01
    };

    if (scrollObserver) {
        scrollObserver.disconnect();
    }

    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                entry.target.classList.remove("is-visible");
            }
        });
    }, observerOptions);

    const applyAnimation = (selector, animClass) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            if (!el.classList.contains("reveal-on-scroll")) {
                el.classList.add("reveal-on-scroll", animClass);

                const delayMod = index % 4;
                if (delayMod === 1) el.classList.add("delay-1");
                else if (delayMod === 2) el.classList.add("delay-2");
                else if (delayMod === 3) el.classList.add("delay-3");
            }
            scrollObserver.observe(el);
        });
    };

    // Mendaftarkan Elemen Teks dan Elemen Foto Home & Gallery
    applyAnimation(".section-tag, .section-title", "reveal-left");
    applyAnimation(".home-text-desc, .btn-group, .badges", "reveal-right");
    applyAnimation(".menu-card, .testi-card, .opening-box", "reveal-zoom");
    applyAnimation(".img-card-main, .img-card-sub, .gallery-grid img, .info-item, .location-img", "reveal-up");
}

/* ============================================================
   5. DOCUMENT INITIALIZATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initGallery();
    initScrollObserver();
    initTestiTabs();
});

/* ============================================================
   6. FITUR ULASAN & TAB TESTIMONI
   ============================================================ */

function initTestiTabs() {
    const btnRead = document.getElementById("btn-tab-read");
    const btnWrite = document.getElementById("btn-tab-write");
    const secRead = document.getElementById("sec-read-testi");
    const secWrite = document.getElementById("sec-write-testi");

    if (btnRead && btnWrite && secRead && secWrite) {
        btnRead.addEventListener("click", () => {
            secRead.style.display = "block";
            secWrite.style.display = "none";
            btnRead.className = "btn-tab-active";
            btnWrite.className = "btn-tab-inactive";
        });

        btnWrite.addEventListener("click", () => {
            secRead.style.display = "none";
            secWrite.style.display = "block";
            btnWrite.className = "btn-tab-active";
            btnRead.className = "btn-tab-inactive";
        });
    }
}

function submitReview(event) {
    if (event) event.preventDefault();

    const nameInput = document.getElementById("review-name");
    const roleInput = document.getElementById("review-role");
    const textInput = document.getElementById("review-text");
    const ratingInput = document.querySelector('input[name="rating"]:checked');

    if (!nameInput || !textInput || !nameInput.value.trim() || !textInput.value.trim()) {
        alert("Mohon isi Nama dan Ulasan Anda terlebih dahulu.");
        return;
    }

    const name = nameInput.value.trim();
    const role = (roleInput && roleInput.value.trim()) ? roleInput.value.trim() : "Pelanggan Setia";
    const text = textInput.value.trim();
    const starCount = ratingInput ? parseInt(ratingInput.value) : 5;
    const starsHtml = "★".repeat(starCount) + "☆".repeat(5 - starCount);

    const testiGrid = document.querySelector(".testi-grid");
    if (testiGrid) {
        const newCard = document.createElement("div");
        newCard.className = "testi-card reveal-on-scroll reveal-zoom";
        newCard.innerHTML = `
            <button class="btn-delete-review" onclick="deleteReview(this)" title="Hapus Ulasan">Hapus</button>
            <div class="testi-icon">${starsHtml}</div>
            <p>"${text}"</p>
            <div class="testi-author">${name}</div>
            <div class="testi-role">${role}</div>
        `;

        testiGrid.prepend(newCard);

        nameInput.value = "";
        if (roleInput) roleInput.value = "";
        textInput.value = "";

        const btnRead = document.getElementById("btn-tab-read");
        if (btnRead) btnRead.click();

        if (typeof initScrollObserver === "function") {
            initScrollObserver();
        }
    }
}

function deleteReview(btnElement) {
    if (confirm("Apakah Anda yakin ingin menghapus ulasan ini?")) {
        const card = btnElement.closest(".testi-card");
        if (card) {
            card.style.transition = "all 0.3s ease";
            card.style.opacity = "0";
            card.style.transform = "scale(0.8)";
            setTimeout(() => {
                card.remove();
            }, 300);
        }
    }
    
}

    <!-- JAVASCRIPT: LOGIK TESTIMONI, ORDER, LOCALSTORAGE & DASHBOARD REKAP ADMIN -->
   
        var allTestiVisible = false;

        var defaultReviews = [
            { id: 1, name: "Ive", role: "Pelajar", message: "ENAKKK BANGETTT, tempatnya juga cozy abiezzzzz. Utk price jg oke, cock untukn gen z ngerjain kerjaan/tugas", stars: 5 },
            { id: 2, name: "Bima", role: "Mahasiswa", message: "The crust on their tradisional country Sourdough is absolute perfection. I travel 20 minutes every Saturday just for a fresh loaf.", stars: 5 },
            { id: 3, name: "Sena", role: "Actor", message: "Amazing pastries, excellent coffee, and a cozy aesthetic. Highly recommend sitting by the window with a warm bun!", stars: 5 },
            { id: 4, name: "Clara", role: "Food Blogger", message: "Pelayanannya sangat ramah dan tempatnya bersih. Paling suka sama Strawberry Cheesecake-nya!", stars: 4 },
            { id: 5, name: "Rian", role: "Desainer", message: "Donat manisnya lembut banget dan frosting-nya pas tidak bikin enek. Pasti bakal balik lagi!", stars: 5 }
        ];

        /* --- MANAJEMEN TRANSAKSI / REKAP DATA ADMIN --- */
        function getStoredOrders() {
            var stored = localStorage.getItem('lilis_orders_history');
            return stored ? JSON.parse(stored) : [];
        }

        function saveOrderToStorage(orderData) {
            var orders = getStoredOrders();
            orders.unshift(orderData); // Pesanan terbaru di atas
            localStorage.setItem('lilis_orders_history', JSON.stringify(orders));
        }

        function clearAllOrders() {
            if (confirm("Apakah Anda yakin ingin menghapus SELURUH riwayat pesanan masuk?")) {
                localStorage.removeItem('lilis_orders_history');
                renderAdminDashboard();
            }
        }

        function resetDateFilter() {
            document.getElementById('filter-order-date').value = '';
            renderAdminDashboard();
        }

        function renderAdminDashboard() {
            var orders = getStoredOrders();
            var filterDate = document.getElementById('filter-order-date').value;

            // Filter berdasarkan tanggal jika diisi
            if (filterDate) {
                orders = orders.filter(function(o) {
                    return o.isoDate === filterDate;
                });
            }

            var totalOrders = orders.length;
            var totalPcs = 0;
            var totalOmzet = 0;

            var menuStats = {
                'Traditional Sourdough': 0,
                'CheeseCake Strawberry': 0,
                'Fresh Pistachio Tart': 0,
                'Sweet Donut Collection': 0,
                'Savory Donut Selection': 0,
                'Custom Cake / Bento Cake': 0
            };

            var tableBody = document.getElementById('table-orders-body');
            tableBody.innerHTML = '';

            orders.forEach(function(order) {
                totalOmzet += order.grandTotal;

                var detailText = [];
                order.items.forEach(function(item) {
                    totalPcs += item.qty;
                    if (menuStats[item.name] !== undefined) {
                        menuStats[item.name] += item.qty;
                    } else {
                        menuStats[item.name] = item.qty;
                    }
                    detailText.push(item.name + " (" + item.qty + "x)");
                });

                var row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.timestamp}</td>
                    <td><strong>${order.customerName}</strong></td>
                    <td>${order.customerPhone}</td>
                    <td>${detailText.join('<br>')}</td>
                    <td><strong>${formatRupiah(order.grandTotal)}</strong></td>
                `;
                tableBody.appendChild(row);
            });

            if (orders.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#888;">Belum ada pesanan masuk pada periode tanggal ini.</td></tr>';
            }

            // Update statistik
            document.getElementById('stat-total-orders').innerText = totalOrders;
            document.getElementById('stat-total-pcs').innerText = totalPcs + " Pcs";
            document.getElementById('stat-total-omzet').innerText = formatRupiah(totalOmzet);

            // Breakdown Per Menu
            var breakdownContainer = document.getElementById('menu-breakdown-container');
            breakdownContainer.innerHTML = '';

            Object.keys(menuStats).forEach(function(menuName) {
                var card = document.createElement('div');
                card.style.background = '#f8f9fa';
                card.style.border = '1px solid #e9ecef';
                card.style.padding = '10px 12px';
                card.style.borderRadius = '6px';
                card.style.fontSize = '0.8rem';
                card.innerHTML = `
                    <div style="font-weight:600; color:#333; font-size:0.85rem;">${menuName}</div>
                    <div style="color:#D86D51; font-weight:700; margin-top:4px;">Terjual: ${menuStats[menuName]} pcs</div>
                `;
                breakdownContainer.appendChild(card);
            });
        }

        /* --- MANAJEMEN TESTIMONI --- */
        function getStoredReviews() {
            var stored = localStorage.getItem('lilis_reviews');
            if (stored) {
                return JSON.parse(stored);
            } else {
                localStorage.setItem('lilis_reviews', JSON.stringify(defaultReviews));
                return defaultReviews;
            }
        }

        function saveReviewsToStorage(reviews) {
            localStorage.setItem('lilis_reviews', JSON.stringify(reviews));
        }

        function switchReviewTab(type) {
            var btnReview = document.getElementById('btn-show-reviews');
            var btnYourReview = document.getElementById('btn-show-form');
            var formContainer = document.getElementById('review-form-container');
            var listContainer = document.getElementById('review-list-container');

            if (type === 'form') {
                formContainer.style.display = 'block';
                listContainer.style.display = 'none';
                btnYourReview.className = 'btn-tab-active';
                btnReview.className = 'btn-tab-inactive';
            } else {
                formContainer.style.display = 'none';
                listContainer.style.display = 'block';
                btnReview.className = 'btn-tab-active';
                btnYourReview.className = 'btn-tab-inactive';
            }
        }

        function renderReviews() {
            var reviews = getStoredReviews();
            var selectedFilter = document.getElementById('filter-bintang').value;
            var grid = document.getElementById('testi-grid');
            grid.innerHTML = '';

            var totalMatching = 0;
            var visibleCount = 0;

            reviews.forEach(function(item, index) {
                var matchesFilter = (selectedFilter === 'all' || selectedFilter == item.stars);

                if (matchesFilter) {
                    totalMatching++;

                    var starsHtml = '';
                    for (var i = 0; i < 5; i++) {
                        starsHtml += (i < item.stars) ? '★' : '☆';
                    }

                    var card = document.createElement('div');
                    card.className = 'testi-card';

                    if (!allTestiVisible && visibleCount >= 3) {
                        card.classList.add('hidden-testi');
                    } else {
                        visibleCount++;
                    }

                    card.innerHTML = `
                        <div class="admin-controls">
                            <button class="btn-admin-action" onclick="moveReview(${index}, -1)" title="Pindah ke Atas">▲</button>
                            <button class="btn-admin-action" onclick="moveReview(${index}, 1)" title="Pindah ke Bawah">▼</button>
                            <button class="btn-admin-action btn-admin-delete" onclick="deleteReview(${index})" title="Hapus Ulasan"><i class="fa-solid fa-trash"></i></button>
                        </div>
                        <div class="stars" style="color: #ffc107; margin-bottom: 12px; font-size: 1rem;">${starsHtml}</div>
                        <p>"${item.message}"</p>
                        <div class="testi-author" style="font-weight: 700; margin-top: 15px;">${item.name}</div>
                        <div class="testi-role" style="font-size: 0.85rem; color: #666;">${item.role}</div>
                    `;

                    grid.appendChild(card);
                }
            });

            var btnWrapper = document.getElementById('wrapper-btn-testi');
            var btn = document.getElementById('btn-toggle-all-testi');
            if (totalMatching <= 3) {
                btnWrapper.style.display = 'none';
            } else {
                btnWrapper.style.display = 'block';
                btn.innerText = allTestiVisible ? 'Sembunyikan Testimoni' : 'Lihat Semua Testimoni';
            }
        }

        function toggleAllTestimoni() {
            allTestiVisible = !allTestiVisible;
            renderReviews();
        }

        function addNewReview(e) {
            e.preventDefault();

            var name = document.getElementById('input-name').value;
            var role = document.getElementById('input-role').value || 'Pelanggan';
            var message = document.getElementById('input-message').value;
            var ratingValue = parseInt(document.querySelector('input[name="rating"]:checked').value);

            var reviews = getStoredReviews();
            var newReview = {
                id: Date.now(),
                name: name,
                role: role,
                message: message,
                stars: ratingValue
            };

            reviews.unshift(newReview);
            saveReviewsToStorage(reviews);

            document.getElementById('form-ulasan').reset();
            alert('Ulasan Anda berhasil dikirim dan tersimpan!');

            renderReviews();
            switchReviewTab('list');
        }

        function moveReview(index, direction) {
            var reviews = getStoredReviews();
            var newIndex = index + direction;

            if (newIndex < 0 || newIndex >= reviews.length) return;

            var temp = reviews[index];
            reviews[index] = reviews[newIndex];
            reviews[newIndex] = temp;

            saveReviewsToStorage(reviews);
            renderReviews();
        }

        function deleteReview(index) {
            if (confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) {
                var reviews = getStoredReviews();
                reviews.splice(index, 1);
                saveReviewsToStorage(reviews);
                renderReviews();
            }
        }

        function loginAdminPrompt() {
            var pin = prompt("Masukkan PIN Admin / Owner:");
            if (pin === "WELCOMEHOMIE") {
                document.body.classList.add('admin-mode');
                renderAdminDashboard();
                alert("Login Admin Berhasil! Dashboard Rekap Orderan dan Kontrol Ulasan telah aktif.");
            } else if (pin !== null) {
                alert("PIN Salah! Akses ditolak.");
            }
        }

        function logoutAdmin() {
            document.body.classList.remove('admin-mode');
            alert("Mode Admin dinonaktifkan.");
        }

        /* --- FUNGSI ORDER & KALKULASI HARGA --- */
        function formatRupiah(number) {
            return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        function openSingleOrder(menuName, price) {
            document.getElementById('modal-menu-title').innerText = menuName;
            document.getElementById('modal-menu-name').value = menuName;
            document.getElementById('modal-menu-unit-price').value = price;
            document.getElementById('single-qty').value = 1;
            
            calculateSingleTotal();
            document.getElementById('single-order-modal').style.display = 'flex';
        }

        function closeSingleOrder() {
            document.getElementById('single-order-modal').style.display = 'none';
        }

        function calculateSingleTotal() {
            var unitPrice = parseInt(document.getElementById('modal-menu-unit-price').value) || 0;
            var qty = parseInt(document.getElementById('single-qty').value) || 0;
            var total = unitPrice * qty;
            document.getElementById('single-total-price').innerText = formatRupiah(total);
        }

        function openMultiOrderModal() {
            closeSingleOrder();
            document.getElementById('multi-order-modal').style.display = 'flex';
        }

        function closeMultiOrderModal() {
            document.getElementById('multi-order-modal').style.display = 'none';
        }

        function calculateMultiTotal() {
            var inputs = document.querySelectorAll('.multi-item-qty');
            var grandTotal = 0;

            inputs.forEach(function(input) {
                var price = parseInt(input.getAttribute('data-price')) || 0;
                var qty = parseInt(input.value) || 0;
                grandTotal += (price * qty);
            });

            document.getElementById('multi-total-price').innerText = formatRupiah(grandTotal);
        }

        function submitSingleOrder(e) {
            e.preventDefault();
            var menu = document.getElementById('modal-menu-name').value;
            var unitPrice = parseInt(document.getElementById('modal-menu-unit-price').value);
            var qty = parseInt(document.getElementById('single-qty').value);
            var name = document.getElementById('single-name').value;
            var phone = document.getElementById('single-phone').value;
            var grandTotal = unitPrice * qty;

            var now = new Date();
            var isoDate = now.toISOString().split('T')[0]; // Format YYYY-MM-DD
            var timestamp = now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

            // SIMPAN DATA TRANSAKSI UNTUK REKAP ADMIN
            var orderData = {
                id: Date.now(),
                timestamp: timestamp,
                isoDate: isoDate,
                customerName: name,
                customerPhone: phone,
                items: [{ name: menu, qty: qty, price: unitPrice }],
                grandTotal: grandTotal
            };
            saveOrderToStorage(orderData);

            // KIRIM KE WHATSAPP
            var text = "Halo Lilis Bakepastry, saya ingin pesan (1 Menu):\n" +
                       "- " + menu + " (" + qty + " pcs)\n" +
                       "Total Harga: " + formatRupiah(grandTotal) + "\n\n" +
                       "Nama Pemesan: " + name + "\n" +
                       "No WA: " + phone;

            var waUrl = "https://wa.me/6281234567890?text=" + encodeURIComponent(text);
            window.open(waUrl, '_blank');
            closeSingleOrder();
        }

        function submitMultiOrder(e) {
            e.preventDefault();
            var name = document.getElementById('multi-nama').value;
            var phone = document.getElementById('multi-hp').value;
            var note = document.getElementById('multi-catatan').value;

            var inputs = document.querySelectorAll('.multi-item-qty');
            var orderedItems = [];
            var orderedListWA = "";
            var grandTotal = 0;

            inputs.forEach(function(input) {
                var qty = parseInt(input.value) || 0;
                if (qty > 0) {
                    var menuName = input.getAttribute('data-name');
                    var price = parseInt(input.getAttribute('data-price'));
                    var subtotal = price * qty;
                    grandTotal += subtotal;

                    orderedItems.push({ name: menuName, qty: qty, price: price });
                    orderedListWA += "- " + menuName + " (" + qty + " pcs) = " + formatRupiah(subtotal) + "\n";
                }
            });

            if (orderedItems.length === 0) {
                alert("Silakan pilih minimal 1 menu dengan mengisi jumlah pcs.");
                return;
            }

            var now = new Date();
            var isoDate = now.toISOString().split('T')[0];
            var timestamp = now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

            // SIMPAN DATA TRANSAKSI UNTUK REKAP ADMIN
            var orderData = {
                id: Date.now(),
                timestamp: timestamp,
                isoDate: isoDate,
                customerName: name,
                customerPhone: phone,
                items: orderedItems,
                grandTotal: grandTotal
            };
            saveOrderToStorage(orderData);

            // KIRIM KE WHATSAPP
            var text = "Halo Lilis Bakepastry, saya ingin memesan beberapa menu:\n" + orderedListWA +
                       "\nTotal Pembayaran: " + formatRupiah(grandTotal) +
                       "\nCatatan: " + (note || "-") + "\n\n" +
                       "Nama Pemesan: " + name + "\n" +
                       "No WA: " + phone;

            var waUrl = "https://wa.me/6281234567890?text=" + encodeURIComponent(text);
            window.open(waUrl, '_blank');
            closeMultiOrderModal();
        }

        document.addEventListener('DOMContentLoaded', function() {
            renderReviews();
        });