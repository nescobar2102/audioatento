<?php

class index extends CI_Controller {

    public function test1() {
        $p = array(5.50, 10.48, 12.69);
        $t = 0;
        foreach ($p as $i) {
            $t += $i;
        }
        return $t;
    }

    public function test2($loggedIn) {
        if ($loggedIn) {
            // more code here
        }
    }

    public function test3() {
        $goingToBeach = true;
        $money = 50.0;
        if ($money < 60.0) {
            $goingToBeach = false;
        }
        return $goingToBeach;
    }

    public function test4($person) {
        return $person->gender == 'male' ? 'Mr.' : ($person->isMarried ? 'Mrs.' : 'Miss');
    }

    public function test5($employeeType) {
        if ($employeeType === 'developer') {
            // more code here
        }
    }

    public function test6($age) {
        if ($age > 21) {
            // more code here
        }
    }

    public function test7($status) {
        if ($status === 2) {
            // more code here
        }
    }

    public function test8($fileExtension) {
        $os = array("mp4", "mpg", "avi");

        if (in_array($fileExtension, $os)) {
            // more code here
        }
    }

    public function test9($a = 54) {

        if ($a != '54') {
            // more code here
        }
    }

    /* eilimanda se unico con testSaveUser2 
      public function testSaveUser1($firstName, $lastName, $state, $zip, $phone)
      {
      }
     */

    public function testSaveUser2($firstName, $lastName, $email, $phone, $state = false, $zip = false) {
        if ((!empty($firstName)) && (!empty($lastName)) && (!empty($email)) && (!empty($phone))) {

            // save user
            $this->testSaveUser3($email);
        } else {
            throw new \Exception(' is required');
        }
    }

    public function testSaveUser3($emailUser) {
        // save user
        if ($emailUser) {
            // email user
        }
    }

    public function testSwitch($room, $on) {
        if ($on) {
            switch ($room) {
                case 1 : 'room vale' . $room;
                    break;
                case 3 : 'room vale' . $room;
                    break;
                default :
                    echo 'no tiene valor';
                    break;
            }
        } else {
            // more code here
        }
    }

}
