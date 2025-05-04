<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\ColumnDefinition;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vacant_position_skills', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('vacant_position_id')->unsigned();
            $table->bigInteger('skill_id')->unsigned();
            $table->foreign('vacant_position_id')->references('id')->on('vacant_pisitions')->onDelete('cascade');
            $table->foreign('skill_id')->references('id')->on('skills')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacant_pisition_skills');
    }
};
