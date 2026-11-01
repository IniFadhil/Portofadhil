<?php

/**
 * Vercel's serverless entry point. Vercel serves PHP from the `api` directory,
 * so this hands the request to Laravel's own front controller.
 */
require __DIR__.'/../public/index.php';
