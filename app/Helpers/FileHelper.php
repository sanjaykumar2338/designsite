<?php
// FileHelper.php

if (!function_exists('fileToUrl')) {
    function fileToUrl($filePath)
    {
        $pathWithoutPublic = str_replace('public/', '', $filePath);
        $baseUrl = url('/');
        $url = $baseUrl . '/storage/' . $pathWithoutPublic;
        
        return $url;
    }
}
