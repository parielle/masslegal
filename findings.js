// JavaScript Document

var deposit_submitted_recently = {
	finding: "Inconclusive - Recent Security Deposit",
	explanation: "You indicated that you submitted your deposit less than 30 days ago. Most laws relating to deposits take effect 30 days after your deposit has been received by your landlord. Take the quiz again once 30 days have passed since you submitted your deposit.",
};

var withheld_other_result = {
	finding: "Tenant Owed Partial Deposit",
	justification: "GL Part II Title I Chapter 186 Section 15B(4)",
	justification_text: "No deduction may be made from the security deposit for any purpose other than those set forth in this section [only damages, unpaid rent or water, or real estate taxes can be deducted from deposit].",
	url: "https://malegislature.gov/laws/generallaws/partii/titlei/chapter186/section15b",
};

var receipt_late_result = {
	finding: "Tenant Owed Full Deposit",
	justification: "GL Part II Title I Chapter 186 Section 15B(3)(a)",
	justification_text: "A receipt shall be given to the tenant within thirty days after such deposit is received by the lessor which receipt shall indicate the name and location of the bank in which the security deposit has been deposited and the amount and account number of said deposit. Failure to comply with this paragraph shall entitle the tenant to immediate return of the security deposit.",
	url: "https://malegislature.gov/laws/generallaws/partii/titlei/chapter186/section15b",
};

var clause_7 = {
	finding: "Tenant Owed Full Deposit + Damages",
	justification: "GL Part II Title I Chapter 186 Section 15B(7)",
	justification_text: "If the lessor or his agent fails to comply with clauses (a), (d), or (e) of subsection 6, the tenant shall be awarded damages in an amount equal to three times the amount of such security deposit or balance thereof to which the tenant is entitled plus interest at the rate of five per cent from the date when such payment became due, together with court costs and reasonable attorney's fees.",
	url: "https://malegislature.gov/laws/generallaws/partii/titlei/chapter186/section15b",
};

var no_damage_list = {
finding: "Tenant Owed Full Deposit",
	justification: "GL Part II Title I Chapter 186 Section 15B(6)(b)",
	justification_text: "The lessor shall forfeit his right to retain any portion of the security deposit for any reason, or, in any action by a tenant to recover a security deposit, to counterclaim for any damage to the premises if he: [...] fails to furnish to the tenant within thirty days after the termination of the occupancy the itemized list of damages, if any, in compliance with the provisions of this section;",
	url: "https://malegislature.gov/laws/generallaws/partii/titlei/chapter186/section15b",
};

var deposit_interest_owed = {
finding: "Tenant Owed Interest on Security Deposit",
	justification: "GL Part II Title I Chapter 186 Section 15B(3)(b)",
	justification_text: "A lessor of residential real property who holds a security deposit pursuant to this section for a period of one year or longer from the commencement of the term of the tenancy shall, beginning with the first day of the tenancy, pay interest at the rate of five per cent per year, or other such lesser amount of interest as has been received from the bank where the deposit has been held payable to the tenant at the end of each year of the tenancy.",
	url: "https://malegislature.gov/laws/generallaws/partii/titlei/chapter186/section15b",
};

var no_deposit = {
	finding: "Inconclusive - No Security Deposit",
	explanation: "You indicated that you did not submit a security deposit. Therefore, it is unlikely that any laws regarding security deposits apply to you.",
};

var late_fee_less_30 = {
	finding: "Tenant Owed Refund on Late Fees",
	justification: "GL Part II Title I Chapter 186 Section 15B(1)(c)",
	justification_text: "No lease or other rental agreement shall impose any interest or penalty for failure to pay rent until thirty days after such rent shall have been due.",
	url: "https://malegislature.gov/laws/generallaws/partii/titlei/chapter186/section15b",
};

var late_fee_inconclusive = {
	finding: "Inconclusive - Late Fee",
	explanation: "The laws we match situations against do not apply for your case. However, that doesn't mean that you don't have a case! Check out the our resources page to do research on your own or find a lawyer.",
};

var rent_interest_owed = {
	finding: "Tenant Owed Interest on Last Month's Rent",
	justification: "GL Part II Title I Chapter 186 Section 15B(2)(a)",
	justification_text: "Any lessor or his agent who receives said rent in advance for the last month of tenancy shall, beginning with the first day of tenancy, pay interest at the rate of five per cent per year or other such lesser amount of interest as has been received from the bank where the deposit has been held. [...] If the lessor fails to pay any interest to which the tenant is then entitled within thirty days after the termination of the tenancy, the tenant upon proof of the same in an action against the lessor shall be awarded damages in an amount equal to three times the amount of interest to which the tenant is entitled, together with court costs and reasonable attorneys fees.",
	url: "https://malegislature.gov/laws/generallaws/partii/titlei/chapter186/section15b",
};

var rent_inconclusive = {
	finding: "Inconclusive - Last Month's Rent",
	explanation: "The laws we match situations against do not apply for your case. However, that doesn't mean that you don't have a case! Check out the our resources page to do research on your own or find a lawyer.",
};

var findings = {
	/* Deposit findings */
	deposit_submitted_recently: deposit_submitted_recently,
	no_damage_list: no_damage_list,
	receipt_late_result: receipt_late_result,
	no_deposit: no_deposit,
	withheld_other_result: withheld_other_result,
	
	/* Late fee findings */
	late_fee_less_30: late_fee_less_30,
	late_fee_inconclusive: late_fee_inconclusive,
	
	/* Last month's rent */
	rent_interest_owed: rent_interest_owed,
	rent_inconclusive: rent_inconclusive,
	
	/* Other */
	other: 0,
};

function determine_value_deposit(finding) {
	switch(finding) {
		case receipt_late_result:
			return 1;
		case no_damage_list:
			return 2;
		case withheld_other_result:
			return 7;
		case deposit_submitted_recently:
			return 9;
		case no_deposit:
			return 10;
		default:
			break;
	}
}

function determine_value_fee(finding) {
	switch(finding) {
		case late_fee_less_30:
			return 1;
		case late_fee_inconclusive:
			return 10;
		default:
			break;
	}
}

function determine_value_rent(finding) {
	switch(finding) {
		case rent_interest_owed:
			return 1;
		case rent_inconclusive:
			return 10;
		default:
			break;
	}
}
