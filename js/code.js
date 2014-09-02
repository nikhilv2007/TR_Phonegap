document.addEventListener("deviceready", onDeviceReady, false);
		
function onDeviceReady() {
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
	
	FastClick.attach(document.body);
	
	//alert("ready");
	/*
	if (navigator.notification) { // Override default HTML alert with native dialog
    	window.alert = function (message) {
            navigator.notification.alert(
                message,    // message
                null,       // callback
                "Workshop", // title
                'OK'        // buttonName
            );
        };
    }
	*/
	
	/*
	//autocompleter for holidays destination
	$('#destinationHolidays').on("input",function(){
		if ($('#destinationHolidays').val().length > 3) {
			var _data = "localeId=10&term="+$('#destinationHolidays').val()+"&maximumResults=15";
			var _url = 'https://www.travelrepublic.co.uk/services/autocompleter.svc/GetHotelDestinations?'+_data;
			jQuery.ajax({
				url: _url,
			    dataType: 'json',
			    type: "GET",
			    accepts: "application/json",    
			    beforeSend: function(x){
			    	x.setRequestHeader("Content-Type","application/json");
			    },
			    success: function(data, textStatus, jqXHR) {
			                    // Calls Success. If data found on the service then it would be inside "DATA" variable
			    	//alert(data.d[0].t);
			    	$("#suggestHolidays").html("");
			    	for(var i in data.d){
			    		if (data.d[i].v.n){
			    			$("#suggestHolidays").append("<li data-icon=\"false\"><a href=\"#\" value=\"" +data.d[i].t+ "\">" +data.d[i].t+ "  (" + data.d[i].v.n +" hotels)</a></li>");
			    		}
						else{
							$("#suggestHolidays").append("<li data-icon=\"false\"><a href=\"#\" value=\"" +data.d[i].t+ "\">" +data.d[i].t+ "</a></li>");
						}
					}
					
					$("#suggestHolidays").listview('refresh');
			    },
			    error: function(xhr,error,code) {
		            // SOMETHING WRONG WITH YOUR CALL.
			        alert("service failed"); 
			    },
			    complete: function() {
			    	//alert("Process Completed.");
			    }
			});
		}
		else{			
			$("#suggestHolidays").empty();
			$("#suggestHolidays").listview('refresh');			
		}
	});
	
	$('#suggestHolidays').delegate('a','vclick',function(){
		//alert($(this).attr(value));
		$('#destinationHolidays').val($(this).attr("value"));
		$("#suggestHolidays").empty();
		$("#suggestHolidays").listview('refresh');	
	});
	
	//autocompleter for holidays departure airport
	$('#departureAirport').on("input",function(){
		if ($('#departureAirport').val().length > 2) {
			var _data = "localeId=10&term=" +$('#departureAirport').val()+ "&maximumResults=15";
			var _url = 'https://www.travelrepublic.co.uk/services/autocompleter.svc/GetFlightDestinations?'+_data;
			jQuery.ajax({
				url: _url,
			    dataType: 'json',
			    type: "GET",
			    accepts: "application/json",    
			    beforeSend: function(x){
			    	x.setRequestHeader("Content-Type","application/json");
			    },
			    success: function(data, textStatus, jqXHR) {
			                    // Calls Success. If data found on the service then it would be inside "DATA" variable
			    	//alert(data.d[0].t);
			    	$("#suggestDepartAirport").html("");
			    	for(var i in data.d){
			    		
			    		$("#suggestDepartAirport").append("<li data-icon=\"false\"><a href=\"#\" value=\""+data.d[i].t+ "\">" +data.d[i].t+ "</a></li>");
			    		
					}
					
					$("#suggestDepartAirport").listview('refresh');
			    },
			    error: function(xhr,error,code) {
		            // SOMETHING WRONG WITH YOUR CALL.
			        alert("service failed"); 
			    },
			    complete: function() {
			    	//alert("Process Completed.");
			    }
			});
		}
		else{			
			$("#suggestDepartAirport").empty();
			$("#suggestDepartAirport").listview('refresh');			
		}
	});
	
	$('#suggestDepartAirport').delegate('li','vclick',function(){
		//alert($(this).text());
		$('#departureAirport').val($(this).text());
		$("#suggestDepartAirport").empty();
		$("#suggestDepartAirport").listview('refresh');	
	});
	*/
	
	//autocompleter for hotels destination
	
	var title, countryId, provinceId, locationId, placeId, estabId, checkInDate, CheckOutDate;
	
	$('#destinationHotels').on("input",function(){
		if ($('#destinationHotels').val().length > 3) {
			var _data = "localeId=10&term="+$('#destinationHotels').val()+"&maximumResults=15";
			var _url = 'https://www.travelrepublic.co.uk/services/autocompleter.svc/GetHotelDestinations?'+_data;
			jQuery.ajax({
				url: _url,
			    dataType: 'json',
			    headers: { "Content-Type": "application/json", "Accept": "application/json" },
			    type: "GET",
			    			    
			    success: function(data, textStatus, jqXHR) {
			                    // Calls Success. If data found on the service then it would be inside "DATA" variable
			    	//alert(data.d[0].t);
			    	$("#suggestHotels").html("");
			    	
			    	//console.log(data.d.length);
			    	
			    	if(data.d.length === 0){
			    		$("#suggestHotels").append("No locations found");
			    	}
			    	else{
			    		
			    		for(var i in data.d){
				    		if (data.d[i].v.n){
				    			$("#suggestHotels").append("<li data-icon=\"false\"><a href=\"#\" value=\"" +data.d[i].t+ "\" countryId = \"" +data.d[i].v.c + "\" provinceId = \"" +data.d[i].v.p+ "\" locationId =\"" +data.d[i].v.l+ "\" placeId = \"" +data.d[i].v.pl+ "\" estabId = \"" +data.d[i].v.e +"\">" +data.d[i].t+ "  (" + data.d[i].v.n +" hotels)</a></li>");
				    			//$("#suggestHotels").append("<li data-icon=\"false\"><a href=\"#\" value=\"" +data.d[i].t+ "\">" +data.d[i].t+ "  (" + data.d[i].v.n +" hotels)</a></li>");
				    			//alert(data.d[i].v.c +"\n"+ data.d[i].v.p +"\n" + data.d[i].v.l +"\n"+ data.d[i].v.pl +"\n" +data.d[i].v.e);
				    		}
							else{
								$("#suggestHotels").append("<li data-icon=\"false\"><a href=\"#\" value=\"" +data.d[i].t+ "\" countryId = \"" +data.d[i].v.c + "\" provinceId = \"" +data.d[i].v.p+ "\" locationId =\"" +data.d[i].v.l+ "\" placeId = \"" +data.d[i].v.pl+ "\" estabId = \"" +data.d[i].v.e +"\">" +data.d[i].t+ "</a></li>");
								//$("#suggestHotels").append("<li data-icon=\"false\"><a href=\"#\" value=\"" +data.d[i].t+ "\">" +data.d[i].t+ "</a></li>");
							}
						}
			    	}
			    	
					
					$("#suggestHotels").listview('refresh');
			    },
			    error: function(xhr,error,code) {
		            // SOMETHING WRONG WITH YOUR CALL.
			        alert("hotel autocompleter call failed"); 
			    },
			    complete: function() {
			    	//alert("Process Completed.");
			    }
			});
		}
		else{			
			$("#suggestHotels").empty();
			$("#suggestHotels").listview('refresh');			
		}
	});
	
	//after select from hotels autocompleter
	$('#suggestHotels').delegate('a','vclick',function(){
		//extract values of the hotel
		title = $(this).attr("value");
		countryId = $(this).attr("countryId");
		provinceId = $(this).attr("provinceId");
		locationId = $(this).attr("locationId");
		placeId = $(this).attr("placeId");
		estabId = $(this).attr("estabId");
		
		$('#destinationHotels').val(title);
		
		//alert(countryId +"\n"+ provinceId +"\n"+ locationId +"\n"+ placeId +"\n"+ estabId);
		$("#suggestHotels").empty();
		$("#suggestHotels").listview('refresh');	
	});
	
	function convertDateFormat(paramDate){
		var myDate = new Date(paramDate);
		if(myDate.getMonth()<9){
			return myDate.getFullYear()+ "-0" +(myDate.getMonth()+1)+ "-" +myDate.getDate();
		}
		else{
			return myDate.getFullYear()+ "-" +(myDate.getMonth()+1)+ "-" +myDate.getDate();
		}
		
	}
	
	var searchId, currencySymbol;
	//Hotels search 
	$('#btnSearchHotel').on("vclick",function(){
		
		//alert("inside btn click function");
		//alert(title +"\n"+ countryId +"\n"+ provinceId +"\n"+ locationId +"\n"+ placeId +"\n"+ estabId);
		
		checkInDate = convertDateFormat($('#checkInHotels').val());
		checkOutDate = convertDateFormat($('#checkOutHotels').val());
		
		var estabTitle,regionTitle;
		if(estabId !== "0"){
			estabTitle = title;
			regionTitle = "";
		}
		else{
			estabTitle = "";
			regionTitle = title;
		}
		var _url = 'https://www.travelrepublic.co.uk/include/handlers/HotelSearch.ashx?nc=26430';
		var formData = {"countryId":countryId,"provinceId":provinceId,"locationId":locationId,"placeId":placeId,"estabId":estabId,"checkInDate":checkInDate,"checkOutDate":checkOutDate,"currencyCode":"GBP","roomsRequired":1,"rooms":[{"adults":2,"children":0,"childAges":[]}],"sid":"00000000-0000-0000-0000-000000000000","estabTitle":estabTitle,"regionTitle":regionTitle,"filters":"","isFlightPlus":false,"isAgentMode":false};
		//console.log(JSON.stringify(formData));
			
		jQuery.ajax({
			url: _url,
		    data: JSON.stringify(formData) ,						//live code
		    dataType: 'json',
		    headers: { "Content-Type": "application/json", "Accept": "application/json" },
		    type: "POST",
		    		   
		    success: function(data, textStatus, jqXHR) {
		        // Calls Success. If data found on the service then it would be inside "DATA" variable

			   	searchId = data.sid;
			   	console.log("sid = " +searchId);
			   	
			   	//ajax call to retrieve available hotels.
			   	var _param = "nc=4590&sid="+ searchId + "&isHoliday=false";
			   	var _url = "https://www.travelrepublic.co.uk/hotels/availability/HotelAvailabilityOptions.ashx?" + _param;
			   			   
			   	jQuery.ajax({
			   		dataType: "json",
			   		headers: { "Content-Type": "application/json", "Accept": "application/json" },
					type: "GET",
				    url: _url,
				    		   
				    success: function(data, textStatus, jqXHR) {
				        // Calls Success. If data found on the service then it would be inside "DATA" variable
					    console.log("hotel list retrieved, extracting ...");
					    
					    $("#availableHotels").html("<b>Available Hotels:</b>");
					    //var hotelList = "";
					    for(var i in data.searchData.hotels){
					    	//hotelList += data.searchData.hotels[i].name + '\n';
					    	//availableHotels;
					    	estabId = data.searchData.hotels[i].id;
					    	
					    	$("#availableHotels").append("<li ><a href=\"#\" value=\"" +data.searchData.hotels[i].name+ "\" estabId=\"" +estabId+ "\">" +data.searchData.hotels[i].name+ "</a></li><ul id=\"" +estabId+ "\" data-role=\"listview\" data-inset=\"true\"></ul>");
					    	
					    }
					    
					    currencySymbol = data.searchSettings.currencySymbol;
					    $("#availableHotels").listview('refresh');
					    
					},
					error: function(xhr,error,code) {
			            // SOMETHING WRONG WITH YOUR CALL.
				        console.log("hotel list retrieval failure - " +error +"-:-"+ code);
				    },
				    
				});
								
		    },

		    error: function(xhr,error,code) {
	            // SOMETHING WRONG WITH YOUR CALL.
		        console.log("sid retrival failure - " +error +"-:-"+ code);
		    },
		    complete: function() {
		    	//alert("Process Completed.");
		    }
		   
		});		
	});
	
	var lastEstabId, roomId1;
	//after click on hotel name
	$('#availableHotels').delegate('a','vclick',function(){
		//alert("you clicked on a hotel");
		//extract values of the hotel
		estabId = $(this).attr("estabId");
		roomId1 = $(this).attr("roomId");
		//alert("estab id = " +estabId+ "\n room id = " +roomId1);
		
		if(typeof estabId === "undefined"){
			roomSelection();
		}
		else{
			lastEstabId = estabId;
			
			var _url = "https://m.travelrepublic.co.uk/api2/hotels/availability/getrooms";			
			var formData = {"EstablishmentId":estabId,"AvailabilitySearchId":searchId};		
			//alert(JSON.stringify(formData));
			console.log(JSON.stringify(formData));
			
			jQuery.ajax({
				url: _url,
				data: JSON.stringify(formData) ,
			    dataType: 'json',
			    headers: { "Content-Type": "application/json", "Accept": "application/json" },
				type: "POST",
				success: function(data, textStatus, jqXHR) {
					//alert("success");
					
					var hotelid = "#"+estabId;
					//code to be updated
					$(hotelid).html("");
					var roomId,roomDescription, boardType, costPerNight, currency;
										
					var roomData = data.RequestedRooms[0]; 
					//alert(data.RequestedRooms[0].Availability[0].Id);
					for(var i in roomData.Availability){
				    	//availableRooms;
				    	roomId = roomData.Availability[i].Id;
				    	roomDescription = roomData.Availability[i].RoomDescription;
				    	boardType = roomData.Availability[i].BoardDescription;
				    	costPerNight = roomData.Availability[i].Cost;
				    	//currency = roomData.settings.currencyCode;
				    	
				    	//alert(roomDescription+ "||" +boardType+ "||" +costPerNight)	;		    	
				    	$(hotelid).append("<li data-icon=\"false\"><a href=\"#\" class=\"roomList\" roomId=\"" +roomId+ "\">" +roomDescription+ " || " +boardType+ " || " +currencySymbol+ " " +costPerNight+ "</a></li>");
				    }
				    //$(hotelid).listview('refresh');
			
				},
				error: function(xhr,error,code) {
			        // SOMETHING WRONG WITH YOUR CALL.
			        alert("failed rooms retrieval: " +error +"-:-"+ code);
				    console.log("failed rooms retrieval: " +error +"-:-"+ code); 
				},
				complete: function() {
				  	//alert("Process Completed.");
				}
			});
		
		}
	});
	
	var basketId;
	//selecting a room
	function roomSelection(){
		//alert("you clicked on a room option");
		
		var _url = "https://m.travelrepublic.co.uk/Include/Handlers/HotelSearchHandler.aspx/SubmitDetailRequest";		
		var formData = {"estabId":lastEstabId,"hguid":searchId,"priceId1":roomId1,"priceId2":"","priceId3":""};		
		console.log(JSON.stringify(formData));
		
		jQuery.ajax({
			url: _url,
			data: JSON.stringify(formData) ,
		    dataType: 'json',
		    headers: { "Content-Type": "application/json", "Accept": "application/json" },
			type: "POST",
			success: function(data, textStatus, jqXHR) {
				//alert("success");
				basketId = JSON.parse(data.d).bookingGuid;
				console.log("basket Id = " +basketId);
				
				/*
				//update basket details
				var basketUpdateURL = "https://www.travelrepublic.co.uk/services/booking/webclient.svc/UpdateBasket";
				var basketUpdateData = {"basketId":basketId,"userData":{"ContactDetails":{"Title":"mr","FirstName":"owens","LastName":"three","HomeTel":"12345","MobileTel":null,"WorkTel":null,"EmailAddress":"nr@tr.co.uk","EmailConfirm":"nr@tr.co.uk","Address1":"wrter","Address2":null,"Address3":null,"Town":"dfgdhgh","Country":"GB","County":null,"PostCode":"kt2 6nh","SendTextAlerts":false,"AgreeToConditions":true,"EmailSignup":true,"ReferrerId":0,"BookingCallBack":false,"LinkedBookingID":null,"PublicUserId":null,"CountryName":""},"PaymentDetails":{"CardNumber":"4444333322221111","StartMonth":null,"StartYear":null,"EndMonth":"01","EndYear":"2016","IssueNumber":null,"Securitycode":"111","CardTypeId":"1","BankName":null,"BankLocation":null,"AccountHolder":null,"AccountNumber":null,"ShowDepositOption":false,"IsUsingDeposit":false,"MinimumDepositAmount":0,"CanDebitBalance":false,"PaRes":null,"TL":null,"MD":null,"PrePaymentID":null,"DepositAmount":0,"OverrideCardId":0,"OverrideUserId":0,"IsSkippingPayment":false,"ExternalPaymentAuthCode":null,"OfficeId":0,"cardFee":0,"CardFee":0,"CardTypeSelected":"1","PaymentTypeId":1},"PassengerList":[{"Id":0,"Title":"Mr","FirstName":"owens","LastName":"two","Age":21,"Type":1,"Summary":"Adult","HasInsurance":true,"InsuranceType":0,"LinkedBkItemSeqNo":178000,"DriverType":null,"DOB":null,"Nationality":null,"SystemDefaultAge":true},{"Id":1,"Title":null,"FirstName":null,"LastName":null,"Age":21,"Type":1,"Summary":"Adult","HasInsurance":true,"InsuranceType":0,"LinkedBkItemSeqNo":178000,"DriverType":null,"DOB":null,"Nationality":null,"SystemDefaultAge":true}],"RequirementsList":[{"RoomId":0,"DisplayRoomNumber":1,"RequirementsText":null}],"BasketId":basketId,"ConnectingFlight":{"OutboundFlightNumber":null,"OutboundDate":"2014-02-28T00:00:00Z","OutboundDepartureAirport":null,"OutboundDepartureAirportName":null,"OutboundDestinationAirport":null,"OutboundDestinationAirportName":null,"InboundFlightNumber":null,"InboundDate":"2014-03-01T00:00:00Z","InboundDepartureAirport":null,"InboundDepartureAirportName":null,"InboundDestinationAirport":null,"InboundDestinationAirportName":null,"InboundFlightClass":null,"OutboundFlightClass":null},"CarDetails":{"Make":"","Model":"","Colour":"","Registration":""},"AttractionDetails":[],"HotelDetails":{"Name":"","Address":""},"ChauffeurDetails":{"PickUpTime":null,"Building":null,"Address":null,"Landmark":null,"ContactNo":null}},"ssid":"147862484","lastUpdateDescription":"","basketDescription":"Accommodation : 2 Guests","totalCost":60,"bookingTypeId":8};
				//var bookingFormData = {"userData":{"ContactDetails":{"Title":"mr","FirstName":"pp","LastName":"four","HomeTel":"12345","MobileTel":"","WorkTel":null,"EmailAddress":"nr@tr.co.uk","EmailConfirm":"nr@tr.co.uk","Address1":"Harper & Tweedie Ltd, Chichester House, 145A London Road","Address2":null,"Address3":null,"Town":"Kingston upon Thames","Country":"GB","County":"","PostCode":"KT2 6NH","SendTextAlerts":false,"AgreeToConditions":true,"EmailSignup":true,"ReferrerId":0,"BookingCallBack":false,"LinkedBookingID":null,"PublicUserId":null,"CountryName":""},"PaymentDetails":{"CardNumber":"","StartMonth":null,"StartYear":null,"EndMonth":"","EndYear":"","IssueNumber":null,"Securitycode":"","CardTypeId":"","BankName":null,"BankLocation":null,"AccountHolder":null,"AccountNumber":null,"ShowDepositOption":false,"IsUsingDeposit":false,"MinimumDepositAmount":0,"CanDebitBalance":false,"PaRes":null,"TL":null,"MD":null,"PrePaymentID":null,"DepositAmount":0,"OverrideCardId":0,"OverrideUserId":0,"IsSkippingPayment":true,"ExternalPaymentAuthCode":null,"OfficeId":0,"cardFee":0,"CardFee":0,"CardTypeSelected":"1","PaymentTypeId":1},"PassengerList":[{"Id":0,"Title":"Mr","FirstName":"pp","LastName":"three","Age":21,"Type":1,"Summary":"Adult","HasInsurance":true,"InsuranceType":0,"LinkedBkItemSeqNo":77000,"DriverType":null,"DOB":null,"Nationality":null,"SystemDefaultAge":true},{"Id":1,"Title":null,"FirstName":null,"LastName":null,"Age":21,"Type":1,"Summary":"Adult","HasInsurance":true,"InsuranceType":0,"LinkedBkItemSeqNo":77000,"DriverType":null,"DOB":null,"Nationality":null,"SystemDefaultAge":true}],"RequirementsList":[{"RoomId":0,"DisplayRoomNumber":1,"RequirementsText":null}],"BasketId":basketId,"ConnectingFlight":{"OutboundFlightNumber":null,"OutboundDate":"2014-10-28T00:00:00Z","OutboundDepartureAirport":null,"OutboundDepartureAirportName":null,"OutboundDestinationAirport":null,"OutboundDestinationAirportName":null,"InboundFlightNumber":null,"InboundDate":"2014-11-01T00:00:00Z","InboundDepartureAirport":null,"InboundDepartureAirportName":null,"InboundDestinationAirport":null,"InboundDestinationAirportName":null,"InboundFlightClass":null,"OutboundFlightClass":null},"CarDetails":{"Make":"","Model":"","Colour":"","Registration":""},"AttractionDetails":[],"HotelDetails":{"Name":"","Address":""},"ChauffeurDetails":{"PickUpTime":null,"Building":null,"Address":null,"Landmark":null,"ContactNo":null}}};
				
				alert(JSON.stringify(basketUpdateData));
				
				
				jQuery.ajax({
					url: basketUpdateURL,
					data: JSON.stringify(basketUpdateData) ,
				    dataType: 'json',
				    headers: { "Content-Type": "application/json", "Accept": "application/json" },
					type: "POST",
					success: function(data, textStatus, jqXHR) {
						alert("basket updated");
						
					},
					error: function(xhr,error,code) {
				        // SOMETHING WRONG WITH YOUR CALL.
					    alert("failed : " +error +"-:-"+ code); 
					},
					complete: function() {
					  	//alert("Process Completed.");
					}
				});
				
				
				
				*/
				
				
				
				
				//submit booking
				var bookingURL = "https://www.travelrepublic.co.uk/services/booking/webclient.svc/SubmitBooking";
				var bookingFormData = {"userData":{"ContactDetails":{"Title":"mr","FirstName":"pp","LastName":"four","HomeTel":"12345","MobileTel":"","WorkTel":null,"EmailAddress":"nr@tr.co.uk","EmailConfirm":"nr@tr.co.uk","Address1":"Harper & Tweedie Ltd, Chichester House, 145A London Road","Address2":null,"Address3":null,"Town":"Kingston upon Thames","Country":"GB","County":"","PostCode":"KT2 6NH","SendTextAlerts":false,"AgreeToConditions":true,"EmailSignup":true,"ReferrerId":0,"BookingCallBack":false,"LinkedBookingID":null,"PublicUserId":null,"CountryName":""},"PaymentDetails":{"CardNumber":"4444333322221111","StartMonth":null,"StartYear":null,"EndMonth":"04","EndYear":"2015","IssueNumber":null,"Securitycode":"111","CardTypeId":"1","BankName":null,"BankLocation":null,"AccountHolder":null,"AccountNumber":null,"ShowDepositOption":false,"IsUsingDeposit":false,"MinimumDepositAmount":0,"CanDebitBalance":false,"PaRes":null,"TL":null,"MD":null,"PrePaymentID":null,"DepositAmount":0,"OverrideCardId":0,"OverrideUserId":0,"IsSkippingPayment":false,"ExternalPaymentAuthCode":null,"OfficeId":0,"cardFee":0,"CardFee":0,"CardTypeSelected":"1","PaymentTypeId":1},"PassengerList":[{"Id":0,"Title":"Mr","FirstName":"pp","LastName":"three","Age":21,"Type":1,"Summary":"Adult","HasInsurance":true,"InsuranceType":0,"LinkedBkItemSeqNo":77000,"DriverType":null,"DOB":null,"Nationality":null,"SystemDefaultAge":true},{"Id":1,"Title":null,"FirstName":null,"LastName":null,"Age":21,"Type":1,"Summary":"Adult","HasInsurance":true,"InsuranceType":0,"LinkedBkItemSeqNo":77000,"DriverType":null,"DOB":null,"Nationality":null,"SystemDefaultAge":true}],"RequirementsList":[{"RoomId":0,"DisplayRoomNumber":1,"RequirementsText":null}],"BasketId":basketId,"ConnectingFlight":{"OutboundFlightNumber":null,"OutboundDate":"2014-10-28T00:00:00Z","OutboundDepartureAirport":null,"OutboundDepartureAirportName":null,"OutboundDestinationAirport":null,"OutboundDestinationAirportName":null,"InboundFlightNumber":null,"InboundDate":"2014-11-01T00:00:00Z","InboundDepartureAirport":null,"InboundDepartureAirportName":null,"InboundDestinationAirport":null,"InboundDestinationAirportName":null,"InboundFlightClass":null,"OutboundFlightClass":null},"CarDetails":{"Make":"","Model":"","Colour":"","Registration":""},"AttractionDetails":[],"HotelDetails":{"Name":"","Address":""},"ChauffeurDetails":{"PickUpTime":null,"Building":null,"Address":null,"Landmark":null,"ContactNo":null}}};
				//var bookingFormData = {"userData":{"ContactDetails":{"Title":"mr","FirstName":"pp","LastName":"four","HomeTel":"12345","MobileTel":"","WorkTel":null,"EmailAddress":"nr@tr.co.uk","EmailConfirm":"nr@tr.co.uk","Address1":"Harper & Tweedie Ltd, Chichester House, 145A London Road","Address2":null,"Address3":null,"Town":"Kingston upon Thames","Country":"GB","County":"","PostCode":"KT2 6NH","SendTextAlerts":false,"AgreeToConditions":true,"EmailSignup":true,"ReferrerId":0,"BookingCallBack":false,"LinkedBookingID":null,"PublicUserId":null,"CountryName":""},"PaymentDetails":{"CardNumber":"","StartMonth":null,"StartYear":null,"EndMonth":"","EndYear":"","IssueNumber":null,"Securitycode":"","CardTypeId":"","BankName":null,"BankLocation":null,"AccountHolder":null,"AccountNumber":null,"ShowDepositOption":false,"IsUsingDeposit":false,"MinimumDepositAmount":0,"CanDebitBalance":false,"PaRes":null,"TL":null,"MD":null,"PrePaymentID":null,"DepositAmount":0,"OverrideCardId":0,"OverrideUserId":0,"IsSkippingPayment":true,"ExternalPaymentAuthCode":null,"OfficeId":0,"cardFee":0,"CardFee":0,"CardTypeSelected":"1","PaymentTypeId":1},"PassengerList":[{"Id":0,"Title":"Mr","FirstName":"pp","LastName":"three","Age":21,"Type":1,"Summary":"Adult","HasInsurance":true,"InsuranceType":0,"LinkedBkItemSeqNo":77000,"DriverType":null,"DOB":null,"Nationality":null,"SystemDefaultAge":true},{"Id":1,"Title":null,"FirstName":null,"LastName":null,"Age":21,"Type":1,"Summary":"Adult","HasInsurance":true,"InsuranceType":0,"LinkedBkItemSeqNo":77000,"DriverType":null,"DOB":null,"Nationality":null,"SystemDefaultAge":true}],"RequirementsList":[{"RoomId":0,"DisplayRoomNumber":1,"RequirementsText":null}],"BasketId":basketId,"ConnectingFlight":{"OutboundFlightNumber":null,"OutboundDate":"2014-10-28T00:00:00Z","OutboundDepartureAirport":null,"OutboundDepartureAirportName":null,"OutboundDestinationAirport":null,"OutboundDestinationAirportName":null,"InboundFlightNumber":null,"InboundDate":"2014-11-01T00:00:00Z","InboundDepartureAirport":null,"InboundDepartureAirportName":null,"InboundDestinationAirport":null,"InboundDestinationAirportName":null,"InboundFlightClass":null,"OutboundFlightClass":null},"CarDetails":{"Make":"","Model":"","Colour":"","Registration":""},"AttractionDetails":[],"HotelDetails":{"Name":"","Address":""},"ChauffeurDetails":{"PickUpTime":null,"Building":null,"Address":null,"Landmark":null,"ContactNo":null}}};
				
				//console.log(JSON.stringify(bookingFormData));
				
				
				jQuery.ajax({
					url: bookingURL,
					data: JSON.stringify(bookingFormData) ,
				    dataType: 'json',
				    headers: { "Content-Type": "application/json", "Accept": "application/json" },
					type: "POST",
					success: function(data, textStatus, jqXHR) {
						
						//alert(data.Action +"\n"+ data.PrePaymentID+"\n");
						var bookingResponse = "";
						for(var i in data){
							console.log(i + " : " + data[i]);
							bookingResponse += i + " : " + data[i] + "\n";
						}
						alert(bookingResponse);
						
						/*
						//retrieve booking Id
						url = "https://pp.travelrepublic.co.uk" +data.Reference;
						jQuery.ajax({
							url: _url,
						    //dataType: 'html',
						    type: "GET",
							success: function(data, textStatus, jqXHR) {
								alert("success");
								
								//parse response html and extract booking id
								var el = document.createElement( 'div' );
								el.innerHTML = data;
								el.getElementsByTagName( 'a' );
							},
							error: function(xhr,error,code) {
						        // SOMETHING WRONG WITH YOUR CALL.
							    alert("failed rooms retrieval: " +error +"-:-"+ code); 
							},
							complete: function() {
							  	//alert("Process Completed.");
							}
						
						)};
						
						*/
					},
					error: function(xhr,error,code) {
				        // SOMETHING WRONG WITH YOUR CALL.
					    alert("failed retrieving booking param: " +error +"-:-"+ code); 
					},
					complete: function() {
					  	//alert("Process Completed.");
					}
				});
				
			},
			error: function(xhr,error,code) {
		        // SOMETHING WRONG WITH YOUR CALL.
			    console.log("failed basket id retreival: " +error +"-:-"+ code); 
			},
			complete: function() {
			  	//alert("Process Completed.");
			}
		});
	}
	
	
}

//What to do when paused
function onPause(){
	alert("paused!");
}
		
//What to do when resumed
function onResume(){
	alert("resume");
}

function onOnline(){
	alert("Hurray !!! Connected to network");;
}

function onOffline(){
	alert("Device isn't connected :( ");
}
