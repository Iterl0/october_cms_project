<?php namespace Khelo\PlayerProfile\Components;

use RainLab\User\Components\Account;
use Input;
use Flash;
use Lang;
use Redirect;

class EditProfile extends Account
{
    public function componentDetails()
    {
        return [
            'name'        => 'EditProfile',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [];
    }

    public function onRun() {
        $this->addCss('https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
        $this->addJs('https://code.jquery.com/ui/1.12.1/jquery-ui.min.js');

        $userInf = $this->user();

        $this->page['maleSelected'] = $userInf['gender'] == 'm' ? 'selected' : '';
        $this->page['femaleSelected'] = $userInf['gender'] == 'f' ? 'selected' : '';
        $this->page['user'] = $userInf;
    }

    public function onUpdateProfileDetails()
    {
        if (!$user = $this->user()) {
            return;
        }

        $user->fill(post());
        $user->save();

        /*
         * Redirect
         */
        return Redirect::to($this->pageUrl('profile', false));

        $this->prepareVars();
    }

    public function onUpdateBankingDetails()
    {
        if (!$user = $this->user()) {
            return;
        }

        foreach (post() as $field => $value) {
            if (array_key_exists($field, $user->bankingInfo->toArray())) $user->bankingInfo->{$field} = $value;
        }

        $fileInputs = ['panScan', 'addressProofFront', 'addressProofBack'];

        foreach ($fileInputs as $input) {
            if (Input::hasFile($input))
                $user->{$input}()->create(['data' => Input::file($input), 'is_public' => false]);
        }

        $user->push();

        Flash::success(post('flash', Lang::get(/*Settings successfully saved!*/'rainlab.user::lang.account.success_saved')));

        /*
         * Redirect
         */
        if ($redirect = $this->makeRedirection()) {
            return $redirect;
        }

        $this->prepareVars();
    }

}
