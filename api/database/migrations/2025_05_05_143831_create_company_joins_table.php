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
        Schema::dropIfExists('company_joins');

        Schema::create('company_joins', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('job_fair_schedule_id')->unsigned();
            $table->bigInteger('company_id')->unsigned();
            $table->bigInteger('approve')->default(false);
            $table->timestamps();
            $table->foreign('job_fair_schedule_id')->references('id')->on('job_fair_schedules')->onDelete('cascade');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_joins');
    }
};
