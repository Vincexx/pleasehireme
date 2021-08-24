<?php

namespace App\Http\Controllers;

use App\Services\EventService;
use App\Http\Requests\Event\StoreRequest;

class EventController extends Controller
{
    private $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    public function list() {
        return $this->eventService->getList();
    }

    public function store(StoreRequest $request) {
        return $this->eventService->canStore($request);
    }
    
}
