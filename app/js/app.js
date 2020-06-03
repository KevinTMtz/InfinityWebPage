$(document).ready(() => {
    // Sign in
    var activeUser=0;
    if (store.get("users") == undefined){
        store.set("users", []);
    }

    $('#signin').on('click', function () {
        var tempArray = store.get("users");
        var usercheck = false;

        if (!$("#input-form")[0].checkValidity()) {
            $("#input-form").find("#submit-hidden").click();
        }

        // Validate user info
        if (signin == true && ($('#username').val() != "") && ($('#password').val() != "")) {
            for (h=0;h<tempArray.length;h++) {
                if ((tempArray[h].username == document.getElementById("username").value) && (tempArray[h].password == document.getElementById("password").value)) {
                    usercheck = true;
                    activeUser = h;
                    break;
                }
            }

            if (usercheck) {
                $('.app1').hide();
                $('.app2').fadeIn();
                $('.box').hide();
                $('#box-1').fadeIn();
                $( "#one" ).prop( "checked", true );
                $('.app2 #footer').css('display', 'flex');

                document.getElementById('error-name').innerHTML = "···";

                $('#username-config').text(tempArray[activeUser].username);

                displayKnockis();
            } else if (!usercheck) {
                document.getElementById('error-name').innerHTML = "Wrong User or password";
            }
        // Register new user
        } else if (signin == false && ($('#username').val() != "") && ($('#mail').val() != "") && ($('#password').val() != "") && ($('#input-form')[0].checkValidity())) {
            var userAvailable = true

            // Check if the user already exist
            for (h=0;h<tempArray.length;h++) {
                if ((tempArray[h].username == document.getElementById("username").value)) {
                    userAvailable = false;
                    break;
                }
            } 
            
            if (!userAvailable) {
                document.getElementById('error-name').innerHTML = "This user already exist";
            } else if (userAvailable) {
                tempArray.push({username: document.getElementById("username").value, mail: document.getElementById("mail").value, password: document.getElementById("password").value, knockis: [], location: $('#locationInput').val()});

                store.set("users", tempArray);
    
                $('#mail').slideToggle();
                signin = true;
                
                $('#signin').text("Sign in");
                $('#change-to-signup').text("Or sign up");

                document.getElementById('error-name').innerHTML = "Successful registration";
            }
        }        
    });



    // Show to sign up menu
    var signin = true;
    
    $('#change-to-signup').on('click', function () {
        $('#mail').slideToggle();

        if (signin) {
            $('#signin').text("Sign up");
            $('#change-to-signup').text("Cancel sign up");
            $('#mail').prop('required',true);
            signin = false;

            document.getElementById('error-name').innerHTML = "···";
        } else {
            $('#signin').text("Sign in");
            $('#change-to-signup').text("Or sign up");
            $('#mail').removeAttr('required');
            signin = true;
        }
    });


    
    // Change tabs with footer
    $('.icons').on('click', function () {
        $('.box').hide();
        window.scrollTo(0, 0);

        if ($(this).hasClass('home')) {
            $('#box-1').fadeIn();
        } else if ($(this).hasClass('knocki')) {
            $('#box-2').fadeIn();
        } else if ($(this).hasClass('user')) {
            $('#box-3').fadeIn();
        }
    });





    
    /* *********************************************
    ************************************************
                    Add/delete knockis
    ************************************************
    ********************************************* */
    // Show add knocki tab
    $('#add-knocki').on('click',function(){
        $('.box').hide();
        window.scrollTo(0, 0);

        $('#box-5').fadeIn();
        $('#knocki-name').val("");

        $('.app2 #footer').css('display', 'none');
    });



    // Hide add knocki tab
    $('.cancel-add-knocki').on('click',function(){
        $('.box').hide();
        window.scrollTo(0, 0);

        $('#box-2').fadeIn();

        $('.app2 #footer').css('display', 'flex');
    });
    


    // Delete knocki
    $('.delete-knocki').on('click',function(){
        $('.box').hide();
        window.scrollTo(0, 0);

        var i = $(this).attr('id');
        var tempArray = store.get("users");

        tempArray[activeUser].knockis.splice(i,1);
        store.set("users", tempArray);

        $('#box-2').fadeIn();
        displayKnockis();

        $('.app2 #footer').css('display', 'flex');
    });



    // Add Knockis
    $('#save-new-knocki').on('click',function(){
        $('.box').hide();
        window.scrollTo(0, 0);
        
        var tempArray = store.get("users");

        tempArray[activeUser].knockis.push({name: document.getElementById("knocki-name").value, status:"OFF", gestures: [], location: $('#locationInput').val()});

        store.set("users", tempArray);
        
        displayKnockis();
        $('#box-2').fadeIn();

        $('.app2 #footer').css('display', 'flex');
    });
    
    function displayKnockis(){
        var tempArray = store.get("users");
        $('#knocki-content').empty();

        for(i=0; i<tempArray[activeUser].knockis.length; i++){
            $('#knocki-content').append(`
            <div class="knocki-d" id="${i}">
                <img src="./img/knocki-icon.png">
                <div id="knocki-info">
                    <p><strong>${tempArray[activeUser].knockis[i].name}</strong></p>
                    <p style="color: rgb(132, 31, 255)">Battery: 100%</p>
                    <p>Gestures: ${tempArray[activeUser].knockis[i].gestures.length}</p>
                </div>
                <p class="status-on-off" id="status-on-off-${i}">${tempArray[activeUser].knockis[i].status}</p>
                <svg style="width:50px;height:50px" viewBox="0 0 24 24" id="see-knocki-info">
                <path fill="#ffffff" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
            </svg>                
            </div> `);

            // Change state color
            if (tempArray[activeUser].knockis[i].status == "ON") {
                $(`#status-on-off-${i}`).css("color", "rgb(0, 215, 0)");
            } else if (tempArray[activeUser].knockis[i].status == "OFF") {
                $(`#status-on-off-${i}`).css("color", "red");
            }
        }    
    }





    
    /* *********************************************
    ************************************************
                    Edit knocki
    ************************************************
    ********************************************* */
    // Show edit knocki tab
    $('#knocki-content').on('click', "#see-knocki-info", function () {
        $('.box').hide();
        window.scrollTo(0, 0);

        var i = $(this).parent().attr('id');
        var tempArray = store.get("users");

        if (tempArray[activeUser].knockis[i].status == "ON") {
            $('.toggle').addClass('toggle-on');
        } else {
            $('.toggle').removeClass('toggle-on');
        }

        $('#box-4').fadeIn();

        $('.delete-knocki').removeAttr('id');
        $('.delete-knocki').attr('id', i);

        $('#edit-knocki-location').val(tempArray[activeUser].knockis[i].name);

        displayGestures();

        $('.app2 #footer').css('display', 'none');
    });

    // Hide edit knocki tab
    $('.done-edit-knocki').on('click',function(){
        $('.box').hide();
        window.scrollTo(0, 0);

        var tempArray = store.get("users");
        var i = $('.delete-knocki').attr('id');

        tempArray[activeUser].knockis[i].name = $('#edit-knocki-location').val();

        store.set("users", tempArray);
        displayKnockis();

        $('#box-2').fadeIn();

        $('.app2 #footer').css('display', 'flex');
    });



    // Turn On-Off Knocki
    $('#switch').on('click',function(){
        var i = $('.delete-knocki').attr('id');
        var tempArray = store.get("users");

        if (tempArray[activeUser].knockis[i].status == "OFF") {
            tempArray[activeUser].knockis[i].status = "ON";
        } else if (tempArray[activeUser].knockis[i].status == "ON") {
            tempArray[activeUser].knockis[i].status = "OFF";
        }

        store.set("users", tempArray);

        displayKnockis();
    });



    // Button in edit knocki tab
    $('.toggle').click(function(e){
        e.preventDefault();
        $(this).toggleClass('toggle-on');
    });






    /* *********************************************
    ************************************************
                    Add gestures
    ************************************************
    ********************************************* */
    // Show add gestures tab
    $('#add-gestures').on('click',function(){
        $('.box').hide();
        window.scrollTo(0, 0);

        $('#box-6').fadeIn();
        $('#gesture-name').val("");
        document.getElementById("linked-app-select-add").value = 1;
        $('#gesture-taps').empty();
        $('.action-appicon').hide();
        $('#img1').fadeIn();

        var i = $('.delete-knocki').attr('id');
        var tempArray = store.get("users");

        tempArray[activeUser].knockis[i].gestures.push({name: document.getElementById("gesture-name").value, tapsOrSpaces: [], action: 1, location: $('#locationInput').val()});

        store.set("users", tempArray);

        $('.app2 #footer').css('display', 'none');
    });
    


    // Add Gestures
    $('#save-new-gesture').on('click',function(){
        $('.box').hide();
        window.scrollTo(0, 0);
        
        var i = $('.delete-knocki').attr('id');
        var tempArray = store.get("users");

        tempArray[activeUser].knockis[i].gestures[(tempArray[activeUser].knockis[i].gestures.length)-1].name = document.getElementById("gesture-name").value;

        tempArray[activeUser].knockis[i].gestures[(tempArray[activeUser].knockis[i].gestures.length)-1].action = document.getElementById("linked-app-select-add").value;

        store.set("users", tempArray);
        
        displayKnockis();
        displayGestures();
        $('#box-4').fadeIn();
    });

    // To show the app icon
    $('#linked-app-select-add').change(function(){
        
        if (document.getElementById("linked-app-select-add").value == 1) {
            $('.action-appicon').hide();
            $('#img1').fadeIn();
        } else if (document.getElementById("linked-app-select-add").value == 2) {
            $('.action-appicon').hide();
            $('#img2').fadeIn();
        } else if (document.getElementById("linked-app-select-add").value == 3) {
            $('.action-appicon').hide();
            $('#img3').fadeIn();
        } else if (document.getElementById("linked-app-select-add").value == 4) {
            $('.action-appicon').hide();
            $('#img4').fadeIn();
        } else if (document.getElementById("linked-app-select-add").value == 5) {
            $('.action-appicon').hide();
            $('#img5').fadeIn();
        } else if (document.getElementById("linked-app-select-add").value == 6) {
            $('.action-appicon').hide();
            $('#img6').fadeIn();
        } else if (document.getElementById("linked-app-select-add").value == 7) {
            $('.action-appicon').hide();
            $('#img7').fadeIn();
        } else if (document.getElementById("linked-app-select-add").value == 8) {
            $('.action-appicon').hide();
            $('#img8').fadeIn();
        } else if (document.getElementById("linked-app-select-add").value == 9) {
            $('.action-appicon').hide();
            $('#img9').fadeIn();
        } else if (document.getElementById("linked-app-select-add").value == 10) {
            $('.action-appicon').hide();
            $('#img10').fadeIn();
        }
    });
    
    // Display gestures in edit knocki tab
    function displayGestures() {
        var tempArray = store.get("users")
        var k = $('.delete-knocki').attr('id');
        $('#gestures-div').empty();

        for(i=0; i<tempArray[activeUser].knockis[k].gestures.length; i++){
            $('#gestures-div').append(`
                <div class="kocki-edit-info gestures-div-edit-knocki-tab" id="${i}">
                    <p>${tempArray[activeUser].knockis[k].gestures[i].name}</p>
                    <div id="taps-display-${i}" class="taps-append-container">
                    <!-- Here goes the taps -->
                    </div>
                    <svg style="width:35px;height:35px" viewBox="0 0 24 24" class="edit-this">
                        <path fill="#ffffff" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                    </svg>
                </div>
            `);
            
            for (h=0; h<tempArray[activeUser].knockis[k].gestures[i].tapsOrSpaces.length;h++) {
                if (tempArray[activeUser].knockis[k].gestures[i].tapsOrSpaces[h].tap == 0) {
                    $(`#taps-display-${i}`).append(`
                        <svg style="width:30px;height:30px" viewBox="0 0 24 24">
                            <path fill="#ffffff" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                    `);
                } else if (tempArray[activeUser].knockis[k].gestures[i].tapsOrSpaces[h].tap == 1) {
                    $(`#taps-display-${i}`).append(`
                        <svg style="width:30px;height:30px" viewBox="0 0 24 24">
                            <path fill="#ffffff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                    `);
                }
            }
        }    
    }

    // Add spaces
    $('#space').on('click',function(){
        //Get knocki number
        var i = $('.delete-knocki').attr('id');

        var tempArray = store.get("users");

        tempArray[activeUser].knockis[i].gestures[(tempArray[activeUser].knockis[i].gestures.length)-1].tapsOrSpaces.push({tap: 0});

        store.set("users", tempArray);

        displayTaps();
    });

    // Add taps
    $('#tap').on('click',function(){
        //Get knocki number
        var i = $('.delete-knocki').attr('id');

        var tempArray = store.get("users");

        tempArray[activeUser].knockis[i].gestures[(tempArray[activeUser].knockis[i].gestures.length)-1].tapsOrSpaces.push({tap: 1});

        store.set("users", tempArray);

        displayTaps();
    });

    // Delete taps or spaces
    $('#delete').on('click',function(){
        //Get knocki number
        var i = $('.delete-knocki').attr('id');

        var tempArray = store.get("users");

        tempArray[activeUser].knockis[i].gestures[(tempArray[activeUser].knockis[i].gestures.length)-1].tapsOrSpaces.splice((tempArray[activeUser].knockis[i].gestures[(tempArray[activeUser].knockis[i].gestures.length)-1].tapsOrSpaces.length)-1,1);

        store.set("users", tempArray);

        displayTaps();
    });



    // Show taps in add gesture tab
    function displayTaps() {
        var tempArray = store.get("users");
        var k = $('.delete-knocki').attr('id');
        var j = (tempArray[activeUser].knockis[k].gestures.length)-1;
        
        $('#gesture-taps').empty();

        for(i=0; i<tempArray[activeUser].knockis[k].gestures[j].tapsOrSpaces.length; i++){
            if (tempArray[activeUser].knockis[k].gestures[j].tapsOrSpaces[i].tap == 0) {
                $('#gesture-taps').append(`
                    <svg style="width:30px;height:30px" viewBox="0 0 24 24">
                        <path fill="#ffffff" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                `);
            } else if (tempArray[activeUser].knockis[k].gestures[j].tapsOrSpaces[i].tap == 1) {
                $('#gesture-taps').append(`
                    <svg style="width:30px;height:30px" viewBox="0 0 24 24">
                        <path fill="#ffffff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                `);
            }
        }    
    }



    // Cancel add gesture
    $('.cancel-add-gesture').on('click',function(){
        $('.box').hide();
        window.scrollTo(0, 0);

        //Get knocki number
        var i = $('.delete-knocki').attr('id');

        var tempArray = store.get("users");

        tempArray[activeUser].knockis[i].gestures.splice((tempArray[activeUser].knockis[i].gestures.length)-1,1);

        store.set("users", tempArray);

        $('#box-4').fadeIn();
    });






    /* *********************************************
    ************************************************
                    Edit gestures
    ************************************************
    ********************************************* */
    // Show edit gestures tab
    $("#gestures-div").on('click', '.edit-this', function(){
        $('.box').hide();
        window.scrollTo(0, 0);

        var tempArray = store.get("users");

        var i = $('.delete-knocki').attr('id');
        var k = $(this).parent().attr('id');

        $('#box-7').fadeIn();
        
        $('#gesture-edit-name').val(tempArray[activeUser].knockis[i].gestures[k].name);

        document.getElementById("linked-app-select-edit").value = tempArray[activeUser].knockis[i].gestures[k].action;

        if (document.getElementById("linked-app-select-edit").value == 1) {
            $('.action-appicon').hide();
            $('#img11').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 2) {
            $('.action-appicon').hide();
            $('#img22').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 3) {
            $('.action-appicon').hide();
            $('#img33').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 4) {
            $('.action-appicon').hide();
            $('#img44').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 5) {
            $('.action-appicon').hide();
            $('#img55').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 6) {
            $('.action-appicon').hide();
            $('#img66').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 7) {
            $('.action-appicon').hide();
            $('#img77').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 8) {
            $('.action-appicon').hide();
            $('#img88').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 9) {
            $('.action-appicon').hide();
            $('#img99').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 10) {
            $('.action-appicon').hide();
            $('#img1010').fadeIn();
        }

        $('.delete-old-gesture').attr('id', k);

        displayTapsEdit()
    });



    // Finish editting old gesture
    $('.done-edit-gesture').on('click',function(){
        $('.box').hide();
        window.scrollTo(0, 0);
        
        var i = $('.delete-knocki').attr('id');
        var k = $('.delete-old-gesture').attr('id');

        var tempArray = store.get("users");

        tempArray[activeUser].knockis[i].gestures[k].name = $('#gesture-edit-name').val();

        tempArray[activeUser].knockis[i].gestures[k].action = document.getElementById("linked-app-select-edit").value;

        store.set("users", tempArray);
        
        displayKnockis();
        displayGestures();
        $('#box-4').fadeIn();
    });



    // To show the app icon in edit gesture tab
    $('#linked-app-select-edit').change(function(){
        if (document.getElementById("linked-app-select-edit").value == 1) {
            $('.action-appicon').hide();
            $('#img11').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 2) {
            $('.action-appicon').hide();
            $('#img22').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 3) {
            $('.action-appicon').hide();
            $('#img33').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 4) {
            $('.action-appicon').hide();
            $('#img44').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 5) {
            $('.action-appicon').hide();
            $('#img55').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 6) {
            $('.action-appicon').hide();
            $('#img66').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 7) {
            $('.action-appicon').hide();
            $('#img77').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 8) {
            $('.action-appicon').hide();
            $('#img88').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 9) {
            $('.action-appicon').hide();
            $('#img99').fadeIn();
        } else if (document.getElementById("linked-app-select-edit").value == 10) {
            $('.action-appicon').hide();
            $('#img1010').fadeIn();
        }
    });



    // Add spaces
    $('#space-edit').on('click',function(){
        //Get knocki number
        var i = $('.delete-knocki').attr('id');
        var k = $('.delete-old-gesture').attr('id');

        var tempArray = store.get("users");

        tempArray[activeUser].knockis[i].gestures[k].tapsOrSpaces.push({tap: 0});

        store.set("users", tempArray);

        displayTapsEdit();
    });

    // Add taps
    $('#tap-edit').on('click',function(){
        //Get knocki number
        var i = $('.delete-knocki').attr('id');
        var k = $('.delete-old-gesture').attr('id');

        var tempArray = store.get("users");

        tempArray[activeUser].knockis[i].gestures[k].tapsOrSpaces.push({tap: 1});

        store.set("users", tempArray);

        displayTapsEdit();
    });

    // Delete taps or spaces
    $('#delete-edit').on('click',function(){
        //Get knocki number
        var i = $('.delete-knocki').attr('id');
        var k = $('.delete-old-gesture').attr('id');

        var tempArray = store.get("users");

        tempArray[activeUser].knockis[i].gestures[k].tapsOrSpaces.splice((tempArray[activeUser].knockis[i].gestures[k].tapsOrSpaces.length)-1,1);

        store.set("users", tempArray);

        displayTapsEdit();
    });



    // Show taps in edit gesture tab
    function displayTapsEdit() {
        var tempArray = store.get("users");
        var k = $('.delete-knocki').attr('id');
        var j = $('.delete-old-gesture').attr('id');
        
        $('#gesture-taps-edit').empty();

        for(i=0; i<tempArray[activeUser].knockis[k].gestures[j].tapsOrSpaces.length; i++){
            if (tempArray[activeUser].knockis[k].gestures[j].tapsOrSpaces[i].tap == 0) {
                $('#gesture-taps-edit').append(`
                    <svg style="width:30px;height:30px" viewBox="0 0 24 24">
                        <path fill="#ffffff" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                `);
            } else if (tempArray[activeUser].knockis[k].gestures[j].tapsOrSpaces[i].tap == 1) {
                $('#gesture-taps-edit').append(`
                    <svg style="width:30px;height:30px" viewBox="0 0 24 24">
                        <path fill="#ffffff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                `);
            }
        }    
    }


    
    // Delete gesture
    $('.delete-old-gesture').on('click',function(){
        $('.box').hide();
        window.scrollTo(0, 0);
        
        var i = $('.delete-knocki').attr('id');
        var k = $('.delete-old-gesture').attr('id');
        
        var tempArray = store.get("users");

        tempArray[activeUser].knockis[i].gestures.splice(k,1);
        store.set("users", tempArray);

        $('#box-4').fadeIn();
        displayKnockis();
        displayGestures();
    });



    /* *********************************************
    ************************************************
                    Edit account
    ************************************************
    ********************************************* */
    // Show edit account tab
    $('#user-options').on('click', function () {
        $('.box').hide();
        $('.app2 #footer').css('display', 'none');
        window.scrollTo(0, 0);

        var tempArray = store.get("users");

        document.getElementById("account-edit-name").value = tempArray[activeUser].username; 
        document.getElementById("account-edit-mail").value = tempArray[activeUser].mail;
        document.getElementById("account-edit-password").value = tempArray[activeUser].password;
        
        $('#box-8').fadeIn();
    });

    // Done edit account tab
    $('.done-edit-account').on('click', function () {
        var tempArray = store.get("users");

        tempArray[activeUser].username = document.getElementById("account-edit-name").value;
        tempArray[activeUser].mail = document.getElementById("account-edit-mail").value;
        tempArray[activeUser].password = document.getElementById("account-edit-password").value;

        $('#username-config').text(tempArray[activeUser].username);

        store.set("users", tempArray);

        $('.box').hide();
        $('#box-3').fadeIn();
        $('.app2 #footer').css('display', 'flex');
    });

    // Delete account tab
    $('.delete-account').on('click', function () {
        var tempArray = store.get("users");
        tempArray.splice(activeUser,1);

        store.set("users", tempArray);

        $('.app2').hide();
        $('.app1').fadeIn();
        $('.app2 #footer').css('display', 'none');
    });



    /* *********************************************
    ************************************************
                    Sign out
    ************************************************
    ********************************************* */
    // Sign out
    $('.signout').on('click', function () {
        $('.app2').hide();
        $('.app1').fadeIn();
        $('.app2 #footer').css('display', 'none');
    });
});