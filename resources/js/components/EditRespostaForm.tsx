import { ChangeEvent, Component, createRef, FormEvent, MouseEvent, ReactNode, RefObject } from "react"
import { CsrfInput } from "./CsrfInput"
import LabeledInput from "./LabeledInput"
import FancyButton from "./FancyButton"
import Axios, { AxiosResponse } from "axios"
import { Resposta } from "./Enquete"

interface EditRespotstaFormProps {
    onEdited: () => void
    respostaId: number
    respostaTitulo: string
}

interface EditRespotstaFormState {
    loading: boolean
    titulo: string
}

export default class EditRespotstaForm extends Component<EditRespotstaFormProps, EditRespotstaFormState> {
    private tituloRef = createRef<HTMLInputElement>()
    private tokenRef = createRef<HTMLInputElement>()

    constructor(props: EditRespotstaFormProps) {
        super(props)
        this.state = {
            loading: false,
            titulo: this.props.respostaTitulo,
        }

        this.onClickHandler = this.onClickHandler.bind(this)
        this.reset = this.reset.bind(this)
    }

    reset() {
        this.setState({
            ...this.state,
            loading: false,
            titulo: '',
        })
    }

    onClickHandler(event: MouseEvent<HTMLButtonElement>) {
        const data = {
            id: this.props.respostaId,
            titulo: this.tituloRef.current?.value,
            _token: this.tokenRef.current?.value,
        };
        event.preventDefault()
        this.setState({ ...this.state, loading: true })
        Axios
            .patch('/respostas/update', data)
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
