<?php namespace khelo\SmsGateway\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateKheloSmsgateway2 extends Migration
{
    public function up()
    {
        Schema::table('khelo_smsgateway_', function($table)
        {
            $table->text('params');
        });
    }
    
    public function down()
    {
        Schema::table('khelo_smsgateway_', function($table)
        {
            $table->dropColumn('params');
        });
    }
}
