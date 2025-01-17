function handleFileList(data) {
	const container = document.createElement('div')
	container.append(
		document.createElement('br'),
		'or Select: '
		)
	container.classList.add('select-direct')
	const selectMenu = document.createElement('select')
	let list = data.trim().split('\n')
	list.unshift('')
	list.forEach(e => {
		const temp = document.createElement('option')
		temp.value = e
		temp.append(e.split('/').pop())
		selectMenu.append(temp)
	})
	selectMenu.addEventListener('change', handleSelected)
	container.append(selectMenu)
	document.getElementById('entry').after(container)
}
function handleSelected(e) {
	if (e.target.value === '') {
		return
	}
	fetch(e.target.value).then(e => {
		if (!e.ok) {
			throw new Error('Fetch Fail')
		}
		return e.text()
	}).then(data => {
		document.getElementById('content').innerHTML = marked.parse(data)
		/**
		 * TODO: 常用代码复用问题…
		 */
		const parts = document.querySelectorAll('.exam-part')
		parts.forEach(e => {
			e.addEventListener('touchstart', handleCollapse)
		})
	}).catch(err => {
		console.error(err)
	})
}
fetch('./config.txt').then(e => {
	if (!e.ok) {
		throw new Error('Fetch Fail')
	}
	return e.text()
}).then(handleFileList).catch(err => {
	console.error(err)
})