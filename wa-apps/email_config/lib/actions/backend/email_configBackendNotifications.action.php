<?php 

class email_configBackendNotificationsAction extends waViewAction
{
	public function execute()
	{
		$app_settings = new waAppSettingsModel();

        $notifications_sms = ($app_settings->get('email_config','notifications_sms')) ? $app_settings->get('email_config','notifications_sms') : 'Off';
        $phone_sender = ($app_settings->get('email_config','phone_sender')) ? $app_settings->get('email_config','phone_sender') : '';
        $phone_to = ($app_settings->get('email_config','phone_to')) ? $app_settings->get('email_config','phone_to') : '';
        $possible = ($app_settings->get('email_config','possible')) ? $app_settings->get('email_config','possible') : _wp('Mail {$mail} isn&apos;t available');
        $established = ($app_settings->get('email_config','established')) ? $app_settings->get('email_config','established') : _wp('Mail {$mail} is again available');

        $this->view->assign(array(      
            "notifications_sms" => $notifications_sms,
            "phone_sender" => $phone_sender,
            "phone_to" => $phone_to,
            "possible" => $possible,
            "established" => $established,
        ));   
	}
}
