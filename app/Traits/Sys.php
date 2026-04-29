<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Str;

trait Sys
{
  use Userstamps;

  public function initializeSys()
  {
    $this->guarded = [];
  }

  public function getModelName()
  {
    return Str::snake(lcfirst(class_basename($this)));
  }

  public function creator()
  {
    return $this->belongsTo(User::class, 'created_by')->withDefault();
  }

  public function updator()
  {
    return $this->belongsTo(User::class, 'updated_by')->withDefault();
  }

  public function approver()
  {
    return $this->belongsTo(User::class, 'approved_by')->withDefault();
  }

  public function getIndexAttribute()
  {
    $model = Str::snake($this->getModelName());
    return route("{$model}.index");
  }

  public function getEditAttribute()
  {
    $model = Str::snake($this->getModelName());
    return route("{$model}.edit", $this->id);
  }

  public function getShowAttribute()
  {
    $model = Str::snake($this->getModelName());
    return route("{$model}.show", $this->id);
  }

  public function getPrintAttribute()
  {
    $model = Str::snake($this->getModelName());
    return route("{$model}.show", $this->id);
  }

  public function getInfoAttribute()
  {
    $model = Str::snake($this->getModelName());
    return route("{$model}.info", $this->id);
  }
}
