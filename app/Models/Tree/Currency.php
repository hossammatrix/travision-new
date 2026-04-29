<?php

namespace App\Models\Tree;

use App\Traits\TreeTrait;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
  use TreeTrait;
  protected $guarded = [];
}
