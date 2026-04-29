<?php

namespace App\Http\Requests\Chart;

use Illuminate\Foundation\Http\FormRequest;

class SupplierRequest extends FormRequest
{
  public function authorize()
  {
    return true;
  }

  public function rules()
  {
    return [
      'ar_name' => ['required', 'string', 'max:255'],
      'en_name' => ['required', 'string', 'max:255'],
    ];
  }
}
