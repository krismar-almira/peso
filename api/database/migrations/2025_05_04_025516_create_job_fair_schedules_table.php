<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_fair_schedules', function (Blueprint $table) {
            $table->id();
            $table->string('theme', 2000)->nullable();
            $table->string('imagelocation', 2000)->nullable();
            $table->string('venue', 2000)->nullable();
            $table->date('event_date')->nullable();
            $table->date('end_event_date')->nullable();
            $table->string('random', 24)->unique(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_fair_schedules');
    }
};
