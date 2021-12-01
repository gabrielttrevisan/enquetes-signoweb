import { Component, HTMLProps, ReactNode, RefObject } from "react"

interface CsrfProps {
    innerRef: RefObject<HTMLInputElement>
}

export class CsrfInput extends Component<CsrfProps, any> {
    constructor(props: any) {
        super(props);
    }

    render(): ReactNode {
        const value = useCsrf();

        return (
            <input type='hidden' name='_token' value={value} ref={this.props.innerRef} />
        );
    }
}

