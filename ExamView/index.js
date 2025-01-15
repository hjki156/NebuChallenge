// import * as Exam from "./rula.js"

marked.use({
	extensions: [
		examTopDesc,
		examCenter,
		examOptions,
		examSingleOption,
		exam2rdLists,
		exam2rdListSingle,
		examEssay,
		examSectionClass,
	]
})

const filePicker = document.getElementById('entry')
filePicker.addEventListener('change', handleMD, false)
const container = document.getElementById('content')

function handleMD() {
	const file = this.files[0]
	const reader = new FileReader()
	reader.onload = e => {
		container.innerHTML = marked.parse(e.target.result)
		const parts = document.querySelectorAll('.exam-part')
		parts.forEach(e => {
			e.addEventListener('touchstart', handleCollapse)
		})
	}
	reader.onerror = e => {
		console.info('读取失败')
		console.error(e.error)
	}
	reader.readAsText(file)
}
/**
 * 检测双指点击，折叠长文本
 */
function handleCollapse(e) {
	const element = e.currentTarget
	console.log(element);
	if (
		e.touches.length === 2
	) {
		if (/exam-part-collapse/.test(element.className)) {
			element.classList.remove('exam-part-collapse')
		} else {
			element.classList.add('exam-part-collapse')
		}
		element.scrollIntoView({
			behavior: "smooth",
			block: "start",
		})
	}
}