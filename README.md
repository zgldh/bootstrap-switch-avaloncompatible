bootstrap-switch-avaloncompatible
=================================

AvalonJS can't work with the original Bootstrap-Switch. That's why I made this one.


##Demo: 
 [http://www.idagou.com/bootstrap-switch-avaloncompatible.html](http://www.idagou.com/bootstrap-switch-avaloncompatible.html)

##Usage:
 1  Add .js and .css files
```HTML
  <script src="/path/to/bootstrap-switch-avaloncompatible.js"></script>
```
 > You can use the original css file from Bootstrap Switch 3.

 2  Add `input` tag into your HTML code
```HTML
  <input type="checkbox" name="my_switch" ms-widget="switch,$,$switch_option">
```

 3  Add `$switch_option` to your AvalonJS view-model
```JavaScript
  var vm = avalon.define({
    my_switch: true,
    $switch_option:{
      state: true,
      size: 'large',
      animate: true,
      onSwitchChange: function(event,state){
          vm.my_switch = state;
      }
    }
  })
```

 4  Refresh your page

##Options:
 All the same options with Bootstrap Switch 3 [http://www.bootstrap-switch.org/options-3.html](http://www.bootstrap-switch.org/options-3.html).
 
 I have made all options working except `indeterminate`,`inverse`,`radioAllOff`.
 
Help yourself to re-write it into AMD/CMD pattern.
 
Enjoy it.
