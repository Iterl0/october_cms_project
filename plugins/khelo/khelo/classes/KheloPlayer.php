<?php
namespace Khelo\Khelo\Classes;

use Illuminate\Support\Facades\Config;

class KheloPlayer
{
    private $userSid;

    private $userCashAvailable;

    private $userBonusBalance;

    private $userInplayBalance;

    private $userAvailableBalance;

    private $userVipLevel;

    private $userCompPoints;

    private $userTmoneyBalance;

    private $authorized;

    private $error;

    public function __construct($username, $password)
    {
        $xml = $this->attempt_login($username, $password);

        if (!$xml) {
            $this->authorized = false;
            $this->error = 'User with given credentials does not exist on game server. Please contact customer support';
            return;
        }

        $this->authorized = true;

        $user_bonus_balance = str_replace("Rs.","",$xml->USER_WALLETS->WALLET->BONUS_AVAILABLE);
        $this->userBonusBalance = str_replace(",","",$user_bonus_balance);

        $this->userSid = (string)$xml->sid;

        $user_cash_available = str_replace("Rs.","",$xml->USER_WALLETS->WALLET->CASH_AVAILABLE);
        $this->userCashAvailable = str_replace(",","",$user_cash_available);

        $user_inplay_balance = str_replace("Rs.","",$xml->USER_INFO->INPLAY_BALANCE);
        $this->userInplayBalance = str_replace(",","",$user_inplay_balance);

        $user_available_balance = str_replace("Rs.","",$xml->USER_WALLETS->WALLET->BALANCE);
        $this->userAvailableBalance = str_replace(",","",$user_available_balance);

        $user_tmoney_balance = str_replace("Rs.","",$xml->USER_WALLETS->WALLET->TM_AVAILABLE);
        $this->userTmoneyBalance = str_replace(",","",$user_tmoney_balance);

        $this->userVipLevel = (string)$xml->USER_INFO->LEVEL;

        $this->userCompPoints = 0;
    }

    /**
     * check if user exists on game server
     *
     * @param $username
     * @param $password
     * @return null|\SimpleXMLElement
     */
    protected function attempt_login($username, $password) {
        $url = Config::get('khelo.poker_api_client').'login?USERNAME='.$username.'&PASSWORD='.urlencode($password);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $data = curl_exec($ch);
        curl_close($ch);

        $xml=simplexml_load_string($data) or die(header("Location: ".Config::get('khelo.website_maintain_link')));

        return (isset($xml->USERID)) ? $xml : null;
    }

    public function getAllProps() {
        return (object)[
            'errors' => $this->error,
            'authorized' => $this->isAuthorized(),
            'userSid' => $this->getUserSid(),
            'userCashAvailable' => $this->userCashAvailable,
            'userBonusBalance' => $this->userBonusBalance,
            'userInplayBalance' => $this->userInplayBalance,
            'userAvailableBalance' => $this->userAvailableBalance,
            'userVipLevel' => $this->userVipLevel,
            'userCompPoints' => $this->userCompPoints,
            'userTmoneyBalance' => $this->userTmoneyBalance
        ];
    }

    public function getErrors() {
        return $this->error;
    }

    public function isAuthorized() {
        return $this->authorized;
    }

    public function getUserSid() {
        return $this->userSid;
    }

    public function getUserCashAvailable() {
        return $this->userCashAvailable;
    }

    public function getUserBonusBalance() {
        return $this->userBonusBalance;
    }

    public function getUserInplayBalance() {
        return $this->userInplayBalance;
    }

    public function getUserAvailableBalance() {
        return $this->userAvailableBalance;
    }

    public function getUserVipLevel() {
        return $this->userVipLevel;
    }

    public function getUserCompPoints() {
        return $this->userCompPoints;
    }

    public function getUserTmoneyBalance() {
        return $this->userTmoneyBalance;
    }
}