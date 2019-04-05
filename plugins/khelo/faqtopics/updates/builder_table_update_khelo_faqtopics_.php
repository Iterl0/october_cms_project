<?php namespace khelo\FaqTopics\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateKheloFaqtopics extends Migration
{
    public function up()
    {
        Schema::table('khelo_faqtopics_', function($table)
        {
            $table->smallInteger('published')->unsigned()->default(0);
        });
    }
    
    public function down()
    {
        Schema::table('khelo_faqtopics_', function($table)
        {
            $table->dropColumn('published');
        });
    }
}
