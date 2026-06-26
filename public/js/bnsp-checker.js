// ─── THEME ───────────────────────────────────────
function toggleTheme() {
    const html = document.documentElement;
    const btn  = document.getElementById('theme-toggle-btn');

    // Spin animation
    btn.classList.add('animating');
    setTimeout(() => btn.classList.remove('animating'), 450);

    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// ─── STATE ───────────────────────────────────────
const state = {
    currentQuery: '',
    currentPage : 1,
    totalRecords: 0,
    lastPage    : 1,
    metaFrom    : null,
    metaTo      : null,
    pageSize    : 10,
    isLoading   : false,
};

const API_BASE = '/api/sertifikat';

// ─── DOM ─────────────────────────────────────────
const searchInput        = document.getElementById('search-input');
const btnSearch          = document.getElementById('btn-search');
const btnIcon            = document.getElementById('btn-icon');
const btnSpinner         = document.getElementById('btn-spinner');
const emptyState         = document.getElementById('empty-state');
const skeletonWrapper    = document.getElementById('skeleton-wrapper');
const errorState         = document.getElementById('error-state');
const errorMessage       = document.getElementById('error-message');
const resultsContainer   = document.getElementById('results-container');
const resultsTbody       = document.getElementById('results-tbody');
const resultsCount       = document.getElementById('results-count');
const resultsQuery       = document.getElementById('results-query');
const noResults          = document.getElementById('no-results');
const paginationWrapper  = document.getElementById('pagination-wrapper');
const paginationInfo     = document.getElementById('pagination-info');
const paginationControls = document.getElementById('pagination-controls');
const drawerBody         = document.getElementById('drawer-body');

// ─── UI HELPERS ──────────────────────────────────
const show = el => el.classList.remove('hidden');
const hide = el => el.classList.add('hidden');
const isDark = () => document.documentElement.classList.contains('dark');

function showSection(name) {
    [emptyState, skeletonWrapper, errorState, resultsContainer].forEach(hide);
    if (name === 'empty')   show(emptyState);
    if (name === 'loading') show(skeletonWrapper);
    if (name === 'error')   show(errorState);
    if (name === 'results') show(resultsContainer);
}

function setLoading(on) {
    state.isLoading    = on;
    btnSearch.disabled = on;
    btnIcon.classList.toggle('hidden', on);
    btnSpinner.classList.toggle('hidden', !on);
}

// ─── UTILS ───────────────────────────────────────
function escapeHtml(s) {
    const d = document.createElement('div');
    d.appendChild(document.createTextNode(s ?? ''));
    return d.innerHTML;
}

function highlight(text, query) {
    if (!query || !text) return escapeHtml(text);
    const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escapeHtml(text).replace(
        new RegExp(`(${safe})`, 'gi'),
        '<mark class="search-mark">$1</mark>'
    );
}

function getInitials(name) {
    if (!name) return '?';
    return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

const PALETTES = [
    ['#4f46e5','#06b6d4'], ['#7c3aed','#db2777'],
    ['#059669','#0ea5e9'], ['#d97706','#ef4444'],
    ['#2563eb','#7c3aed'],
];
function avatarGradient(name) {
    const [a, b] = PALETTES[(name || '').charCodeAt(0) % PALETTES.length];
    return `linear-gradient(135deg,${a} 0%,${b} 100%)`;
}

function formatDate(str) {
    if (!str) return null;
    try {
        const d = new Date(str);
        return isNaN(d) ? str : d.toLocaleDateString('id-ID', {
            day:'numeric', month:'long', year:'numeric'
        });
    } catch { return str; }
}

const isExpired = s => s ? new Date(s) < new Date() : false;

// ─── RENDER ROW ──────────────────────────────────
const STATUS_COLOR = {
    'aktif':'badge-green','active':'badge-green','valid':'badge-green',
    'expired':'badge-amber','kadaluarsa':'badge-amber','tidak aktif':'badge-amber',
    'revoked':'badge-purple','dicabut':'badge-purple',
};
const STATUS_ICON = { 'badge-green':'✓ ','badge-amber':'⏱ ','badge-purple':'✕ ','badge-blue':'' };

function renderRow(item, index, query) {
    const name   = item.nama              || '-';
    const regNo  = item.no_registrasi     || '-';
    const scheme = item.skema_sertifikasi || item.skema || '-';
    const lsp    = item.nama_lsp || item.lsp || 'LSP Digital Indonesia';
    const status = item.status            || 'Aktif';
    const color  = STATUS_COLOR[(status).toLowerCase().trim()] || 'badge-blue';

    const rowHoverOn  = isDark() ? 'rgba(26,86,219,0.06)' : 'rgba(99,102,241,0.04)';

    return `
    <tr class="row-animate border-b border-slate-100 dark:border-white/[0.04] last:border-0 transition-colors duration-150"
        style="animation-delay:${index * 0.04}s"
        onmouseenter="this.style.background='${rowHoverOn}'"
        onmouseleave="this.style.background=''">

        <td class="px-5 py-4">
            <div class="flex items-center gap-3 cursor-pointer group"
                 onclick="openDetail(${item.id})"
                 title="Lihat detail ${escapeHtml(name)}">
                <div class="w-9 h-9 rounded-xl flex items-center justify-center font-bold
                            text-[0.75rem] text-white flex-shrink-0 transition-all duration-200"
                     style="background:${avatarGradient(name)}"
                     onmouseenter="this.style.boxShadow='0 0 0 3px rgba(99,102,241,0.3)'"
                     onmouseleave="this.style.boxShadow=''">
                    ${getInitials(name)}
                </div>
                <span class="font-semibold text-slate-800 dark:text-slate-100 text-[0.875rem] leading-tight
                             transition-colors duration-150
                             group-hover:text-indigo-600 dark:group-hover:text-blue-400
                             group-hover:underline underline-offset-2">
                    ${highlight(name, query)}
                </span>
            </div>
        </td>

        <td class="px-5 py-4">
            <span class="font-mono text-[0.78rem] text-cyan-700 dark:text-cyan-300 px-2 py-1 rounded-md"
                  style="background:rgba(6,182,212,0.08); border:1px solid rgba(6,182,212,0.2)">
                ${escapeHtml(regNo)}
            </span>
        </td>

        <td class="px-5 py-4 hidden sm:table-cell">
            <span class="badge badge-blue inline-flex items-center text-[0.72rem] font-semibold
                         px-2.5 py-1 rounded-md" title="${escapeHtml(scheme)}">
                ${escapeHtml(scheme.length > 35 ? scheme.slice(0, 33) + '…' : scheme)}
            </span>
        </td>

        <td class="px-5 py-4 hidden md:table-cell text-slate-500 dark:text-slate-400 text-[0.82rem]">
            ${escapeHtml(lsp)}
        </td>

        <td class="px-5 py-4">
            <span class="badge ${color} inline-flex items-center text-[0.72rem] font-semibold px-2.5 py-1 rounded-md">
                ${STATUS_ICON[color]}${escapeHtml(status)}
            </span>
        </td>
    </tr>`;
}

// ─── PAGINATION ──────────────────────────────────
function pageBtn(label, page, active = false, disabled = false) {
    const base  = 'flex items-center justify-center w-9 h-9 rounded-lg text-[0.85rem] border transition-all duration-150';
    const dark  = isDark();

    const cls = active   ? `${base} text-white font-semibold`
              : disabled ? `${base} text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-40`
                         : `${base} text-slate-500 dark:text-slate-400 cursor-pointer
                            hover:text-indigo-600 dark:hover:text-blue-300`;

    const style = active
        ? 'background:linear-gradient(135deg,#4f46e5,#3b82f6); border-color:#4f46e5; box-shadow:0 0 15px rgba(79,70,229,0.35);'
        : dark
            ? 'background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.09);'
            : 'background:rgba(255,255,255,0.8); border-color:rgba(99,102,241,0.2); box-shadow:0 1px 3px rgba(0,0,0,0.05);';

    const hoverOn  = dark ? "this.style.background='rgba(26,86,219,0.15)';this.style.borderColor='rgba(96,165,250,0.4)'"
                          : "this.style.background='rgba(99,102,241,0.08)';this.style.borderColor='rgba(99,102,241,0.4)'";
    const hoverOff = dark ? "this.style.background='rgba(255,255,255,0.04)';this.style.borderColor='rgba(255,255,255,0.09)'"
                          : "this.style.background='rgba(255,255,255,0.8)';this.style.borderColor='rgba(99,102,241,0.2)'";

    const hover = (!active && !disabled)
        ? `onmouseenter="${hoverOn}" onmouseleave="${hoverOff}"` : '';

    return `<button class="${cls}" style="${style}" ${disabled ? 'disabled' : `onclick="goPage(${page})"`} ${hover}>${label}</button>`;
}

function renderPagination(total, lastPage, page, from, to) {
    if (lastPage <= 1) { hide(paginationWrapper); return; }

    const f = from ?? ((page - 1) * state.pageSize + 1);
    const t = to   ?? Math.min(page * state.pageSize, total);
    paginationInfo.textContent =
        `Menampilkan ${f.toLocaleString('id-ID')}–${t.toLocaleString('id-ID')} dari ${total.toLocaleString('id-ID')} data`;

    let html = pageBtn('&#8249;', page - 1, false, page === 1);
    const rs = Math.max(1, page - 2), re = Math.min(lastPage, page + 2);

    if (rs > 1) {
        html += pageBtn('1', 1);
        if (rs > 2) html += `<span class="text-slate-400 dark:text-slate-600 px-1 self-center">…</span>`;
    }
    for (let i = rs; i <= re; i++) html += pageBtn(i, i, i === page);
    if (re < lastPage) {
        if (re < lastPage - 1) html += `<span class="text-slate-400 dark:text-slate-600 px-1 self-center">…</span>`;
        html += pageBtn(lastPage.toLocaleString('id-ID'), lastPage);
    }
    html += pageBtn('&#8250;', page + 1, false, page === lastPage);

    paginationControls.innerHTML = html;
    paginationWrapper.classList.remove('hidden');
    paginationWrapper.style.display = 'flex';
}

// ─── FETCH ───────────────────────────────────────
async function fetchData(query, page) {
    const params = new URLSearchParams({
        search: query, dir: 'desc', column: 'id',
        length: state.pageSize, draw: 13, page,
    });
    const res = await fetch(`${API_BASE}?${params}`, {
        method: 'GET', headers: { 'Accept': 'application/json' }, mode: 'same-origin',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
}

// ─── SEARCH ──────────────────────────────────────
async function doSearch(page = 1, overrideQuery = null) {
    const query = overrideQuery !== null ? overrideQuery : searchInput.value.trim();

    if (overrideQuery === null && !query) {
        searchInput.focus();
        searchInput.classList.add('shake');
        setTimeout(() => searchInput.classList.remove('shake'), 400);
        return;
    }

    state.currentQuery = query;
    state.currentPage  = page;
    showSection('loading');
    setLoading(true);

    if (window.innerWidth < 768) {
        document.getElementById('results-section')
            .scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    try {
        const data  = await fetchData(query, page);
        let rows = [], meta = null;

        if (Array.isArray(data)) {
            rows = data; state.totalRecords = data.length; state.lastPage = 1;
        } else if (data?.data && Array.isArray(data.data)) {
            rows = data.data; meta = data.meta ?? null;
            state.totalRecords = meta ? parseInt(meta.total, 10)     : rows.length;
            state.lastPage     = meta ? parseInt(meta.last_page, 10) : 1;
            state.metaFrom     = meta?.from ?? null;
            state.metaTo       = meta?.to   ?? null;
        } else {
            rows = []; state.totalRecords = 0; state.lastPage = 1;
        }

        showSection('results');

        if (rows.length === 0) {
            resultsTbody.innerHTML = '';
            show(noResults);
            hide(paginationWrapper);
            resultsCount.textContent = '0';
            resultsQuery.textContent = query ? `untuk "${query}"` : '';
        } else {
            hide(noResults);
            resultsCount.textContent = state.totalRecords.toLocaleString('id-ID');
            resultsQuery.textContent = query ? `untuk "${query}"` : 'data terbaru';
            resultsTbody.innerHTML   = rows.map((item, i) => renderRow(item, i, query)).join('');
            renderPagination(state.totalRecords, state.lastPage, page, state.metaFrom, state.metaTo);
        }

    } catch (err) {
        console.error(err);
        showSection('error');
        errorMessage.textContent = `Tidak dapat menghubungi server LSP Digital. (${err.message})`;
    } finally {
        setLoading(false);
    }
}

async function goPage(page) {
    await doSearch(page, state.currentQuery);
    document.getElementById('results-section')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── MODAL ───────────────────────────────────────
const modalOverlay = document.getElementById('modal-overlay');
const detailModal  = document.getElementById('detail-modal');

const openModal = () => {
    modalOverlay.classList.add('open');
    detailModal.classList.add('open');
    document.body.style.overflow = 'hidden';
};
const closeModal = () => {
    modalOverlay.classList.remove('open');
    detailModal.classList.remove('open');
    setTimeout(() => { document.body.style.overflow = ''; }, 300);
};

function handleOverlayClick(e) {
    if (e.target === modalOverlay) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─── DRAWER LOADING ──────────────────────────────
const renderDrawerLoading = () => {
    drawerBody.innerHTML = `
        <div class="flex flex-col items-center justify-center gap-4 py-20 flex-1 text-center">
            <div class="drawer-spinner mx-auto"></div>
            <div class="text-slate-500 dark:text-slate-400 text-[0.85rem]">Mengambil detail sertifikat...</div>
        </div>`;
};

const renderDrawerError = msg => {
    drawerBody.innerHTML = `
        <div class="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <span class="text-5xl">⚠️</span>
            <h3 class="font-bold text-red-500 dark:text-red-400">Gagal Memuat</h3>
            <p class="text-slate-500 dark:text-slate-400 text-[0.83rem]">${escapeHtml(msg)}</p>
        </div>`;
};

// ─── DRAWER FIELD ────────────────────────────────
function drawerField(label, value, full = false) {
    const col = full ? 'col-span-2' : '';
    const val = value
        ? `<div class="text-[0.85rem] font-medium text-slate-800 dark:text-slate-100 leading-snug">${escapeHtml(value)}</div>`
        : `<div class="text-[0.8rem] italic text-slate-400 dark:text-slate-600">Tidak tersedia</div>`;
    return `
    <div class="rounded-xl p-3.5 transition-colors duration-200 ${col}
                bg-slate-50 dark:bg-white/[0.03]
                border border-slate-100 dark:border-white/[0.07]">
        <div class="text-[0.68rem] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.07em] mb-1.5">
            ${label}
        </div>${val}
    </div>`;
}

// ─── DRAWER DETAIL ───────────────────────────────
function renderDrawerDetail(d) {
    const dark  = isDark();
    const name  = d.nama              || '-';
    const regNo = d.no_registrasi     || '-';
    const certNo= d.no_sertifikat     || '-';
    const scheme= d.skema_sertifikasi || '-';
    const expire= d.tgl_expire        || null;
    const expired = isExpired(expire);

    const statusLabel = expired ? 'Kadaluarsa' : (d.status || 'Aktif');
    const badgeClass  = expired ? 'badge-amber'
        : { 'aktif':'badge-green','active':'badge-green','valid':'badge-green',
            'revoked':'badge-purple','dicabut':'badge-purple' }[(d.status||'').toLowerCase()] || 'badge-green';
    const statusIcon  = expired ? '⏱ ' : '✓ ';
    const expColor    = expired ? '#f59e0b' : '#10b981';
    const dividerClr  = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
    const profileBg   = dark ? 'rgba(26,86,219,0.08)' : 'rgba(99,102,241,0.06)';

    drawerBody.innerHTML = `
        <!-- Profile card -->
        <div class="flex items-center gap-4 p-5 rounded-2xl"
             style="background:${profileBg}; border:1px solid rgba(99,102,241,0.18)">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold
                        text-xl text-white flex-shrink-0"
                 style="background:${avatarGradient(name)}; box-shadow:0 4px 15px rgba(0,0,0,0.2)">
                ${getInitials(name)}
            </div>
            <div class="flex-1 min-w-0">
                <div class="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight mb-1.5 truncate">
                    ${escapeHtml(name)}
                </div>
                <span class="font-mono text-[0.78rem] text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded-md"
                      style="background:rgba(6,182,212,0.08); border:1px solid rgba(6,182,212,0.2)">
                    ${escapeHtml(regNo)}
                </span>
            </div>
        </div>

        <!-- Status row -->
        <div class="flex items-center gap-3 flex-wrap">
            <span class="badge ${badgeClass} inline-flex items-center text-[0.72rem] font-semibold px-2.5 py-1 rounded-md">
                ${statusIcon}${escapeHtml(statusLabel)}
            </span>
            ${expire ? `
            <div class="flex items-center gap-1.5 text-[0.8rem] text-slate-500 dark:text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Berlaku s.d. <strong style="color:${expColor}">${formatDate(expire)}</strong>
            </div>` : ''}
        </div>

        <!-- Certificate card -->
        <div class="p-5 rounded-2xl"
             style="background:linear-gradient(135deg,rgba(99,102,241,0.07) 0%,rgba(6,182,212,0.05) 100%);
                    border:1px solid rgba(99,102,241,0.18)">
            <div class="text-[0.7rem] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.08em] mb-1.5">
                No. Sertifikat
            </div>
            <div class="font-mono text-[0.95rem] font-semibold text-slate-800 dark:text-slate-100 mb-4 break-all">
                ${escapeHtml(certNo)}
            </div>
            <div class="text-[0.7rem] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.08em] mb-1.5">
                Skema Sertifikasi
            </div>
            <div class="badge badge-blue inline-flex items-center text-[0.82rem] font-semibold px-3 py-1.5 rounded-lg">
                🏅 ${escapeHtml(scheme)}
            </div>
        </div>

        <!-- Assessment info -->
        <div>
            <div class="text-[0.7rem] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.1em]
                        flex items-center gap-2 mb-3">
                Informasi Asesmen
                <span class="flex-1 h-px" style="background:${dividerClr}"></span>
            </div>
            <div class="grid grid-cols-2 gap-2.5">
                ${drawerField('Tanggal Asesmen',             formatDate(d.jadwal_asesmen))}
                ${drawerField('Asesor Kompetensi',           d.asesor_kompetensi)}
                ${drawerField('Tempat Uji Kompetensi (TUK)', d.tempat_uji_kompetensi, true)}
                ${drawerField('No. Blanko',                  d.no_blanko)}
            </div>
        </div>

        <!-- Location -->
        <div>
            <div class="text-[0.7rem] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.1em]
                        flex items-center gap-2 mb-3">
                Lokasi
                <span class="flex-1 h-px" style="background:${dividerClr}"></span>
            </div>
            <div class="grid grid-cols-2 gap-2.5">
                ${drawerField('Provinsi',       d.provinsi)}
                ${drawerField('Kabupaten/Kota', d.kabupaten)}
            </div>
        </div>`;
}

// ─── OPEN DETAIL ─────────────────────────────────
async function openDetail(id) {
    if (!id) return;
    openModal();
    renderDrawerLoading();
    try {
        const res = await fetch(`/api/sertifikat/${id}`, {
            method: 'GET', headers: { 'Accept': 'application/json' }, mode: 'same-origin',
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        renderDrawerDetail(await res.json());
    } catch (err) {
        renderDrawerError(`Tidak dapat memuat detail. (${err.message})`);
    }
}

// ─── EVENT LISTENERS ─────────────────────────────
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

window.addEventListener('DOMContentLoaded', () => doSearch(1, ''));
