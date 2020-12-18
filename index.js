const NamedRegExp = require('named-regexp-groups')

/**
 * Parse a hook id
 * 
 * [scope].[type].[param].[start/end]
 * 
 */
const parse = (hook) => {
	// string will be parsed
	if (typeof hook === 'string') {
		const parts = hook.split('.')
		return {
			scope: parts[0],
			type: parts[1],
			param: parts[2]
		}
	}
	// otherwise, assume hook is obj
	return hook
}

/**
 * Stringify a hook object
 *
 *	{ scope, type, param }
 *
 */
const stringify = (hook, { start, end, lang } = {}) => {
	// ensure hook is object
	hook = parseHook(hook)
	let tag = `${hook.scope}.${hook.type}.${hook.param}`
	if (start) {
		tag = `${address}.start`
	} else if (end) {
		tag = `${address}.end`
	}
	if (lang === 'html') {
		return `<!-- ${tag} -->`
	} else if (lang === 'js') {
		return `/*-- ${tag} --*/`
	} else {
		return tag
	}
}

/**
 * Find hook content in source
 * 
 */
function getHookRegex(scope, type, param) {
	scope = scope == '*' ? '[^.]+' : scope
	type = type == '*' ? '[^.]+' : type
	param = param == '*' ? '[^.]+' : param
	return new NamedRegExp(
		'(?<start>[^\n]+(?<scope>' +
		scope +
		').(?<type>' +
		type +
		').(?<param>' +
		param +
		').start[^\n]+\n)' +
		'(?<content>[^]*?)' +
		'(?<end>[^S\n]*((/*--s*)|(<!--s*))?(?&scope).(?&type).(?&param).end[^\n]+)'
	)
}

function getInsertRegex(param, lang = 'js') {
	param = param == '*' ? '[^s-]+' : param
	if (lang == 'html') {
		return new NamedRegExp('(<!)--s*Red.Insert.' + param + 's*--(>)')
	} else {
		return new NamedRegExp('(/*s*)--s*Red.Insert.' + param + 's*--(s**/)')
	}
}

function getScopeRegex(scope) {
	scope = scope || 'Red'
	return new NamedRegExp(`([^\n]+${scope}.[^.]+.[^.]+.[^\n]+\n)`)
}


module.exports = {
	parse,
	stringify,
	getHookRegex,
	getInsertRegex,
	getScopeRegex
}
