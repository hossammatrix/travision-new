<?php

namespace App\Models\Tree;

use Illuminate\Database\Eloquent\Model;
use App\Traits\TreeTrait;

class Ledger extends Model
{
  use TreeTrait;
  protected $guarded = [];
}
