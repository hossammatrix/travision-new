<?php

namespace App\Http\Controllers\Tree;

use App\Http\Controllers\Tree\MainController\TreeController;

class MealController extends TreeController
{
  public function __construct()
  {
    $this->initTree('meal');
  }
}
