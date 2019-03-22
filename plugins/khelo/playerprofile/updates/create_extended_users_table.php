<?php namespace Khelo\Playerprofile\Updates;

use Schema;
use October\Rain\Database\Schema\Blueprint;
use October\Rain\Database\Updates\Migration;

class CreateExtendedUsersTable extends Migration
{
    public function up()
    {
        Schema::create('khelo_playerprofile_extended_users', function(Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('khelo_playerprofile_extended_users');
    }
}
