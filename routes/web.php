<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BnspProxyController;

// Halaman utama
Route::get('/', function () {
    return view('pages.app.index');
});

// Proxy API list (search + pagination)
Route::get('/api/sertifikat', [BnspProxyController::class, 'index']);

// Proxy API detail satu pemegang sertifikat
Route::get('/api/sertifikat/{id}', [BnspProxyController::class, 'show'])->where('id', '[0-9]+');
