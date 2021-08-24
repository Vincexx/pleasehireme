<?php

namespace App\Services;

use App\Repositories\Interfaces\EventRepositoryInterface;

class EventService {

    protected $repository;

    public function __construct(EventRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getList() {
        
        $events = $this->repository->getList();

        if($events) {
            return response()->json($events, 200);
        } else {
            return response()->json(['message' => 'Error']);
        }

    }

    public function canStore($fields) {
        $data = [
            'name' => $fields->name,
            'start_date' => $fields->start_date,
            'end_date' => $fields->end_date
        ];

        $events = $this->repository->canStore($data);

        if($events) {
            return response()->json([
                'message' => 'Event has been created.'
            ], 200);
        } else {
            return response()->json(['message' => 'Error']);
        }
    }

}