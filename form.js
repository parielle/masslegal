var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating;

var renter_concerns = [
		$('#renter-concerns input:checkbox[name=security-deposit]')[0], 
		$('#renter-concerns input:checkbox[name=rent]')[0], 
		$('#renter-concerns input:checkbox[name=fees]')[0],
	];

$('.next').click(function () {
	"use strict";
    if (animating) {
        return false;
	}
    animating = true;
    current_fs = $(this).parent();
    next_fs = $(this).parent().next(); //TODO: just one next
    
    if (!checkMassRenter(current_fs) && 
		!chooseConcern(current_fs) && 
		!preResults(current_fs)  &&
		!requestInformation(current_fs)) {
    	next(pickConcern(next_fs, false));
    }
});

$('.previous').click(function () {
	"use strict";
    if (animating) {
        return false;
	}
    animating = true;
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    previous(pickConcern(previous_fs, true));
});

$('.start-over').click(function () {
	"use strict";
	if (animating) {
        return false;
	}
    animating = true;
    current_fs = $(this).parent();
    previous_fs =$('#mass-renter');
	previous(previous_fs);
	return false;
});

$('.submit').click(function () {
	"use strict";
	return false;
});

$('.request-information').click(function () {
	"use strict";
	next($('#request-information'));
});

$('.finding-list').on("click", "span.justification-label", function() {
	$(this).parent().find('.justification-content').slideToggle(250);
});

$('#renter-concerns input:checkbox[name=all]').click(function () {
	"use strict";
	var allBox = $('#renter-concerns input:checkbox[name=all]')[0];
	for (var i = 0; i < renter_concerns.length; i++) {
		checkAndDisable(renter_concerns[i], allBox.checked);
	}
});

function checkAndDisable(obj, check) {
	"use strict";
	obj.checked	= check;
	obj.disabled = !obj.disabled;
}

function next(next_fs) {
	"use strict";
	$('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active');
    next_fs.show();
    current_fs.animate({ opacity: 0 }, {
        step: function (now) {
            scale = 1 - (1 - now) * 0.2;
            left = now * 50 + '%';
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({
                'left': left,
                'opacity': opacity
            });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        easing: 'easeInOutBack'
    });
}

function previous(previous_fs) {
	"use strict";
	$('#progressbar li').eq($('fieldset').index(current_fs)).removeClass('active');
    previous_fs.show();
    current_fs.animate({ opacity: 0 }, {
        step: function (now) {
            scale = 0.8 + (1 - now) * 0.2;
            left = (1 - now) * 50 + '%';
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({
                'transform': 'scale(' + scale + ')',
                'opacity': opacity
            });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        easing: 'easeInOutBack'
    });
}

function checkMassRenter(current_fs) {
	"use strict";
	// User answered "no" to question "do you rent a home in massachusetts?"
	if (current_fs[0].id === 'mass-renter' && !current_fs[0].children[2].checked) {
		if (!current_fs[0].children[4].checked) {
			$("#mass-renter .error").removeClass("hidden");
			animating = false;
			return true;
		} else {
			$("#mass-renter .error").addClass("hidden");	
			setErrorMessage(1);
			next($('#error'));
			return true;
		}
	} 
	$("#mass-renter .error").addClass("hidden");	
	return false;
}

function setErrorMessage(error) {
	"use strict";
	switch(error) {
    	case 1:
        	$('#error h3')[0].innerHTML = "This analytic quiz is specifically for those renting a home in Massachusetts. We can't provide insights for out-of-state residents.";
        	break;
    	default:
        	console.log("invalid error message number");
	}
	
}

function pickConcern(fs, prev) {
	"use strict";
	while (true) {
		if (fs.hasClass('concern')) {
			if ($('#renter-concerns input:checkbox[name='+fs[0].id+']')[0].checked) {
				break;
			}
		} else {
			break;	
		}
		if (prev === true) {
			$('#progressbar li').eq($('fieldset').index(fs)).removeClass('active');
			fs = fs.prev();
		} else {
			$('#progressbar li').eq($('fieldset').index(fs)).addClass('active');
			fs = fs.next();	
		}
	}
	return fs;	
}

function chooseConcern(current_fs) {
	"use strict";
	if (current_fs[0].id === 'renter-concerns' && !atLeastOneChildChecked(renter_concerns)) {
		$("#renter-concerns .error").removeClass("hidden");
		animating = false;
		return true;
	}
	$("#renter-concerns .error").addClass("hidden");	
	return false;
}

function preResults(current_fs) {
	"use strict";
	if (current_fs[0].id === 'pre-results') {
		analysis();
		next($('#results'));
		return true;
	} 
	return false;
}

function requestInformation(current_fs) {
	"use strict";
	if (current_fs[0].id === 'results') {
		next($('#request-information'));
		return true;
	} 
	return false;
}

function atLeastOneChildChecked(children) {
	"use strict";
	var atLeastOneSet = false;
	for (var i = 0; i < children.length; i++) {
		atLeastOneSet = children[i].checked || atLeastOneSet;
	}
	return atLeastOneSet;
}

//deposit
deposit_status.change(function(){ 
	"use strict";
	toggle(deposit_status[0].checked, deposit_days);
	toggle(deposit_status[0].checked, tenancy_ended_30);
});
deposit_days.change(function(){ 
	"use strict";
	toggle_pure(deposit_days[0].checked, deposit_receipt);
	toggle(deposit_days[0].checked, receipt_status);
	
});
receipt_status.change(function(){
	"use strict";
	toggle(receipt_status[0].checked, receipt_late);
});
tenancy_ended_30.change(function(){
	"use strict";
	toggle_pure(tenancy_ended_30[0].checked, deposit_withheld);
	toggle(tenancy_ended_30[0].checked, deposit_returned);
	
});
deposit_returned.change(function(){
	"use strict";
	toggle(deposit_returned[0].checked, landlord_list);
	toggle(deposit_returned[0].checked, withheld_damages);
	toggle(deposit_returned[0].checked, withheld_bills);
	toggle(deposit_returned[0].checked, withheld_other);
});

// last month's rent
rent_status.change(function(){
	"use strict";
	toggle(rent_status[0].checked, lease_ended);
});
lease_ended.change(function(){
	"use strict";
	toggle(lease_ended[0].checked, rent_interest);
});

// fees
late_fee_status.change(function(){
	"use strict";
	toggle(late_fee_status[0].checked, more_than_thirty);
});

function toggle(show, field) {
	"use strict";
	var label = field.parent();
	if (show) {
		label.removeClass('hidden'); //TODO: Make this transition smoother. 
	} else {
		label.addClass('hidden');
		field[0].checked = true;
		field[0].checked = false;
		field.trigger('change');
	}
}

function toggle_pure(show, obj) {
	"use strict";
	if (show) {
		obj.removeClass('hidden');
	} else {
		obj.addClass('hidden');
	}
}
