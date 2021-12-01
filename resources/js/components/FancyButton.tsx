import { Component, MouseEventHandler, ReactNode } from "react"

interface FancyButtonTypes {
    submit: string
    cancel: string
    other: string
}

type FancyButtonType = keyof FancyButtonTypes

interface FancyButtonProps {
    type: FancyButtonType
    onClick: MouseEventHandler<HTMLButtonElement>
    loading: boolean
    value?: string
    className?: string
}

export default class FancyButton extends Component<FancyButtonProps> {
    constructor(props: FancyButtonProps) {
        super(props);
    }

    getLabel(): string {
        return (this.props.loading) ? 'Carregando...' : ({
            submit: 'Enviar',
            cancel: 'Cancelar',
        } as FancyButtonTypes)[this.props.type];
    }

    getClassName(): string {
        return ({
            submit: 'bg-green-100',
            cancel: 'bg-green-200',
        } as FancyButtonTypes)[this.props.type];
    }

    render(): ReactNode {
        const typeValue = (this.props.type === 'submit') ? 'submit' : undefined;

        return (
            <button type={typeValue} onClick={this.props.onClick} className={`rounded py-2 px-4 ${this.getClassName()} ${this.props.className || ''}`}>
                {this.props.value || this.getLabel()}
            </button>
        )
    }
}
