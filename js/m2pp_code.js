document.addEventListener("deviceready", onDeviceReady, false);
		
function onDeviceReady() {
	console.log("device ready");
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
	
	FastClick.attach(document.body);
	
	var baseUrl = 'https://m2.pp.travelrepublic.co.uk/api2/';
    
	//autocompleter for hotels destination	
	var title, estabCount, countryId, provinceId, locationId, placeId, estabId, polygonId, checkInDate, checkOutDate, bookingCost;
	
	$('#destinationHotels').on("input",function(){
		if ($('#destinationHotels').val().length > 3) {
			
			var _data = {"SearchTerm":$('#destinationHotels').val(),"MaxResults":15,"CultureCode":"en-gb","RestrictToFlightDestinations":false};
			var _url = baseUrl+ 'hotels/static/getdestinations';
			
			jQuery.ajax({
				url: _url,
				data: JSON.stringify(_data),
			    dataType: 'json',
			    headers: { "Content-Type": "application/json", "Accept": "application/json" },
			    type: "POST",
			    			    
			    success: function(data, textStatus, jqXHR) {
			                    // Calls Success. If data found on the service then it would be inside "DATA" variable
			    	//alert(data.d[0].t);
			    	$("#suggestHotels").html("");
			    	
			    	//console.log(data.d.length);
			    	
			    	if(data.Destinations.length === 0){
			    		$("#suggestHotels").append("No locations found");
			    	}
			    	else{
			    		
			    		for(var i in data.Destinations){
				    		if (data.Destinations[i].EstablishmentCount){
				    			$("#suggestHotels").append("<li data-icon=\"false\"><a href=\"#\" value=\"" +data.Destinations[i].Title+ "\" estabCount = \"" +data.Destinations[i].EstablishmentCount + "\" polygonId = \"" +data.Destinations[i].PolygonId + "\" countryId = \"" +data.Destinations[i].CountryId + "\" provinceId = \"" +data.Destinations[i].ProvinceId+ "\" locationId =\"" +data.Destinations[i].LocationId+ "\" placeId = \"" +data.Destinations[i].PlaceId+ "\" estabId = \"" +data.Destinations[i].EstablishmentId+"\">" +data.Destinations[i].Title+ "  (" + data.Destinations[i].EstablishmentCount +" hotels)</a></li>");
				    			//$("#suggestHotels").append("<li data-icon=\"false\"><a href=\"#\" value=\"" +data.d[i].t+ "\">" +data.d[i].t+ "  (" + data.d[i].v.n +" hotels)</a></li>");
				    			//alert(data.d[i].v.c +"\n"+ data.d[i].v.p +"\n" + data.d[i].v.l +"\n"+ data.d[i].v.pl +"\n" +data.d[i].v.e);
				    		}
							else{
								$("#suggestHotels").append("<li data-icon=\"false\"><a href=\"#\" value=\"" +data.Destinations[i].Title+ "\" estabCount = \"" +data.Destinations[i].EstablishmentCount + "\" polygonId = \"" +data.Destinations[i].PolygonId + "\" countryId = \"" +data.Destinations[i].CountryId + "\" provinceId = \"" +data.Destinations[i].ProvinceId+ "\" locationId =\"" +data.Destinations[i].LocationId+ "\" placeId = \"" +data.Destinations[i].PlaceId+ "\" estabId = \"" +data.Destinations[i].EstablishmentId +"\">" +data.Destinations[i].Title+ "</a></li>");
								//$("#suggestHotels").append("<li data-icon=\"false\"><a href=\"#\" value=\"" +data.d[i].t+ "\">" +data.d[i].t+ "</a></li>");
							}
						}
			    	}
			    	
					
					$("#suggestHotels").listview('refresh');
			    },
			    error: function(xhr,error,code) {
		            // SOMETHING WRONG WITH YOUR CALL.
			        console.log("hotel autocompleter call failed"); 
			        //alert(("hotel autocompleter call failed");
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
		estabCount = $(this).attr("estabCount");
		countryId = $(this).attr("countryId");
		provinceId = $(this).attr("provinceId");
		locationId = $(this).attr("locationId");
		placeId = $(this).attr("placeId");
		estabId = $(this).attr("estabId");
		polygonId = $(this).attr("polygonId");
		
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
	
	var searchId, currencySymbol, basketId, currencyCode = 'GBP';
	//Hotels search 
	$('#btnSearchHotel').on("vclick",function(){
		
		//code for retrieving and displaying hotel list
		checkInDate = convertDateFormat($('#checkInHotels').val()) + 'T00:00:00.000Z';
		checkOutDate = convertDateFormat($('#checkOutHotels').val()) + 'T00:00:00.000Z';
				
		var getHotelsUrl = baseUrl+ 'hotels/availability/gethotels';
		var hotelFormData = {"CultureCode":"en-gb","AccountingCurrencyCode":currencyCode,"DomainId":1,"TradingGroupId":1,"CurrencyCode":currencyCode,"Paging":{"PageIndex":0,"PageSize":10},"SortCriterion":1,"AvailabilitySearchId":"","TripId":"","Rooms":[{"Adults":2,"ChildAges":[]}],"Destination":{"Title":title,"EstablishmentCount":estabCount,"CountryId":countryId,"ProvinceId":provinceId,"LocationId":locationId,"PlaceId":placeId,"EstablishmentId":estabId,"PolygonId":polygonId,"LandingPageImageId":0,"HolidayEnabled":true,"Searchable":true},"CheckInDate":checkInDate,"CheckOutDate":checkOutDate,"FilterCriteria":{"Stars":[],"PropertyType":[],"BoardTypeCode":[],"EstablishmentName":"","PriceRange":null,"RatingRange":null}};
		//console.log(JSON.stringify(hotelFormData));
			
		jQuery.ajax({
			url: getHotelsUrl,
		    data: JSON.stringify(hotelFormData) ,						
		    dataType: 'json',
		    headers: { "Content-Type": "application/json", "Accept": "application/json" },
		    type: "POST",
		    		   
		    success: function(data, textStatus, jqXHR) {
		        // Calls Success. If data found on the service then it would be inside "DATA" variable

			   	searchId = data.AvailabilitySearchId;
			   	console.log("sid = " +searchId);
			   	
			   	$("#availableHotels").html("<b>Available Hotels:</b>");
			   	for(var i in data.Establishments){
					//hotelList += data.searchData.hotels[i].name + '\n';
					//availableHotels;
					estabId = data.Establishments[i].EstablishmentId;
					//console.log("Estab ID -" + estabId);
					    	
					$("#availableHotels").append("<li ><a href=\"#\" value=\"" +data.Establishments[i].Name+ "\" estabId=\"" +estabId+ "\">" +data.Establishments[i].Name+ "</a></li><ul id=\"" +estabId+ "\" data-role=\"listview\" data-inset=\"true\"></ul>");
					$("#availableHotels").listview('refresh');    	
			    }
								
		    },

		    error: function(xhr,error,code) {
	            // SOMETHING WRONG WITH YOUR CALL.
		        console.log("sid and hotel list retrival failure - " +error +"-:-"+ code);
		    },
		    complete: function() {
		    	//alert("Process Completed.");
		    }
		   
		});
		
		//code to retrieve basket id
		var basketUrl = baseUrl+ 'basket/create';
		var basketFormData = {"AccountingCurrencyCode": currencyCode,"BasketId": "","CurrencyCode": currencyCode};
		//console.log(JSON.stringify(basketFormData));
		
		jQuery.ajax({
			url: basketUrl,
		    data: JSON.stringify(basketFormData) ,						
		    dataType: 'json',
		    headers: { "Content-Type": "application/json", "Accept": "application/json" },
		    type: "POST",
		    		   
		    success: function(data, textStatus, jqXHR) {
		        // Calls Success. If data found on the service then it would be inside "DATA" variable
				
			   	basketId = data.BasketId;
			   	console.log("basket id = " +basketId);					
		    },

		    error: function(xhr,error,code) {
	            // SOMETHING WRONG WITH YOUR CALL.
		        console.log("basket id retrival failure - " +error +"-:-"+ code);
		    },
		    complete: function() {
		    	//alert("Process Completed.");
		    }
		   
		});
		

	});
	
	var lastEstabId, roomId1;
	$('#availableHotels').delegate('a','vclick',function(){
		
		estabId = $(this).attr("estabId");
		roomId1 = $(this).attr("roomId");
		bookingCost = $(this).attr("accommodationCost");
		
		if(typeof estabId === "undefined"){
			roomSelection();
		}
		else{
			lastEstabId = estabId;
			
			var getRoomsUrl = baseUrl+ "hotels/availability/getrooms";			
			var getRoomsFormData = {"AvailabilitySearchId": searchId,"EstablishmentId":estabId,"CurrencyCode": currencyCode};		
			//console.log(JSON.stringify(formData));
				
			jQuery.ajax({
				url: getRoomsUrl,
				data: JSON.stringify(getRoomsFormData) ,
			    dataType: 'json',
			    headers: { "Content-Type": "application/json", "Accept": "application/json" },
				type: "POST",
				success: function(data, textStatus, jqXHR) {
					//alert("success");
					
					var hotelid = "#"+estabId;
					//code to be updated
					$(hotelid).html("");
					var roomId,roomDescription, boardType, accommodationCost;
											
					var roomData = data.RequestedRooms[0]; 
					//alert(data.RequestedRooms[0].Availability[0].Id);
					for(var i in roomData.Availability){
				    	//availableRooms;
				    	roomId = roomData.Availability[i].Id;
				    	roomDescription = roomData.Availability[i].RoomDescription;
				    	boardType = roomData.Availability[i].BoardDescription;
				    	accommodationCost = roomData.Availability[i].Cost;
				    				    	
				    	//alert(roomDescription+ "||" +boardType+ "||" +accommodationCost)	;		    	
				    	$(hotelid).append("<li data-icon=\"false\"><a href=\"#\" class=\"roomList\" accommodationCost =\"" +accommodationCost+ "\"roomId=\"" +roomId+ "\">" +roomDescription+ " || " +boardType+ " || " +currencyCode+ " " +accommodationCost+ "</a></li>");
				    }
				    //$(hotelid).listview('refresh');
			
				},
				error: function(xhr,error,code) {
			        // SOMETHING WRONG WITH YOUR CALL.
			        //alert("failed rooms retrieval: " +error +"-:-"+ code);
				    console.log("failed rooms retrieval: " +error +"-:-"+ code); 
				},
				complete: function() {
				  	//alert("Process Completed.");
				}
			});
		}
		
	});
	
	//executed on clicking on a room option 
	function roomSelection(){
		//alert("you clicked on a room");
		var detailsId, bookProcessId, bookingRef;
		
		//get details id
		var detailsIdUrl = baseUrl+ "hotels/details/getdetails";			
		var detailsIdFormData = {"AvailabilitySearchId": searchId,"EstablishmentId":lastEstabId,"RoomAndBoardIds":[roomId1]};		
		//console.log(JSON.stringify(formData));
			
		jQuery.ajax({
			url: detailsIdUrl,
			data: JSON.stringify(detailsIdFormData) ,
		    dataType: 'json',
		    headers: { "Content-Type": "application/json", "Accept": "application/json" },
			type: "POST",
			success: function(data, textStatus, jqXHR) {
				detailsId = data.DetailsId;
				console.log("details id - " +detailsId);
				//alert("details id - " +detailsId);
				
				//get booking process id
				var bookProcessUrl = baseUrl+ 'bookings/preparebooking';
				var bookProcessFormData = {"BookingProcessId":"","DomainId":1,"CultureCode":"en-gb","Products":[{"Id":detailsId,"BookingTypeId":8}]};
				
				jQuery.ajax({
					url: bookProcessUrl,
					data: JSON.stringify(bookProcessFormData) ,
				    dataType: 'json',
				    headers: { "Content-Type": "application/json", "Accept": "application/json"},
					type: "POST",
					success: function(data, textStatus, jqXHR) {
						bookProcessId = data.BookingProcessId;
						console.log("booking process id - " +bookProcessId);
						//alert("booking process id - " +bookProcessId);
						var supplierId = data.TermsData.Suppliers[0], linkedBkItemSeqNo  = data.UserData.Rooms[0].LinkedBkItemSeqNo;
						//console.log("supplier id - " + supplierId +" ; linkedBkItemSeqNo - " +linkedBkItemSeqNo);
												
						//get booking reference
						var createBookingUrl = baseUrl+ 'bookings/createbooking';
						/* 
						 * Substitute most the values in form data to apprpriate ones.
						 */
						var createBookingFormData = {"BookingProcessId":bookProcessId,"PaymentOptions":[{"CardTypeId":48,"PaymentTypeId":1,"FeePercent":1.75,"FeeCap":0,"Title":"American Express","DataCashScheme":null,"AdminOverride":false,"ImageUrl":"~/images/shopBasket/cardAE.png","IsBankPayment":false,"Type":"American Express","IsPayPalPayment":false,"FullDetails":false},{"CardTypeId":6,"PaymentTypeId":2,"FeePercent":0,"FeeCap":0,"Title":"Connect","DataCashScheme":null,"AdminOverride":false,"ImageUrl":"~/images/shopBasket/cardVI.gif","IsBankPayment":false,"Type":"Visa Delta","IsPayPalPayment":false,"FullDetails":false},{"CardTypeId":2,"PaymentTypeId":1,"FeePercent":1.75,"FeeCap":0,"Title":"Mastercard Credit","DataCashScheme":null,"AdminOverride":false,"ImageUrl":"~/images/shopBasket/cardCA.gif","IsBankPayment":false,"Type":"Mastercard","IsPayPalPayment":false,"FullDetails":false},{"CardTypeId":31,"PaymentTypeId":2,"FeePercent":0,"FeeCap":0,"Title":"Mastercard Debit","DataCashScheme":null,"AdminOverride":false,"ImageUrl":"~/images/shopBasket/cardCA.gif","IsBankPayment":false,"Type":"Debit Mastercard","IsPayPalPayment":false,"FullDetails":false},{"CardTypeId":87,"PaymentTypeId":14,"FeePercent":0,"FeeCap":0,"Title":"PayPal","DataCashScheme":null,"AdminOverride":false,"ImageUrl":"~/images/shopBasket/paypal.gif","IsBankPayment":false,"Type":"PayPal","IsPayPalPayment":true,"FullDetails":false},{"CardTypeId":3,"PaymentTypeId":2,"FeePercent":0,"FeeCap":0,"Title":"Switch/Maestro","DataCashScheme":null,"AdminOverride":false,"ImageUrl":"~/images/shopBasket/cardSW.gif","IsBankPayment":false,"Type":"Switch/Maestro","IsPayPalPayment":false,"FullDetails":true},{"CardTypeId":1,"PaymentTypeId":1,"FeePercent":1.75,"FeeCap":0,"Title":"Visa Credit","DataCashScheme":null,"AdminOverride":false,"ImageUrl":"~/images/shopBasket/cardVI.gif","IsBankPayment":false,"Type":"Visa/Visa Purchasing","IsPayPalPayment":false,"FullDetails":false},{"CardTypeId":108,"PaymentTypeId":1,"FeePercent":1.75,"FeeCap":0,"Title":"Visa Credit(Datacash)","DataCashScheme":null,"AdminOverride":false,"ImageUrl":"~/images/shopBasket/cardVI.gif","IsBankPayment":false,"Type":"Visa/Visa Purchasing","IsPayPalPayment":false,"FullDetails":false},{"CardTypeId":4,"PaymentTypeId":2,"FeePercent":0,"FeeCap":0,"Title":"Visa Debit/Delta","DataCashScheme":null,"AdminOverride":false,"ImageUrl":"~/images/shopBasket/cardVI.gif","IsBankPayment":false,"Type":"Visa Delta","IsPayPalPayment":false,"FullDetails":false},{"CardTypeId":7,"PaymentTypeId":2,"FeePercent":0,"FeeCap":0,"Title":"Visa Electron","DataCashScheme":null,"AdminOverride":false,"ImageUrl":"~/images/shopBasket/cardVI.gif","IsBankPayment":false,"Type":"Visa Electron","IsPayPalPayment":false,"FullDetails":false}],"BookingRules":{"ForcePayment":true,"IsStartDateMandatory":false,"IsEveryPassengerRequired":false,"IsEmailMandatory":true,"IsPostCodeMandatory":true,"EnablePostCodeLookup":true,"AddressRequired":true,"CaptureFlightDetails":false,"CaptureHotelDetails":false,"IsDOBRequiredForAllAdults":false,"IsDOBRequiredForAllChildren":false,"IsDOBRequiredForAllInfants":false,"IsFlightPlus":false,"NationalityRequired":false,"CheckCardExpiryAgainstArrivalDate":false,"CaptureSMSAlerts":true,"ShowCardFeeIfZero":false,"LockEmailControls":false,"PassengerTitle":"Guest Details","PassengerPrompts":["Please enter the guest details for this booking."]},"TermsData":{"Suppliers":[supplierId],"TransferRateId":null},"AcceptanceText":"I have read and accept the <a class='bold underline agencyTerms'>Agency Terms of Business</a> of Travel Republic and the <a class='bold underline bookingTerms'>Booking Conditions</a> of the Travel Providers.","UserData":{"Contact":{"CountryCode":"GB","PostCode":"KT2 6NH","Address":"Clarendon House 147 London Road","City":"Kingston upon Thames","County":null,"HomeTel":"12345","MobileTel":null,"Email":"mobileApp@travelrepublic.co.uk","SendTextAlerts":true,"EmailOptOut":true,"AgreeToConditions":false,"Title":"Mr","FirstName":"mobile","LastName":"app","Age":0,"DateOfBirth":null,"Type":0,"LinkedBkItemSeqNo":0,"SignedIn":false,"AnonSignedIn":false,"manualAddress":false},"Rooms":[{"Guests":[{"Age":21,"DateOfBirth":null,"Type":1,"LinkedBkItemSeqNo":linkedBkItemSeqNo,"Label":"Adult Name","RequiresDob":false},{"Title":null,"FirstName":null,"LastName":null,"Age":21,"DateOfBirth":null,"Type":1,"LinkedBkItemSeqNo":linkedBkItemSeqNo,"Label":"Adult Name","RequiresDob":false}],"SpecialRequest":null,"LinkedBkItemSeqNo":linkedBkItemSeqNo}],"PaymentDetails":{"PaypalDetails":null,"CardDetails":{"CardType":31,"CardNumber":"1003130000000000","StartDate":{"Month":0,"Year":0},"ExpiryDate":{"Month":3,"Year":2021},"SecurityCode":"111","IssueNumber":null},"CanDebitBalance":false,"DepositAmount":0,"PrePaymentID":null,"PaRes":null,"MD":null,"PaymentAmount":bookingCost},"ConnectingFlight":{"OutboundFlightNumber":null,"OutboundDate":checkInDate,"OutboundDepartureAirport":null,"OutboundDepartureAirportName":null,"OutboundDestinationAirport":null,"OutboundDestinationAirportName":null,"InboundFlightNumber":null,"InboundDate":checkOutDate,"InboundDepartureAirport":null,"InboundDepartureAirportName":null,"InboundDestinationAirport":null,"InboundDestinationAirportName":null,"InboundFlightClass":null,"OutboundFlightClass":null},"HotelDetails":{"Name":"","Address":""},"ChauffeurDetails":null},"DomainId":1,"CultureCode":"en-gb","TripId":""};
						//console.log(JSON.stringify(createBookingFormData));
											
						jQuery.ajax({
							url: createBookingUrl,
							data: JSON.stringify(createBookingFormData) ,
						    dataType: 'json',
						    headers: { "Content-Type": "application/json", "Accept": "application/json"},
							type: "POST",
							success: function(data, textStatus, jqXHR) {
								alert("Booking ref - " +data.BookingReferences[0]);
								console.log("Booking ref - " +data.BookingReferences[0]);
							},
							error: function(xhr,error,code) {
						        // SOMETHING WRONG WITH YOUR CALL.
						        console.log("failed booking reference retrieval: " +error +"-:-"+ code); 
						        alert("failed booking reference retrieval: " +error +"-:-"+ code);
							},
							complete: function() {
							  	//alert("Process Completed.");
							}
						});	
						
								
					},
					error: function(xhr,error,code) {
				        // SOMETHING WRONG WITH YOUR CALL.
				        console.log("failed booking process id retrieval: " +error +"-:-"+ code); 
					},
					complete: function() {
					  	//alert("Process Completed.");
					}
				});
			},
			error: function(xhr,error,code) {
		        // SOMETHING WRONG WITH YOUR CALL.
		        console.log("failed details id retrieval: " +error +"-:-"+ code); 
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

