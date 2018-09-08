(function($R)
{
    $R.add('plugin', 'at-citation', {
        translations: {
            en: {
                "insert": "Insert",
                "cancel": "Cancel",
                "delete": "Delete",
                "edit": "Edit",
                "save": "Save",
                "at-citation": "Add a citation",
                "at-citation-label-key": "Key",
            },
            fr: {
                "insert": "Insérer",
                "cancel": "Annuler",
                "delete": "Supprimer",
                "edit": "Editer",
                "save": "Mettre à jour",
                "at-citation": "Ajouter une citation",
                "at-citation-label-key": "Clé d'identification",
                "at-citation-label-label": "Label",
                "at-citation-label-locator": "Locator",
                "at-citation-label-pref": "Préfix",
                "at-citation-label-suffix": "Suffix",
                "at-citation-label-suppressAuthor": "Supprimer l'auteur",
                "at-citation-label-authorOnly": "N'afficher que l'auteur",
            }
        },
        modals: {
            'at-citation': '<form action="">'
                + '<div class="form-item">'
                    + '<label id="at-citation-label-key">## at-citation-label-key ##</label>'

                    + '<label>## at-citation-label-label ##</label>'
                    + '<input name="label">'
                    + '<label>## at-citation-label-locator ##</label>'
                    + '<input name="locator">'
                    + '<label>## at-citation-label-pref ##</label>'
                    + '<input name="pref">'
                    + '<label>## at-citation-label-suffix ##</label>'
                    + '<input name="suffix">'
                    + '<label>## at-citation-label-suppressAuthor ##</label>'
                    + '<input type="checkbox" name="suppressAuthor">'
                    + '<label>## at-citation-label-authorOnly ##</label>'
                    + '<input type="checkbox" name="authorOnly">'
                + '</div>'
            + '</form>'
        },
        init: function(app)
        {
            this.app = app;
            this.lang = app.lang;
            this.toolbar = app.toolbar;
            this.insertion = app.insertion;
            this.inspector = app.inspector;
            this.selection = app.selection;
            this.component = app.component;
            this.container = app.container;
        },
        onmodal: {
            'at-citation': {
                opened: function($modal, $form)
                {
                    $form.getField('key').focus();

                    if (this.$currentElement) {
                        var element = this.$currentElement.nodes[0].el;
                        for (step = 0; step < element.attributes.length; step++) {
                            var attrName = element.attributes[step].name;
                            var attrValue = element.attributes[step].value;
                            $form.getField(attrName).val(attrValue);
                        }
                    }
                    else {
                        this.$modal = $modal;
                        this.$form = $form;
                        this._build();
                    }
                },
                insert: function($modal, $form)
                {
                    var data = $form.getData();
                    if (this.$currentElement) {
                        this._save(data);
                    }
                    else {
                        this._insert(data);
                    }
                }
            }
        },
        oncontextbar: function(e, contextbar)
        {
            var el = this.inspector.parse(e.target);
            var tag = el.getTag();
            /*console.log(el);
            console.log(tag);
            var component = el.isComponent();
            console.log(component);
            var block = el.isBlock();
            console.log(block);
            var inline = el.isInline();
            console.log(inline);
            var element = el.isElement();
            console.log(element);*/
            if (tag == 'at-citation')
            {
                //var node = data.getComponent();
                var buttons = {
                    "edit": {
                        title: this.lang.get('edit'),
                        api: 'plugin.at-citation.open',
                        args: el
                    },
                    "remove": {
                        title: this.lang.get('delete'),
                        api: 'plugin.at-citation.remove',
                        args: el
                    }
                };

                contextbar.set(e, tag, buttons, 'bottom');
            }
        },
        start: function()
        {
            // create the button data
            var buttonData = {
                title: this.lang.get('at-citation'),
                api: 'plugin.at-citation.open'
            };
            // create the button if at-references is not installed
             if (this.toolbar.getButton('at-references') !== false) {
                 var $button = this.toolbar.addButton('at-citation', buttonData);
                 $button.setIcon('<i class="re-icon-bookmark"></i>');
             }
        },
        open: function(el)
        {
            this.$currentElement = undefined;
            if (el) {
                this.$currentElement = $R.dom(el);
                this.currentElement = el;
            }

            var options = {
                title: this.lang.get('at-citation'),
                width: '600px',
                name: 'at-citation',
                handle: 'insert',
                commands: {
                    insert: { title: (this.$currentElement) ? this.lang.get('save') : this.lang.get('insert') },
                    cancel: { title: this.lang.get('cancel') }
                },
                //args: this.$currentElement
            };

            this.app.api('module.modal.build', options);
        },
        remove: function(el)
        {
            el.node.remove();
        },

        // private
        _insert: function(data)
        {
            this.app.api('module.modal.close');

            var html = '<at-citation key="'+data.key+'" locator="'+data.locator+'" label="'+data.label+'" pref="'+data.pref+'" suffix="'+data.suffix+'" suppressAuthor="'+data.suppressAuthor+'" authorOnly="'+data.authorOnly+'"></at-citation>';
            console.log('at-citation: ' + html);
            this.insertion.insertHtml(html);
        },
        _save: function(data)
		{
    		this.app.api('module.modal.close');

            var element = this.$currentElement.nodes[0].el;
            for (var attribute in data) {
                element.removeAttribute(attribute);
                element.setAttribute(attribute, data[attribute]);
            }
		},
        _build: function(data)
		{
            var $label = this.$modal.find('#at-citation-label-key');
            var $selector = $R.dom('<select id="at-citation-key-dropdown" name="key" />');
            $label.after($selector);

            this.references = [];

            $selector.html('');
            //$selector.off('change');
            var $container = this.container.getElement();
            var refNodeFind = $container.find('at-reference');
            var refNodeList = refNodeFind.nodes;
            console.log(refNodeList);

            for (var step in refNodeList)
            {
              var attributes = refNodeList[step].attributes;
              if (attributes.key) {var attrKey = attributes.key.value} else {var attrKey = ''}
              if (attributes.title) {var attrTitle = attributes.title.value} else {var attrTitle = ''}
              if (attributes.publisher) {var attrPublisher = attributes.publisher.value} else {var attrPublisher = ''}
                this.references[step] = {key: attrKey, title: attrTitle, publisher: attrPublisher}
                console.log(this.references);

                var $option = $R.dom('<option>');
                $option.val(attrKey);
                $option.html('['+attrKey+'] '+attrTitle+' – '+attrPublisher);

                $selector.append($option);
            }

            //$selector.on('change', this._select.bind(this));
		},
    });
})(Redactor);
