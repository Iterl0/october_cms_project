<?php namespace Khelo\PlayerProfile;

use Khelo\Playerprofile\Models\BankingInfo;
use RainLab\User\Controllers\Users as UsersController;
use RainLab\User\Models\User as UserModel;
use System\Classes\PluginBase;

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

    public $require = ['RainLab.User'];

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
                'mobile_number',
                'birth_date',
                'gender',
                'address1',
                'address2',
                'city',
                'state',
                'pin',
                'full_name',
                'account_no',
                'ifsc',
                'pan',
                'panScan',
                'addressProofFront',
                'addressProofBack'
            ]);

            $model->hasOne['bankingInfo'] = ['Khelo\Playerprofile\Models\BankingInfo'];

            $model->attachOne['panScan'] = 'System\Models\File';
            $model->attachOne['addressProofFront'] = 'System\Models\File';
            $model->attachOne['addressProofBack'] = 'System\Models\File';

            $model->addDynamicMethod('findByMobile', function($mobile) use ($model) {
                return $model->where('mobile_number', $mobile);
            });

            $model->addDynamicMethod('getGenderOptions', function($mobile) use ($model) {
                return [
                    'male' => 'male',
                    'female' => 'female'
                ];
            });

            $model->rules = [
                'email' => 'required|between:6,255|email|unique:users',
                'avatar' => 'nullable|image|max:4000',
                'username' => 'required|between:2,255|unique:users',
            ];
        });


        UsersController::extendFormFields(function ($form, $model, $context) {
            $form->addTabFields([
                'mobile_number' => [
                    'label' => 'Mobile Number',
                    'type' => 'text',
                    'tab' => 'Profile',
                ],
                'birth_date' => [
                    'label' => 'Date of birth',
                    'type' => 'datepicker',
                    'tab' => 'Profile'
                ],
                'gender' => [
                    'label' => 'Gender',
                    'type' => 'dropdown',
                    'tab' => 'Profile',
                ]]);
        });


        UsersController::extendFormFields(function ($form, $model, $context) {
            if (!$model instanceof UserModel) return;
            if (!$model->exists) return;
            BankingInfo::getFromUser($model);

            $form->addTabFields([
                'bankingInfo[full_name]' => [
                    'label' => 'Full name',
                    'type' => 'text',
                    'tab' => 'Banking Info',
                ],
                'bankingInfo[account_no]' => [
                    'label' => 'Account Number',
                    'type' => 'text',
                    'tab' => 'Banking Info',
                ],
                'bankingInfo[ifsc]' => [
                    'label' => 'IFSC',
                    'type' => 'text',
                    'tab' => 'Banking Info',
                ],
                'bankingInfo[pan]' => [
                    'label' => 'PAN',
                    'type' => 'text',
                    'tab' => 'Banking Info',
                ],
                'panScan' => [
                    'label' => 'PAN Scan',
                    'type' => 'fileupload',
                    'tab' => 'Banking Info',
                ],
                'addressProofFront' => [
                    'label' => 'Address Proof Front',
                    'type' => 'fileupload',
                    'tab' => 'Banking Info',
                ],
                'addressProofBack' => [
                    'label' => 'Address Proof Back',
                    'type' => 'fileupload',
                    'tab' => 'Banking Info',
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
            \Khelo\PlayerProfile\Components\ResetPassword::class => 'resetPassword',
            \Khelo\PlayerProfile\Components\EditProfile::class => 'editProfile'
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
