// JavaScript Document

function analysis() {
	"use strict";
	if ($('#renter-concerns input:checkbox[name=security-deposit]')[0].checked) {
		$('#result-deposit').addClass('result');
		var user_findings = security_deposit_analysis();
		var finding_list = $('#result-deposit .finding-list')[0];
		var h4 = $('#result-deposit h4');
		var controlling = user_findings[0];
		
		for (var i = 0; i < user_findings.length; i++) {
			finding_list.append(findingDiv(user_findings, i));		
			if (determine_value_deposit(user_findings[i]) < determine_value_deposit(controlling)) {
				controlling = user_findings[i];
			}
		}
		h4.html("NOTICE: " + controlling.finding);
	}
	if ($('#renter-concerns input:checkbox[name=rent]')[0].checked) {
		$('#result-rent').addClass('result');
		var user_findings = last_months_rent_analysis();
		var finding_list = $('#result-rent .finding-list')[0];
		var h4 = $('#result-rent h4');
		var controlling = user_findings[0];
		
		for (var i = 0; i < user_findings.length; i++) {
			finding_list.append(findingDiv(user_findings, i));		
			if (determine_value_rent(user_findings[i]) < determine_value_rent(controlling)) {
				controlling = user_findings[i];
			}
		}
		h4.html("NOTICE: " + controlling.finding);
	}
	if ($('#renter-concerns input:checkbox[name=fees]')[0].checked) {
		$('#result-fees').addClass('result');	
		var user_findings = late_fee_analysis();
		var finding_list = $('#result-fees .finding-list')[0];
		var h4 = $('#result-fees h4');
		var controlling = user_findings[0];
		
		for (var i = 0; i < user_findings.length; i++) {
			finding_list.append(findingDiv(user_findings, i));		
			if (determine_value_fee(user_findings[i]) < determine_value_fee(controlling)) {
				controlling = user_findings[i];
			}
		}
		h4.html("NOTICE: " + controlling.finding);
	}
}

function findingDiv(user_findings, i) {
	if ( user_findings[i].explanation != null) {
		return createExplanation(user_findings[i]);
	} else {
		console.log(user_findings.length);
		if (user_findings.length < 1) {
			return createJustification(user_findings[i], '');
		} else {
			return createJustification(user_findings[i], 1 + i);
		}
	}	
}

// Security deposit conditional
var deposit_status = $('#security-deposit input:checkbox[name=deposit-status]');
var deposit_days = $('#security-deposit input:checkbox[name=deposit-days]');
var tenancy_ended_30 = $('#security-deposit input:checkbox[name=tenancy-ended]');
var deposit_interest = $('#security-deposit input:checkbox[name=deposit-interest]');

var deposit_receipt = $('#deposit-receipt');
var receipt_status = $('#deposit-receipt input:checkbox[name=receipt-status]');
var receipt_late = $('#deposit-receipt input:checkbox[name=receipt-late]');

var deposit_withheld = $('#deposit-withheld');
var deposit_returned = $('#deposit-withheld input:checkbox[name=deposit-returned]');
var landlord_list = $('#deposit-withheld input:checkbox[name=landlord-list]');
var withheld_damages = $('#deposit-withheld input:checkbox[name=withheld-for-damages]');
var withheld_bills = $('#deposit-withheld input:checkbox[name=withheld-for-bills]');
var withheld_other = $('#deposit-withheld input:checkbox[name=withheld-other]');

function security_deposit_analysis() {
	"use strict";
 	var user_findings = [];
 	// The case that a receipt was not received or it was received late
	if (deposit_status[0].checked) {
		if (deposit_days[0].checked) {
			if (receipt_late.checked || !receipt_status.checked) {
				user_findings.push(findings.receipt_late_result);
				user_findings.push(findings.clause_7);
			}
		} 
		if (!deposit_days[0].checked && !tenancy_ended_30[0].checked) {
			user_findings.push(findings.deposit_submitted_recently);
		}
		if (deposit_returned[0].checked && tenancy_ended_30[0].checked) {
			if (!landlord_list[0].checked) {
				user_findings.push(findings.no_damage_list);
			}
			if (withheld_other[0].checked) {
				user_findings.push(findings.withheld_other_result);
			}
		}
		if (tenancy_ended_30[0].checked && !deposit_interest[0].checked) {
			user_findings.push(findings.deposit_interest_owed);
			user_findings.push(findings.clause_7);
		 }
	} else {
		user_findings.push(findings.no_deposit);
	}
	return user_findings;
 }

// Last month's rent
var rent_basics = $('#rent-basics');
var rent_status = $('#rent input:checkbox[name=rent-status]');
var lease_ended = $('#rent input:checkbox[name=lease-ended]');
var rent_interest = $('#rent input:checkbox[name=rent-interest]');

 function last_months_rent_analysis() {
	"use strict";
 	var user_findings = [];
	if (rent_status[0].checked && lease_ended[0].checked && !rent_interest[0].checked) {
		// You're owe interest, up to 5%
		user_findings.push(findings.rent_interest_owed);
	} else {
		user_findings.push(findings.rent_inconclusive);
	}
	return user_findings;
 }
 
// Rent fees conditional
var late_fee_basics = $('#late-fee-basics');
var late_fee_status = $('#fees input:checkbox[name=late-fee-status]');
var more_than_thirty = $('#fees input:checkbox[name=deposit-days]');

 function late_fee_analysis() {
	"use strict";
 	var user_findings = [];
	if (late_fee_status[0].checked && !more_than_thirty[0].checked) {
		user_findings.push(findings.late_fee_less_30);
	} else {
		user_findings.push(findings.late_fee_inconclusive);
	}
	return user_findings;
 }
 
function createExplanation(finding) {
	"use strict";
	var div = $("<div></div>");
	div.addClass("justification");
	
	var span = $("<span></span>");
	span.addClass("justification-label");
	span.html("See Explanation");
	div.append(span);

	var div2 = $("<div></div>");
	div2.addClass("justification-content");
	div2.css("display","none");
	
	div2.append("<br>");
	
	if (finding.explanation !== null) {
		
		var p2 = $("<p></p>");
		p2.addClass("explanation");
		p2.html(finding.explanation);
		div2.append(p2);
	}
	div.append(div2);
	
	return div[0];
}
 
function createJustification(finding, number) {
	"use strict";
	var div = $("<div></div>");
	div.addClass("justification");
	
	var span = $("<span></span>");
	span.addClass("justification-label");
	span.html("See Justification " + number);
	div.append(span);
	
	var div2 = $("<div></div>");
	div2.addClass("justification-content");
	div2.css("display","none");
	
	div2.append("<br>");
	div2.append("<br>");
	
	var p = $("<p></p>");
	p.addClass("legislation");
	p.html(finding.justification);
	div2.append(p);
	
	if (finding.justification_text !== null) {
		div2.append("<br>");
		
		var p2 = $("<p></p>");
		p2.addClass("quote");
		p2.html(finding.justification_text);
		div2.append(p2);
		
		div2.append("<br>");
		div2.append($('<a class="source" target="_blank" href="'+finding.url+'">See source of quote</a>'));
	}
	
	div2.append("<br>");
	div.append(div2);
	return div[0];
}
