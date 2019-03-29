<?php namespace Khelo\Playerprofile\Components;

use Exception;
use Flash;
use Illuminate\Support\Facades\DB;
use Khelo\Khelo\Classes\PokerApi;
use RainLab\User\Components\Account;
use Validator;
use Illuminate\Support\Facades\Session;
use Request;
use Auth;
use Redirect;
use ValidationException;
use Mail;

class VerifyMobile extends Account
{

    public function componentDetails()
    {
        return [
            'name'        => 'VerifyMobile Component',
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
            'paramCode' => [
                'title'       => /*Activation Code Param*/'rainlab.user::lang.account.code_param',
                'description' => /*The page URL parameter used for the registration activation code*/ 'rainlab.user::lang.account.code_param_desc',
                'type'        => 'string',
                'default'     => 'code'
            ],
        ];
    }

    /**
     * Executed when this component is bound to a page or layout.
     */
    public function onRun()
    {

        if (empty(Session::get('user_to_verify'))) {
            return Redirect::to($this->pageUrl('/'));
        }
        /*
         * Activation code supplied
         */
        if ($code = $this->activationCode()) {
            $this->onActivate($code);
        }

        $this->prepareVars();
    }

    /**
     * Executed when this component is initialized
     */
    public function prepareVars()
    {
        $this->page['user'] = $this->user();
        $this->page['canRegister'] = $this->canRegister();
        $this->page['loginAttribute'] = $this->loginAttribute();
        $this->page['loginAttributeLabel'] = $this->loginAttributeLabel();
    }

    /**
     * Looks for the activation code from the URL parameter. If nothing
     * is found, the GET parameter 'activate' is used instead.
     * @return string
     */
    public function activationCode()
    {
        $routeParameter = $this->property('paramCode');

        if ($code = $this->param($routeParameter)) {
            return $code;
        }

        return get('activate');
    }

    /**
     * Activate the user
     * @param  string $code Activation code
     */
    public function onActivate($code = null)
    {
        try {

            if (Auth::getUser()) return Redirect::to('/');

            $code = post('code', $code);

            $errorFields = ['code' => 'Invalid activation code supplied'];

            if (!strlen(trim($code))) {
                throw new ValidationException($errorFields);
            }

            $user = Auth::findUserByLogin(Session::get('user_to_verify'));

            $this->preValidateOtp($user, $code);

            if (!$user->attemptActivation($code)) {
                throw new ValidationException($errorFields);
            }

            $create_player_api_result = (new PokerApi())->create_player($user->username, 'Player', 'Poker', 'Kohima', Session::get('intended_password'), $user->email, request()->ip(), '');

            Session::forget([
                'user_to_verify',
                'mobile_to_verify',
                'intended_password'.
                'activeGateway',
                'callCodePrefix'
            ]);

            /*
             * Sign in the user
             */
            Auth::login($user);

        }
        catch (Exception $ex) {
            if (Request::ajax()) throw $ex;
            else Flash::error($ex->getMessage());
        }
    }

    public function onResendOtp() {
        $user = Auth::findUserByLogin(Session::get('user_to_verify'));

        $data = [
            'name' => $user->name,
            'code' => $user->activation_code
        ];

        $smsSender= $this->addComponent(
            '\Khelo\SmsGateway\Components\SendSmsService', 'sendSmsService',
            [
                'activeGateway' => Session::get('activeGateway'),
                'callCodePrefix' => Session::get('callCodePrefix')
            ]
        );

        $smsSender->sendMessage($user->mobile_number, $user->activation_code);
    }

    public function onOtpSubmit() {
        try {
            $data = post();

            $validation = Validator::make($data, ['otp_code' => 'required|digits:6']);
            if ($validation->fails()) {
                throw new ValidationException($validation);
            }

            $user = Auth::findUserByLogin(Session::get('user_to_verify'));

            $this->preValidateOtp($user, $data['otp_code']);

            $url = $this->pageUrl('verify-mobile');
            $url .= '?activate=' . $data['otp_code'];
            return Redirect::to($url);

        }
        catch (Exception $ex) {
            if (Request::ajax()) throw $ex;
            else Flash::error($ex->getMessage());
        }
    }

    public function preValidateOtp($user, $otpCode) {
        if ($user->mobile_number != Session::get('mobile_to_verify'))
            throw new Exception('User pending activation does not exist');

        if ($user->is_activated == 1) throw new Exception('User already activated');

        if ($user->activation_code != $otpCode) throw new Exception('Invalid OTP code');
    }

}
