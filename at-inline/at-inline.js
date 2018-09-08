(function($R)
{
    $R.add('plugin', 'at-inline', {
        translations: {
            en: {
                "style": "Style"
            },
            fr: {
                "style": "Style"
            }
        },
        init: function(app)
        {
            this.app = app;
            this.lang = app.lang;
            this.toolbar = app.toolbar;

            // local
            this.styles = {
                "sup": {
                    title: "Superscript",
                    args: 'sup'
                },
                "sub": {
                    title: "Subscript",
                    args: 'sub'
                },
                "mark": {
                    title: "Marked",
                    args: 'mark'
                },
                "small": {
                    title: "Small",
                    args: 'small'
                },
                "abbr": {
                    title: "Abréviation",
                    args: 'abbr'
                },
                "dfn": {
                    "title": "Definition",
                    "args": 'dfn'
                },
                "quote": {
                    title: "Quote",
                    args: 'q'
                },
                "cite": {
                    title: "Source citation",
                    args: 'cite'
                },
                "i": {
                    title: "Context difference",
                    args: 'i'
                },
                "del": {
                    title: "Deleted",
                    args: 'del'
                },
                "ins": {
                    title: "Inserted",
                    args: 'ins'
                },
                "code": {
                    title: "Code",
                    args: 'code'
                },
                "variable": {
                    title: "Variable",
                    args: 'var'
                },
                "keyboard": {
                    title: "Keyboard",
                    args: 'kbd'
                },
                "nobr": {
                    "title": "Prevent line-break",
                    args: {
                        'tag': 'span',
                        'class': 'nobr'
                    }
                }
            };
        },
        start: function()
        {
            var dropdown = {};
			for (var key in this.styles)
			{
    			var style = this.styles[key];
				dropdown[key] = {
    				title: style.title,
    				api: 'module.inline.format',
    				args: style.args
                };
			}

            var $button = this.toolbar.addButtonAfter('html', 'at-inline', { title: this.lang.get('style') });

            $button.setIcon('<i class="re-icon-inline"></i>');
			$button.setDropdown(dropdown);
        }
    });
})(Redactor);
