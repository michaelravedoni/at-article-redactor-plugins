(function($R)
{
    $R.add('plugin', 'at-components', {
        translations: {
            en: {
                "at-components": "at-article component"
            },
            fr: {
                "at-components": "Composants at-article"
            }
        },
        init: function(app)
        {
            this.app = app;
            this.lang = app.lang;
            this.toolbar = app.toolbar;

            // local
    		this.formats = {
                "at-block": {
                    title: 'Block',
                    api: 'module.block.format',
                    args: {
                        'tag': 'at-block',
                        'attr': {
                            'type': 'default',
                            'heading': '',
                            'caption': 'false'
                        },
                        'type': 'set'
                    }
                },
                "at-block-info": {
                    title: 'Block info',
                    api: 'module.block.format',
                    args: {
                        'tag': 'at-block',
                        'attr': {
                            'type': 'info',
                            'heading': 'Heading',
                            'caption': 'true'
                        },
                        'type': 'set'
                    }
                },
                "at-block-example": {
                    title: 'Block example',
                    api: 'module.block.format',
                    args: {
                        'tag': 'at-block',
                        'attr': {
                            'type': 'example',
                            'heading': 'Heading',
                            'caption': 'true'
                        },
                        'type': 'set'
                    }
                },
                "at-blockquote": {
                    title: 'Blockquote',
                    api: 'module.block.format',
                    args: {
                        'tag': 'at-blockquote',
                        'attr': {
                            'author': '',
                            'source': '',
                            'type': 'default'
                        },
                        'type': 'set'
                    }
                },
                "at-blockquote-locator": {
                    title: 'Blockquote locator',
                    api: 'module.block.format',
                    args: {
                        'tag': 'at-blockquote',
                        'attr': {
                            'author': '',
                            'source': '',
                            'locator': '',
                            'label': '',
                            'type': 'locator'
                        },
                        'type': 'set'
                    }
                },
                "at-callout": {
                    title: 'Callout',
                    api: 'module.block.format',
                    args: {
                        'tag': 'at-callout',
                        'attr': {
                            'heading': '',
                            'type': 'block'
                        },
                        'type': 'set'
                    }
                },
                "at-callout-inline": {
                    title: 'Callout inline',
                    api: 'module.inline.format',
                    args: {
                        'tag': 'at-callout',
                        'attr': {
                            'type': 'inline'
                        },
                        'type': 'add'
                    }
                },
                "at-note": {
                    title: 'Note',
                    api: 'module.inline.format',
                    args: {
                        'tag': 'at-note',
                        'attr': {
                            'type': 'default'
                        },
                        'type': 'add'
                    }
                },
                "at-note-margin": {
                    title: 'Note',
                    api: 'module.inline.format',
                    args: {
                        'tag': 'at-note',
                        'attr': {
                            'type': 'margin'
                        },
                        'type': 'add'
                    }
                },
                "at-notes": {
                    title: 'Notes',
                    api: 'module.block.format',
                    args: {
                        'tag': 'at-notes',
                        'attr': {
                            'heading': 'Notes',
                            'class': 'at-nocount'
                        },
                        'type': 'set'
                    }
                },
                "at-references": {
                    title: 'References',
                    api: 'module.block.format',
                    args: {
                        'tag': 'at-references',
                        'attr': {
                            'heading': 'Références',
                            'class': 'at-nocount'
                        },
                        'type': 'set'
                    }
                },
    		};
        },
        start: function()
        {
            // create the button data
            var buttonData = {
                title: this.lang.get('at-components')
            };

            var dropdown = {};
			for (var key in this.formats)
			{
    			var style = this.formats[key];
				dropdown[key] = {
    				title: style.title,
    				api: style.api,
    				args: style.args
                };
			}

            var $button = this.toolbar.addButton('at-components', { title: this.lang.get('at-components') });

            $button.setIcon('<i class="re-icon-widget"></i>');
			$button.setDropdown(dropdown);
        }
    });
})(Redactor);
