const fsp = require('fs').promises
const requireFromString = require('require-from-string')
const stringifyObject = require('stringify-object')
const commentHooks = require('@ff0000-ad-tech/comment-hooks')

const debug = require('@ff0000-ad-tech/debug')
const log = debug('index-settings')

// load settings hooks
const load = async (path) => {
	const index = await fsp.readFile(path, 'utf-8')
	return getSettings(index)
}

// save settings
const save = async (path, settings) => {
	const index = await fsp.readFile(path, 'utf-8')
	const updated = setSettings(index, settings)
	await fsp.writeFile(path, updated)
}

// define expected model with the hook-ids
const INDEX_HOOKS = {
	adParams: 'ad_params',
	assets: 'assets'
}
const getSettings = (source) => {
	var settings = {}
	for (var key in INDEX_HOOKS) {
		const matches = source.match(commentHooks.getRegexForHook(`Red.Settings.${INDEX_HOOKS[key]}`))
		if (matches) {
			// settings hooks can be parsed with a little node-require trickery
			settings[key] = requireFromString(`${matches.groups.content} module.exports = ${key};`)
		}
	}
	return settings
}
const setSettings = (source, settings) => {
	for (var key in settings) {
		const regex = commentHooks.getRegexForHook(`Red.Settings.${INDEX_HOOKS[key]}`)
		const jsStyle = stringifyObject(settings[key], {
			singleQuotes: true,
			inlineCharacterLimit: 90
		})
		const insert =
			`\t\t\t/**-- Red.Settings.${INDEX_HOOKS[key]}.start --**/\n` +
			`\t\t\tvar ${key} = ${jsStyle.replace(/\n/g, '\n\t\t\t')}\n` +
			`\t\t\t/**-- Red.Settings.${INDEX_HOOKS[key]}.end --**/`
		source = source.replace(regex, insert)
	}
	return source
}

module.exports = {
	load,
	save
}
