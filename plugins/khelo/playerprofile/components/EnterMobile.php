<?php namespace Khelo\Playerprofile\Components;

use Illuminate\Support\Facades\Redirect;
use Khelo\Playerprofile\Traits\Helpers;
use RainLab\User\Components\Account;
use Auth;
use Illuminate\Support\Facades\Session;
use Validator;
use RainLab\User\Models\Settings as UserSettings;
use Mail;
use ValidationException;
use khelo\SmsGateway\Models\SmsGateway;
use Flash;

class EnterMobile extends Account
{
    use Helpers;

    public function componentDetails()
    {
        return [
            'name'        => 'EnterMobile Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [
            'redirect' => [
                'title'       => /*Redirect to*/'rainlab.user::lang.account.redirect_to',
                'description' => 'Page name to redirect to after mobile number is entered',
                'type'        => 'dropdown',
                'default'     => ''
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

    public function onRun() {
        if (Auth::getUser()) {
            return Redirect::to('/');
        }
        $this->page['phoneNumberLength'] = $this->getPhoneNumberLength();
    }

    public function onMobileSubmit()
    {
        try {
            /*
             * Validate input
             */
            $data = post();

            $rules = [
                'mobile_number' => 'required|digits:'.$this->getPhoneNumberLength().'|unique:users'
            ];

            $validation = Validator::make($data, $rules);
            if ($validation->fails()) {
                throw new ValidationException($validation);
            }

            $user = Auth::findUserByLogin(Session::get('user_to_verify'));

            if (is_null($user)) throw new Exception('User does not exist');

            $user->mobile_number = $data['mobile_number'];
            $user->forceSave();

            Session::put('mobile_to_verify', $data['mobile_number']);

            $userActivation = UserSettings::get('activate_mode') == UserSettings::ACTIVATE_USER;

            $user->activation_code = $activation_code = mt_rand(100000, 999999);
            $user->forceSave();
            $link = $this->makeActivationUrl($activation_code);

            if ($userActivation) $this->sendActivationSms($user, $activation_code);
            Flash::success('Sms sent');

            Session::put('activeGateway', $this->property('smsGateway'));
            Session::put('callCodePrefix', $this->property('intCallCodePrefix'));

            /*
             * Redirect to the intended page after successful sign in
             */
            if ($redirect = $this->makeRedirection(true)) {
                return $redirect;
            }

        }
        catch (Exception $ex) {
            if (Request::ajax()) throw $ex;
            else Flash::error($ex->getMessage());
        }
    }

    /**
     * Returns a link used to activate the user account.
     * @return string
     */
    protected function makeActivationUrl($code)
    {
        $params = [
            $this->property('paramCode') => $code
        ];

        $url = $this->pageUrl('verify-mobile', $params);

        if (strpos($url, $code) === false) {
            $url .= '?activate=' . $code;
        }

        return $url;
    }



}
