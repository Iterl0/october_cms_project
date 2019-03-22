<?php namespace Khelo\Playerprofile\Components;

use Khelo\Khelo\Classes\SendSms;
use RainLab\User\Components\Account;
use RainLab\User\Models\Settings as UserSettings;
use Validator;
use ValidationException;
use Event;
use Auth;
use October\Rain\Support\Facades\Flash;
use Lang;
use Mail;
use Redirect;
use Illuminate\Support\Facades\Session;
use October\Rain\Auth\Models\User;

class SignUpForm extends Account
{
    public function componentDetails()
    {
        return [
            'name'        => 'Khelo SignUpForm',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [
            'redirect' => [
                'title'       => /*Redirect to*/'rainlab.user::lang.account.redirect_to',
                'description' => 'Page name to redirect to after update, sign in or registration',
                'type'        => 'dropdown',
                'default'     => ''
            ],
            'activationPage' => [
                'title'       => 'Activation Page',
                'description' => '',
                'type'        => 'dropdown',
                'default'     => ''
            ],
        ];

    }

    public function onKheloRegister()
    {
        try {
            if (!$this->canRegister()) {
                throw new ApplicationException(Lang::get(/*Registrations are currently disabled.*/'rainlab.user::lang.account.registration_disabled'));
            }

            Auth::logout();

            /*
             * Validate input
             */
            $data = post();

            if (!array_key_exists('password_confirmation', $data)) {
                $data['password_confirmation'] = post('password');
            }

            $rules = [
                'email'    => 'required|email|between:6,255',
                'password' => 'required|between:4,255|confirmed',
                'mobile_number' => 'required|digits:10|unique:users'
            ];

            if ($this->loginAttribute() == UserSettings::LOGIN_USERNAME) {
                $rules['username'] = 'required|between:2,255';
            }

            $validation = Validator::make($data, $rules);
            if ($validation->fails()) {
                throw new ValidationException($validation);
            }

            /*
             * Register user
             */
            Event::fire('rainlab.user.beforeRegister', [&$data]);

            $requireActivation = UserSettings::get('require_activation', true);
            $automaticActivation = UserSettings::get('activate_mode') == UserSettings::ACTIVATE_AUTO;
            $userActivation = UserSettings::get('activate_mode') == UserSettings::ACTIVATE_USER;
            $user = Auth::register($data, $automaticActivation);

            Event::fire('rainlab.user.register', [$user, $data]);

            /*
             * Activation is by the user, send the email
             */
            if ($userActivation) {
                $this->sendActivationSms($user);

                Flash::success(Lang::get(/*An activation sms has been sent to your mobile number.*/'rainlab.user::lang.account.activation_email_sent'));
            }

            /*
             * Automatically activated or not required, log the user in
             */
            if ($automaticActivation || !$requireActivation) {
                Auth::login($user);
            }

            /*
             * write phone number temporarily to Session for verify process
             */
            Session::put([
                'mobile_to_verify' => $data['mobile_number'],
                'user_to_verify' => $data['username'],
                'intended_password' => $data['password']
            ]);

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

        $data = [
            'name' => $user->name,
            'link' => $link,
            'code' => $activation_code
        ];

        Mail::send('rainlab.user::mail.activate', $data, function($message) use ($user) {
            $message->to($user->email, $user->name);
        });

//        SendSms::send("Your confirmation code is $activation_code", $user->mobile_number);
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
