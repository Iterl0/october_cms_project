<?php namespace Khelo\Playerprofile\Components;

use Illuminate\Support\Facades\DB;
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
                'username' => 'required|between:2,255',
                'termsOfUse' => 'required|accepted'
            ];

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
            $user = Auth::register((function () use ($data) {
                $dataTruncated = $data;
                unset($dataTruncated['password']);
                unset($dataTruncated['password_confirmation']);
                return $dataTruncated;
            })(), $automaticActivation);



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

}
