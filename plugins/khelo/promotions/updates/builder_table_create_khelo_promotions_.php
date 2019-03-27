<?php namespace khelo\Promotions\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateKheloPromotions extends Migration
{
    public function up()
    {
        Schema::create('khelo_promotions_', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('title', 255);
            $table->text('description');
            $table->string('banner_image', 255);
            $table->string('promocode', 255);
            $table->string('link', 255);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('khelo_promotions_');
    }
}
