<?php namespace khelo\SmsGateway;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function registerComponents()
    {
        return [
            \Khelo\SmsGateway\Components\SendSmsService::class => 'sendSmsService',
        ];
    }

    public function registerSettings()
    {

    }
}
