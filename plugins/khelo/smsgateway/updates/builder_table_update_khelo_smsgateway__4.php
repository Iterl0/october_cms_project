<?php namespace khelo\SmsGateway\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateKheloSmsgateway4 extends Migration
{
    public function up()
    {
        Schema::table('khelo_smsgateway_', function($table)
        {
            $table->string('recipient_number_param', 255)->nullable(false)->unsigned(false)->default(null)->change();
            $table->string('additional_params')->change();
        });
    }
    
    public function down()
    {
        Schema::table('khelo_smsgateway_', function($table)
        {
            $table->integer('recipient_number_param')->nullable(false)->unsigned(false)->default(null)->change();
            $table->string('additional_params', 191)->change();
        });
    }
}
