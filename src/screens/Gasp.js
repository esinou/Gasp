import React from 'react';

import '../styles/gasp.css'

export default class Gasp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cellsToTry: [
                -5,
                -4,
                -3,
                -1,
                1,
                3,
                4,
                5
            ],
            acceptedDistance: [
                0,
                1,
                -1,
            ],
            table: [],
            win: false,
            size: 100,
            lines: 10,
        }
    }
    componentDidMount() {
        this.resetGasp();
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
            ]
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
                <div className="gaspTable" style={{maxWidth: `${this.state.lines * 102}px`}}>
                    {this.state.table.map((element, index) => 
                        <div className="gaspCell" key={index}>
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
                <div className="gaspButton" onClick={() => this.resetGasp()}>
                    Play again
                </div>
            </>
        );
    }
    render() {
        return (
            <div className="globalContainer">
                {this.state.win === true ?
                this.renderWin()
                :
                this.renderGasp()}
            </div>
        )
    }
}