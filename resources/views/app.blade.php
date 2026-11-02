<!DOCTYPE html>
<html lang="{{ request()->routeIs('home') ? 'id' : str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php
            $siteTitle = 'Fadhil Rizki Fauzan - Portofolio';
            $siteDescription = 'Portofolio Fadhil Rizki Fauzan, full stack web developer asal Subang, Jawa Barat.';
            $siteUrl = request()->root();
        @endphp

        <title>{{ $siteTitle }}</title>
        <meta name="description" content="{{ $siteDescription }}">
        <link rel="canonical" href="{{ $siteUrl }}">

        {{-- Server rendered, because link previews in chat and Instagram do not run JavaScript. --}}
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Fadhil Rizki Fauzan">
        <meta property="og:title" content="{{ $siteTitle }}">
        <meta property="og:description" content="{{ $siteDescription }}">
        <meta property="og:url" content="{{ $siteUrl }}">
        <meta property="og:image" content="{{ $siteUrl }}/images/og.jpg">
        <meta property="og:image:type" content="image/jpeg">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="id_ID">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $siteTitle }}">
        <meta name="twitter:description" content="{{ $siteDescription }}">
        <meta name="twitter:image" content="{{ $siteUrl }}/images/og.jpg">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }

            @if (request()->routeIs('home'))
                /* The portfolio page is permanently dark, in both OS themes. */
                html,
                html.dark {
                    background-color: #0b1e22;
                }
            @endif
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head />
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
