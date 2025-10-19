<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContainerController extends Controller
{
    public function reorder(Request $request, Board $board)
    {
        $validated = $request->validate([
            'containers' => 'required|array',
            'containers.*.id' => 'integer|exists:containers,id',
            'containers.*.position' => 'integer',
        ]);

        DB::transaction(function () use ($validated, $board) {
            foreach ($validated['containers'] as $containerData) {
                $container = $board->containers()->where('id', $containerData['id'])->first();
                if ($container) {
                    $container->position = $containerData['position'];
                    $container->save();
                }
            }
        });
    }
}
