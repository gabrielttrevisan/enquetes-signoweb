import { Component, createRef, FormEvent, MouseEvent, ReactNode, RefObject } from "react"
import { CsrfInput } from "./CsrfInput"
import LabeledInput from "./LabeledInput"
import FancyButton from "./FancyButton"
import Axios, { AxiosResponse } from "axios"
import Enquete from "./Enquete"

interface NewEnqueteFormProps {
    onAdded: () => void
}

interface NewEnqueteFormState {
    loading: boolean
    titulo: string
    inicio: string
    fim: string
    resposta1: '',
    resposta2: '',
    resposta3: '',
}

export default class NewEnqueteForm extends Component<NewEnqueteFormProps, NewEnqueteFormState> {
    private tituloRef = createRef<HTMLInputElement>()
    private inicioRef = createRef<HTMLInputElement>()
    private fimRef = createRef<HTMLInputElement>()
    private tokenRef = createRef<HTMLInputElement>()
    private resposta1Ref = createRef<HTMLInputElement>()
    private resposta2Ref = createRef<HTMLInputElement>()
    private resposta3Ref = createRef<HTMLInputElement>()

    constructor(props: NewEnqueteFormProps) {
        super(props)
        this.state = {
            loading: false,
            titulo: '',
            inicio: '',
            fim: '',
            resposta1: '',
            resposta2: '',
            resposta3: '',
        }

        this.onClickHandler = this.onClickHandler.bind(this)
        this.reset = this.reset.bind(this)
    }

    reset() {
        this.setState({
            loading: false,
            titulo: '',
            inicio: '',
            fim: '',
            resposta1: '',
            resposta2: '',
            resposta3: '',
        })
    }

    onClickHandler(event: MouseEvent<HTMLButtonElement>) {
        const data = {
            titulo: this.tituloRef.current?.value,
            inicio: this.inicioRef.current?.value,
            fim: this.fimRef.current?.value,
            resposta1: this.resposta1Ref.current?.value,
            resposta2: this.resposta2Ref.current?.value,
            resposta3: this.resposta3Ref.current?.value,
            _token: this.tokenRef.current?.value,
        };
        event.preventDefault()
        this.setState({ ...this.state, loading: true })
        Axios
            .post('/enquetes/store', data)
            .then((response: AxiosResponse<{ data: boolean }>) => {
                if (response.data.data) {
                    this.reset()
                    this.props.onAdded()
                }
            })
            .catch(error => console.log(error.response))
    }

    render(): ReactNode {
        const inputClassNames = "py-2 px-4 rounded border border-gray-400 border-solid";

        return (
            <form className="p-4">
                <CsrfInput innerRef={this.tokenRef} />

                <LabeledInput
                    type='text'
                    name='titulo'
                    title='Título da Enquete'
                    placeholder="Digite aqui o título"
                    innerRef={this.tituloRef}
                    value={this.state.titulo}
                    className={inputClassNames}
                    onChange={e => this.setState({ ...this.state, titulo: e.target.value})}
                />

                <LabeledInput
                    type='date'
                    name='inicio'
                    title='Data Inicial'
                    innerRef={this.inicioRef}
                    value={this.state.inicio}
                    className={inputClassNames}
                    onChange={e => this.setState({ ...this.state, inicio: e.target.value})}
                />

                <LabeledInput
                    type='date'
                    name='fim'
                    title='Data Final'
                    innerRef={this.fimRef}
                    value={this.state.fim}
                    className={inputClassNames}
                    onChange={e => this.setState({ ...this.state, fim: e.target.value})}
                />

                <LabeledInput
                    type='text'
                    name='resposta1'
                    title='Primeira Resposta'
                    innerRef={this.resposta1Ref}
                    className={inputClassNames}
                    value={this.state.resposta1}
                    onChange={e => this.setState({ ...this.state, resposta1: e.target.value})}
                />

                <LabeledInput
                    type='text'
                    name='resposta2'
                    title='Segunda Resposta'
                    innerRef={this.resposta2Ref}
                    value={this.state.resposta2}
                    className={inputClassNames}
                    onChange={e => this.setState({ ...this.state, resposta2: e.target.value})}
                />

                <LabeledInput
                    type='text'
                    name='resposta3'
                    title='Terceira Resposta'
                    innerRef={this.resposta3Ref}
                    value={this.state.resposta3}
                    className={inputClassNames}
                    onChange={e => this.setState({ ...this.state, resposta3: e.target.value})}
                />

                <FancyButton
                    type='submit'
                    onClick={this.onClickHandler}
                    loading={this.state.loading}
                    value='Criar Enquete'
                />
            </form>
        );
    }
}
