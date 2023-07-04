<!--import TTTModal from "../components/TTTModal";-->
<!--import { useState } from "react";-->

<!--let cellArrayInitialized = [];-->

<!--for (let i = 1; i <= 9; i++) {-->
<!--    const obj = { id: i, value: { i } };-->
<!--    cellArrayInitialized.push(obj);-->
<!--}-->

<!--export default function TTT() {-->
<!--    const [cellArray, setCellArray] = useState(cellArrayInitialized);-->
<!--    const [messageBoard, setMessageBoard] = useState("Status board");-->

<!--    <div className="ttt">-->
<!--    <div className="status-board">{messageBoard}</div>-->
<!--    <div className="tic-tac-toe-table">-->
<!--    {cellArray.map((cell) => (-->
<!--    <button className="tic-tac-toe-table-button"-->
<!--    key={cell.id}-->
<!--    onClick={() => { console.log(cell.id) }}>-->
<!--    Div {cell.id}-->
<!--    </button>-->
<!--    ))}-->
<!--    </div>-->
<!--    </div>-->


<!--<style>-->
<!--    .ttt {-->
<!--        padding: 20px;-->
<!--        font-size: 30px;-->
<!--    }-->

<!--    .status-board {-->
<!--        padding: 20px;-->
<!--        margin: auto;-->
<!--        max-width: 700px;-->
<!--        text-align: center;-->
<!--        background-color: var(&#45;&#45;navbar);-->
<!--        border: 1px solid var(&#45;&#45;border);-->
<!--    }-->

<!--    .tic-tac-toe-table {-->
<!--        display: grid;-->
<!--        grid-template-columns: auto auto auto;-->
<!--        gap: 10px;-->
<!--        padding: 10px;-->
<!--        margin: auto;-->
<!--        max-width: 700px;-->
<!--    }-->

<!--    .tic-tac-toe-table-button {-->
<!--        color: var(&#45;&#45;text);-->
<!--        font: inherit;-->
<!--        background-color: var(&#45;&#45;navbar);-->
<!--        text-align: center;-->
<!--        padding: 20px;-->
<!--        outline: none;-->
<!--        border: 1px solid var(&#45;&#45;border);-->
<!--    }-->

<!--    .tic-tac-toe-table-button:hover {-->
<!--        background-color: var(&#45;&#45;link-faded);-->
<!--    }-->
<!--</style>-->