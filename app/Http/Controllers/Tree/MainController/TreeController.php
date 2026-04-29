<?php

namespace App\Http\Controllers\Tree\MainController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TreeController extends Controller
{
  use ChosenTrait;

  public $treeName, $treePath, $model, $modelRequest;

  protected function initTree($treeName)
  {
    $this->treeName = $treeName;
    $this->setTreePath();
    $this->setTreeModel();
    $this->setTreeRequest();
  }

  private function setTreeModel()
  {
    $className = ucfirst($this->treeName);
    $fullClass = 'App\\Models\\Tree\\' . $className;

    if (class_exists($fullClass)) {
      $this->model = new $fullClass();
    } else {
      throw new \Exception("Class {$fullClass} does not exist");
    }
  }

  private function setTreeRequest()
  {
    $className = ucfirst($this->treeName) . 'Request';
    $fullClass = 'App\\Http\\Requests\\Tree\\' . $className;
    $defaultClass = 'App\\Http\\Requests\\Tree\\TreeRequest';

    if (class_exists($fullClass)) {
      $this->modelRequest = $fullClass;
    } elseif (class_exists($defaultClass)) {
      $this->modelRequest = $defaultClass;
    } else {
      throw new \Exception("Neither {$fullClass} nor {$defaultClass} exist");
    }
  }

  private function setTreePath()
  {
    // same as 'tree/ledger/Ledger'
    $folder = ucfirst($this->treeName);
    $this->treePath = "tree/{$this->treeName}/{$folder}";
  }

  public function index(Request $request)
  {
    $rows = $this->model::query()
      ->with('parent')
      ->orderBy('id')
      ->get();
    $originalData = $this->buildTree($rows);
    $treeCategories = $this->treeCategories($this->treeName);
    // $srcData = [
    //   'ledgers' => $this->chosen($this->treeName),
    // ];
    $data = compact('originalData', 'treeCategories');

    return Inertia::render($this->treePath, $data);
  }

  public function store(Request $request)
  {
    app()->make($this->modelRequest);

    $node = $this->model::create([
      'ar_name' => $request->ar_name,
      'en_name' => $request->en_name,
      'is_group' => $request->is_group,
      'parent_id' => $request->parent_id,
    ]);

    $node->refresh();

    return redirect()->back()->with([
      'response' => [
        'newNode' => $node
      ]
    ]);
  }

  public function update(Request $request)
  {
    app()->make($this->modelRequest);

    $node = $this->model::find($request->id);

    $node->update([
      'ar_name' => $request->ar_name,
      'en_name' => $request->en_name,
      'parent_id' => $request->parent_id,
    ], [
      'id' => $request->id
    ]);

    $node->refresh();

    return redirect()->back()->with([
      'response' => [
        'newNode' => $node
      ]
    ]);
  }

  protected function buildTree($items)
  {
    $grouped = $items->groupBy('parent_id');

    $build = function ($parentId) use (&$build, $grouped) {
      return ($grouped[$parentId] ?? collect())->map(function ($item) use ($build) {
        return [
          'nodeId'   => (string) $item->id,
          'nodeName' =>  $item->ar_name,
          'children' => $build($item->id),
          'id' => $item->id,
          'is_group' => (int) $item->is_group,
          'ar_name' => $item->ar_name,
          'en_name' => $item->en_name,
          'parent_id' => $item->parent_id,
          'category_path' => $item->categoryPath
        ];
      })->toArray();
    };

    return $build(null);
  }
}
