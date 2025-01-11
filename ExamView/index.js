// import * as Exam from "./rula.js"

marked.use({
	extensions: [
		examTopDesc,
		examCenter,
		examOptions,
		examSingleOption,
	]})

const container = document.getElementById('content')
fetch('main.md').then(e => e.text())
.then(data => {
	container.innerHTML = marked.parse(data)
})