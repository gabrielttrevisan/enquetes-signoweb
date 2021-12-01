import { Component, ReactNode } from "react"

interface DeleteButtonProps {
    onDelete: () => void
}

export default class DeleteButton extends Component<DeleteButtonProps> {
    constructor(props: DeleteButtonProps) {
        super(props)
    }

    render(): ReactNode {
        return (
            <button className="p-2 text-sm text-red-400 hover:bg-red-100 rounded" onClick={this.props.onDelete}>
                Excluir
            </button>
        )
    }
}
