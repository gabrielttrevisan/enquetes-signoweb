import axios, { AxiosResponse } from "axios"
import { Component, ReactNode, MouseEvent, createRef } from "react"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import EditRespotstaForm from "./EditRespostaForm"
import { Resposta } from "./Enquete"
import FancyButton from "./FancyButton"
import Modal from "./Modal"
import RespostaItem from "./RespostaItem"

interface RespostasListProps {
    enqueteId: number
}

interface RespostasListState {
    respostas: Resposta[]
    loading: boolean
    adicional: string
    editing: boolean
}

export default class RespostasList extends Component<RespostasListProps, RespostasListState> {
    private tituloRef = createRef<HTMLInputElement>()

    constructor(props: RespostasListProps) {
        super(props)
        this.state = {
            respostas: [],
            loading: false,
            adicional: '',
            editing: false,
        }
        this.loadRespostas = this.loadRespostas.bind(this)
        this.onAdicionarClickHandler = this.onAdicionarClickHandler.bind(this)
        this.onEditarClickHandler = this.onEditarClickHandler.bind(this)
        this.onExecutedHandler = this.onExecutedHandler.bind(this)
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

    onEditarClickHandler(e: MouseEvent<HTMLButtonElement>) {
        this.setState({ ...this.state, editing: true })
    }

    onExecutedHandler() {
        this.loadRespostas()
    }

    render(): ReactNode {
        return (
            <>
                {this.state.loading ? 'Carregando...' : this.state.respostas.length === 0 ? 'Não há respostas para essa enquete...' :
                    this.state.respostas.map(resposta => <RespostaItem key={resposta.id} resposta={resposta} onExtecuted={this.onExecutedHandler} />)
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
