<?php namespace khelo\FaqTopics\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateKheloFaqtopics3 extends Migration
{
    public function up()
    {
        Schema::table('khelo_faqtopics_', function($table)
        {
            $table->text('slug')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('khelo_faqtopics_', function($table)
        {
            $table->dropColumn('slug');
        });
    }
}
