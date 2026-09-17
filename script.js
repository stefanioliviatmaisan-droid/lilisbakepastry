/* ============================================================
   1. NAVIGATION & PAGE SWITCHING
   ============================================================ */

function switchPage(pageName) {
    document.querySelectorAll(".page-section").forEach((section) => {
        section.classList.remove("active-page");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
    });

    document.querySelectorAll(".footer-nav-links a").forEach((link) => {
        link.classList.remove("footer-active");
    });

    const headerOffset = 60;

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

        const target = document.getElementById("location-anchor");
        if (target) {
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    }

    if (pageName !== "testi" && pageName !== "location") {
        if (pageName === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo({ top: 260, behavior: "smooth" });
        }
    }

    setTimeout(() => {
        if (typeof initScrollObserver === "function") {
            initScrollObserver();
        }
    }, 80);
}

/* ============================================================
   2. GALLERY SYSTEM
   ============================================================ */

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

function toggleGallery() {
    const allImages = document.querySelectorAll(".gallery-grid img");
    const btn = document.getElementById("btn-toggle-gallery");
    const isExpanding = btn && btn.innerText.includes("Full View");

    if (isExpanding) {
        allImages.forEach((img, index) => {
            if (index >= 4) {
                img.classList.remove("hidden-gallery", "hide-photo");
                img.classList.add("show-photo");
            }
        });
        if (btn) btn.innerText = "Show Less";
    } else {
        allImages.forEach((img, index) => {
            if (index >= 4) {
                img.classList.remove("show-photo");
                img.classList.add("hide-photo");
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
   3. AUTO-DETEKSI SCROLL
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
   4. SCROLL OBSERVER (ANIMASI)
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

    applyAnimation(".section-tag, .section-title", "reveal-left");
    applyAnimation(".home-text-desc, .btn-group, .badges", "reveal-right");
    applyAnimation(".menu-card, .testi-card, .opening-box", "reveal-zoom");
    applyAnimation(".img-card-main, .img-card-sub, .gallery-grid img, .info-item, .location-img", "reveal-up");
}

/* ============================================================
   5. MANAJEMEN TESTIMONI & LOCALSTORAGE
   ============================================================ */

var allTestiVisible = false;

var defaultReviews = [
    { id: 1, name: "Ive", role: "Pelajar", message: "ENAKKK BANGETTT, tempatnya juga cozy abiezzzzz. Utk price jg oke, cock untukn gen z ngerjain kerjaan/tugas", stars: 5 },
    { id: 2, name: "Bima", role: "Mahasiswa", message: "The crust on their tradisional country Sourdough is absolute perfection. I travel 20 minutes every Saturday just for a fresh loaf.", stars: 5 },
    { id: 3, name: "Sena", role: "Actor", message: "Amazing pastries, excellent coffee, and a cozy aesthetic. Highly recommend sitting by the window with a warm bun!", stars: 5 },
    { id: 4, name: "Clara", role: "Food Blogger", message: "Pelayanannya sangat ramah dan tempatnya bersih. Paling suka sama Strawberry Cheesecake-nya!", stars: 4 },
    { id: 5, name: "Rian", role: "Desainer", message: "Donat manisnya lembut banget dan frosting-nya pas tidak bikin enek. Pasti bakal balik lagi!", stars: 5 }
];

function getStoredReviews() {
    var stored = localStorage.getItem('lilis_reviews');
    if (!stored) {
        localStorage.setItem('lilis_reviews', JSON.stringify(defaultReviews));
        return defaultReviews;
    }
    
    var userReviews = JSON.parse(stored);
    var combined = [...defaultReviews];
    
    userReviews.forEach(function(item) {
        if (!combined.some(d => d.id === item.id)) {
            combined.push(item);
        }
    });
    
    return combined;
}

function saveReviewsToStorage(reviews) {
    localStorage.setItem('lilis_reviews', JSON.stringify(reviews));
}

function updateAverageRating() {
    var reviews = getStoredReviews();
    var avgElem = document.getElementById('avg-rating-value');
    var countElem = document.getElementById('total-reviews-count');

    if (!avgElem) return;

    if (reviews.length === 0) {
        avgElem.innerText = "0.0";
        if (countElem) countElem.innerText = "(0 Customer Reviews)";
        return;
    }

    var totalStars = reviews.reduce(function(sum, item) {
        return sum + item.stars;
    }, 0);

    var average = (totalStars / reviews.length).toFixed(1);

    avgElem.innerText = average;
    if (countElem) {
        countElem.innerText = "(" + reviews.length + " Customer Reviews)";
    }
}

function switchReviewTab(type) {
    var btnReview = document.getElementById('btn-show-reviews');
    var btnYourReview = document.getElementById('btn-show-form');
    var formContainer = document.getElementById('review-form-container');
    var listContainer = document.getElementById('review-list-container');

    if (formContainer && listContainer) {
        if (type === 'form') {
            formContainer.style.display = 'block';
            listContainer.style.display = 'none';
            if (btnYourReview) btnYourReview.className = 'btn-tab-active';
            if (btnReview) btnReview.className = 'btn-tab-inactive';
        } else {
            formContainer.style.display = 'none';
            listContainer.style.display = 'block';
            if (btnReview) btnReview.className = 'btn-tab-active';
            if (btnYourReview) btnYourReview.className = 'btn-tab-inactive';
        }
    }
}

function renderReviews() {
    updateAverageRating();

    var reviews = getStoredReviews();
    var filterElem = document.getElementById('filter-bintang');
    var selectedFilter = filterElem ? filterElem.value : 'all';
    
    var grid = document.getElementById('testi-grid') || document.querySelector('.testi-grid');
    if (!grid) return;

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
    if (btnWrapper && btn) {
        if (totalMatching <= 3) {
            btnWrapper.style.display = 'none';
        } else {
            btnWrapper.style.display = 'block';
            btn.innerText = allTestiVisible ? 'Sembunyikan Testimoni' : 'Lihat Semua Testimoni';
        }
    }

    if (typeof initScrollObserver === "function") {
        initScrollObserver();
    }
}

function toggleAllTestimoni() {
    allTestiVisible = !allTestiVisible;
    renderReviews();
}

function addNewReview(e) {
    if (e) e.preventDefault();

    var nameInput = document.getElementById('input-name') || document.getElementById('review-name');
    var roleInput = document.getElementById('input-role') || document.getElementById('review-role');
    var messageInput = document.getElementById('input-message') || document.getElementById('review-text');
    var ratingInput = document.querySelector('input[name="rating"]:checked');

    if (!nameInput || !messageInput || !nameInput.value.trim() || !messageInput.value.trim()) {
        alert("Mohon isi Nama dan Ulasan Anda terlebih dahulu.");
        return;
    }

    var name = nameInput.value.trim();
    var role = (roleInput && roleInput.value.trim()) ? roleInput.value.trim() : 'Pelanggan';
    var message = messageInput.value.trim();
    var ratingValue = ratingInput ? parseInt(ratingInput.value) : 5;

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
    updateAverageRating();

    var formElem = document.getElementById('form-ulasan');
    if (formElem) formElem.reset();

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
    let password = prompt("Konfirmasi Password Admin untuk menghapus ulasan ini:");
    if (password === ADMIN_PASSWORD) {
        var reviews = getStoredReviews();
        reviews.splice(index, 1);
        saveReviewsToStorage(reviews);
        updateAverageRating();
        renderReviews();
        alert("Ulasan berhasil dihapus.");
    } else if (password !== null) {
        alert("Password salah! Penghapusan ulasan dibatalkan.");
    }
}

/* ============================================================
   6. KEAMANAN ADMIN & AUDIT LOG SYSTEM (BARU / DIPERBARUI)
   ============================================================ */

const ADMIN_PASSWORD = "WELCOMEHOMIE"; // Password Admin yang digunakan
let isAdminLoggedIn = false;

// Fungsi untuk mencatat aktivitas ke dalam Audit Log dengan Hari, Tanggal, dan Jam lengkap
function logAdminActivity(actionText) {
    let logs = JSON.parse(localStorage.getItem('lilis_audit_logs')) || [];
    
    // Format lengkap: Hari, Tanggal, Jam (contoh: Rabu, 17 September 2026 pukul 15.30.00)
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    let timestamp = new Date().toLocaleDateString('id-ID', options);
    
    logs.unshift({ time: timestamp, desc: actionText });
    localStorage.setItem('lilis_audit_logs', JSON.stringify(logs));
    renderAuditLogs();
}

function renderAuditLogs() {
    let logs = JSON.parse(localStorage.getItem('lilis_audit_logs')) || [];
    let tbody = document.getElementById('table-audit-logs-body');
    if (!tbody) return;

    tbody.innerHTML = "";
    if (logs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="2" style="text-align: center; color: #777;">Belum ada catatan log aktivitas.</td></tr>`;
        return;
    }

    logs.forEach(log => {
        tbody.innerHTML += `
            <tr>
                <td>${log.time}</td>
                <td>${log.desc}</td>
            </tr>
        `;
    });
}

function clearAuditLogs() {
    let password = prompt("Konfirmasi Password Admin untuk menghapus Audit Log:");
    if (password === ADMIN_PASSWORD) {
        localStorage.removeItem('lilis_audit_logs');
        logAdminActivity("Admin membersihkan/menghapus catatan Audit Log.");
        renderAuditLogs();
        alert("Audit Log berhasil dibersihkan.");
    } else if (password !== null) {
        alert("Password salah! Penghapusan log dibatalkan.");
    }
}

// Fungsi Akses Halaman Admin via Tombol 🔑 Admin di Navigasi
function accessAdminPage() {
    let password = prompt("Masukkan Password Admin untuk mengakses Halaman Rekapan & Catatan Log:");
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        logAdminActivity("Admin Berhasil Login ke Halaman Rekapan & Catatan Log.");
        alert("Akses Diterima! Membuka Halaman Menu & Menampilkan Dashboard Rekap Admin.");
        switchPage('menu');
        document.getElementById('testi-anchor').scrollIntoView({ behavior: 'smooth' });
        renderAdminDashboard();
    } else if (password !== null) {
        logAdminActivity("Gagal Login Admin (Password Salah dimasukkan).");
        alert("Password Salah! Akses ditolak.");
    }
}

function loginAdminPrompt() {
    if (isAdminLoggedIn) {
        alert("Anda sudah berada dalam mode Admin.");
        return;
    }
    accessAdminPage();
}

function logoutAdmin() {
    logAdminActivity("Admin Melakukan Logout.");
    isAdminLoggedIn = false;
    
    // Sembunyikan elemen admin dari pengunjung biasa
    let adminBar = document.getElementById('admin-bar');
    let adminDash = document.getElementById('admin-dashboard-wrapper');
    if (adminBar) adminBar.style.display = 'none';
    if (adminDash) adminDash.style.display = 'none';
    document.body.classList.remove('admin-mode');
    
    alert("Berhasil keluar dari mode Admin.");
}

/* ============================================================
   7. REKAP DATA ADMIN & TRANSAKSI
   ============================================================ */

function getStoredOrders() {
    var stored = localStorage.getItem('lilis_orders_history');
    return stored ? JSON.parse(stored) : [];
}

function saveOrderToStorage(orderData) {
    var orders = getStoredOrders();
    orders.unshift(orderData);
    localStorage.setItem('lilis_orders_history', JSON.stringify(orders));
}

function clearAllOrders() {
    let password = prompt("Konfirmasi Password Admin untuk menghapus SELURUH riwayat pesanan:");
    
    if (password === ADMIN_PASSWORD) {
        localStorage.removeItem('lilis_orders_history');
        logAdminActivity("Admin melakukan Reset Data Pesanan.");
        renderAdminDashboard();
        alert("Data pesanan berhasil di-reset.");
    } else if (password !== null) {
        logAdminActivity("Gagal Reset Data Pesanan (Password Salah).");
        alert("Password salah! Penghapusan data pesanan dibatalkan.");
    }
}

function resetDateFilter() {
    document.getElementById('filter-order-date').value = '';
    renderAdminDashboard();
}

function renderAdminDashboard() {
    // Jika belum login admin, sembunyikan dashboard rekap & log agar aman dari pengunjung biasa
    if (!isAdminLoggedIn) {
        let adminBar = document.getElementById('admin-bar');
        let adminDash = document.getElementById('admin-dashboard-wrapper');
        if (adminBar) adminBar.style.display = 'none';
        if (adminDash) adminDash.style.display = 'none';
        return;
    }

    // Tampilkan panel admin jika sudah login
    let adminBar = document.getElementById('admin-bar');
    let adminDash = document.getElementById('admin-dashboard-wrapper');
    if (adminBar) adminBar.style.display = 'flex';
    if (adminDash) adminDash.style.display = 'block';

    var orders = getStoredOrders();
    var filterDateInput = document.getElementById('filter-order-date');
    var filterDate = filterDateInput ? filterDateInput.value : '';

    if (filterDate) {
        orders = orders.filter(function(o) {
            return o.isoDate === filterDate;
        });
    }

    var totalOrders = orders.length;
    var totalPcs = 0;
    var totalOmzet = 0;
    var menuStats = {};

    var tableBody = document.getElementById('table-orders-body');
    if (tableBody) {
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
    }

    if (document.getElementById('stat-total-orders'))
        document.getElementById('stat-total-orders').innerText = totalOrders;
    if (document.getElementById('stat-total-pcs'))
        document.getElementById('stat-total-pcs').innerText = totalPcs + " Pcs";
    if (document.getElementById('stat-total-omzet'))
        document.getElementById('stat-total-omzet').innerText = formatRupiah(totalOmzet);

    var breakdownContainer = document.getElementById('menu-breakdown-container');
    if (breakdownContainer) {
        breakdownContainer.innerHTML = '';

        var menuKeys = Object.keys(menuStats);

        if (menuKeys.length === 0) {
            breakdownContainer.innerHTML = '<div style="color:#888; font-size:0.85rem;">Belum ada data penjualan menu.</div>';
        } else {
            menuKeys.forEach(function(menuName) {
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
    }

    renderAuditLogs();
}

/* ============================================================
   8. ORDER & KALKULASI HARGA
   ============================================================ */

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
    if (e) e.preventDefault();
    var menu = document.getElementById('modal-menu-name').value;
    var unitPrice = parseInt(document.getElementById('modal-menu-unit-price').value);
    var qty = parseInt(document.getElementById('single-qty').value);
    var name = document.getElementById('single-name').value;
    var phone = document.getElementById('single-phone').value;
    var grandTotal = unitPrice * qty;

    var now = new Date();
    var isoDate = now.toISOString().split('T')[0];
    var timestamp = now.toLocaleDateString('id-ID') + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

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

    var text = "Halo Lilis Bakepastry, saya ingin pesan (1 Menu):\n" +
               "- " + menu + " (" + qty + " pcs)\n" +
               "Total Harga: " + formatRupiah(grandTotal) + "\n\n" +
               "Nama Pemesan: " + name + "\n" +
               "No WA: " + phone;

    var waUrl = "https://wa.me/6281234567890?text=" + encodeURIComponent(text);
    window.open(waUrl, '_blank');
    closeSingleOrder();
    if (isAdminLoggedIn) renderAdminDashboard();
}

function submitMultiOrder(e) {
    if (e) e.preventDefault();
    var name = document.getElementById('multi-nama').value;
    var phone = document.getElementById('multi-phone').value;

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

    var text = "Halo Lilis Bakepastry, saya ingin memesan beberapa menu:\n" + orderedListWA +
               "\nTotal Pembayaran: " + formatRupiah(grandTotal) + "\n\n" +
               "Nama Pemesan: " + name + "\n" +
               "No WA: " + phone;

    var waUrl = "https://wa.me/6281234567890?text=" + encodeURIComponent(text);
    window.open(waUrl, '_blank');
    closeMultiOrderModal();
    if (isAdminLoggedIn) renderAdminDashboard();
}

/* ============================================================
   9. DOCUMENT INITIALIZATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initGallery();
    initScrollObserver();
    initTestiTabs();
    updateAverageRating();
    renderReviews();
    renderAdminDashboard(); // Memastikan status tersembunyi secara default bagi pengunjung biasa
});