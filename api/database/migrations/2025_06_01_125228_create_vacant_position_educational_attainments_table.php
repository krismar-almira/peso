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
        Schema::create('vacant_position_educational_attainments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('vacant_position_id')->unsigned();
            $table->bigInteger('educational_attainment_id')->unsigned();
            $table->timestamps();
            $table->foreign('vacant_position_id','vp_ea_vp_id_fk')->references('id')->on('vacant_positions')->onDelete('cascade');
            $table->foreign('educational_attainment_id','vp_ea_ea_id_fk')->references('id')->on('educational_attainments')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacant_position_educational_attainments');
    }
};
