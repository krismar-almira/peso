<?php

namespace Database\Seeders;

use App\Models\TypeOfUser;
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
        TypeOfUser::insert([
            [
                'name'=>'admin'
            ] ,
            [
                'name'=>'Company User'
            ]
        ]);
        User::create([
            'first_name'=>'admin',
            'middle_name'=>'admin',
            'last_name'=>'admin',
            'email' => 'admin@admin.com',
            'password'=>bcrypt('admin')
        ]);
        
    }
}
