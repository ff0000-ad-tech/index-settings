const NamedRegExp = require('named-regexp-groups')


function getRegex(scope, component, param) {
	scope = scope == '*' ? '[^\.]+' : scope;
	component = component == '*' ? '[^\.]+' : component;
	param = param == '*' ? '[^\.]+' : param;
	return new NamedRegExp(
		'(?<hook_start>[^\n]+(?<scope>' + scope + ')\.(?<component>' + component + ')\.(?<param>' + param + ')\.start[^\n]+\n)' + 
			'(?<hook_content>[\s\S]*?)' + 
			'(?<hook_end>([^\S\n]*[\/\*\<\!\-]+\s?\-+\s?(?&scope)\.(?&component)\.(?&param)\.end[^\n]+))'
	);
}

function getInsertRegex(param, lang='js') {
	param = param == '*' ? '[^\s\-]+' : param;
	if (lang == 'html') {
		return new NamedRegExp(
			'(\<\!)\-\-\s*Red\.Insert\.' + param + '\s*\-\-(\>)'
		);
	}
	else {
		return new NamedRegExp(
			'(\/\*\s*)\-\-\s*Red\.Insert\.' + param + '\s*\-\-(\s*\*\/)'
		)
	}
}

function getAllRegex() {
	return new NamedRegExp(
		'([^\n]+Red\.[^\.]+\.[^\.]+\.[^\n]+\n)'
	)
}