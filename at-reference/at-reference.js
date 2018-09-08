(function($R)
{
    $R.add('plugin', 'at-reference', {
        translations: {
            en: {
                "insert": "Insert",
                "cancel": "Cancel",
                "delete": "Delete",
                "edit": "Edit",
                "save": "Save",
                "at-reference": "Add a reference",
                "at-reference-label-title": "Title",
                "at-reference-label-creator": "Author",
            },
            fr: {
                "insert": "Insérer",
                "cancel": "Annuler",
                "delete": "Supprimer",
                "edit": "Editer",
                "save": "Mettre à jour",
                "at-reference": "Ajouter une référence",
                "at-reference-label-title": "Titre",
                "at-reference-label-creator": "Auteur",
                "at-reference-label-type": "Type (default, a-d, inline, bibliography)",
                "at-reference-label-date": "Date",
                "at-reference-label-publisher": "Editeur",
                "at-reference-label-key": "Identificateur",
                "at-reference-label-numPages": "Nombre de pages",
                "at-reference-label-pages": "Page",
                "at-reference-label-chapter": "Chapitre",
                "at-reference-label-volume": "Volume",
                "at-reference-label-issue": "Numéro",
                "at-reference-label-language": "Langue",
                "at-reference-label-pmid": "PMID",
                "at-reference-label-doi": "DOI",
                "at-reference-label-isbn": "ISBN",
                "at-reference-label-issn": "ISSN",
                "at-reference-label-url": "URL",
                "at-reference-label-itemType": "Type de la ressource",
            }
        },
        modals: {
            'at-reference': '<form action="">'
                + '<div class="form-item">'
                    + '<label>## at-reference-label-type ##</label>'
                    + '<input name="type" value="default">'
                    + '<label>## at-reference-label-title ##</label>'
                    + '<input name="title">'
                    + '<label>## at-reference-label-creator ##</label>'
                    + '<input name="creator">'
                    + '<label>## at-reference-label-date ##</label>'
                    + '<input name="date">'
                    + '<label>## at-reference-label-publisher ##</label>'
                    + '<input name="publisher">'
                    + '<label>## at-reference-label-key ##</label>'
                    + '<input name="key">'
                    + '<label>## at-reference-label-numPages ##</label>'
                    + '<input name="numPages">'
                    + '<label>## at-reference-label-pages ##</label>'
                    + '<input name="pages">'
                    + '<label>## at-reference-label-chapter ##</label>'
                    + '<input name="chapter">'
                    + '<label>## at-reference-label-volume ##</label>'
                    + '<input name="volume">'
                    + '<label>## at-reference-label-issue ##</label>'
                    + '<input name="issue">'
                    + '<label>## at-reference-label-language ##</label>'
                    + '<input name="language">'
                    + '<label>## at-reference-label-issn ##</label>'
                    + '<input name="issn">'
                    + '<label>## at-reference-label-pmid ##</label>'
                    + '<input name="pmid">'
                    + '<label>## at-reference-label-doi ##</label>'
                    + '<input name="doi">'
                    + '<label>## at-reference-label-isbn ##</label>'
                    + '<input name="isbn">'
                    + '<label>## at-reference-label-url ##</label>'
                    + '<input name="url">'
                    + '<label>## at-reference-label-itemType ##</label>'
                    + '<input name="itemType">'
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
        },
        onmodal: {
            'at-reference': {
                opened: function($modal, $form)
                {
                    $form.getField('title').focus();

                    if (this.$currentElement) {
                        console.log("ref:Opened:currentElement");
                        var element = this.$currentElement.nodes[0].el;
                        for (step = 0; step < element.attributes.length; step++) {
                            var attrName = element.attributes[step].name;
                            var attrValue = element.attributes[step].value;
                            $form.getField(attrName).val(attrValue);
                        }
                    }
                },
                insert: function($modal, $form)
                {
                    var data = $form.getData();
                    if (this.$currentElement) {
                        console.log("ref:Insert:currentElement");
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
            console.log(tag);
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
            if (tag == 'at-reference')
            {
                //var node = data.getComponent();
                var buttons = {
                    "edit": {
                        title: this.lang.get('edit'),
                        api: 'plugin.at-reference.open',
                        args: el
                    },
                    "remove": {
                        title: this.lang.get('delete'),
                        api: 'plugin.at-reference.remove',
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
                title: this.lang.get('at-reference'),
                api: 'plugin.at-reference.open'
            };
            // create the button if at-references is not installed
            if (this.toolbar.getButton('at-references') !== false) {
                var $button = this.toolbar.addButton('at-reference', buttonData);
              $button.setIcon('<i class="re-icon-bookmark"></i>');
            }
        },
        open: function(el)
        {
            this.$currentElement = undefined;
            if (el) {
                this.$currentElement = $R.dom(el);
                this.currentElement = el;
                console.log("ref:Open:currentElement");
            }

          var options = {
            title: this.lang.get('at-reference'),
            width: '600px',
            name: 'at-reference',
            handle: 'insert',
            commands: {
              insert: { title: (this.$currentElement) ? this.lang.get('save') : this.lang.get('insert') },
              cancel: { title: this.lang.get('cancel') }
            }
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

            if (data.key.trim() == undefined || data.key.trim() == '') {var dataKey = ''} else {var dataKey = ' key="'+data.key+'"'}

            var html = '<at-reference type="'+data.type+'"'+dataKey+' title="'+data.title+'" creator="'+data.creator+'" itemType="'+data.itemType+'" date="'+data.date+'" publisher="'+data.publisher+'" pages="'+data.pages+'" numPages="'+data.numPages+'" chapter="'+data.chapter+'" volume="'+data.volume+'" issue="'+data.issue+'" language="'+data.language+'" url="'+data.url+'" issn="'+data.issn+'" pmid="'+data.pmid+'" doi="'+data.doi+'"></at-reference>';
            console.log('at-reference: ' + html);
            this.insertion.insertHtml(html);
        },
        _save: function(data)
        {
            this.app.api('module.modal.close');

            var element = this.$currentElement.nodes[0].el;
            for (var attribute in data) {
                element.removeAttribute(attribute);
                console.log(data[attribute]);
                if (data[attribute].trim() == undefined || data[attribute].trim() == '') {
                    console.log("remove");
                    element.removeAttribute(attribute);
                }
                else {
                    console.log("add");
                    element.setAttribute(attribute, data[attribute]);
                }
            }
        }
    });
})(Redactor);
