// Data Default Testimoni Awal
const defaultTestimonials = [
    {
        name: "Ive",
        role: "Pelajar",
        rating: 5,
        comment: "ENAKKK BANGETTT, tempatnya juga cozy abiezzzzz. Utk price jg oke, cock untukn gen z ngerjain kerjaan/tugas"
    },
    {
        name: "Bima",
        role: "Mahasiswa",
        rating: 5,
        comment: "The crust on their tradisional country Sourdough is absolute perfection. I travel 20 minutes every Saturday just for a fresh loaf."
    },
    {
        name: "Sena",
        role: "Actor",
        rating: 5,
        comment: "Amazing pastries, excellent coffee, and a cozy aesthetic. Highly recommend sitting by the window with a warm bun!"
    }
];

let showAllTesti = false;
let isAdminLoggedIn = false;

// 1. INSIALISASI TESTIMONI DARI LOCALSTORAGE
function getStoredTestimonials() {
    const saved = localStorage.getItem("lilis_testimonials");
    if (!saved) {
        localStorage.setItem("lilis_testimonials", JSON.stringify(defaultTestimonials));
        return defaultTestimonials;
    }
    return JSON.parse(saved);
}

// 2. RENDER TESTIMONI (TERMASUK FILTER BINTANG 1-5)
function renderTestimoni() {
    const grid = document.getElementById("testi-grid");
    const filterValue = document.getElementById("filter-bintang").value;
    const data = getStoredTestimonials();

    grid.innerHTML = "";

    // Saring berdasarkan filter bintang
    let filteredData = data.filter(item => {
        if (filterValue === "all") return true;
        return item.rating == parseInt(filterValue);
    });

    // Batasi tampilan jika tombol "Lihat Semua" belum diklik
    let displayData = showAllTesti ? filteredData : filteredData.slice(0, 3);

    if (displayData.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 20px;">Tidak ada ulasan dengan rating bintang ini.</p>`;
        return;
    }

    displayData.forEach(item => {
        const starsText = "★".repeat(item.rating) + "☆".repeat(5 - item.rating);
        const card = document.createElement("div");
        card.className = "card-testi";
        card.innerHTML = `
            <div>
                <div style="color: #ffc107; font-size: 1.1rem; margin-bottom: 8px;">${starsText}</div>
                <p style="font-size: 0.9rem; color: #444; margin-bottom: 12px;">"${item.comment}"</p>
            </div>
            <div>
                <strong style="display: block; font-size: 0.95rem; color: #222;">${item.name}</strong>
                <span style="font-size: 0.85rem; color: #777;">${item.role || 'Pelanggan'}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 3. TOGGLE SHOW ALL TESTIMONI / SEMBUNYIKAN
function toggleAllTestimoni() {
    const btn = document.getElementById("btn-toggle-all-testi");
    showAllTesti = !showAllTesti;
    
    if (showAllTesti) {
        btn.innerText = "Sembunyikan Testimoni";
    } else {
        btn.innerText = "Lihat Semua Testimoni";
    }
    renderTestimoni();
}

// 4. GANTI TAB REVIEW / FORM YOUR REVIEW
function switchReviewTab(tab) {
    const btnList = document.getElementById("btn-show-reviews");
    const btnForm = document.getElementById("btn-show-form");
    const containerForm = document.getElementById("review-form-container");
    const containerList = document.getElementById("review-list-container");

    if (tab === 'form') {
        btnForm.className = "btn-tab-active";
        btnList.className = "btn-tab-inactive";
        containerForm.style.display = "block";
        containerList.style.display = "none";
    } else {
        btnList.className = "btn-tab-active";
        btnForm.className = "btn-tab-inactive";
        containerForm.style.display = "none";
        containerList.style.display = "block";
    }
}

// 5. TAMBAH TESTIMONI BARU
function addNewReview(event) {
    event.preventDefault();
    const name = document.getElementById("input-name").value;
    const role = document.getElementById("input-role").value;
    const message = document.getElementById("input-message").value;
    const ratingRadio = document.querySelector('input[name="rating"]:checked');
    const ratingVal = ratingRadio ? parseInt(ratingRadio.value) : 5;

    const newTesti = {
        name: name,
        role: role || "Pelanggan",
        rating: ratingVal,
        comment: message
    };

    const currentData = getStoredTestimonials();
    currentData.unshift(newTesti);
    localStorage.setItem("lilis_testimonials", JSON.stringify(currentData));

    // Reset Form & Kembalikan ke Tab Review List
    document.getElementById("form-ulasan").reset();
    alert("Terima kasih atas ulasan Anda!");
    switchReviewTab('list');
    renderTestimoni();
}

// 6. NAVIGASI HALAMAN (SPA)
function switchPage(pageId) {
    const sections = document.querySelectorAll(".page-section");
    sections.forEach(sec => sec.classList.remove("active-page"));

    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => link.classList.remove("active"));

    const targetSection = document.getElementById("page-" + pageId);
    if (targetSection) targetSection.classList.add("active-page");

    const targetNav = document.getElementById("nav-" + pageId);
    if (targetNav) targetNav.classList.add("active");

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 7. ORDER SINGLE MENU (WA)
function openSingleOrder(name, price) {
    document.getElementById("modal-menu-title").innerText = name;
    document.getElementById("modal-menu-name").value = name;
    document.getElementById("modal-menu-unit-price").value = price;
    document.getElementById("single-qty").value = 1;
    calculateSingleTotal();
    document.getElementById("single-order-modal").style.display = "flex";
}

function closeSingleOrder() {
    document.getElementById("single-order-modal").style.display = "none";
}

function calculateSingleTotal() {
    const price = parseInt(document.getElementById("modal-menu-unit-price").value) || 0;
    const qty = parseInt(document.getElementById("single-qty").value) || 1;
    const total = price * qty;
    document.getElementById("single-total-price").innerText = "Rp " + total.toLocaleString("id-ID");
}

function submitSingleOrder(e) {
    e.preventDefault();
    const name = document.getElementById("single-name").value;
    const phone = document.getElementById("single-phone").value;
    const menuName = document.getElementById("modal-menu-name").value;
    const qty = document.getElementById("single-qty").value;
    const price = parseInt(document.getElementById("modal-menu-unit-price").value) || 0;
    const total = price * qty;

    saveOrderToLocal({
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("id-ID"),
        name: name,
        phone: phone,
        details: `${menuName} (${qty}x)`,
        pcs: parseInt(qty),
        total: total
    });

    const msg = `Halo Lilis Bakepastry, saya ${name} (${phone}) ingin pesan:\n- ${menuName} x${qty} = Rp ${total.toLocaleString("id-ID")}`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, '_blank');
    closeSingleOrder();
}

// 8. ORDER MULTI MENU (WA)
function openMultiOrderModal() {
    closeSingleOrder();
    document.getElementById("multi-order-modal").style.display = "flex";
}

function closeMultiOrderModal() {
    document.getElementById("multi-order-modal").style.display = "none";
}

function calculateMultiTotal() {
    const inputs = document.querySelectorAll(".multi-item-qty");
    let grandTotal = 0;
    inputs.forEach(input => {
        const price = parseInt(input.getAttribute("data-price")) || 0;
        const qty = parseInt(input.value) || 0;
        grandTotal += price * qty;
    });
    document.getElementById("multi-total-price").innerText = "Rp " + grandTotal.toLocaleString("id-ID");
}

function submitMultiOrder(e) {
    e.preventDefault();
    const name = document.getElementById("multi-nama").value;
    const phone = document.getElementById("multi-hp").value;
    const note = document.getElementById("multi-catatan").value;

    const inputs = document.querySelectorAll(".multi-item-qty");
    let itemsText = [];
    let totalPcs = 0;
    let grandTotal = 0;

    inputs.forEach(input => {
        const qty = parseInt(input.value) || 0;
        if (qty > 0) {
            const menuName = input.getAttribute("data-name");
            const price = parseInt(input.getAttribute("data-price")) || 0;
            const itemTotal = price * qty;
            grandTotal += itemTotal;
            totalPcs += qty;
            itemsText.push(`${menuName} (${qty}x)`);
        }
    });

    if (itemsText.length === 0) {
        alert("Pilih minimal 1 jumlah menu yang ingin dipesan!");
        return;
    }

    saveOrderToLocal({
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("id-ID"),
        name: name,
        phone: phone,
        details: itemsText.join(", "),
        pcs: totalPcs,
        total: grandTotal
    });

    const msg = `Halo Lilis Bakepastry, saya ${name} (${phone}) ingin pesan:\n${itemsText.join("\n")}\nTotal: Rp ${grandTotal.toLocaleString("id-ID")}\nCatatan: ${note || '-'}`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, '_blank');
    closeMultiOrderModal();
}

// 9. SIMPAN & DASHBOARD ADMIN
function saveOrderToLocal(orderObj) {
    let orders = JSON.parse(localStorage.getItem("lilis_orders") || "[]");
    orders.unshift(orderObj);
    localStorage.setItem("lilis_orders", JSON.stringify(orders));
    if (isAdminLoggedIn) renderAdminDashboard();
}

function loginAdminPrompt() {
    const pwd = prompt("Masukkan Passcode Admin:");
    if (pwd === "admin123") {
        isAdminLoggedIn = true;
        document.getElementById("admin-bar").style.display = "flex";
        document.getElementById("admin-dashboard").style.display = "block";
        renderAdminDashboard();
        alert("Login Admin Berhasil!");
    } else if (pwd !== null) {
        alert("Passcode Salah!");
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    document.getElementById("admin-bar").style.display = "none";
    document.getElementById("admin-dashboard").style.display = "none";
}

function renderAdminDashboard() {
    let orders = JSON.parse(localStorage.getItem("lilis_orders") || "[]");
    const filterDate = document.getElementById("filter-order-date").value;

    if (filterDate) {
        orders = orders.filter(o => o.date === filterDate);
    }

    let totalOrders = orders.length;
    let totalPcs = 0;
    let totalOmzet = 0;

    const tableBody = document.getElementById("table-orders-body");
    tableBody.innerHTML = "";

    orders.forEach(o => {
        totalPcs += o.pcs || 0;
        totalOmzet += o.total || 0;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${o.date} ${o.time}</td>
            <td>${o.name}</td>
            <td>${o.phone}</td>
            <td>${o.details}</td>
            <td>Rp ${o.total.toLocaleString("id-ID")}</td>
        `;
        tableBody.appendChild(tr);
    });

    document.getElementById("stat-total-orders").innerText = totalOrders;
    document.getElementById("stat-total-pcs").innerText = totalPcs + " Pcs";
    document.getElementById("stat-total-omzet").innerText = "Rp " + totalOmzet.toLocaleString("id-ID");
}

function resetDateFilter() {
    document.getElementById("filter-order-date").value = "";
    renderAdminDashboard();
}

function clearAllOrders() {
    if (confirm("Apakah Anda yakin ingin menghapus semua rekap data pesanan?")) {
        localStorage.removeItem("lilis_orders");
        renderAdminDashboard();
    }
}

function toggleGallery() {
    const hiddenImgs = document.querySelectorAll(".hidden-gallery");
    const btn = document.getElementById("btn-toggle-gallery");
    let isHidden = hiddenImgs[0].style.display === "none" || hiddenImgs[0].style.display === "";

    hiddenImgs.forEach(img => {
        img.style.display = isHidden ? "block" : "none";
    });

    btn.innerText = isHidden ? "Close View Gallery" : "Full View Gallery";
}

// JALANKAN SAAT HALAMAN DIMUAT
document.addEventListener("DOMContentLoaded", () => {
    renderTestimoni();
});
