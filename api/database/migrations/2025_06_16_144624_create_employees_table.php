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
        
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('job_fair_schedule_id')->unsigned();
            $table->string('full_name', 150)->nullable();
            $table->string('sex', 150)->nullable();
            $table->date('birth_day')->nullable();
            $table->string('marital_status', 150)->nullable();
            $table->string('disability', 150)->nullable();
            $table->string('mobile_number', 150)->nullable();
            $table->string('email', 150)->nullable();
            $table->string('present_address', 150)->nullable();
            $table->string('permanent_address', 150)->nullable();
            $table->string('employment_status', 150)->nullable();
            $table->string('willing_to_work', 150)->nullable();
            $table->string('education', 150)->nullable();
            $table->string('school_graduated', 150)->nullable();
            $table->string('year_graduated', 150)->nullable();
            $table->json('work_experience')->nullable();
            $table->string('core_skills', 150)->nullable();
            $table->string('preferred_occupation', 150)->nullable();
            $table->string('preferred_work_location', 150)->nullable();
            $table->boolean('willing_to_work_abroad')->nullable();
            $table->string('government_id', 150)->nullable();
            $table->json('language_spoken')->nullable();
            $table->boolean('internet_access')->nullable();
            $table->timestamps();

            $table->foreign('job_fair_schedule_id')->references('id')->on('job_fair_schedules')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
