const BORDER_LS = 15

const examTopDesc = {
	name: 'exam-top',
	level: 'inline',
	start(src) {
		return src.match(/^\\/)?.index
	},
	tokenizer(src, tokens) {
		const rule = /^\\exam-top\{(.*?)\}\{(.*?)\}/
		const match = rule.exec(src)
		if (match) {
			return {
				type: 'exam-top',
				raw: match[0],
				source: match[1],
				subject: match[2],
			}
		}
	},
	renderer(token) {
		return `<div class="exam-top"><h6><b>绝密✦原神启动前</b></h6><h2 class="center">${token.source}</h2><h1 class="center">${token.subject}</h1><div class="exam-warn"><b>注意事项：</b><ol><li>答题前，考生务必将自己的姓名、考生号、考场号、座位号填写在答题卡上。</li><li>回答选择题时，选出每小题答案后，用铅笔把答题卡上对应题目的答案标号涂黑。如需改动，用橡皮擦干净后，再选涂其他答案标号。回答非选择题时，将答案写在答题卡上。写在本试卷上无效。</li><li>考试结束后，将本试卷和答题卡一并交回。</li></ol></div></div>`
	},
}

const examCenter = {
	name: 'exam-center',
	level: 'inline',
	start(src) {
		return src.match(/^\n\\exam-center/)?.index
	},
	tokenizer(src, tokens) {
		const rule = /^\\center\{(.*?)\}/
		const match = rule.exec(src)
		if (match) {
			return {
				type: 'exam-center',
				raw: match[0],
				content: match[1],
			}
		}
	},
	renderer(token) {
		return `<div class="center">${marked.parse(token.content)}</div>`
	},
}

const examOptions = {
	name: 'exam-options',
	level: 'block',
	start(src) {
		return src.match(/^\n[A-Z]\. /)?.index
	},
	tokenizer(src, tokens) {
		const rule = /^([A-Z]\. .*?(?:\n|$))+/
		const match = rule.exec(src)
		if (match) {
			const token = {
				type: 'exam-options',
				raw: match[0],
				text: match[0].trim(),
				tokens: []
			}
			this.lexer.inline(token.text, token.tokens)
			return token
		}
	},
	renderer(token) {
		return `<ol class="exam-options">${this.parser.parseInline(token.tokens)}\n</ol>`
	}
}

const examSingleOption = {
	name: 'exam-singleOption',
	level: 'inline',
	start(src) {
		return src.match(/^[A-Z]/)?.index
	},
	tokenizer(src, tokens) {
		const rule = /^[A-Z]\. ([^\n]+)/
		const match = rule.exec(src)
		if (match) {
			const choice = match[1].trim()
			return {
				type: 'exam-singleOption',
				raw: match[0],
				size: choice.length > BORDER_LS? 'large': 'small',
				choice: this.lexer.inlineTokens(choice),
			}
		}
	},
	renderer(token) {
		return `\n<li class="exam-singleOption-${token.size}">${this.parser.parseInline(token.choice)}</li>`
	},
	childTokens: ['li',
	],
}

const exam2rdLists = {
	name: 'exam-2rd-lists',
	level: 'block',
	start(src) {
		return src.match(/^\n\(\d+\) /)?.index
	},
	tokenizer(src, tokens) {
		const rule = /^(\(\d+\) .*?(?:\n|$))+/
		const match = rule.exec(src)
		if (match) {
			const token = {
				type: 'exam-2rd-lists',
				raw: match[0],
				text: match[0].trim(),
				start: match[0].match(/\((\d+)\)/)[1],
				tokens: []
			}
			this.lexer.inline(token.text, token.tokens)
			return token
		}
	},
	renderer(token) {
		return `<ol class="exam-2rd-lists" data-start="${token.start}">${this.parser.parseInline(token.tokens)}\n</ol>`
	}
}

const exam2rdListSingle = {
	name: 'exam-2rd-list-single',
	level: 'inline',
	start(src) {
		return src.match(/^\(\d+\)/)?.index
	},
	tokenizer(src, tokens) {
		const rule = /^\(\d+\) ([^\n]+)/
		const match = rule.exec(src)
		if (match) {
			const choice = match[1].trim()
			return {
				type: 'exam-2rd-list-single',
				raw: match[0],
				size: choice.length > BORDER_LS? 'large': 'small',
				choice: this.lexer.inlineTokens(choice),
			}
		}
	},
	renderer(token) {
		return `\n<li class="exam-2rd-list-single">${this.parser.parseInline(token.choice)}</li>`
	},
	childTokens: ['li',
	],
}

const examEssay = {
	name: 'exam-essay',
	level: 'inline',
	start(src) {
		return src.match(/^\\/)?.index
	},
	tokenizer(src, tokens) {
		const rule = /^\\exam-essay\{(.*?)\}/
		const match = rule.exec(src)
		if (match) {
			return {
				type: 'exam-essay',
				raw: match[0],
				example: match[1],
			}
		}
	},
	renderer(token) {
		return `<div class="exam-essay"><span>${token.example}</span><span></span><span></span><br><br></div>`
	},
}


// export {examTopDesc, examCenter, examOptions, examSingleOption}