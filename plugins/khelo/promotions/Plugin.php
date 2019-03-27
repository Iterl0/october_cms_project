<?php namespace khelo\Promotions;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    /**
     * Registers any front-end components implemented in this plugin.
     *
     * @return array
     */
    public function registerComponents()
    {
        return [
            \Khelo\Promotions\Components\MainSlider::class => 'mainSlider',
        ];
    }

    public function registerSettings()
    {
    }
}
