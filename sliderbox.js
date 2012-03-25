(function($) {
$.fn.sliderbox = function($o) {
	var _o = $.extend({
		height: '30px',
		padding: '10px',
		colors: {
			text: '#444',
			on: '#eee',
			left: '#aaa',
			right: '#666',
			leftOn: '#00A0E6',
			rightOn: '#222'
		},
		counter: []
	},$o);

	return this.filter('input[type="radio"]').each(function() {
		if ($(this).data('installed')) {
			return true;
		}

		var _this = $(this).hide().data('installed', true),
			_name = _this.attr('name'),
			_id = 'sbx_' + _name,
			_isLeft = false,
			_lab;

		if (_o.counter[_name]) {
			_o.counter[_name] ++;
			if (_o.counter[_name] >= 3) {
				_o.noSlant = true;
				_this.siblings('label')
					.css({ padding: '0 ' + _o.padding })
					.filter(':first')
					.css({ borderRight: 0 });
			}
		} else {
			_o.counter[_name] = 1;
			_isLeft = true;
		}

		_id += _o.counter[_name];

		_this.attr('id', _id);

		_lab =
			$('<label\/>')
			.attr({ 'for': _id })
			.html(_this.attr('title'))
			.addClass(_isLeft ? 'sliderbox-left' : 'sliderbox-right')
			.css({
				color: _o.colors.text,
				display: 'block',
				float: 'left',
				cursor: 'pointer',
				lineHeight: _o.height
			})
			.data({
				bg: _o.colors[_isLeft ? 'left' : 'right'],
				on: _o.colors[_isLeft ? 'leftOn' : 'rightOn']
			})
			.insertAfter(this);

		if (!_o.noSlant) {
			_lab.css({
				height: 0,
				borderBottom: _o.height + ' solid transparent'
			});

			if (_isLeft) {
				_lab.css({
					paddingLeft: _o.padding,
					borderRight: _o.height + ' solid ' + _o.colors.right
				});
			} else {
				_lab.css({ paddingRight: _o.padding });
			}
		} else {
			_lab.css({ padding: '0 ' + _o.padding });
		}

		_lab.css({ backgroundColor: _lab.data('bg') });

		_this.bind('check', function() {
			_this.siblings('input[type="radio"]')
				.prop('checked', false);

			_this.siblings('label')
				.removeClass('selected')
				.each(function() {
					$(this).css({
						color: _o.colors.text,
						borderRightColor: _o.colors.rightOn,
						backgroundColor: $(this).data('bg')
					});
				});

			_this
				.prop('checked', true)
				.next('label')
				.addClass('selected')
				.css({
					color: _o.colors.on,
					borderRightColor: _o.colors.right,
					backgroundColor: _lab.data('on')
				});

			return false;
		});

		_this.click(function() {
			_this.trigger('check');

			if ($.isFunction(_o.cb)) {
				_o.cb(_name, _this.val());
			}
		});

		if (_this.prop('checked')) {
			_this.trigger('check');
		}

		return true;
	});
};
}(jQuery));
