<?php namespace Khelo\Faqtopics\Components;

use Cms\Classes\ComponentBase;

class ShowSingle extends ComponentBase
{
    public function componentDetails()
    {
        return [
            'name'        => 'ShowSingle Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [];
    }

    public function onRender()
    {
        $this->page['record'] = $this->property('record');
    }
}
