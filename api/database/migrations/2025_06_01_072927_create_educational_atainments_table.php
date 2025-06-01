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
        Schema::create('educational_atainments', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->bigInteger('education_level_id')->unsigned();
            $table->timestamps();
            $table->foreign('education_level_id')->references('id')->on('education_levels')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educational_atainments');
    }
};
