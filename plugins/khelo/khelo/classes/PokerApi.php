<?php
namespace Khelo\Khelo\Classes;

use Illuminate\Support\Facades\Config;

class PokerApi
{
    private $k365_domain_name;

    public function __construct()
    {
        $this->k365_domain_name = Config::get('khelo.k365_domain_name');
    }

    public function create_player($username, $first_name, $last_name, $city, $password, $email, $ip_address, $promo_code) {

        $params = [
            'username' => $username,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'city' => $city,
            'password' => $password,
            'email' => $email,
            'ip_address' => $ip_address,
            '$promo_code' => $promo_code
        ];

        $params_query = http_build_query($params);
        $api_success_flag = file_get_contents($this->k365_domain_name."/secure_scripts_4818239/create_player_358123.php?".$params_query);
        return $api_success_flag;
    }

}