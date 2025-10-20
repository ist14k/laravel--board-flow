<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\ContainerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/boards', [BoardController::class, 'index'])->name('boards.index');
Route::get('/boards/{board}', [BoardController::class, 'show'])->name('boards.show');
Route::post('/boards/{board}/containers/reorder', [ContainerController::class, 'reorder'])->name('containers.reorder');
Route::post('/boards/{board}/cards/reorder', [CardController::class, 'reorderCards'])->name('cards.reorder');
