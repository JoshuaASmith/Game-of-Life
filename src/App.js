const React = require('react')
const gol = require('gol-functional')

const App = React.createClass({
    getInitialState() {
        return {sim: null, board: []}
    },
    componentDidMount() {
        const sim = gol({
            size: 10,
            speed: 1000,
            generate: true
        }, (board) => {
            this.setState({board})
        })
        this.setState({sim})
    },
    start() {
        this.state.sim.start()
    },
    stop() {
        this.state.sim.stop()
    },
    toggle(row, column) {
        return e => {
            this.state.sim.toggle(row, column)
            let board = this.state.board
            board[row][column] === 1
                ? board[row][column] = 0
                : board[row][column] = 1
            this.setState({board})
        }
    },
    // handleChange(field) {
    //     return e => {
    //         const newState = {}
    //         newState[field] = e.target.value
    //         this.setState(newState)
    //     }
    // },
    // handleSubmit(e) {
    //     e.preventDefault()
    //     // let sim = this.state.sim
    //     this.setState({sim})
    //     console.log(sim)
    // },
    render() {
        const row = cell => <td style={{
            height: '40px',
            width: '40px'
        }} className={cell === 1
            ? 'bg-yellow'
            : ''}></td>
        const column = cell => <tr>{cell.map(row)}</tr>
        return (
            <div className="pa4">
                <header>
                    <h1>GAME OF LIFE</h1>
                    <button onClick={this.start}>Start</button>
                    <button onClick={this.stop}>Stop</button>
                    {/* <form className="db" onSubmit={this.handleSubmit}>
                        <label className="dib" onChange={this.handleChange('size')}>Size of Square</label>
                        <input/>
                        <label className="dib" onChange={this.handleChange('speed')}>Speed of Game(in MS)</label>
                        <input/>
                        <button className="dib">Edit Form</button>
                    </form> */}
                </header>
                <hr/>
                <main>
                    <table>
                        <tbody>
                            {this.state.board.map(column)}
                        </tbody>
                    </table>
                </main>
            </div>
        )
    }
})

module.exports = App
