<?php namespace Khelo\PlayerProfile\Components;

class ResetPassword extends \RainLab\User\Components\ResetPassword
{
    public function componentDetails()
    {
        return [
            'name'        => 'ResetPassword Component',
            'description' => 'Reset password via sms'
        ];
    }

    public function defineProperties()
    {
        return [];
    }

    /**
     * Trigger the password reset sms
     */
    public function onRestorePassword()
    {
        $rules = [
            'email' => 'required|email|between:6,255'
        ];

        $validation = Validator::make(post(), $rules);
        if ($validation->fails()) {
            throw new ValidationException($validation);
        }

        $user = UserModel::findByEmail(post('email'));
        if (!$user || $user->is_guest) {
            throw new ApplicationException(Lang::get(/*A user was not found with the given credentials.*/'rainlab.user::lang.account.invalid_user'));
        }

        $code = implode('!', [$user->id, $user->getResetPasswordCode()]);

        $link = $this->makeResetUrl($code);

        $data = [
            'name' => $user->name,
            'link' => $link,
            'code' => $code
        ];

        Mail::send('rainlab.user::mail.restore', $data, function($message) use ($user) {
            $message->to($user->email, $user->full_name);
        });
    }
}
