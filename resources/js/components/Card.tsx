import { Component, ReactNode } from "react"

export default class Card extends Component {
    constructor (props: any) {
        super(props)
    }

    render(): ReactNode {
        return (
            <div>
                <style>
                    {`
                        .w-70-screen {
                            width: 70vw;
                        }

                        @media (max-width: 800px) {
                            .w-70-screen {
                                width: 100vw;
                            }
                        }
                    `}
                </style>
                <div className="px-6 my-0 mx-auto bg-green-50 text-center w-70-screen">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
