<?php

namespace App\Http\Controllers;

use App\Http\Requests\RespostaVoteRequest;
use App\Models\Enquete;
use App\Models\Resposta;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class RespostaApiController extends Controller
{
    public function get(Enquete $enquete)
    {
        return Response::json([
            'data' => Resposta::where('enquete_id', $enquete->id)->get()
        ]);
    }

    public function vote()
    {
        $resposta = Resposta::findOrFail(Request::input('resposta'));
        $enquete = $resposta->enquete()->first();

        if (Carbon::now()->between($enquete->inicio, $enquete->fim))
        {
            $resposta->votos = $resposta->votos + 1;
            $resposta->save();

            return Response::json(
                [
                    'data' => true,
                ]
            );
        }
        else
        {
            return Response::json(
                [
                    'data' => false,
                ]
            );
        }
    }

    public function delete(Resposta $resposta)
    {
        $count = Resposta::where('enquete_id', $resposta->enquete_id)->count();

        if ($count > 3)
        {
            $resposta->delete();

            return Response::json(
                [
                    'data' => true,
                ]
            );
        }
        else
        {
            return Response::json(
                [
                    'data' => false,
                ]
            );
        }
    }
}
