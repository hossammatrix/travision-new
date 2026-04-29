<?php

namespace App\Http\Controllers\Tree\MainController;

trait ChosenTrait
{
  private function getChosen($src, $isGroup, $token = ['ar_name', 'en_name'], $path = "App\Models\Tree")
  {
    $modelClass = rtrim($path, '\\') . '\\' . ucfirst($src);

    if (!class_exists($modelClass)) {
      throw new \Exception("Model class {$modelClass} not found.");
    }

    $data = $modelClass::query()
      ->where('is_group', $isGroup)
      ->get()
      ->map(function ($item) use ($token) {
        return [
          'id' => (string) $item->id,
          'name' => $item->ar_name,
          'token' => collect($token)->map(fn($t) => $item->$t)->join(' - '),
        ];
      });

    return $data;
  }

  public function chosen($src, $token = ['ar_name', 'en_name'], $path = "App\Models\Tree")
  {
    return $this->getChosen($src, 0, $token, $path);
  }

  public function treeCategories($src, $path = "App\Models\Tree")
  {
    $modelClass = rtrim($path, '\\') . '\\' . ucfirst($src);

    if (!class_exists($modelClass)) {
      throw new \Exception("Model class {$modelClass} not found.");
    }

    $data = $modelClass::query()
      ->where('is_group', 1)
      ->get()
      ->map(function ($item) {
        return [
          'id' => (string) $item->id,
          'name' => $item->parent_path,
          'token' => $item->parent_path,
        ];
      });

    return $data;
  }
}
