import { Component, ReactNode, MouseEvent } from "react"
import { Resposta } from "./Enquete";
import Modal from "./Modal"
import EditRespotstaForm from "./EditRespostaForm"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import axios, { AxiosResponse } from "axios";

interface RespostaItemProps {
    resposta: Resposta
    onExtecuted: () => void
}

interface RespostaItemState {
    editing: boolean
}

export default class RespostaItem extends Component<RespostaItemProps, RespostaItemState> {
    constructor(props: RespostaItemProps) {
        super(props)
        this.state = {
            editing: false
        }
        this.onEditarClickHandler = this.onEditarClickHandler.bind(this)
        this.onExcluirClickHandler = this.onExcluirClickHandler.bind(this)
        this.onClickHandler = this.onClickHandler.bind(this)

    }

    onEditarClickHandler(e: MouseEvent<HTMLButtonElement>) {
        this.setState({ ...this.state, editing: true })
    }

    onExcluirClickHandler() {
        axios
            .delete('/respostas/delete/' + this.props.resposta.id)
            .then((response: AxiosResponse<{ data: boolean }>) => {
                if (response.data.data) {
                    this.props.onExtecuted()
                }
            })
    }

    onClickHandler(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        axios.patch('/respostas/vote', {
            resposta: this.props.resposta.id
        }).then((response: AxiosResponse<{ data: boolean }>) => {
            if (response.data.data) {
                this.props.onExtecuted()
            }
        })
    }

    render(): ReactNode {
        return (
            <div className="flex flex-row">
                <Modal show={this.state.editing} onRequestClose={() => this.setState({ ...this.state, editing: false })}>
                    <EditRespotstaForm respostaId={this.props.resposta.id} respostaTitulo={this.props.resposta.titulo} onEdited={this.props.onExtecuted} />
                </Modal>

                <button
                    className="cursor-pointer hover:bg-gray-100 py-2 flex-grow rounded"
                    onClick={this.onClickHandler}
                >
                    {this.props.resposta.id}. {this.props.resposta.titulo} - {this.props.resposta.votos} voto(s).
                </button>

                <DeleteButton onDelete={this.onExcluirClickHandler} />

                <EditButton onEdit={this.onEditarClickHandler} />
            </div>
        )
    }
}
