<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  Route::get('/', function () {
    return Inertia::render('home/Home');
  })->name('home-page');
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  Route::resources([
    'tree/currency' => \App\Http\Controllers\Tree\CurrencyController::class,
    'tree/meal' => \App\Http\Controllers\Tree\MealController::class,
    'tree/ledger' => \App\Http\Controllers\Tree\LedgerController::class,
  ]);
});

require __DIR__ . '/auth.php';
