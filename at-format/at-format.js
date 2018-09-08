(function($R)
{
    $R.add('plugin', 'at-format', {
        translations: {
            en: {
                "at-format": "Format"
            },
            fr: {
                "at-format": "Format"
            }
        },
        init: function(app)
        {
            this.app = app;
            this.lang = app.lang;
            this.toolbar = app.toolbar;

            // local
            this.styles = {
                "p": {
                    title: 'Paragraph',
                    api: 'module.block.format',
                    args: {
                        'tag': 'p',
                        'type': 'set'
                    }
                },
                "h2": {
                    title: '1. Heading',
                    api: 'module.block.format',
                    args: {
                        'tag': 'h2',
                        'class': 'at-h2',
                        'type': 'set'
                    }
                },
                "h3": {
                    title: '1.1 Heading',
                    api: 'module.block.format',
                    args: {
                        'tag': 'h3',
                        'class': 'at-h3',
                        'type': 'set'
                    }
                },
                "h4": {
                    title: '1.1.1 Heading',
                    api: 'module.block.format',
                    args: {
                        'tag': 'h3',
                        'class': 'at-h3',
                        'type': 'set'
                    }
                },
                "h2no": {
                    title: '* Heading 1',
                    api: 'module.block.format',
                    args: {
                        'tag': 'h2',
                        'class': 'at-nocount',
                        'type': 'set'
                    }
                },
                "h3no": {
                    title: '* Heading 2',
                    api: 'module.block.format',
                    args: {
                        'tag': 'h3',
                        'class': 'at-nocount',
                        'type': 'set'
                    }
                },
                "h4no": {
                    title: '* Heading 3',
                    api: 'module.block.format',
                    args: {
                        'tag': 'h4',
                        'class': 'at-nocount',
                        'type': 'set'
                    }
                },
                "pre": {
                    title: 'Coding block',
                    api: 'module.block.format',
                    args: {
                        'tag': 'pre',
                        'type': 'set'
                    }
                },
            };
        },
        start: function()
        {
            // create the button data
            var buttonData = {
                title: this.lang.get('at-format')
            };

            var dropdown = {};
            for (var key in this.styles)
            {
                var style = this.styles[key];
                dropdown[key] = {
                    title: style.title,
                    api: 'module.block.format',
                    args: style.args
                };
            }

            var $button = this.toolbar.addButtonAfter('html', 'at-format', { title: this.lang.get('at-format') });

            $button.setIcon('<i class="re-icon-format"></i>');
            $button.setDropdown(dropdown);
        }
    });
})(Redactor);
