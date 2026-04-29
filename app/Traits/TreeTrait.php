<?php

namespace App\Traits;

trait TreeTrait
{
  use Sys;

  public function getNameAttribute()
  {
    return $this->ar_name;
    // return app()->getLocale() == 'en' ? $this->en_name : $this->ar_name;
  }

  public function children()
  {
    return $this->hasMany($this::class, 'parent_id');
  }

  public function parent()
  {
    return $this->belongsTo($this::class, 'parent_id');
  }

  // get path for parents - used in chart-category chosen in create new group
  public function getParentPathAttribute()
  {
    return $this->buildCategoryPath($this);
  }

  public function getCategoryPathAttribute()
  {
    return $this->buildCategoryPath($this->parent);
  }

  private function buildCategoryPath($entity)
  {
    if ($entity === null) return null;
    if ($entity->parent && $entity->parent->is_group == 1) {
      return $this->buildCategoryPath($entity->parent) . ' / ' . $entity->name;
    }

    return $entity->name;
  }
}
