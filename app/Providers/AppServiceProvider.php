<?php

namespace App\Providers;

use App\Http\Requests\Tree\TreeRequest;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register(): void
  {
    //
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void
  {
    Vite::prefetch(concurrency: 3);
    // Tree dynamic request
    $this->app->resolving(TreeRequest::class, function (TreeRequest $request, $app) {
      $route = $request->route();
      $controller = optional($route)->getController();
      if (property_exists($controller, 'model')) {
        $request->setTable($controller->model->getTable());
      }
    });
  }
}
