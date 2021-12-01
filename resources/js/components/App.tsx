import { Component, ReactNode } from 'react'
import NewEnqueteForm from './NewEnqueteForm'
import Card from './Card'
import Enquete from './Enquete'
import axios, { AxiosResponse } from 'axios'
import EnqueteList from './EnqueteList'

interface AppProps {

}

interface AppState {
    enquetes: Enquete[]
    loading: boolean
}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)

        this.state = {
            enquetes: [],
            loading: false,
        }

        this.onAddedHandler = this.onAddedHandler.bind(this)
        this.loadEnquetes = this.loadEnquetes.bind(this)
        this.onVoted = this.onVoted.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onEdited = this.onEdited.bind(this)
    }

    loadEnquetes() {
        this.setState({ ...this.state, loading: true })
        axios.get('/enquetes').then((reponse: AxiosResponse<{ data: Enquete[] }>) => {
            this.setState({
                enquetes: reponse.data.data,
                loading: false,
            })
        });
    }

    componentDidMount() {
        this.loadEnquetes()
    }

    onAddedHandler() {
        this.loadEnquetes()
    }

    onVoted() {
        this.loadEnquetes()
    }

    onDelete() {
        this.loadEnquetes()
    }

    onEdited() {
        this.loadEnquetes()
    }

    render(): ReactNode {
        return (
            <Card>
                <h1>
                    Enquetes
                </h1>

                <NewEnqueteForm onAdded={this.onAddedHandler} />

                <EnqueteList enquetes={this.state.enquetes} loading={this.state.loading} onVoted={this.onVoted} onDelete={this.onDelete} onEdited={this.onEdited} />
            </Card>
        );
    }
}

export default App
