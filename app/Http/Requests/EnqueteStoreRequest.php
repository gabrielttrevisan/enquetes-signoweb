<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EnqueteStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'titulo' => [ 'required', 'string', 'max:150' ],
            'inicio' => [ 'required' ],
            'fim' => [ 'required' ],
            'resposta1' => [ 'required', 'string', 'max:150', 'min:1' ],
            'resposta2' => [ 'required', 'string', 'max:150', 'min:1' ],
            'resposta3' => [ 'required', 'string', 'max:150', 'min:1' ],
        ];
    }
}
