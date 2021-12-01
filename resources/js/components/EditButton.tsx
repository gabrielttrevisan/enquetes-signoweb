import { Component, ReactNode, MouseEvent } from "react"

interface EditButtonProps {
    onEdit: (e: MouseEvent<HTMLButtonElement>) => void
}

export default class EditButton extends Component<EditButtonProps> {
    constructor(props: EditButtonProps) {
        super(props)
    }

    render(): ReactNode {
        return (
            <button className="p-2 text-sm text-gray-400 hover:bg-gray-100 rounded" onClick={this.props.onEdit}>
                Editar
            </button>
        )
    }
}
