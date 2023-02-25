jQuery(document).ready(function() {
	var informacja = 'Na naszej stronie została wykorzystana technologia cookies, żeby móc jak najlepiej dopasować zawartość do potrzeb odwiedzających. Ciasteczka możesz zablokować w ustawieniach przeglądarki, w innym przypadku oznacza to Twoją zgodę na ich użycie oraz zapisanie w pamięci urządzenia. Kliknij ten pasek, aby zniknął.';

	var nazwaCiasteczka = "polityka-ciasteczkowego-potwora";

	function stworzCiasteczko(nazwa,wartosc,waznosc) {
		var c_waznosc=new Date();
		c_waznosc.setDate(c_waznosc.getDate() + waznosc);
		var c_wartosc=escape(wartosc) + ((waznosc==null) ? "" : "; expires="+c_waznosc.toUTCString()) + "; path=" + escape('/');
		document.cookie=nazwa + "=" + c_wartosc;
	}

	function sprawdzCiasteczko(nazwa) {
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++) {
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==nazwa) {
				return unescape(y);
			}
		}
	}
	var url = jQuery(location).attr('href');
	if( url.indexOf("shsp") > -1 ) {
		$('#formularz2').submit(function(){return false;});
	}
	var zaakceptowane = sprawdzCiasteczko(nazwaCiasteczka);
    if(!zaakceptowane) {
		jQuery('body').append('<div id="ciasteczkaInfo"><div>'
			+ '<span id="akceptuj">Rozumiem</span>'
			+ informacja
			+ '</div></div>');

		jQuery('#ciasteczkaInfo')
			.css('zIndex', '10000')
			.css('position', 'fixed')
			.css('bottom', '-35px')
			.css('left', '0')
			.css('margin', '0')
			.css('height', '27px')
			.css('textAlign', 'left')
			.css('background', '#ffffde url("//piechdesign.pl/skrypty/cookies/info.png") 4px 6px no-repeat')
			.css('color', '#000')
			.css('fontSize', '12px')
			.css('lineHeight', '12px')
			.css('cursor', 'pointer')
			.css('width', '100%')
			.css('visibility', 'visible');
		jQuery('#ciasteczkaInfo div')
			.css('padding', '0 6px 0 25px');
		jQuery('#ciasteczkaInfo #akceptuj')
			.css('float', 'right')
			.css('display', 'block')
			.css('width', '10px')
			.css('height', '10px')
			.css('padding', '15px 0 0 0')
			.css('textIndent', '-9999px')
			.css('background', 'url("//piechdesign.pl/skrypty/cookies/close.png") center no-repeat');

		jQuery('body')
			.animate({paddingBottom: '35px'}, 1000);

		jQuery('body').children().each(function(){
			if( jQuery(this).attr('id') != 'ciasteczkaInfo' && jQuery(this).css('position') == 'fixed' && parseInt(jQuery(this).css('bottom')) <= '35' ) {
				jQuery(this)
					.animate({bottom: (parseInt(jQuery(this).css('bottom'))+35)+'px'}, 1000)
					.addClass("ciasteczkaPrzesunieciedolne");
			}
		});

		jQuery('#ciasteczkaInfo').animate({bottom: "0px"}, 1000);

		jQuery('#ciasteczkaInfo').click(function() {

			stworzCiasteczko(nazwaCiasteczka,'1',9999);

			jQuery('body').animate({paddingBottom: "0"}, 500);

			jQuery('.ciasteczkaPrzesunieciedolne').each(function(){
				jQuery(this).animate({bottom: (parseInt(jQuery(this).css('bottom'))-35)+'px'}, 500);
			});

			jQuery('#ciasteczkaInfo').animate({bottom: "-35px"}, 500);
			return false;
		});

	}

});
