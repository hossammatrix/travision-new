<?php

namespace App\Http\Controllers\Tree;

use App\Http\Controllers\Tree\MainController\TreeController;

class CurrencyController extends TreeController
{
  public function __construct()
  {
    $this->initTree('currency');
  }
}
