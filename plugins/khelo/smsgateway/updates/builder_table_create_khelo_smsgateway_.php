<?php namespace khelo\SmsGateway\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateKheloSmsgateway extends Migration
{
    public function up()
    {
        Schema::create('khelo_smsgateway_', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name', 255);
            $table->string('service_url', 255);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('khelo_smsgateway_');
    }
}
