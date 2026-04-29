<?php

namespace App\Http\Requests\Chart;

use Illuminate\Foundation\Http\FormRequest;

class BankAccountRequest extends FormRequest
{
  public function authorize()
  {
    return true;
  }

  public function rules()
  {
    if (request()->is_group == 1) {
      return [
        'ar_name' => ['required', 'string', 'max:255', 'unique:bank_accounts,ar_name,' . request()->id],
        'en_name' => ['required', 'string', 'max:255', 'unique:bank_accounts,en_name,' . request()->id],
      ];
    }

    return [
      'ar_name' => ['required', 'string', 'max:255', 'unique:bank_accounts,ar_name,' . request()->id],
      'en_name' => ['required', 'string', 'max:255', 'unique:bank_accounts,en_name,' . request()->id],
      'ledger_id' => ['required', 'string', 'max:255', 'unique:bank_accounts,ledger_id,' . request()->id],
    ];
  }
}
