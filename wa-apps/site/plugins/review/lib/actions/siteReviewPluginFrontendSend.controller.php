<?php
/**
 * Created by PhpStorm.
 * User: snark | itfrogs.ru
 * Date: 1/12/18
 * Time: 11:59 PM
 */

class siteReviewPluginFrontendSendController extends waJsonController
{
    /**
     * @throws waException
     */
    public function execute()
    {
        $data = waRequest::post();

        if (!empty($data)) {
            foreach ($data as $key => $value) {
                $data[$key] = urldecode($value);
            }
        }

        /**
         * @var siteReviewPlugin $plugin
         */
        $plugin = wa('site')->getPlugin('review');
        $settings = $plugin->getSettings();

        $pass = true;

        if (!filter_var($settings['to'], FILTER_VALIDATE_EMAIL)) {
            $this->setError(_wp('Site e-mail is invalid'));
            $pass = false;
        } else {
            $to = $settings['to'];
        }

        if (isset($data['captcha']) && !wa()->getCaptcha()->isValid($data['captcha'])) {
            $this->setError(_wp('Captha is invalid'));
            $pass = false;
        }

        if (isset($data['email']) && !empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->setError(_wp('Customer`s e-mail is invalid'));
            $pass = false;
        } else {
            if (empty($settings['from'])) {
                $from = $data['email'];
            } else {
                $from = $settings['from'];
            }
        }

        if (!isset($data['email']) || empty($data['email'])) {
            $data['email'] = $to;
        }

        if (isset($data['name']) && !empty($data['name'])) {
            $name = $data['name'];
        } else {
            $name = _wp('Customer');
        }

        if (isset($data['agree_to_terms']) && !empty($data['agree_to_terms'])) {

        } else {
            $this->setError('Agree to terms is required');
            $pass = false;
        }

        $files = waRequest::file('attachment');

        /*if (isset($data['agree_to_terms']) && !empty($data['agree_to_terms'])) {
            //TODO ограничить размер файла
        } else {
            $this->setError('Agree to terms is required');
            $pass = false;
        }*/

        if ($pass) {
            $view = wa()->getView();

            $view->assign('name', $name);
            $view->assign('email', $data['email']);
            //$view->assign('subject', urldecode($data['subject']));
            $view->assign('subject', 'Сообщение с сайта');
            $view->assign('text', nl2br(urldecode($data['text'])));

            //$body = $view->fetch('string:' . $settings['body']);
            $subj = $settings['subj_prefix'];
            if (isset($data['subject']) && !empty($data['subject'])) {
                $subj .= urldecode($data['subject']);
            }

            $text = [
                '<strong>Ваше имя:</strong><br>' . waRequest::request('name').'<br>',
                '<strong>Телефон:</strong><br>'. waRequest::request('tel').'<br>',
                '<strong>Email:</strong><br>'. waRequest::request('email').'<br>',
                '<strong>Согласие на обработку персональных данных:</strong><br>'. (waRequest::request('agree_to_terms') ? 'да' : 'нет').'<br>',
                //'<strong>IP Address:</strong><br>'. waRequest::getIp(true).'<br>',
                '<strong>Текст сообщения:</strong><br>' . waRequest::request('text'),
            ];

            $body = implode('<br>', $text);

            try {
                $message = new waMailMessage($subj, $body);
                $message->addReplyTo($data['email']);
                $message->setFrom($from, wa()->accountName());
                $message->setTo($to);

                foreach ($files as $file) {
                    if (($file instanceof waRequestFileIterator || $file instanceof waRequestFile) && $file->uploaded()) {
                        $message->addAttachment((string)$file, $file->name);
                    }
                }

                $status = $message->send();

                if ($settings['mail_log'] == 1) {
                    if ($status) {
                        waLog::log(sprintf(_wp('Message from %s has been sent successfully'), $data['email']), 'site-review-mail.log');
                    } else {
                        waLog::log(sprintf(_wp('Message from %s not been sended'), $data['email']), 'site-review-mail.log');
                    }
                }
            } catch (waException $e) {
                waLog::log(_wp('Error send email from ' . $data['email']), 'site-review-mail-error.log');
                waLog::log($e, 'site-review-mail-error.log');
            }
        }
    }
}