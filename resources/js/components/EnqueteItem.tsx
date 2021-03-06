import axios, { AxiosResponse } from "axios";
import { Component, ReactNode, MouseEvent } from "react"
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import EditEnqueteForm from "./EditEnqueteForm";
import Enquete from "./Enquete";
import Modal from "./Modal";
import RespostasList from "./RespostasList";
import { dateMask } from "./utils";

interface EnqueteItemProps {
    enquete: Enquete
    onVoted: () => void
    onDelete: () => void
    onEdited: () => void
}

interface EnqueteItemState {
    expanded: boolean
    show: boolean
}

export default class EnqueteItem extends Component<EnqueteItemProps, EnqueteItemState> {
    constructor(props: EnqueteItemProps) {
        super(props);
        this.state = {
            expanded: false,
            show: false,
        }
        this.onClickHandler = this.onClickHandler.bind(this)
        this.onEditarClickedHandler = this.onEditarClickedHandler.bind(this)
        this.onRequestClose = this.onRequestClose.bind(this)
    }

    onClickHandler(event: MouseEvent<HTMLDivElement>) {
        if (event.target !== event.currentTarget) {
            this.setState({ expanded: !this.state.expanded })
        }
    }

    onDeleteClickHandler(id: number) {
        return () => {
            axios.delete('/enquetes/delete/' + id).then((response: AxiosResponse<{ data: boolean }>) => {
                if (response.data.data) {
                    this.props.onDelete()
                }
            });
        }
    }

    onEditarClickedHandler(e: MouseEvent<HTMLButtonElement>) {
        this.setState({ ...this.state, show: true })
    }

    onRequestClose() {
        this.setState({ ...this.state, show: false })
    }

    render(): ReactNode {
        return (
            <li className="flex flex-col p-2 hover:bg-white">
                <Modal show={this.state.show} onRequestClose={this.onRequestClose}>
                    <EditEnqueteForm enquete={this.props.enquete} onEdited={this.props.onEdited} />
                </Modal>
                <div className="flex flex-row justify-center items-center transition-all hover:scale-110 transform gap-4" role='button'>
                    <div className="flex flex-col"  onClick={this.onClickHandler}>
                        <div className="text-lg">
                            {this.props.enquete.titulo}
                        </div>

                        <div className="flex flex-row justify-center items-center text-sm gap-2 text-gray-400">
                            <div>
                                <strong>Inicia em: </strong>
                                <span>{dateMask(this.props.enquete.inicio)}</span>
                            </div>

                            <div>
                                <strong>Termina em: </strong>
                                <span>{dateMask(this.props.enquete.fim)}</span>
                            </div>
                        </div>
                    </div>

                    <DeleteButton onDelete={this.onDeleteClickHandler(this.props.enquete.id)} />

                    <EditButton onEdit={this.onEditarClickedHandler} />
                </div>

                <div className={`transition-all overflow-hidden flex flex-col ${this.state.expanded ? 'h-auto py-4' : 'h-0 p-0'}`}>
                    <RespostasList enqueteId={this.props.enquete.id} />
                </div>
            </li>
        )
    }
}
