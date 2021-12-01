import { Component, ReactNode } from "react"

export default class Card extends Component {
    constructor (props: any) {
        super(props)
    }

    render(): ReactNode {
        return (
            <div style={{ maxWidth: '70vw' }} className="px-6 my-0 mx-auto bg-green-50 text-center">
                {this.props.children}
            </div>
        );
    }
}
