<?php

namespace App\Repositories\Interfaces;

interface EventRepositoryInterface
{
    public function getList();

    public function canStore($fields);
}
