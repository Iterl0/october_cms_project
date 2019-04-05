<?php namespace khelo\FaqTopics\Controllers;

use Backend\Classes\Controller;
use BackendMenu;
use khelo\FaqTopics\Models\FaqTopic;
use Flash;

class FaqTopics extends Controller
{
    public $implement = [        'Backend\Behaviors\ListController',        'Backend\Behaviors\FormController',        'Backend\Behaviors\ReorderController'    ];
    
    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';
    public $reorderConfig = 'config_reorder.yaml';

    public function __construct()
    {
        parent::__construct();
        BackendMenu::setContext('khelo.FaqTopics', 'main-menu-item');
    }

    public function index()
    {
        $this->addJs('/plugins/khelo/faqtopics/assets/js/bulk-actions.js');
        $this->asExtension('ListController')->index();
    }

    public function index_onBulkAction()
    {
        if (
            ($bulkAction = post('action')) &&
            ($checkedIds = post('checked')) &&
            is_array($checkedIds) &&
            count($checkedIds)
        ) {

            foreach ($checkedIds as $faqId) {
                if (!$faq = FaqTopic::withTrashed()->find($faqId)) {
                    continue;
                }

                switch ($bulkAction) {
                    case 'delete':
                        $faq->forceDelete();
                        break;

                    case 'publish':
                        $faq->publish();
                        break;

                    case 'unpublish':
                        $faq->unpublish();;
                        break;
                }
            }

            Flash::success('Changes applied successfully');
        }
        else {
            Flash::error('Error encountered');
        }

        return $this->listRefresh();
    }

}
