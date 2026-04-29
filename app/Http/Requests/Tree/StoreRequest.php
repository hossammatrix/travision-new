<?php

namespace App\Http\Requests\Chart;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
  public function authorize()
  {
    return true;
  }

  public function rules()
  {
    if (request()->is_group == 1) {
      return [
        'ar_name' => ['required', 'string', 'max:255', 'unique:stores,ar_name,' . request()->id],
        'en_name' => ['required', 'string', 'max:255', 'unique:stores,en_name,' . request()->id],
      ];
    }

    return [
      'ar_name' => ['required', 'string', 'max:255', 'unique:stores,ar_name,' . request()->id],
      'en_name' => ['required', 'string', 'max:255', 'unique:stores,en_name,' . request()->id],
      'stock_ledger_id' => 'required',
    ];
  }
}
