<x-layouts.app>

    {{-- ── Ambient Background (changes per theme) ── --}}
    <div class="fixed inset-0 z-0 bg-ambient pointer-events-none"></div>
    <div class="fixed inset-0 z-0 bg-grid pointer-events-none"></div>

    {{-- Floating orbs — subtle in light, vivid in dark --}}
    <div class="orb w-[500px] h-[500px] top-[-100px] left-[-100px] opacity-[0.05] dark:opacity-[0.08]"
         style="background:rgba(79,70,229,0.7); animation-delay:0s"></div>
    <div class="orb w-[400px] h-[400px] bottom-[-50px] right-[-80px] opacity-[0.04] dark:opacity-[0.06]"
         style="background:rgba(6,182,212,0.7); animation-delay:3s"></div>
    <div class="orb w-[300px] h-[300px] top-[40%] left-[60%] opacity-[0.03] dark:opacity-[0.05]"
         style="background:rgba(245,158,11,0.7); animation-delay:5s"></div>

    <div class="relative z-10 min-h-screen flex flex-col">

        {{-- ════════════ NAVBAR ════════════ --}}
        <nav class="sticky top-0 z-50 flex items-center justify-between px-6 h-[68px]
                    bg-white/80 dark:bg-[#0b0f1a]/85
                    backdrop-blur-2xl
                    border-b border-slate-200/80 dark:border-white/[0.07]
                    shadow-[0_1px_12px_rgba(99,102,241,0.07)] dark:shadow-none
                    transition-colors duration-300">

            <a href="/" class="flex items-center gap-3 no-underline">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center
                            font-extrabold text-white text-base flex-shrink-0 shadow-glow-blue"
                     style="background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #06b6d4 100%)">
                    B
                </div>
                <div class="leading-tight">
                    <div class="font-bold text-[1.05rem] text-slate-900 dark:text-slate-100 tracking-tight">
                        BNSP Checker
                    </div>
                    <div class="text-[0.65rem] font-medium text-slate-500 dark:text-slate-500 uppercase tracking-widest">
                        Verifikasi Sertifikat Digital
                    </div>
                </div>
            </a>

            <div class="flex items-center gap-3">
                {{-- API Live badge --}}
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.72rem] font-semibold tracking-wide
                            text-emerald-700 dark:text-emerald-400
                            bg-emerald-100 dark:bg-emerald-400/10
                            border border-emerald-300 dark:border-emerald-400/30">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 pulse-dot inline-block"></span>
                    API Live
                </div>

                {{-- Theme Toggle --}}
                <button id="theme-toggle-btn" onclick="toggleTheme()" class="theme-toggle" title="Ganti Mode Tampilan">
                    <span class="icon-wrap">
                        {{-- Sun icon: visible in dark mode (click to go light) --}}
                        <svg id="icon-sun" class="w-[18px] h-[18px] hidden dark:block text-amber-400"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                             stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="5"/>
                            <line x1="12" y1="1" x2="12" y2="3"/>
                            <line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/>
                            <line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                        {{-- Moon icon: visible in light mode (click to go dark) --}}
                        <svg id="icon-moon" class="w-[18px] h-[18px] block dark:hidden text-indigo-600"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                             stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                        </svg>
                    </span>
                </button>
            </div>
        </nav>

        {{-- ════════════ HERO ════════════ --}}
        <section class="max-w-4xl mx-auto w-full px-6 pt-14 pb-4 text-center">

            <div class="anim-1 inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full
                        text-[0.75rem] font-semibold tracking-widest uppercase
                        text-indigo-700 dark:text-blue-400
                        bg-indigo-100 dark:bg-blue-600/10
                        border border-indigo-200 dark:border-blue-600/30">
                🛡️ LSP Digital Indonesia
            </div>

            <h1 class="anim-2 font-bold leading-[1.1] mb-5
                       text-[clamp(2.2rem,5vw,3.8rem)]
                       text-slate-900 dark:text-slate-100">
                Cek Sertifikat <span class="gradient-text">BNSP</span><br>Secara Online
            </h1>

            <p class="anim-3 text-slate-500 dark:text-slate-400 text-[1.05rem] leading-relaxed max-w-xl mx-auto mb-10">
                Verifikasi keaslian dan kevalidan sertifikat kompetensi BNSP yang diterbitkan oleh
                LSP Digital Indonesia secara real-time.
            </p>

            {{-- ── Search Card ── --}}
            <div class="anim-4 glass border border-slate-200/70 dark:border-white/[0.08] rounded-2xl p-8 max-w-2xl mx-auto mb-10
                        transition-[border-color,box-shadow] duration-300
                        hover:border-indigo-300/60 dark:hover:border-blue-600/25">

                <label class="block text-left text-[0.78rem] font-semibold
                              text-slate-500 dark:text-slate-500
                              uppercase tracking-[0.08em] mb-3" for="search-input">
                    🔍 Cari Pemegang Sertifikat
                </label>

                <div class="flex gap-3 items-stretch">
                    <div class="relative flex-1">
                        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
                             xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input type="text" id="search-input"
                               class="search-input w-full rounded-xl pl-11 pr-4 py-3.5 text-[0.95rem]
                                      text-slate-800 dark:text-slate-100
                                      bg-white dark:bg-white/[0.05]
                                      border border-slate-200 dark:border-white/10
                                      placeholder:text-slate-400 dark:placeholder:text-slate-600
                                      transition-colors duration-200"
                               placeholder="Masukkan nama pemegang sertifikat..."
                               autocomplete="off" spellcheck="false">
                    </div>

                    <button id="btn-search" onclick="doSearch()"
                            class="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[0.9rem]
                                   text-white border-0 cursor-pointer flex-shrink-0
                                   shadow-[0_4px_15px_rgba(79,70,229,0.4)]
                                   transition-all duration-200
                                   hover:-translate-y-px hover:shadow-[0_6px_25px_rgba(79,70,229,0.55)]
                                   active:translate-y-0
                                   disabled:opacity-60 disabled:cursor-not-allowed disabled:!transform-none"
                            style="background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)">
                        <svg id="btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                             stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        <div id="btn-spinner" class="btn-spinner hidden"></div>
                        Cari
                    </button>
                </div>

                <p class="mt-3 flex items-center gap-1.5 text-[0.78rem] text-slate-400 dark:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                    </svg>
                    Data diambil langsung dari API resmi LSP Digital Indonesia
                </p>
            </div>

            {{-- Stats chips --}}
            <div class="anim-5 flex flex-wrap gap-2.5 justify-center mb-10">
                @foreach([
                    ['🏛️', 'BNSP Resmi'],
                    ['⚡',  'Real-time API'],
                    ['🔒', 'Data Terverifikasi'],
                    ['🇮🇩', 'LSP Digital Indonesia'],
                ] as [$icon, $label])
                <div class="flex items-center gap-2 px-4 py-2 rounded-full text-[0.8rem]
                            text-slate-600 dark:text-slate-400
                            bg-white/70 dark:bg-white/[0.03]
                            border border-slate-200 dark:border-white/[0.07]
                            shadow-sm dark:shadow-none
                            transition-all duration-200
                            hover:bg-white dark:hover:bg-white/[0.07]
                            hover:border-indigo-200 dark:hover:border-white/[0.14]
                            hover:text-indigo-600 dark:hover:text-slate-200
                            hover:shadow-md dark:hover:shadow-none">
                    <span>{{ $icon }}</span> {{ $label }}
                </div>
                @endforeach
            </div>
        </section>

        {{-- ════════════ RESULTS ════════════ --}}
        <section id="results-section" class="max-w-6xl mx-auto w-full px-6 pb-16">

            {{-- Empty state --}}
            <div id="empty-state" class="text-center py-20">
                <span class="text-6xl block mb-5">🎓</span>
                <h3 class="font-bold text-xl text-slate-800 dark:text-slate-100 mb-2">Mulai Pencarian</h3>
                <p class="text-slate-500 dark:text-slate-400 text-[0.9rem] max-w-sm mx-auto">
                    Masukkan nama pemegang sertifikat di kolom pencarian untuk melihat data sertifikat BNSP.
                </p>
            </div>

            {{-- Skeleton --}}
            <div id="skeleton-wrapper" class="hidden">
                <div class="bg-white dark:bg-[#0d1526]/70
                            border border-slate-200 dark:border-white/[0.07]
                            rounded-2xl overflow-hidden backdrop-blur-sm
                            shadow-sm dark:shadow-none">
                    <div class="flex gap-6 px-5 py-4
                                bg-indigo-50 dark:bg-blue-600/[0.04]
                                border-b border-indigo-100 dark:border-blue-600/10">
                        @foreach([18, 30, 24, 40, 18] as $w)
                        <div class="shimmer-skeleton h-3" style="width:{{ $w }}%"></div>
                        @endforeach
                    </div>
                    @for ($i = 0; $i < 6; $i++)
                    <div class="flex items-center gap-4 px-5 py-4 border-b border-slate-100 dark:border-white/[0.04] last:border-0">
                        <div class="shimmer-skeleton w-9 h-9 rounded-xl flex-shrink-0"></div>
                        <div class="flex-1 flex flex-col gap-2">
                            <div class="shimmer-skeleton h-3" style="width:{{ rand(35,65) }}%"></div>
                            <div class="shimmer-skeleton h-2.5" style="width:{{ rand(25,45) }}%"></div>
                        </div>
                        <div class="shimmer-skeleton h-6 w-20 hidden sm:block"></div>
                        <div class="shimmer-skeleton h-6 w-28 hidden md:block"></div>
                        <div class="shimmer-skeleton h-6 w-16"></div>
                    </div>
                    @endfor
                </div>
            </div>

            {{-- Error state --}}
            <div id="error-state" class="hidden text-center py-14 px-6">
                <span class="text-5xl block mb-4">⚠️</span>
                <h3 class="font-bold text-lg text-red-500 dark:text-red-400 mb-2">Gagal Mengambil Data</h3>
                <p id="error-message" class="text-slate-500 dark:text-slate-500 text-[0.85rem]">
                    Terjadi kesalahan saat menghubungi server. Silakan coba lagi.
                </p>
            </div>

            {{-- Results container --}}
            <div id="results-container" class="hidden">

                <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <div class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 text-[1rem]">
                        Hasil Pencarian
                        <span id="results-count"
                              class="px-2.5 py-0.5 rounded-full text-[0.75rem] font-bold text-white"
                              style="background: linear-gradient(135deg, #4f46e5, #06b6d4)">0</span>
                    </div>
                    <div id="results-query" class="text-[0.82rem] text-slate-500 dark:text-slate-400 italic"></div>
                </div>

                <div class="bg-white dark:bg-[#0d1526]/70
                            border border-slate-200 dark:border-white/[0.07]
                            rounded-2xl overflow-hidden backdrop-blur-sm
                            shadow-[0_4px_24px_rgba(99,102,241,0.07)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                    <div class="overflow-x-auto">
                        <table class="w-full text-[0.875rem] border-collapse">
                            <thead class="bg-indigo-50/60 dark:bg-transparent"
                                   style="border-bottom: 1px solid rgba(99,102,241,0.15)">
                                <tr>
                                    @foreach(['Pemegang Sertifikat', 'No. Registrasi', 'Skema Kompetensi', 'LSP', 'Status'] as $th)
                                    <th class="px-5 py-4 text-left text-[0.72rem] font-bold
                                               text-slate-500 dark:text-slate-500
                                               uppercase tracking-[0.08em] whitespace-nowrap">
                                        {{ $th }}
                                    </th>
                                    @endforeach
                                </tr>
                            </thead>
                            <tbody id="results-tbody"></tbody>
                        </table>
                    </div>

                    <div id="no-results" class="hidden text-center py-14 px-6">
                        <span class="text-4xl block mb-4">🔍</span>
                        <h3 class="font-bold text-slate-800 dark:text-slate-100 mb-2">Tidak Ditemukan</h3>
                        <p class="text-slate-500 dark:text-slate-400 text-[0.875rem]">
                            Tidak ada pemegang sertifikat dengan nama tersebut.
                        </p>
                    </div>
                </div>

                <div id="pagination-wrapper" class="hidden flex-wrap items-center justify-between mt-5 gap-4">
                    <div id="pagination-info" class="text-[0.8rem] text-slate-500 dark:text-slate-500"></div>
                    <div id="pagination-controls" class="flex gap-1.5 items-center flex-wrap"></div>
                </div>
            </div>
        </section>

        {{-- ════════════ FOOTER ════════════ --}}
        <footer class="mt-auto px-6 py-5 flex items-center justify-between flex-wrap gap-3
                       border-t border-slate-200 dark:border-white/[0.07]
                       bg-white/50 dark:bg-transparent
                       transition-colors duration-300">
            <div class="text-[0.78rem] text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
                🛡️ Data bersumber dari API resmi
                <a href="https://lspdigital.id" target="_blank" rel="noopener noreferrer"
                   class="text-indigo-600 dark:text-blue-400 font-medium hover:text-indigo-500 dark:hover:text-cyan-400 transition-colors no-underline">
                    LSP Digital Indonesia
                </a>
            </div>
            <div class="text-[0.78rem] text-slate-500 dark:text-slate-500">
                BNSP Certificate Checker &copy; {{ date('Y') }}
            </div>
        </footer>
    </div>

    {{-- ════════════ DETAIL MODAL ════════════ --}}
    <div id="modal-overlay"
         class="modal-overlay fixed inset-0 z-[9998] flex items-center justify-center p-4"
         onclick="handleOverlayClick(event)">

        <div id="detail-modal"
             class="modal-panel relative w-full max-w-[560px] max-h-[90vh] flex flex-col
                    overflow-hidden gradient-top-bar
                    bg-white dark:bg-[#0b1120]
                    border border-slate-200/80 dark:border-white/[0.09]"
             style="border-radius:20px;
                    box-shadow: 0 20px 60px rgba(99,102,241,0.12), 0 0 0 1px rgba(99,102,241,0.08);"
             role="dialog" aria-modal="true" aria-label="Detail Sertifikat">

            {{-- Modal Header --}}
            <div class="flex items-center justify-between px-6 py-4 flex-shrink-0
                        border-b border-slate-100 dark:border-white/[0.07]">
                <div class="font-bold text-[0.95rem] text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    🎓 Detail Sertifikat
                </div>
                <button onclick="closeModal()" title="Tutup"
                        class="w-8 h-8 rounded-lg cursor-pointer flex items-center justify-center text-[1.1rem] leading-none
                               text-slate-400 dark:text-slate-500
                               bg-slate-50 dark:bg-white/[0.05]
                               border border-slate-200 dark:border-white/10
                               hover:text-red-500 dark:hover:text-red-400
                               hover:bg-red-50 dark:hover:bg-red-500/10
                               hover:border-red-200 dark:hover:border-red-500/30
                               transition-all duration-200">
                    ✕
                </button>
            </div>

            {{-- Modal Body --}}
            <div id="drawer-body" class="flex-1 overflow-y-auto p-6 flex flex-col gap-5"
                 style="scrollbar-width:thin; scrollbar-color:rgba(99,102,241,0.2) transparent">
            </div>
        </div>
    </div>

    {{-- ════════════ JAVASCRIPT ════════════ --}}
    @push('scripts')
    <script src="{{ asset('js/bnsp-checker.js') }}"></script>
    @endpush

</x-layouts.app>