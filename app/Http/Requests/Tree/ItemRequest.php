<?php

namespace App\Http\Requests\Chart;

use App\Rules\ItemUnitsRule;
use Illuminate\Foundation\Http\FormRequest;

class ItemRequest extends FormRequest
{
  public function authorize()
  {
    return true;
  }

  public function rules()
  {
    if (request()->is_group == 1) {
      return [
        'ar_name' => ['required', 'string', 'max:255', 'unique:items,ar_name,' . request()->id],
        'en_name' => ['required', 'string', 'max:255', 'unique:items,en_name,' . request()->id],
      ];
    }

    return [
      'ar_name' => ['required', 'string', 'max:255', 'unique:items,ar_name,' . request()->id],
      'en_name' => ['required', 'string', 'max:255', 'unique:items,en_name,' . request()->id],
      'units' => ['bail', 'required', new ItemUnitsRule],
      'units.*.unit_id' => ['required', 'distinct'],
      'units.*.parameter' => ['required', 'distinct']
    ];
  }
}
