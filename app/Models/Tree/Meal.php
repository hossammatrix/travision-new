<?php

namespace App\Models\Tree;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TreeTrait;

class Meal extends Model
{
  use TreeTrait;
  protected $guarded = [];
}
