<?php namespace Khelo\Smsgateway\Components;

use Cms\Classes\ComponentBase;
use khelo\SmsGateway\Models\SmsGateway;
use Exception;

class SendSmsService extends ComponentBase
{
    public function componentDetails()
    {
        return [
            'name'        => 'SendSmsService Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [
            'activeGateway' => [
                'title' => 'Gateway to use',
                'type' => 'dropdown',
                'default' => '',
                'placeholder' => 'Select',
            ],
        ];
    }

    public function getActiveGatewayOptions() {
        return SmsGateway::all()->mapWithKeys(function ($v) {
            return [$v->name => $v->name];
        })->toArray();
    }

    public function sendMessage($recipientNumber, $msgBody) {

        $recipientNumber = $this->property('callCodePrefix') . $recipientNumber;

        $activeGateway = SmsGateway::where('name', $this->property('activeGateway'))->get();

        if ($activeGateway->isEmpty()) throw new Exception('Gateway does not exist');

        $activeGateway = $activeGateway->first();

        $msgtxt=rawurlencode($msgBody);

        $url = $activeGateway->service_url;

        $postFields = http_build_query(collect($activeGateway->additional_params)
            ->map(function ($v) {
                return [$v['prop'] => $v['val']];
            })
            ->collapse()
            ->merge([
                $activeGateway->recipient_number_param => $recipientNumber,
                $activeGateway->msg_body_param => $msgtxt,
            ])
            ->toArray()
        );

        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,  $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);

        $buffer = curl_exec($ch);

//        todo: decide a better way to debug sms sent status
//        if(empty ($buffer))
//        {
//            echo " buffer is empty ";
//        }
//        else
//        {
//            echo $buffer;
//        }
        curl_close($ch);

    }
}
