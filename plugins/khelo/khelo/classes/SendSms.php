<?php
namespace Khelo\Khelo\Classes;

use Illuminate\Support\Facades\Config;

class SendSms
{
    public static function send($msgBody, $receipientno)
    {
        $senderID=Config::get('khelo.sms_sender_id');

        $user=Config::get('khelo.mvaayoo_user');

        $msgtxt=rawurlencode($msgBody);

        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,  "http://api.mVaayoo.com/mvaayooapi/MessageCompose");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, "user=$user&senderID=$senderID&dcs=0&receipientno=$receipientno&msgtxt=$msgtxt");

        $buffer = curl_exec($ch);

        if(empty ($buffer))
        {
            echo " buffer is empty ";
        }
        else
        {
            echo $buffer;
        }
        curl_close($ch);

    }

}