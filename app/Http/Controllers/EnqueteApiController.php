<?php

namespace App\Http\Controllers;

use App\Http\Requests\EnqueteStoreRequest;
use App\Http\Requests\EnqueteUpdateRequest;
use App\Models\Enquete;
use App\Models\Resposta;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Log;

class EnqueteApiController extends Controller
{
    /**
     * The function returns all quizes as JSON.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index()
    {
        $queryResult = Enquete::with('respostas')->get();

        return Response::json([
            'data' => $queryResult,
        ]);
    }

    /**
     * The function updates a quiz.
     *
     * @param Enquete $enquete
     * @param EnqueteUpdateRequest $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function update(EnqueteUpdateRequest $request)
    {
        Enquete::where('id', $request->safe()['id'])->update($request->safe([ 'titulo', 'fim', 'inicio' ]));

        return Response::json([
            'data' => true,
        ]);
    }

    /**
     * The function stores a quiz.
     *
     * @param EnqueteStoreRequest $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function store(EnqueteStoreRequest $request)
    {
        $created = Enquete::create($request->safe([ 'titulo', 'inicio', 'fim' ]));

        Resposta::create([
            'enquete_id' => $created->id,
            'titulo' => $request->safe()['resposta1'],
        ]);

        Resposta::create([
            'enquete_id' => $created->id,
            'titulo' => $request->safe()['resposta2'],
        ]);

        Resposta::create([
            'enquete_id' => $created->id,
            'titulo' => $request->safe()['resposta3'],
        ]);

        return Response::json(
            [
                'data' => true,
            ]
        );
    }

    /**
     * The function deletes a quiz.
     *
     * @param Enquete $enquete
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function destroy(Enquete $enquete)
    {
        $enquete->delete();

        return Response::json(
            [
                'data' => true,
            ]
        );
    }

    /**
     * The function adds an answer to a quiz.
     *
     * @param Enquete $enquete
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function addResposta()
    {
        $enquete = Enquete::findOrFail(Request::input('enquete'));
        $titulo = Request::input('titulo');

        Resposta::create([
            'enquete_id' => $enquete->id,
            'titulo' => $titulo,
        ]);

        return Response::json(
            [
                'data' => true,
            ]
        );
    }
}
