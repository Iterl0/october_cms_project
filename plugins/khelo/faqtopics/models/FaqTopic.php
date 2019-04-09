<?php namespace khelo\FaqTopics\Models;

use Model;

/**
 * Model
 */
class FaqTopic extends Model
{
    use \October\Rain\Database\Traits\Validation;
    
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'khelo_faqtopics_';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $jsonable = ['question_answer'];

    public function publish() {
        $this->published = 1;
        $this->save();
    }

    public function unpublish() {
        $this->published = 0;
        $this->save();
    }
}
