<?php namespace khelo\Promotions\Models;

use Model;

/**
 * Model
 */
class Promotion extends Model
{
    use \October\Rain\Database\Traits\Validation;
    
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'khelo_promotions_';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];
}
