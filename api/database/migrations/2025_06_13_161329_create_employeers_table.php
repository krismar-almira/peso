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
        Schema::create('employeers', function (Blueprint $table) {
            $table->id();
            $table->string('establishment', 100)->nullable();
            $table->string('business_address', 100)->nullable();
            $table->string('industry_classification', 100)->nullable();
            $table->string('business_type', 100)->nullable();
            $table->string('contact_person', 100)->nullable();
            $table->string('designation', 100)->nullable();
            $table->string('contact_number')->nullable();
            $table->string('email_address', 100)->nullable();
            $table->json('vacant_positions')->nullable();
            $table->boolean('confirmed')->nullable()->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employeers');
    }
};
