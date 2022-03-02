<?php


trait rlogsSingleInstanceTrait
{
    protected static $instance = null;

    /**
     * rlogsSingleInstanceTrait constructor.
     */
    protected function __construct()
    {
    }

    /**
     * @return null
     */
    public static function getInstance()
    {
        null === static::$instance AND static::$instance = new static();
        return static::$instance;
    }
}