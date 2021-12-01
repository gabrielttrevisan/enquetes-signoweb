<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Enquetes</title>

        <script type="text/javascript">
            const useProps = () => ({!! json_encode($props, JSON_HEX_QUOT) !!})
            const useCsrf = () => '{!! csrf_token() !!}'
        </script>

        <link rel="stylesheet" href="/css/app.css">
    </head>

    <body class="antialiased">
        <div id="root">

        </div>

        <script src='/js/app.js'></script>
    </body>
</html>
