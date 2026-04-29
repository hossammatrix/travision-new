<?php

namespace App\Http\Controllers\Tree;

use App\Http\Controllers\Tree\MainController\TreeController;

class LedgerController extends TreeController
{
  public function __construct()
  {
    $this->initTree('ledger');
  }
}
