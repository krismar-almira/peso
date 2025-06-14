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
        Schema::create('employeer_join_job_fair_schedules', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('job_fair_schedule_id')->nullable()->unsigned();
            $table->bigInteger('employeer_id')->nullable()->unsigned();
            $table->foreign('job_fair_schedule_id')->references('id')->on('job_fair_schedules')->onDelete('cascade');
            $table->foreign('employeer_id')->references('id')->on('employeers')->onDelete('cascade');

            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employeer_join_job_fair_schedules');
    }
};
