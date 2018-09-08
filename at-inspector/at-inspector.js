(function($R)
{
    $R.add('plugin', 'at-inspector', {
        modals: {
            'at-inspector':
                '<form action=""> \
                    <div class="form-item"> \
                    </div> \
                    <div class=""><a href="https://github.com/michaelravedoni/at-article" target="_blank">at-article documentation</a></div> \
                </form>'
        },
        translations: {
    		en: {
    			"at-inspector": "at-inspector",
                "at-inspector-label": "Label"
    		},
            fr: {
    			"at-inspector": "at-inspector",
                "at-inspector-label": "Label"
    		}
        },
        init: function(app)
        {
            this.app = app;
            this.opts = app.opts;
            this.lang = app.lang;
            this.$body = app.$body;
            this.toolbar = app.toolbar;
            this.inspector = app.inspector;
            this.selection = app.selection;

            // local
    		this.labelStyle = {
        		'font-family': 'monospace',
    			'position': 'absolute',
    			'padding': '2px 5px',
    			'line-height': 1,
    			'border-radius': '3px',
    			'font-size': '11px',
    			'color': 'rgba(255, 255, 255, .9)'
    		};
        },
        // messages
        onmodal: {
            'at-inspector': {
                open: function($modal, $form)
                {
                    if (this.$block)
                    {
                        var blockData = this._getData(this.$block);

                        this.$modal = $modal;
                        this.$form = $form;

                        this._build(blockData);
                        $form.setData(blockData);
                    }
                },
                opened: function($modal, $form)
                {
                    $form.getField('type').focus();
                    /*var blockData = this._getData(this.$block);
                    for (var key in blockData) {
                        $form.getField(key).val(blockData[key]);
                        console.log(`blockData.${key} = ${blockData[key]}`);
                        console.log($form.getField(key));
                    }
                    $form.setData(blockData);
                    console.log("I:Opened:blockData");
                    console.log(blockData);*/

                },
                save: function($modal, $form)
                {
                    var data = $form.getData();
                    console.log("I:Save:data");
                    console.log(data);
                    this._save(data);
                }
            }
        },
        onbutton: {
            'at-inspector': {
                observe: function(button)
                {
                    this._observeButton(button);
                }
            }
        },

        // public
        start: function()
        {
            var data = {
                title: this.lang.get('at-inspector'),
                api: 'plugin.at-inspector.open',
                observe: 'at-inspector'
            };

            var $button = this.toolbar.addButton('at-inspector', data);
            $button.setIcon('<i class="re-icon-properties"></i>');

            //this._createLabel();
        },
        stop: function()
        {
            this._removeLabel();
        },
        open: function()
		{
           var block = this.selection.getElement();
           if (!block) return;

           this.$block = $R.dom(block);

           var options = {
                title: this.lang.get('at-inspector'),
                width: '500px',
                name: 'at-inspector',
                handle: 'save',
                commands: {
                    save: { title: this.lang.get('save') },
                    cancel: { title: this.lang.get('cancel') }
                }
            };

            this.app.api('module.modal.build', options);
		},

		// private
		_save: function(data)
		{
    		this.app.api('module.modal.close');

            var element = this.$block.nodes[0];
            console.log("I:Save:element");
            console.log(element);
            console.log("I:Save:data");
            console.log(data);
            for (var attribute in data) {
                element.removeAttribute(attribute);
                element.setAttribute(attribute, data[attribute]);
            }
            element.removeAttribute('inner');
            element.innerHTML = data.inner;
		},
		_getData: function(block)
		{
    	    var $block = $R.dom(block);
            var currentElement = $block.nodes[0];

            var attr = currentElement.attributes;

            var data={};
            for (var i = 0; i < attr.length; ++i) {
                data[attr[i].name] = attr[i].value;
            }
            data.inner = currentElement.innerHTML;

    	    return data;
		},
		_observeButton: function(button)
		{
    		var block = this.selection.getElement();
    		var data = this.inspector.parse(block);
            console.log("inspector:block:Element");
            console.log(block);

    		if (block && !data.isComponent())
    		{
        		var blockData = this._getData(block);

                //this._showData(block, blockData);
        	    button.enable();
    		}
    		else
    		{
        	    button.disable();
        	    if (this.$label) this.$label.hide();
    		}
		},
        _build: function(data)
		{
            var $items = this.$modal.find('.form-item');
            if ($items.length === 0)
            {
                //var $body = this.$modal.getBody();
                //var $selector = $R.dom('<form action="">');
                var $items = $R.dom('<div class="form-item" />');

                //$selector.append($items);
                //$body.prepend($selector);
            }

            this.links = {};

            $items.html('');
            $items.off('change');

            for (var key in data)
            {
                if (key == "inner")
                {
                    continue;
                }

                this.links[key] = data[key];

                var $label = $R.dom('<label>');
                var label = $label.nodes[0];
                $label.html(key);
                $items.append($label);

                var $input = $R.dom('<input>');
                var input = $input.nodes[0];
                input.setAttribute('name', key);
                input.setAttribute('value', data.innerHTML);
                $items.append($input);
            }
            if (data.innerHTML !== "") {
                var $label = $R.dom('<label>');
                var label = $label.nodes[0];
                $label.html('innerHTML');
                $items.append($label);
                var $textarea = $R.dom('<textarea>');
                var textarea = $textarea.nodes[0];
                textarea.setAttribute('name', 'inner');
                textarea.setAttribute('value', data[key]);
                textarea.setAttribute('style', 'height: 200px;');
                $items.append($textarea);
            }

            console.log("I:Build:data");
            console.log(data);

            //$items.on('change', this._select.bind(this));
		},
		_select: function(e)
		{
			var formData = this.$form.getData();
            console.log("I:Select:formData");
            console.log(formData);
			var key = $R.dom(e.target).nodes[0].name;
            var value = $R.dom(e.target).nodes[0].value;

            console.log("I:Select:key");
            console.log(key);

            this.$form.setData({ key: value });

            console.log("I:Select:afterSet:formData");
            console.log(formData);

            this.$form.setData(formData);
		}
    });
})(Redactor);
