import React from 'react';

import '../styles/gasp.css'

export default class Gasp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cellToTry: [
                -5,
                -4,
                -3,
                -1,
                1,
                3,
                4,
                5
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
    gaspThisCell(index) {
        const { cellToTry, table } = this.state;
        let newTable = table;

        cellToTry.forEach(cell => {
            if (table[index + cell] === false || table[index + cell]) {
                console.log(!newTable[index + cell])
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
