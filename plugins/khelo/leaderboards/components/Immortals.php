<?php namespace Khelo\Leaderboards\Components;

use Cms\Classes\ComponentBase;

class Immortals extends ComponentBase
{
    public function componentDetails()
    {
        return [
            'name'        => 'Immortals leaderboard',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [];
    }

    public function onRun()
    {
        $baseApiLink = 'https://www.khelo365.com/leaderboard/js/';
        $leaderboards = ["HadesLeaderboard", "AresLeaderboard", "ApolloLeaderboard"];

        foreach ($leaderboards as $leaderboard) {
            $this->addJs($baseApiLink.$leaderboard.'.js?'.mt_rand());
        }
        $this->addJs('/plugins/khelo/leaderboards/assets/js/immortals.js');

    }
}
