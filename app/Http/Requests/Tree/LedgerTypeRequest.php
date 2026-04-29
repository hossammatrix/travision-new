<?php

namespace App\Http\Requests\Chart;

use Illuminate\Foundation\Http\FormRequest;

class LedgerTypeRequest extends FormRequest
{
  public function authorize()
  {
    return true;
  }

  public function rules()
  {
    if (request()->is_group == 1) {
      return [
        'ar_name' => ['required', 'string', 'max:255', 'unique:ledger_types,ar_name,' . request()->id],
        'en_name' => ['required', 'string', 'max:255', 'unique:ledger_types,en_name,' . request()->id],
      ];
    }

    return [
      'ar_name' => ['required', 'string', 'max:255', 'unique:ledger_types,ar_name,' . request()->id],
      'en_name' => ['required', 'string', 'max:255', 'unique:ledger_types,en_name,' . request()->id],
      'report_type_id' => 'required',
      'balance_type_id' => 'required',
      'sort_order' => 'required',
    ];
  }
}
