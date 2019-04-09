<?php namespace khelo\FaqTopics\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateKheloFaqtopics2 extends Migration
{
    public function up()
    {
        Schema::table('khelo_faqtopics_', function($table)
        {
            $table->text('question_answer');
            $table->dropColumn('question');
            $table->dropColumn('answer');
        });
    }
    
    public function down()
    {
        Schema::table('khelo_faqtopics_', function($table)
        {
            $table->dropColumn('question_answer');
            $table->text('question');
            $table->text('answer');
        });
    }
}
