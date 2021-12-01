import { Component, HTMLProps, RefObject, ReactNode, FormEventHandler, FormEvent, ChangeEventHandler } from "react"

interface LabeledInputProps extends HTMLProps<HTMLInputElement> {
    title: string
    innerRef: RefObject<HTMLInputElement>
}

export default class LabeledInput extends Component<LabeledInputProps, any> {
    constructor(props: LabeledInputProps) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div className="flex flex-col w-full xl:w-auto py-4">
                <label htmlFor={this.props.name} className="pb-2 text-bold">
                    {this.props.title}:
                </label>
                <input
                    type={this.props.type}
                    id={this.props.name}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    ref={this.props.innerRef}
                    value={this.props.value}
                    className={this.props.className}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}
