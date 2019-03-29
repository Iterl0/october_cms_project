<?php namespace khelo\SmsGateway\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateKheloSmsgateway3 extends Migration
{
    public function up()
    {
        Schema::table('khelo_smsgateway_', function($table)
        {
            $table->integer('recipient_number_param');
            $table->string('msg_body_param', 255);
            $table->string('additional_params');
            $table->dropColumn('params');
        });
    }
    
    public function down()
    {
        Schema::table('khelo_smsgateway_', function($table)
        {
            $table->dropColumn('recipient_number_param');
            $table->dropColumn('msg_body_param');
            $table->dropColumn('additional_params');
            $table->text('params');
        });
    }
}
