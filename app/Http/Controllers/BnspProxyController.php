<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BnspProxyController extends Controller
{
    /**
     * Proxy list pemegang sertifikat (dengan search & pagination).
     * GET /api/sertifikat
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'page'   => ['nullable', 'integer', 'min:1'],
            'length' => ['nullable', 'integer', 'min:1', 'max:100'],
            'dir'    => ['nullable', 'in:asc,desc'],
            'column' => ['nullable', 'string', 'max:50'],
            'draw'   => ['nullable', 'integer'],
        ],);

        $response = Http::timeout(15)
            ->acceptJson()
            ->get('https://lspdigital.id/api/v1/public-pemegang-sertifikat', [
                'search' => $validated['search'] ?? null,
                'dir'    => $validated['dir']    ?? 'desc',
                'column' => $validated['column'] ?? 'id',
                'length' => $validated['length'] ?? 10,
                'draw'   => $validated['draw']   ?? 13,
                'page'   => $validated['page']   ?? 1,
            ]);

        if ($response->failed()) {
            return response()->json([
                'message' => 'Gagal menghubungi server LSP Digital.',
                'status'  => $response->status(),
            ], $response->status());
        }

        return response()->json($response->json());
    }

    /**
     * Proxy detail satu pemegang sertifikat berdasarkan ID.
     * GET /api/sertifikat/{id}
     */
    public function show(int $id)
    {
        if ($id <= 0) {
            return response()->json(['message' => 'ID tidak valid.'], 422);
        }

        $response = Http::timeout(15)
            ->acceptJson()
            ->get("https://lspdigital.id/api/v1/public-pemegang-sertifikat/{$id}");

        if ($response->failed()) {
            return response()->json([
                'message' => 'Data tidak ditemukan atau server tidak dapat dijangkau.',
                'status'  => $response->status(),
            ], $response->status());
        }

        return response()->json($response->json());
    }
}
