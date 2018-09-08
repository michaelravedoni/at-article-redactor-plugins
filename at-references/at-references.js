(function($R)
{
    $R.add('plugin', 'at-references', {
        translations: {
    		en: {
    			"at-references": "at-references",
    			"at-reference": "at-reference",
    			"at-citation": "at-citation",
    		}
        },
        init: function(app)
        {
            this.app = app;
            this.opts = app.opts;
            this.lang = app.lang;
            this.block = app.block;
            this.toolbar = app.toolbar;
        },
        // public
        start: function()
        {
            var dropdown = {};

    		dropdown.reference = { title: this.lang.get('at-reference'), api: 'plugin.at-reference.open' };
    		dropdown.citation = { title: this.lang.get('at-citation'), api: 'plugin.at-citation.open' };

            var $button = this.toolbar.addButton('at-references', { title: this.lang.get('at-references') });
            $button.setIcon('<i class="re-icon-bookmark"></i>');
			$button.setDropdown(dropdown);
        },
        set: function(type)
		{
    		if (type === 'left' && this.opts.direction === 'ltr')
    		{
        		return this._remove();
    		}

    		var args = {
        	    style: { 'text-align': type }
    		};

			this.block.toggle(args);
		},

		// private
		_remove: function()
		{
		    this.block.remove({ style: 'text-align' });
		}
    });
})(Redactor);
