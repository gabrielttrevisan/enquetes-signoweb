import { Component, ReactNode } from "react"

interface ModalProps {
    show: boolean
    onRequestClose: () => void
}

export default class Modal extends Component<ModalProps> {
    constructor(props: ModalProps) {
        super(props)
    }

    render(): ReactNode {
        return (
            this.props.show ?
                    <div
                        className="fixed top-0 left-0 flex justify-center items-center"
                        style={{
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, .2)',
                            zIndex: '10000'
                        }}
                        onClick={e => { if (e.target === e.currentTarget) this.props.onRequestClose() }}
                    >
                        <div className="bg-white">
                            {this.props.children}
                        </div>
                    </div>
                :
                    <></>
        );
    }
}
