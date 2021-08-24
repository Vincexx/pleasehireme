<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use App\Repositories\Interfaces\EventRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Event;

class EventRepository implements EventRepositoryInterface {

    protected $event;

    public function __construct(Event $event)
    {
        $this->event = $event;
    }

    public function getList()
    {
        return DB::table('events')->get();
    }

    public function canStore($fields)
    {
        return DB::table('events')->insert($fields);
    }
}