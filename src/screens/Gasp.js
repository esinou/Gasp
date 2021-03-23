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
            win: false
        }
    }
    componentDidMount() {
        this.resetGasp();
    }
    async resetGasp() {
        let newTable = [];

        for (let i = 0; i < 16; i++) {
            newTable.push(false);
        }
        await this.setState({
            table: newTable,
            win: false,
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
        let indexPosition = index % 4;

        if (indexPosition === 0 || indexPosition === 3) {
            cells.forEach(cell => {
                if (index + cell >= 0 && index + cell < this.state.table.length) {
                    if (indexPosition === 0 && acceptedDistance.includes((cell + index) % 4)) {
                        returnCells.push(cell);
                    } else if (indexPosition === 3 && !acceptedDistance.includes((cell + index) % 4)) {
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
            <div className="gaspTable">
                {this.state.table.map((element, index) => 
                    <div className="gaspCell" key={index}>
                        <div className={element ? "gaspCellWhite" : "gaspCellBlack"} onClick={() => this.gaspThisCell(index)}/>
                    </div>
                )}
            </div>
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