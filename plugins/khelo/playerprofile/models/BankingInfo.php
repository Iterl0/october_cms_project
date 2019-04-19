<?php namespace Khelo\Playerprofile\Models;

use Model;

/**
 * bankingInfo Model
 */
class BankingInfo extends Model
{
    /**
     * @var string The database table used by the model.
     */
    public $table = 'banking_info';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'full_name',
        'account_no',
        'ifsc',
        'pan',
        'panScan', 'addressProofFront', 'addressProofBack'
    ];

    /**
     * @var array Relations
     */
    public $hasOne = [];
    public $hasMany = [];
    public $belongsTo = [
        "user" => ["RainLab\User\Models\User"]
    ];
    public $belongsToMany = [];
    public $morphTo = [];
    public $morphOne = [];
    public $morphMany = [];
    public $attachOne = [];
    public $attachMany = [];

    public static function getFromUser($user)
    {
        if ($user->bankingInfo)
            return $user->bankingInfo;

        $bankingInf = new static;
        $bankingInf->user = $user;
        $bankingInf->save();

        $user->bankingInfo = $bankingInf;

        return $bankingInf;
    }

}
