export interface Resposta {
    id: number
    titulo: string
    votos: number
    created_at: string
    updated_at: string
}

export default interface Enquete {
    id: number
    titulo: string
    inicio: string
    fim: string
    respostas: Resposta[]
    created_at: string
    updated_at: string
}
