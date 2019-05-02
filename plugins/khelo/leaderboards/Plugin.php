<?php namespace Khelo\Leaderboards;

use Backend;
use System\Classes\PluginBase;

/**
 * leaderboards Plugin Information File
 */
class Plugin extends PluginBase
{
    /**
     * Returns information about this plugin.
     *
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'name'        => 'leaderboards',
            'description' => 'No description provided yet...',
            'author'      => 'khelo',
            'icon'        => 'icon-leaf'
        ];
    }

    /**
     * Register method, called when the plugin is first registered.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Boot method, called right before the request route.
     *
     * @return array
     */
    public function boot()
    {

    }

    /**
     * Registers any front-end components implemented in this plugin.
     *
     * @return array
     */
    public function registerComponents()
    {
        return [
            \Khelo\Leaderboards\Components\Immortals::class => 'immortals',
        ];
    }

    /**
     * Registers any back-end permissions used by this plugin.
     *
     * @return array
     */
    public function registerPermissions()
    {
        return []; // Remove this line to activate

        return [
            'khelo.leaderboards.some_permission' => [
                'tab' => 'leaderboards',
                'label' => 'Some permission'
            ],
        ];
    }

    /**
     * Registers back-end navigation items for this plugin.
     *
     * @return array
     */
    public function registerNavigation()
    {
        return []; // Remove this line to activate

        return [
            'leaderboards' => [
                'label'       => 'leaderboards',
                'url'         => Backend::url('khelo/leaderboards/mycontroller'),
                'icon'        => 'icon-leaf',
                'permissions' => ['khelo.leaderboards.*'],
                'order'       => 500,
            ],
        ];
    }
}
