<?php namespace Khelo\Promotions\Components;

use Cms\Classes\ComponentBase;
use khelo\Promotions\Models\Promotion;
use Request;

class MainSlider extends ComponentBase
{
    public $promos;

    public function componentDetails()
    {
        return [
            'name'        => 'mainSlider Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function onRun() {
        $this->prepareOptions();

        $slideProps = [
            $this->property('slide1'),
            $this->property('slide2'),
            $this->property('slide3'),
            $this->property('slide4'),
            $this->property('slide5'),
            $this->property('slide6'),
            $this->property('slide7'),
            $this->property('slide8'),
            $this->property('slide9'),
            $this->property('slide10'),
            $this->property('slide11'),
            $this->property('slide12'),
            $this->property('slide13'),
            $this->property('slide14'),
            $this->property('slide15'),
            $this->property('slide16'),
            $this->property('slide17'),
            $this->property('slide18'),
            $this->property('slide19'),
            $this->property('slide20')
        ];

        $this->page['slides'] = (function () use ($slideProps){
            $arr = [];
            $promos = $this->promos;
            foreach ($slideProps as $slideProp) {
                if (!empty($slideProp) && $slideProp != 'none') {
                    $obj = $promos->where('promocode', $slideProp)->first();
                    $arr[] = [
                        'img' => $obj->banner_image,
                        'link' => $obj->link
                    ];
                }
            }
            return $arr;
        })();

        $this->page['slideCount'] = count($this->page['slides']);
        $this->page['autoplay'] = $this->property('autoplay');
    }

    public function defineProperties()
    {
        return [
            'autoplay' => [
                'title' => 'Autoplay',
                'type' => 'checkbox',
                'default' => 1,
            ],
            'slide1' => [
                'title' => 'Slide1',
                'type' => 'dropdown',
                'default' => '',
                'placeholder' => 'Select',
            ],
            'slide2' => [
                'title'       => 'Slide2',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide1'],
                'placeholder' => 'Select',
            ],
            'slide3' => [
                'title'       => 'Slide3',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide2'],
                'placeholder' => 'Select',
            ],
            'slide4' => [
                'title'       => 'Slide4',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide3'],
                'placeholder' => 'Select',
            ],
            'slide5' => [
                'title'       => 'Slide5',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide4'],
                'placeholder' => 'Select',
            ],
            'slide6' => [
                'title'       => 'Slide6',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide5'],
                'placeholder' => 'Select',
            ],
            'slide7' => [
                'title'       => 'Slide7',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide6'],
                'placeholder' => 'Select',
            ],
            'slide8' => [
                'title'       => 'Slide8',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide7'],
                'placeholder' => 'Select',
            ],
            'slide9' => [
                'title'       => 'Slide9',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide8'],
                'placeholder' => 'Select',
            ],
            'slide10' => [
                'title'       => 'Slide10',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide9'],
                'placeholder' => 'Select',
            ],
            'slide11' => [
                'title'       => 'Slide11',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide10'],
                'placeholder' => 'Select',
            ],
            'slide12' => [
                'title'       => 'Slide12',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide11'],
                'placeholder' => 'Select',
            ],
            'slide13' => [
                'title'       => 'Slide13',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide12'],
                'placeholder' => 'Select',
            ],
            'slide14' => [
                'title'       => 'Slide14',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide13'],
                'placeholder' => 'Select',
            ],
            'slide15' => [
                'title'       => 'Slide15',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide14'],
                'placeholder' => 'Select',
            ],
            'slide16' => [
                'title'       => 'Slide16',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide15'],
                'placeholder' => 'Select',
            ],
            'slide17' => [
                'title'       => 'Slide17',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide16'],
                'placeholder' => 'Select',
            ],
            'slide18' => [
                'title'       => 'Slide18',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide17'],
                'placeholder' => 'Select',
            ],
            'slide19' => [
                'title'       => 'Slide19',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide18'],
                'placeholder' => 'Select',
            ],
            'slide20' => [
                'title'       => 'Slide20',
                'type'        => 'dropdown',
                'default'     => '',
                'depends' => ['slide19'],
                'placeholder' => 'Select',
            ],
        ];
    }

    public function prepareOptions() {
        $this->promos = $q = Promotion::all();
        $arr = ['none' => 'none'];

        foreach ($q as $v) {
            $arr[$v->promocode] =  $v->promocode;
        }

        return $arr;
    }

    public function getSlide1Options() {
        return $this->prepareOptions();
    }

    public function getSlide2Options() {
        if (empty(Request::input('slide1'))) return;
        return $this->prepareOptions();
    }

    public function getSlide3Options() {
        if (empty(Request::input('slide2'))) return;
        return $this->prepareOptions();
    }

    public function getSlide4Options() {
        if (empty(Request::input('slide3'))) return;
        return $this->prepareOptions();
    }

    public function getSlide5Options() {
        if (empty(Request::input('slide4'))) return;
        return $this->prepareOptions();
    }

    public function getSlide6Options() {
        if (empty(Request::input('slide5'))) return;
        return $this->prepareOptions();
    }

    public function getSlide7Options() {
        if (empty(Request::input('slide6'))) return;
        return $this->prepareOptions();
    }

    public function getSlide8Options() {
        if (empty(Request::input('slide7'))) return;
        return $this->prepareOptions();
    }

    public function getSlide9Options() {
        if (empty(Request::input('slide8'))) return;
        return $this->prepareOptions();
    }

    public function getSlide10Options() {
        if (empty(Request::input('slide9'))) return;
        return $this->prepareOptions();
    }

    public function getSlide11Options() {
        if (empty(Request::input('slide10'))) return;
        return $this->prepareOptions();
    }

    public function getSlide12Options() {
        if (empty(Request::input('slide11'))) return;
        return $this->prepareOptions();
    }

    public function getSlide13Options() {
        if (empty(Request::input('slide12'))) return;
        return $this->prepareOptions();
    }

    public function getSlide14Options() {
        if (empty(Request::input('slide13'))) return;
        return $this->prepareOptions();
    }

    public function getSlide15Options() {
        if (empty(Request::input('slide14'))) return;
        return $this->prepareOptions();
    }

    public function getSlide16Options() {
        if (empty(Request::input('slide15'))) return;
        return $this->prepareOptions();
    }

    public function getSlide17Options() {
        if (empty(Request::input('slide16'))) return;
        return $this->prepareOptions();
    }

    public function getSlide18Options() {
        if (empty(Request::input('slide17'))) return;
        return $this->prepareOptions();
    }

    public function getSlide19Options() {
        if (empty(Request::input('slide18'))) return;
        return $this->prepareOptions();
    }

    public function getSlide20Options() {
        if (empty(Request::input('slide19'))) return;
        return $this->prepareOptions();
    }
}