<?php

class email_configCheckSend
{
    protected $smtp_config;
    protected $smtp_connect;
    protected $domain;
    protected $timeout;
    protected $mail;

    function __construct($getConfig,$mail)
    {
        $this->smtp_config = $getConfig;
        $this->domain = $this->get_domain();
        $this->timeout = 10;
        $this->mail = $mail;
    }
    private function get_domain(){
        $domain = wa()->getRouting()->getDomain();
        $domains = wa()->getRouting()->getDomains();
        if($domain){
            return $domain;
        } elseif ($domains) {
            return $domains[0];
        } else {
            return waRequest::getIp();
        }
    }
    public function send()
    {
        $host = $this->encryption($this->smtp_config['encryption'],$this->smtp_config['host']);
        email_configStatus::changes($this->mail, 0);
        /**
         * sorry, the new version will transfer the connection in CURL
         */
        ini_set('default_socket_timeout',$this->timeout);
        //connect
        $this->smtp_connect = @fsockopen($host, $this->smtp_config['port'],$errno, $errstr, $this->timeout);
        if (!$this->smtp_connect) {
            return _w('Connection could not be established with host')." ". $this->smtp_config['host'];
        }

        $code = $this->get_data();
        if (!$code == 220) {
            fclose($this->smtp_connect);
            return _w('Connection could not be established with host')." ".$this->smtp_config['host'];
        }

        if (!$this->smtp_command( sprintf("EHLO %s\r\n", $this->domain),250)){
            fclose($this->smtp_connect);
            return _w('Server Welcome is not set');
        }

        if (!$this->smtp_command("AUTH LOGIN\r\n",334)){
            fclose($this->smtp_connect);
            return _w('SMTP Authentication is not set');
        }

        if (!$this->smtp_command(base64_encode($this->smtp_config['login'])."\r\n",334)){
            fclose($this->smtp_connect);
            return sprintf(_w('Failed to authenticate on SMTP server with username %s'),$this->smtp_config['login']);
        }
        if (!$this->smtp_command(base64_encode($this->smtp_config['password'])."\r\n",235)){
            fclose($this->smtp_connect);
            return _w('Invalid login or password');
        }
        email_configStatus::changes($this->mail, 1);
        fclose($this->smtp_connect);
    }

    private function smtp_command($command,$wanted)
    {
        fputs($this->smtp_connect, $command);
        $code = $this->get_data();
        if ($code == $wanted){
            return true;
        } else {
            if($this->mail){
                email_configStatus::changes($this->mail, 0);
            }
            return false;
        }
    }

    private function get_data()
    {
        $data= "";

        while ($str = fgets($this->smtp_connect,515)) {
            $data .= $str;
            if(substr($str,3,1) == " ") { break; }
        }
        return substr($data,0,3);
    }

    private function encryption($encryption,$host)
    {
        switch ($encryption) {
            case 'ssl':
                $url = 'ssl://'.$host;
                break;
            case 'tls':
                $url = 'tls://'.$host;
                break;
            default:
                $url = $host;
                break;
        }
        return $url;
    }
}
