<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Card;
use App\Models\Container;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Board::factory(5)->create()->each(function ($board) {
            Container::factory(3)->create([
                'board_id' => $board->id,
            ])->each(function ($container) {
                Card::factory(random_int(5, 10))->create([
                    'container_id' => $container->id,
                ]);
            });
        });

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
