<?php

$contraseña = '5678911';

echo password_hash($contraseña, PASSWORD_ARGON2ID);