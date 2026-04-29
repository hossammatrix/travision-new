<?php

namespace App\Traits;

trait Userstamps
{
  public static function bootUserstamps()
  {
    static::creating(function ($model) {
      if ($model->usesTimestamps() === false) {
        return true;
      }

      $userId = 2;

      if (auth()->user()) {
        $userId = auth()->user()->id;
      }

      $model->created_by = $userId;
      $model->updated_by = $userId;
    });

    static::updating(function ($model) {
      if ($model->usesTimestamps() === false) {
        return true;
      }

      $model->updated_by = auth()->user()->id;
    });
  }

  public function getShortCreatedDateAttribute()
  {
    return $this->created_at->format('Y-m-d');
  }
}
