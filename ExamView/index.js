// import * as Exam from "./rula.js"

marked.use({
	extensions: [
		examTopDesc,
		examCenter,
		examOptions,
		examSingleOption,
		exam2rdLists,
		exam2rdListSingle,
		examEssay
	]})
const filePicker = document.getElementById('entry')
filePicker.addEventListener('change', handleMD, false)
const container = document.getElementById('content')

function handleMD() {
	const file = this.files[0]
	const reader = new FileReader()
	reader.onload = e => {
		container.innerHTML = marked.parse(e.target.result)
	}
	reader.onerror = e => {
		console.info('读取失败')
		console.error(e.error)
	}
	reader.readAsText(file)
}