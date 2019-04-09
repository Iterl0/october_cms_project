<?php namespace khelo\FaqTopics;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function registerComponents()
    {
        return [
            \Khelo\FaqTopics\Components\ShowSingle::class => 'showSingle',
        ];
    }

    public function registerSettings()
    {
    }
}
