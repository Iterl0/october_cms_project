<?php namespace Khelo\Playerprofile\Traits;

trait Helpers
{
    /**
     * Sends the activation sms to a user
     * @param  User $user
     * @param  $activation_code
     * @return void
     */
    protected function sendActivationSms($user, $activation_code)
    {
        $smsSender= $this->addComponent(
            '\Khelo\SmsGateway\Components\SendSmsService', 'sendSmsService',
            [
                'activeGateway' => $this->property('smsGateway'),
                'callCodePrefix' => $this->property('intCallCodePrefix')
            ]
        );

        $smsSender->sendMessage($user->mobile_number, $activation_code);

    }

    public function getPhoneNumberLength() {
        $callCodePrefix = $this->property('intCallCodePrefix');
        return ($callCodePrefix == 'None' || $callCodePrefix == '') ? 12 : 10;
    }
}