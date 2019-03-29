<?php namespace Khelo\PlayerProfile;

use Backend;
use System\Classes\PluginBase;
use RainLab\User\Controllers\Users as UsersController;
use RainLab\User\Models\User as UserModel;

/**
 * PlayerProfile Plugin Information File
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
            'name'        => 'PlayerProfile',
            'description' => 'No description provided yet...',
            'author'      => 'Khelo',
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
        UserModel::extend(function ($model) {
            $model->addFillable([
                'mobile_number'
            ]);
        });

        UsersController::extendFormFields(function ($form, $model, $context) {
            $form->addTabFields([
                'mobile_number' => [
                    'label' => 'Mobile Number',
                    'type' => 'text',
                    'tab' => 'Profile',
                ]
            ]);
        });
    }

    /**
     * Registers any front-end components implemented in this plugin.
     *
     * @return array
     */
    public function registerComponents()
    {
        return [
            \Khelo\PlayerProfile\Components\SignUpForm::class => 'signUpForm',
            \Khelo\PlayerProfile\Components\EnterMobile::class => 'enterMobile',
            \Khelo\PlayerProfile\Components\VerifyMobile::class => 'verifyMobile',
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
            'khelo.playerprofile.some_permission' => [
                'tab' => 'PlayerProfile',
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
            'playerprofile' => [
                'label'       => 'PlayerProfile',
                'url'         => Backend::url('khelo/playerprofile/mycontroller'),
                'icon'        => 'icon-leaf',
                'permissions' => ['khelo.playerprofile.*'],
                'order'       => 500,
            ],
        ];
    }
}
