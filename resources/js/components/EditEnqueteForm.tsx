import { ChangeEvent, Component, createRef, FormEvent, MouseEvent, ReactNode, RefObject } from "react"
import { CsrfInput } from "./CsrfInput"
import LabeledInput from "./LabeledInput"
import FancyButton from "./FancyButton"
import Axios, { AxiosResponse } from "axios"
import Enquete from "./Enquete"

interface EditEnqueteFormProps {
    onEdited: () => void
    enquete: Enquete
}

interface EditEnqueteFormState {
    loading: boolean
    titulo: string
    inicio: string
    fim: string
}

export default class EditEnqueteForm extends Component<EditEnqueteFormProps, EditEnqueteFormState> {
    private tituloRef = createRef<HTMLInputElement>()
    private inicioRef = createRef<HTMLInputElement>()
    private fimRef = createRef<HTMLInputElement>()
    private tokenRef = createRef<HTMLInputElement>()

    constructor(props: EditEnqueteFormProps) {
        super(props)
        this.state = {
            loading: false,
            titulo: this.props.enquete.titulo,
            inicio: this.props.enquete.inicio.replace(/(\d{4})\-(\d{2})\-(\d{2})([a-zA-Z0-9\:\.]*)/i, '$1-$2-$3'),
            fim: this.props.enquete.fim.replace(/(\d{4})\-(\d{2})\-(\d{2})([a-zA-Z0-9\:\.]*)/i, '$1-$2-$3'),
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
        })
    }

    onClickHandler(event: MouseEvent<HTMLButtonElement>) {
        const data = {
            id: this.props.enquete.id,
            titulo: this.tituloRef.current?.value,
            inicio: this.inicioRef.current?.value,
            fim: this.fimRef.current?.value,
            _token: this.tokenRef.current?.value,
        };
        event.preventDefault()
        this.setState({ ...this.state, loading: true })
        Axios
            .patch('/enquetes/update', data)
            .then((response: AxiosResponse<{ data: boolean }>) => {
                if (response.data.data) {
                    this.reset()
                    this.props.onEdited()
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ ...this.state, titulo: e.target.value})}
                />

                <LabeledInput
                    type='date'
                    name='inicio'
                    title='Data Inicial'
                    innerRef={this.inicioRef}
                    value={this.state.inicio}
                    className={inputClassNames}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ ...this.state, inicio: e.target.value})}
                />

                <LabeledInput
                    type='date'
                    name='fim'
                    title='Data Final'
                    innerRef={this.fimRef}
                    value={this.state.fim}
                    className={inputClassNames}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ ...this.state, fim: e.target.value})}
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
