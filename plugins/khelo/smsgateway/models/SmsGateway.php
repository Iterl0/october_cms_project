<?php namespace khelo\SmsGateway\Models;

use Model;

/**
 * Model
 */
class SmsGateway extends Model
{
    use \October\Rain\Database\Traits\Validation;
    
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    protected $jsonable = ['additional_params'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'khelo_smsgateway_';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];
}
