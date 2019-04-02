<?php namespace Khelo\Playerprofile\Components;

use Illuminate\Support\Facades\Redirect;
use RainLab\User\Components\Account;
use RainLab\User\Models\User;
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

    public function getPhoneNumberLength() {
        $callCodePrefix = $this->property('intCallCodePrefix');
        return ($callCodePrefix == 'None' || $callCodePrefix == '') ? 12 : 10;
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

            if ($userActivation) $this->sendActivationSms($user);
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
     * Sends the activation sms to a user
     * @param  User $user
     * @return void
     */
    protected function sendActivationSms($user)
    {
        $user->activation_code = $activation_code = mt_rand(100000, 999999);

        $user->forceSave();

        $link = $this->makeActivationUrl($activation_code);

        $smsSender= $this->addComponent(
            '\Khelo\SmsGateway\Components\SendSmsService', 'sendSmsService',
            [
                'activeGateway' => $this->property('smsGateway'),
                'callCodePrefix' => $this->property('intCallCodePrefix')
            ]
        );

        $smsSender->sendMessage($user->mobile_number, $activation_code);

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
