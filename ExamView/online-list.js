function handleFileList(data) {
	const container = new DocumentFragment()
	container.innerText = 'or Select'
	const selectMenu = document.createElement('select')
	data.split('\n').forEach(e => {
		const temp = new DocumentFragment()
		temp.innerHTML = `<option value="${e}">${e.split('/').pop()}</option>`
		selecMenu.appendChild(temp)
	})
	selecMenu.addEventListener('change', handleSelected)
	container.appendChild(selecMenu)
	document.getElementById('entry').after(container)
}
function handleSelected(e) {
	fetch(e.target.value).then(e => text())
	.then(data => {
		document.getElementById('content').innerHTML = marked.parse(data)
	})
}
fetch('./config.txt')
.then(e => {
	if (!e.ok) {
		throw new Error('Fetch Fail')
	}
	e.text()
})
.then(handleFileList)
.catch(err => {
	console.error(err)
})