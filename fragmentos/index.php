<?php

session_start();

if (
    isset($_SESSION['fragmentos_authenticated']) &&
    $_SESSION['fragmentos_authenticated'] === true
) {
    header('Location: contenido.php');
    exit;
}

$error = '';

$config = require __DIR__ . '/../private_fragmentos/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $password = $_POST['password'] ?? '';

    if (password_verify($password, $config['password_hash'])) {

        session_regenerate_id(true);

        $_SESSION['fragmentos_authenticated'] = true;

        header('Location: contenido.php');
        exit;

    } else {

        $error = 'La contraseña ingresada no es correcta.';
    }
}

?>
<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <link href="../css/productos.css" rel="stylesheet">

    <meta name="robots" content="noindex, nofollow">

    <title>Fragmentos — Acceso privado</title>

</head>


<body>


<header>

    <a href="../productos.html" class="back">
        ← Volver
    </a>

</header>


<section class="hero">

    <div class="eyebrow">
        Book Test · Mentalismo
    </div>

    <h1>
        Fragmentos
    </h1>

    <div class="subtitle">
        Acceso privado
    </div>

    <p class="hero-text">
        Ingresá la contraseña que recibiste
        junto con tu ejemplar de Fragmentos
        para acceder al tutorial y al material
        del proyecto.
    </p>

</section>


<section class="login-section">

    <div class="login-box">

        <div class="eyebrow">
            Material para compradores
        </div>

        <h2>
            Ingresar al tutorial
        </h2>


        <?php if ($error): ?>

            <div class="login-error">
                <?php echo htmlspecialchars($error); ?>
            </div>

        <?php endif; ?>


        <form method="POST">

            <label for="password">
                Contraseña
            </label>

            <input
                type="password"
                id="password"
                name="password"
                autocomplete="current-password"
                required
            >

            <button type="submit">
                Acceder
            </button>

        </form>

    </div>

</section>


<footer>

    <span>
        © 2026 Mati Zaranto
    </span>

    <span>
        Fragmentos · Book Test
    </span>

</footer>


</body>
</html>