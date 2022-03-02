<?php
/**
 * 
 */
class customizerBackendSidebarAction extends waViewAction
{
    public function execute()
    {
        $module = waRequest::get('module');
        $action = waRequest::get('action');

        if (!$action) {
            $action = waRequest::get('module');
        }
		
        $params = null;

        /**
         * Extend backend sidebar
         * Add extra sidebar items (menu items, additional sections, system output)
         * @event backend_sidebar
         * @example #event handler example
         * public function sidebarAction()
         * {
         *     $output = array();
         *
         *     #add external link into sidebar menu
         *     $output['menu']='<li>
         *         <a href="http://www.webasyst.com">
         *             http://www.webasyst.com
         *         </a>
         *     </li>';
         *
         *     #add section into sidebar menu
         *     $output['section']='';
         *
         *     #add system link into sidebar menu
         *     $output['system']='';
         *
         *     return $output;
         * }
         * @return array[string][string]string $return[%plugin_id%]['menu'] Single menu items
         * @return array[string][string]string $return[%plugin_id%]['section'] Sections menu items
         * @return array[string][string]string $return[%plugin_id%]['system'] Extra menu items
         */
        $this->view->assign('backend_sidebar', wa()->event('backend_sidebar', $params, array('menu', 'section', 'system')));

        $this->view->assign('action', $action);
        $this->view->assign('module', $module);
    }
}
