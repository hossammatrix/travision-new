<?php

namespace App\Http\Requests\Tree;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class TreeRequest extends FormRequest
{
  protected string $table;

  public function authorize(): bool
  {
    return true;
  }

  public function setTable(string $table): void
  {
    $this->table = $table;
  }

  public function rules(): array
  {
    $table = $this->table ?? 'default_table';
    $isGroup = $this->input('is_group') ?? 0; // default to 0 if null

    return [
      'ar_name' => [
        'required',
        'string',
        'max:255',
        Rule::unique($table)
          ->ignore($this->id)
          ->where(fn($query) => $query->where('is_group', $isGroup)),
      ],
      'en_name' => [
        'required',
        'string',
        'max:255',
        Rule::unique($table)
          ->ignore($this->id)
          ->where(fn($query) => $query->where('is_group', $isGroup)),
      ],
    ];
  }
}
