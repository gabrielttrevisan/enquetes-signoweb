import axios, { AxiosResponse } from "axios";
import { Component, ReactNode, MouseEvent, createRef } from "react"
import { Resposta } from "./Enquete";
import FancyButton from "./FancyButton";

interface RespostasListProps {
    enqueteId: number
}

interface RespostasListState {
    respostas: Resposta[]
    loading: boolean
    adicional: string
}

export default class RespostasList extends Component<RespostasListProps, RespostasListState> {
    private tituloRef = createRef<HTMLInputElement>()

    constructor(props: RespostasListProps) {
        super(props)
        this.state = {
            respostas: [],
            loading: false,
            adicional: '',
        }
        this.loadRespostas = this.loadRespostas.bind(this)
        this.onClickHandler = this.onClickHandler.bind(this)
        this.onAdicionarClickHandler = this.onAdicionarClickHandler.bind(this)
    }

    loadRespostas() {
        this.setState({ ...this.state, loading: true })
        axios.get(`/respostas/get/${this.props.enqueteId}`).then((response: AxiosResponse<{ data: Resposta[] }>) => {
            this.setState({
                loading: false,
                respostas: response.data.data,
            });
        });
    }

    componentDidMount() {
        this.loadRespostas()
    }

    onClickHandler(id: number) {
        return (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            axios.patch('/respostas/vote', {
                resposta: id
            }).then((response: AxiosResponse<{ data: boolean }>) => {
                if (response.data.data) {
                    this.loadRespostas()
                }
            })
        }
    }

    onAdicionarClickHandler(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        axios
            .post('/enquetes/add', {
                enquete: this.props.enqueteId,
                titulo: this.tituloRef.current?.value,
            })
            .then((response: AxiosResponse<{ data: boolean }>) => {
                if (response.data.data) {
                    this.loadRespostas()
                    this.setState({ ...this.state, adicional: '' })
                }
            })
    }

    onExcluirClickHandler(id) {
        return () => {
            axios
                .delete('/respostas/delete/' + id)
                .then((response: AxiosResponse<{ data: boolean }>) => {
                    if (response.data.data) {
                        this.loadRespostas()
                    }
                })
        }
    }

    render(): ReactNode {
        return (
            <>
                {this.state.loading ? 'Carregando...' : this.state.respostas.length === 0 ? 'Não há respostas para essa enquete...' :
                    this.state.respostas.map(resposta =>
                        <div className="flex flex-row">
                            <button key={resposta.id} className="cursor-pointer hover:bg-gray-100 py-2 flex-grow rounded" onClick={this.onClickHandler(resposta.id) }>
                                {resposta.id}. {resposta.titulo} - {resposta.votos} voto(s).
                            </button>

                            <button className="p-2 text-sm text-red-400 hover:bg-red-100 rounded" onClick={this.onExcluirClickHandler(resposta.id)}>
                                Excluir
                            </button>
                        </div>
                    )
                }

                <form className="flex flex-row justify-center items-center">
                    <input
                        ref={this.tituloRef}
                        type='text'
                        name='respota'
                        placeholder="Nova Resposta"
                        className="py-2 px-4 rounded border border-gray-400 border-solid mr-4 "
                        value={this.state.adicional}
                        onChange={e => this.setState({ ...this.state, adicional: e.target.value })}
                    />

                    <FancyButton
                        type="submit"
                        value="+ Resposta"
                        onClick={this.onAdicionarClickHandler}
                        loading={this.state.loading}
                    />
                </form>
            </>
        )
    }
}
