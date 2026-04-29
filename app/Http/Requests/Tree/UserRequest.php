<?php

namespace App\Http\Requests\Chart;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
  public function authorize()
  {
    return true;
  }

  public function rules()
  {
    if (request()->is_group == 1) {
      return [
        'ar_name' => ['required', 'string', 'max:255', 'unique:users,ar_name,' . request()->id],
        'en_name' => ['required', 'string', 'max:255', 'unique:users,en_name,' . request()->id],
      ];
    }

    return [
      'name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . request()->id],
      'password' => ['required', 'string', 'min:8', 'confirmed'],
    ];
  }
}
