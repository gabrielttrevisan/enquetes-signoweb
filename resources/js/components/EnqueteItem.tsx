import { Component, ReactNode, MouseEvent } from "react"
import Enquete from "./Enquete";
import RespostasList from "./RespostasList";
import { dateMask } from "./utils";

interface EnqueteItemProps {
    enquete: Enquete
    onVoted: () => void
}

interface EnqueteItemState {
    expanded: boolean
}

export default class EnqueteItem extends Component<EnqueteItemProps, EnqueteItemState> {
    constructor(props: EnqueteItemProps) {
        super(props);
        this.state = {
            expanded: false,
        }
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    onClickHandler(event: MouseEvent<HTMLDivElement>) {
        if (event.target !== event.currentTarget) {
            this.setState({ expanded: !this.state.expanded })
        }
    }

    render(): ReactNode {
        return (
            <li className="flex flex-col p-2 hover:bg-white">
                <div className="flex flex-col transition-all hover:scale-110 transform" role='button' onClick={this.onClickHandler}>
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

                <div className={`transition-all overflow-hidden flex flex-col ${this.state.expanded ? 'h-auto py-4' : 'h-0 p-0'}`}>
                    <RespostasList enqueteId={this.props.enquete.id} />
                </div>
            </li>
        )
    }
}
