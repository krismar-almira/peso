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
        Schema::create('applicants', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 100)->nullable();
            $table->string('middle_name', 100)->nullable();
            $table->string('surname', 100)->nullable();
            $table->string('suffix', 20)->nullable();
            $table->string('sex', 100)->nullable();
            $table->date('birthday')->nullable();
            $table->string('civil_status', 100)->nullable();
            $table->string('pa_house_no', 100)->nullable();
            $table->string('pa_brgy', 100)->nullable();
            $table->string('pa_municipal', 100)->nullable();
            $table->string('pa_province', 100)->nullable();
            $table->string('tin', 100)->nullable();
            $table->json('disability')->nullable();
            $table->string('contact_no', 100)->nullable();
            $table->string('height', 100)->nullable();
            $table->string('email', 100)->nullable();
            $table->boolean('employed')->default(false);
            $table->string('employement_type', 200)->nullable();
            // $table->string('self_employed_type', 100)->nullable();
            // $table->boolean('unemployed')->default(false);
            // $table->integer('looking_for_work')->nullable();
            // $table->integer('unemployed_type')->nullable();
            // $table->boolean('ofw')->default(false);
            // $table->string('ofw_country', 100)->nullable();
            // $table->boolean('former_ofw')->default(false);
            // $table->string('former_ofw_last_country', 100)->nullable();
            // $table->integer('former_ofw_month_return')->nullable();
            $table->boolean('4ps_beneficiary')->default(false);
            $table->boolean('4ps_house_hold_id')->default(false);
            $table->boolean('pref_part_time')->default(false);
            $table->boolean('pref_full_time')->default(false);
            $table->json('pref_occupation')->nullable();
            $table->boolean('pref_work_local')->default(false);
            $table->json('pref_work_location')->nullable();
            $table->boolean('pref_work_overseas')->default(false);
            $table->json('pref_work_location_overseas')->nullable();
            $table->integer('expeced_salary_min')->nullable();
            $table->integer('expeced_salary_max')->nullable();
            $table->string('passport_no', 100)->nullable();
            $table->date('passport_expr')->nullable();
            $table->json('dialects')->nullable();
            $table->json('educational')->nullable();
            $table->json('training')->nullable();
            $table->json('eligibility')->nullable();
            $table->json('work_experience')->nullable();
            $table->json('skills')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicants');
    }
};
