import React from 'react';

import '../styles/gasp.css'

export default class Gasp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cellsToTry: [],
            acceptedDistance: [
                0,
                1,
                -1,
            ],
            table: [],
            size: 0,
            sizeInput: "",
            lines: 0,
            inputError: false,
            inputErrorMsg: "",
            win: false,
        }
    }
    componentDidMount() {

    }
    handleChange = (propertyName, value) => {
        this.setState({ [propertyName]: value });
    }
    async playAgain() {
        await this.setState({
            cellsToTry: [],
            acceptedDistance: [
                0,
                1,
                -1,
            ],
            table: [],
            size: 0,
            sizeInput: "",
            lines: 0,
            inputError: false,
            inputErrorMsg: "",
            win: false,
        })
    }
    async playGasp() {
        await this.setState({
            inputError: false,
            inputErrorMsg: "",
        })

        if (this.state.sizeInput < 4) {
            await this.setState({
                inputError: true,
                inputErrorMsg: "Size must be > 3",
            })
        } else {
            await this.setState({
                size: parseInt(this.state.sizeInput) * parseInt(this.state.sizeInput),
                lines: parseInt(this.state.sizeInput)
            })
            await this.resetGasp();    
        }
    }
    async resetGasp() {
        let newTable = [];

        for (let i = 0; i < this.state.size; i++) {
            newTable.push(false);
        }
        await this.setState({
            table: newTable,
            win: false,
            cellsToTry: [
                -this.state.lines - 1,
                -this.state.lines,
                -this.state.lines + 1,
                -1,
                1,
                this.state.lines - 1,
                this.state.lines,
                this.state.lines + 1
            ],
            lines: Math.sqrt(this.state.size)
        })
        this.checkWin();
    }
    checkWin() {
        if (!this.state.table.includes(false)) {
            this.setState({
                win: true
            });
        }
    }
    adaptCellsToTry(index) {
        const { acceptedDistance } = this.state;
        let cells = [...this.state.cellsToTry];
        let returnCells = [];
        let indexPosition = index % (this.state.size / this.state.lines);
        let lineWidth = this.state.size / this.state.lines;

        if (indexPosition === 0 || indexPosition === lineWidth - 1) {
            cells.forEach(cell => {
                if (index + cell >= 0 && index + cell < this.state.table.length) {
                    if (indexPosition === 0 && acceptedDistance.includes((cell + index) % lineWidth)) {
                        returnCells.push(cell);
                    } else if (indexPosition === lineWidth - 1 && !acceptedDistance.includes((cell + index) % lineWidth)) {
                        returnCells.push(cell);
                    }
                }
            })
        } else {
            returnCells = cells;
        }
        return (returnCells);
    }
    async gaspThisCell(index) {
        let newTable = this.state.table;
        let cellsToTry = this.adaptCellsToTry(index);

        cellsToTry.forEach(cell => {
            if (index + cell >= 0 && index + cell < newTable.length) {
                newTable[index + cell] = !newTable[index + cell];
            }
        });
        await this.setState({
            table: newTable
        });
        this.checkWin();
    }
    renderGasp() {
        return (
            <>
                <div className="gaspTitle">
                    GASP
                </div>
                <div className="gaspTable">
                    {this.state.table.map((element, index) => 
                        <div className="gaspCell" style={{width: `${window.innerWidth * 0.33 / this.state.lines - 2}px`, height: `${window.innerWidth * 0.33 / this.state.lines - 2}px`}} key={index}>
                            <div className={element ? "gaspCellWhite" : "gaspCellBlack"} onClick={() => this.gaspThisCell(index)}/>
                        </div>
                    )}
                </div>
                <div className="gaspResetButton" onClick={() => this.resetGasp()}>
                    Reset
                </div>
            </>
        );
    }
    renderWin() {
        return (
            <>
                <div className="winText">
                    You won!
                </div>
                <div className="gaspButton" onClick={() => this.playAgain()}>
                    Play again
                </div>
            </>
        );
    }
    renderMenu() {
        return (
            <>
                <div className="gaspTitle">
                    GASP
                </div>
                <input
                    type="number"
                    className={this.state.inputError ? "gaspInputError" : "gaspInput"}
                    placeholder="Enter map size (nb only)"
                    value={this.state.sizeInput}
                    onChange={(event) => this.handleChange("sizeInput", event.target.value)}
                />
                {this.state.inputError ?
                <div className="gaspError">
                    {this.state.inputErrorMsg}
                </div>
                :
                <div/>}
                <div className="gaspButton" onClick={() => this.playGasp()}>
                    Play
                </div>
            </>
        );
    }
    render() {
        return (
            <div className="globalContainer">
                <>
                    {this.state.size === 0 ?
                    this.renderMenu()
                    :
                    <>
                        {this.state.win === true ?
                        this.renderWin()
                        :
                        this.renderGasp()}
                    </>}
                </>
            </div>
        )
    }
}