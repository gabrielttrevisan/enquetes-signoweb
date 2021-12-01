import { Component, ReactNode } from "react"
import Enquete from "./Enquete"
import EnqueteItem from "./EnqueteItem"

interface EnqueteListProps {
    enquetes: Enquete[]
    loading: boolean
    onVoted: () => void
    onDelete: () => void
}

export default class EnqueteList extends Component<EnqueteListProps> {
    constructor(props: EnqueteListProps) {
        super(props)
    }

    render(): ReactNode {
        return (
            <ul className="py-4">
                {this.props.loading ? 'Carregando...' : this.props.enquetes.length > 0 ? this.props.enquetes.map(enquete => <EnqueteItem key={enquete.id} enquete={enquete} onVoted={this.props.onVoted} onDelete={this.props.onDelete} />) : 'Nenhuma enquete cadastrada...'}
            </ul>
        );
    }
}
