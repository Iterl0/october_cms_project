<?php namespace Khelo\PlayerProfile\Updates;

use Schema;
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

class AddFieldsToUser extends Migration
{
    public function up()
    {
        Schema::table('users', function(Blueprint $table) {
            $table->string('mobile_number')->nullable();
        });
    }

    public function down()
    {
        Schema::table('users', function(Blueprint $table) {
            $table->dropColumn('mobile_number');
        });
    }
}
