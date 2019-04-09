<?php namespace khelo\FaqTopics\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateKheloFaqtopics extends Migration
{
    public function up()
    {
        Schema::create('khelo_faqtopics_', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name', 255);
            $table->text('question');
            $table->text('answer');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('khelo_faqtopics_');
    }
}
