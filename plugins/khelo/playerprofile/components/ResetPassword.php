<?php namespace Khelo\PlayerProfile\Components;

use Khelo\Khelo\Classes\PokerApi;
use Khelo\Playerprofile\Traits\Helpers;
use Session;
use Validator;
use ValidationException;
use RainLab\User\Models\User as UserModel;
use ApplicationException;
use UserSettings;
use Auth;
use khelo\SmsGateway\Models\SmsGateway;

class ResetPassword extends \RainLab\User\Components\ResetPassword
{
    use Helpers;

    public function componentDetails()
    {
        return [
            'name'        => 'ResetPassword',
            'description' => 'Reset password via sms'
        ];
    }

    public function defineProperties()
    {
        return [
            'paramCode' => [
                'title'       => /*Reset Code Param*/'rainlab.user::lang.reset_password.code_param',
                'description' => /*The page URL parameter used for the reset code*/'rainlab.user::lang.reset_password.code_param_desc',
                'type'        => 'string',
                'default'     => 'code'
            ],
            'smsGateway' => [
                'title'       => 'Sms Gateway',
                'description' => '',
                'type'        => 'dropdown',
                'default'     => ''
            ],
            'intCallCodePrefix' => [
                'title'       => 'International call code prefix',
                'description' => 'Restrict SMS notification service to particular country code. Leave blank to allow 12 digit user input',
                'type'        => 'dropdown',
                'default'     => '',
                'options'     => ['' => 'None', '91' => 'India (+91)']
            ],
        ];
    }

    public function getSmsGatewayOptions() {
        return SmsGateway::all()->mapWithKeys(function ($v) {
            return [$v->name => $v->name];
        })->toArray();
    }

    public function getPhoneNumberLength() {
        $callCodePrefix = $this->property('intCallCodePrefix');
        return ($callCodePrefix == 'None' || $callCodePrefix == '') ? 12 : 10;
    }

    public function onRun() {
        $this->page['phoneNumberLength'] = $this->getPhoneNumberLength();
    }

    /**
     * Trigger the password reset sms
     */
    public function onRestorePassword()
    {
        $rules = [
            'mobile_number' => 'required|digits:'.$this->getPhoneNumberLength()
        ];

        $validation = Validator::make(post(), $rules);
        if ($validation->fails()) {
            throw new ValidationException($validation);
        }

        $user = UserModel::where('mobile_number', post('mobile_number'))->first();
        if (!$user || $user->is_guest) {
            throw new ApplicationException('A user was not found with the mobile number');
        }

        $user->reset_password_code = $activation_code = mt_rand(100000, 999999);
        $user->forceSave();
        $link = $this->makeResetUrl($activation_code);

        Session::put('userIdToRecover', $user->id);

        $this->sendActivationSms($user, $activation_code);
    }

    /**
     * Perform the password reset
     */
    public function onResetPassword()
    {

        $rules = [
            'code'     => 'required',
            'password' => 'required|between:4,255'
        ];

        $validation = Validator::make(post(), $rules);
        if ($validation->fails()) {
            throw new ValidationException($validation);
        }

        $errorFields = ['code' => 'Invalid activation code supplied'];
        $code = post('code');

        if (!strlen(trim($userId = Session::get('userIdToRecover'))) || !strlen(trim($code)) || !$code) {
            throw new ValidationException($errorFields);
        }

        if (!$user = Auth::findUserById($userId)) {
            throw new ValidationException($errorFields);
        }

//        if (!$user->resetPassword($code, post('password'))) {
        if (!$this->resetPassword($user, $code, post('password'))) {
            throw new ValidationException($errorFields);
        }

        Session::forget('userIdToRecover');

    }

    public function resetPassword($user, $resetCode, $newPassword) {
        if (!$resetCode || !$user->reset_password_code || $user->reset_password_code != $resetCode) return false;
        (new PokerApi())->resetPassword($user->username, $newPassword);
        return true;
    }

}
