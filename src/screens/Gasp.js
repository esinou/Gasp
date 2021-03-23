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
            actualise: '',
        }
    }
    componentDidMount() {
        this.resetGasp();
    }
    resetGasp() {
        let newTable = [];

        for (let i = 0; i < 16; i++) {
            newTable.push(false);
        }
        this.setState({
            table: newTable
        })
    }
    actualiseState() {
        this.setState({
            actualise: ''
        })
    }
    patchCorner(index, cells) {
        if (index === 0) {
            cells.splice(index, 1)
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
    gaspThisCell(index) {
        let newTable = this.state.table;
        let cellsToTry = this.adaptCellsToTry(index);

        cellsToTry.forEach(cell => {
            if (index + cell >= 0 && index + cell < newTable.length) {
                newTable[index + cell] = !newTable[index + cell];
            }
        })
        this.setState({
            table: newTable
        })
    }
    render() {
        return (
            <div className="globalContainer">
                <div className="gaspTable">
                    {this.state.table.map((element, index) => 
                        <div className="gaspCell" key={index}>
                            <div className={element ? "gaspCellWhite" : "gaspCellBlack"} onClick={() => this.gaspThisCell(index)}/>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}