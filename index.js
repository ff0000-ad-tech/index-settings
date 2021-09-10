const fs = require('fs')
const requireFromString = require('require-from-string')
const commentHooks = require('@ff0000-ad-tech/comment-hooks')

const debug = require('@ff0000-ad-tech/debug')
const log = debug('index-settings')

// read settings hook
const load = (path) => {
	const index = fs.readFileSync(path, 'utf8')
	return read(index)
}

// define expected model with the hook-ids
const INDEX_HOOKS = {
	adParams: 'ad_params',
	assets: 'assets'
}
const read = (source) => {
	var settings = {}
	for (var key in INDEX_HOOKS) {
		var matches = source.match(commentHooks.getRegexForHook(`Red.Settings.${INDEX_HOOKS[key]}`))
		if (matches) {
			// settings hooks can be parsed with a little node-require trickery
			settings[key] = requireFromString(`${matches.groups.content} module.exports = ${key};`)
		}
	}
	return settings
}

module.exports = {
	load
}
