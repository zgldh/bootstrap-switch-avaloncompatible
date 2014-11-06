(function () {
    var widget = avalon.ui.switch = function (element, data, vmodels) {

        var option = avalon.mix({}, default_options, data.switchOptions);
        var prefix = option.baseClass;
        var wrapper = option.wrapperClass;
        //Initialization
        var out = document.createElement('div');
        var out_avalon = avalon(out);
        out_avalon.addClass(prefix, prefix + '-' + wrapper);
        out_avalon.addClass(option.size ? (' ' + prefix + '-' + option.size) : '');
        out_avalon.addClass(option.disabled ? ' ' + prefix + '-disabled' : '');
        out_avalon.addClass(option.readonly ? ' ' + prefix + '-readonly' : '');
        out_avalon.addClass(option.animate ? ' ' + prefix + '-animate' : '');
        out_avalon.addClass(option.state ? ' ' + prefix + '-on' : prefix + '-off');

        var container = document.createElement('div');
        var container_avalon = avalon(container);
        container.className = prefix + '-container';

        var on_span = document.createElement('span');
        var on_avalon = avalon(on_span);
        on_span.className = prefix + '-handle-on ' + prefix + '-' + option.onColor;
        on_span.innerHTML = option.onText;

        var middle_label = document.createElement('label');
        var middle_avalon = avalon(middle_label);
        middle_label.className = prefix + '-label';
        middle_label.innerHTML = option.labelText;

        var off_span = document.createElement('span');
        var off_avalon = avalon(off_span);
        off_span.className = prefix + '-handle-off ' + prefix + '-' + option.offColor;
        off_span.innerHTML = option.offText;

        var temp = document.createElement('div');

        //Assemble
        element.parentNode.replaceChild(temp, element);
        container.appendChild(on_span);
        container.appendChild(middle_label);
        container.appendChild(off_span);
        container.appendChild(element);
        out.appendChild(container);
        temp.parentNode.replaceChild(out, temp);

        //Property
        if (option.state == true) {
            element.checked = true;
        }
        else {
            element.checked = false;
        }
        if (option.disabled == true) {
            element.disabled = true;
        }
        else {
            element.disabled = false;
        }
        if (option.readonly == true) {
            element.readOnly = true;
        }
        else {
            element.readOnly = false;
        }

        var out_height = out_avalon.height();
        var handle_width = Math.max(getWidth(on_avalon), getWidth(off_avalon));
        var middle_width = getWidth(middle_avalon);

        // Complete
        if (option.onInit) {
            avalon.nextTick(function () {
                out_avalon.css("height", out_height + 2);
                out_avalon.css("width", handle_width + middle_width - 4);
                container_avalon.css('width', handle_width * 2 + middle_width);
                option.onInit(null, getState());
            });
        }

        //Event
        avalon.bind(container, 'click', function (e) {
            if (element.disabled || element.readOnly) {
                return false;
            }
            var old_state = getState();
            var new_state = old_state == 'on' ? 'off' : 'on';
            out_avalon.removeClass(prefix + '-' + old_state);
            out_avalon.addClass(prefix + '-' + new_state);
            element.checked = !element.checked;
            if (element.checked) {
                container_avalon.css('left', '0px');
            }
            else {
                container_avalon.css('left', "-" + handle_width + 'px')
            }

            if (option.onSwitchChange) {
                option.onSwitchChange(e, new_state == 'on' ? true : false);
            }
        });


        //Functions
        function getState() {
            return element.checked ? 'on' : 'off';
        }

        function getWidth(avalon_obj) {
            var w = avalon_obj.width() + parseInt(avalon_obj.css('padding-left')) + parseInt(avalon_obj.css('padding-right'));
            return w;
        }
    };

    var default_options = {
        state: false,
        size: null,//	data-size 	String 	The checkbox state 	null, 'mini', 'small', 'normal', 'large'
        animate: true,// 	data-animate 	Boolean 	Animate the switch 	true, false
        disabled: false,// 	disabled 	Boolean 	Disable state 	true, false
        readonly: false,// 	readonly 	Boolean 	Readonly state 	true, false
        indeterminate: false,//	data-indeterminate 	Boolean 	Indeterminate state 	true, false
        inverse: false,//	data-inverse 	Boolean 	Inverse switch direction 	true, false
        radioAllOff: false,// 	data-radio-all-off 	Boolean 	Allow this radio button to be unchecked by the user 	true, false
        onColor: 'primary',// 	data-on-color 	String 	Color of the left side of the switch 	'primary', 'info', 'success', 'warning', 'danger', 'default'
        offColor: 'default',//	data-off-color 	String 	Color of the right side of the switch 	'primary', 'info', 'success', 'warning', 'danger', 'default'
        onText: 'ON',//	data-on-text 	String 	Text of the left side of the switch 	String 	'ON'
        offText: 'OFF',//	data-off-text 	String 	Text of the right side of the switch 	String 	'OFF'
        labelText: '&nbsp;',//	data-label-text 	String 	Text of the center handle of the switch 	String 	'&nbsp;'
        baseClass: 'bootstrap-switch',//	data-base-class 	String 	Global class prefix 	String 	'bootstrap-switch'
        wrapperClass: 'wrapper',//	data-wrapper-class 	String | Array 	Container element class(es) 	String | Array 	'wrapper'
        onInit: function (event, state) {
        },//		Function 	Callback function to execute on initialization 	Function
        onSwitchChange: function (event, state) { //TODO
        }, //Callback function to execute on switch state change 	Function
    };
}).call();
