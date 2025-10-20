<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Card;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CardController extends Controller
{
    public function reorderCards(Request $request, Board $board)
    {
        $validated = $request->validate([
            'card_id' => 'required|integer|exists:cards,id',
            'container_id' => 'required|integer|exists:containers,id',
            'position' => 'required|integer|min:0',
        ]);

        DB::transaction(function () use ($validated) {
            $card = Card::findOrFail($validated['card_id']);

            // Update card container and position
            $card->update([
                'container_id' => $validated['container_id'],
                'position' => $validated['position'],
            ]);

            // Reorder other cards in the target container
            Card::where('container_id', $validated['container_id'])
                ->where('id', '!=', $card->id)
                ->where('position', '>=', $validated['position'])
                ->increment('position');
        });

        return back();
    }
}
