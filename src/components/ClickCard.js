import React, { Component } from "react";
import "./style.css";
import clicks from '../click.json';

class ClickCards extends Component {

    state = {
        score: 0,
        clicked: [],
        clicks
    }

    startNewGame = () => {
        for (let i = clicks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [clicks[i], clicks[j]] = [clicks[j], clicks[i]];
        }
        this.setState({
            score: 0,
            clicked: [],
            clicks
        })
    }

    checkClick = event => {
        for (let i = 0; i < this.state.clicked.length; i++) {
            if (event.target.id === this.state.clicked[i]) {
                alert(`You have lost the game\nYour score was ${this.state.score}`);
                for (let i = clicks.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [clicks[i], clicks[j]] = [clicks[j], clicks[i]];
                }
                return this.startNewGame();
            }
        }

        for (let i = clicks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [clicks[i], clicks[j]] = [clicks[j], clicks[i]];
        }

        let joined = this.state.clicked.concat(event.target.id);
        this.setState({ clicked: joined, score: this.state.score + 1, clicks });
        this.state.score === 12 ? this.checkWin() : console.log("No win");
    }

    checkWin = () => {
        alert("You win!");
        this.startNewGame();
    }

    render() {
        return (
            <>
                <h1>Score: {this.state.score}</h1>
                {this.state.clicks.map(click => {
                    return (
                        <div className="img-container" key={click.id}>
                            <img alt={click.name} src={click.image} id={click.id} value={click.id} onClick={this.checkClick} />
                        </div>
                    )
                })}
            </>
        );

    }

}

export default ClickCards;