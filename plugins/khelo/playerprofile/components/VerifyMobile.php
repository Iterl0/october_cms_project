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

        if (empty(Session::get('user_to_verify')) || empty(Session::get('mobile_to_verify'))) {
            if (empty(Session::get('verified'))) {
                return Redirect::to($this->pageUrl('register'));
            }
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

            $code = post('code', $code);

            $errorFields = ['code' => 'Invalid activation code supplied'];

            if (!strlen(trim($code))) {
                throw new ValidationException($errorFields);
            }

            $q = DB::table('users')
                ->where('username', Session::get('user_to_verify'))
                ->where('mobile_number', Session::get('mobile_to_verify'))
            ;

            if ($q->where('is_activated', 1)->exists()) {
                throw new ValidationException('User already activated');
            }

            $q = DB::table('users')
                ->where('activation_code', $code);

            if (!$q->exists()) {
                throw new ValidationException($errorFields);
            }

            $userId = $q->value('id');
            if (!$user = Auth::findUserById($userId)) {
                throw new ValidationException($errorFields);
            }

            if (!$user->attemptActivation($code)) {
                throw new ValidationException($errorFields);
            }

            $create_player_api_result = (new PokerApi())->create_player($user->username, 'Player', 'Poker', 'Kohima', Session::get('intended_password'), $user->email, request()->ip(), '');

            Session::forget('user_to_verify');
            Session::forget('mobile_to_verify');
            Session::forget('intended_password');
            Session::put('verified', 1);

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

    public function onOtpSubmit() {
        try {
            $data = post();

            $validation = Validator::make($data, ['otp_code' => 'required|digits:6']);
            if ($validation->fails()) {
                throw new ValidationException($validation);
            }

            $q = DB::table('users')
                ->where('username', Session::get('user_to_verify'))
                ->where('mobile_number', Session::get('mobile_to_verify'));

            if (!$q->exists()) throw new Exception('User does not exist');

            $user_pending_activation = $q->where('is_activated', 0);
            if (!$user_pending_activation->exists()) throw new Exception('User already activated');

            $validateOtp = $q->where('activation_code', $data['otp_code'])->exists();

            if (!$validateOtp) throw new Exception('Invalid OTP code');

            $url = $this->pageUrl('verify-mobile');
            $url .= '?activate=' . $data['otp_code'];
            return Redirect::to($url);

        }
        catch (Exception $ex) {
            if (Request::ajax()) throw $ex;
            else Flash::error($ex->getMessage());
        }
    }

}
