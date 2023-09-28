$(document).ready(function(){

    // function validateForms(form) {
    //     $(form).validate( {
    //         rules: {
    //             name: {
    //             	required: true,
    //             	minlength: 2
    //           		},
    //          	email: {
    //             	required: true,
    //             	email: true
    //           		}
    //        		},
    //         	messages: {
    //          	 	name: {
    //          			required: "Пожалуйста, введите своё имя",
    //          	 		minlength: jQuery.validator.format("Введите {0} символа")
    //         		},
    //         	  	email: {
	// 					required: "Пожалуйста, введите свою почту",
	// 					email: "Неправильно введён адрес почты"
    //           		},
	// 				checkbox: {
	// 					required: ""
	// 				}
    //           	}
    //     	});
    //     }
    // validateForms('#contact-form');
        
	//smoth scroll and pageup


	$(window).scroll(function() {
		if ($(this).scrollTop() > 1200) {
			$('.pageup').fadeIn();
		} else {
		  	$('.pageup').fadeOut();
		}
	});

	$("a[href^='#up']").click(function() {
		var _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
	});


	//ajax

	// $('form').submit(function(e) {
	// 	e.preventDefault();

	// 	if(!$(this).valid()) {
	// 		return;
	// 	}

	// 	$.ajax({
	// 		type: "POST",
	// 		url: "mailer/smart.php",
	// 		data: $(this).serialize()
	// 	}).done(function() {
	// 		$(this).find("input").val("");


	// 		$('form').trigger('reset');
	// 	});
	// 	return false;
	// });
});

document.addEventListener('DOMContentLoaded', function() {
	const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      close = document.querySelector('.menu__close');


	hamburger.addEventListener('click', () => {
		menu.classList.add('active');
	});


	close.addEventListener('click', () => {
		menu.classList.remove('active');
	});

	const counters = document.querySelectorAll('.progress__item-counter'),
		lines = document.querySelectorAll('.progress__item-scale span');

	counters.forEach( (item, i) => {
		lines[i].style.width = item.innerHTML;
	});


	//form
	const form = document.getElementById('contact-form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error===0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: FormData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("ERROR");
				form.classList.remove('_sending');
			}
		} else {
			alert("Fill up required fields");
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (!emailTest(input)) {
					formAddError(input);					
					error++;
				}
			} else if (input.getAttribute("type")==="checkbox" && input.checked === false) {
				formAddError(input); 
				error++;
			} else {
				if (input.value === '') {
					formAddError(input); 
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {

		input.classList.add('_error');
		input.parentElement.classList.add('_error');
	}

	function formRemoveError(input) {

		input.classList.remove('_error');
		input.parentElement.classList.remove('_error');
	}

	//check email
	function emailTest(input) {
		return /^\w+([\.-]?w+)*@\w+([\.-]?w+)*(\.\w{2,8})+$/.test(input.value);
	}
});






