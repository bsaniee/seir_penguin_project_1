//App State//

const state = {
    player1: 0,
    player2: 0,
    currentQuestion: {},
    which: true,
}

let questions = []

//Main DOM elements

const $question = $("#question")
const $a = $("#a")
const $b = $("#b")
const $c = $("#c")
const $d = $("#d")
const $e = $("#e")
const $p1score = $("#player1 h4")
const $p2score = $("#player2 h4")

//functions//
const chooseAnswer = function(event, question) {
    console.log(event)
    if(event.target.innerText === question.answer) {
        if (state.which) {
            state.player1++
            state.which = !state.which
        }
        else {state.player2++
        state.which = !state.which}
        setBoard(questions)
    }
    else {setBoard(questions)
    state.which = !state.which}
}

const setBoard = function(q) {
    const randomIndex = Math.floor(Math.random()*q.length)
    const randomQuestion = q[randomIndex]
//update question
    $question.text(randomQuestion.question)
    $a.text(randomQuestion.answerA)
    $b.text(randomQuestion.answer)
    $c.text(randomQuestion.answerB)
    $d.text(randomQuestion.answerD)
    $e.text(randomQuestion.answerC)

    //update player score$
    $p1score.text(state.player1)
    $p2score.text(state.player2)
    $('li').off()
    $('li').on("click", function(event) {
        chooseAnswer(event, randomQuestion)
    })
}


//Main App Logic//
const URL = "https://cdn.contentful.com/spaces/b499qcicfakh/environments/master/entries?access_token=vFHobRtgXgET_vGmEu_mj3NNMDlHCEJBlHfiBbNIVPM&content_type=triviaQ"

$.ajax(URL)
.then(function(data) {
    questions = data.items.map((q) =>q.fields
    )
    console.log(data)
    console.log(questions)
    setBoard(questions)
})