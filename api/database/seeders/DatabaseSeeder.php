<?php

namespace Database\Seeders;

use App\Models\EducationalAtainment;
use App\Models\EducationLevel;
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
        EducationLevel::insert([
            [
                'id'=>1,
                'name'=>'Secondary'
            ],
            [
                'id'=>2,
                'name'=>'Vocational'
            ],
            [
                'id'=>3,
                'name'=>'Tertiary'
            ],
            [
                'id'=>4,
                'name'=>'Graduate Studies'
            ],
            [
                'id'=>5,
                'name'=>'Doctoral'
            ],
            [
                'id'=>6,
                'name'=>'Elementary'
            ]
        ]);
    }
}
