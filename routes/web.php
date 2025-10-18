<?php

use App\Http\Controllers\BoardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/boards', [BoardController::class, 'index'])->name('boards.index');
