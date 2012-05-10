/**

 */

$(document).ready(function()
{
    var mediaGroups = ["--Choose Project Type--", "ios", "android", "html5", "wordpress", "graphic", "author"],
        mtopicValue;
    var category = getUrlVars()["cat"];
    var mediaId = getUrlVars()["mediaId"];
    var op = getUrlVars()["op"];


    if(op != "edit")
    {
        $("#submit").click(function()
        {
            validateForm();
        });
    }

    $("#delete").click(function()
    {
        deleteMedia();
    });
    $("#clear").click(function()
    {
        clearLocal();
    });

    function getUrlVars()
    {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value)
        {
            vars[key] = value;
        });
        return vars;
    }

    switch (category) {
        case "ios":
            localStorage.clear();
            var topic = "ios";
            getData();
            break;
        case "android":
            var topic = "android";
            getData();
            break;
        case "html5":
            var topic = "html5";
            getData();
            break;
        case "wordpress":
            localStorage.clear();
            var topic = "wordpress";
            getData();
            break;
        case "graphic":
            localStorage.clear();
            var topic = "graphic";
            getData();
            break;
        case "author":
            localStorage.clear();
            var topic = "author";
            getData();
            break
    }

    function autoFillData(category){
        switch(category) {
            case 'ios':
                $.ajax({
                    type: "GET",
                    url: 'js/xhr/data.json',
                    async: false,
                    beforeSend: function(x) {
                        if(x && x.overrideMimeType) {
                            x.overrideMimeType("application/j-son;charset=UTF-8");
                        }
                    },
                    dataType: "json",
                    success: function(data, status){
                        //Store the JSON object in local storage
                        for(var n in data.media){
                            var id = Math.floor(Math.random()*10000001);
                            localStorage.setItem(id, JSON.stringify(data.media[n]));
                        }
                    }
                });
                var loaded = true;
                getData(loaded);
                break;
            case 'android':
                // XML file
                var url = "js/xhr/data.xml";
                // handle response
            function XHRhandler() {
                if (xhr.readyState == 4) {
                    var obj = XML2jsobj(xhr.responseXML.documentElement);
                    Display(obj);
                    xhr = null;
                }
            }

                // AJAX request
                var xhr = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
                xhr.onreadystatechange = XHRhandler;
                xhr.open("GET", url, true);
                xhr.send(null);
            function Display(data) {
                if (data && data.media) {
                    if (data.media.length) {
                        for (var i=0, sl=data.media.length; i < sl; i++) {
                            store(data.media[i]);
                        }
                    } else {
                        store(data.media);
                    }
                }
                // store item
                function store(media) {
                    var id = Math.floor(Math.random()*10000001);
                    localStorage.setItem(id, JSON.stringify(media));
                }
            }
                var loaded = "true";
                getData(loaded);
                location.reload();
                break;
            case 'html5':
                // XML file
                var url = "js/xhr/html5.xml";
                // handle response
            function XHRhandler() {
                if (xhr.readyState == 4) {
                    var obj = XML2jsobj(xhr.responseXML.documentElement);
                    Display(obj);
                    xhr = null;
                }
            }
                // AJAX request
                var xhr = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
                xhr.onreadystatechange = XHRhandler;
                xhr.open("GET", url, true);
                xhr.send(null);
            function Display(data) {
                if (data && data.media) {
                    if (data.media.length) {
                        for (var i=0, sl=data.media.length; i < sl; i++) {
                            store(data.media[i]);
                        }
                    } else {
                        store(data.media);
                    }
                }
                // store item
                function store(media) {
                    var id = Math.floor(Math.random()*10000001);
                    localStorage.setItem(id, JSON.stringify(media));
                }
            }
                var loaded = "true";
                getData(loaded);
                location.reload();
                break;
        }
    }

    function getData(loaded) {
        // Update page header title
        var category = getUrlVars()["cat"];
        $('h1#headerTitle').html(category);
        $('#errors').empty(); //Reset error messages

        if (loaded != "true") {
            if (category === "ios") {
                var buttonText = "Load JSON Data";
            } else {
                var buttonText = "Load XML Data";
            }
            $("#getdata-button .ui-btn-text").text(buttonText);
            $('#getdata-button').click(function() {
                localStorage.clear();
                autoFillData(category);
            });
        }
        // Create list items from sorted storage array
        for (var i=0, len=localStorage.length; i<len; i++)
        {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);

            // convert the string back to an object
            var obj = JSON.parse(value);

            $('<li></li>").addClass("media" + key)
                .attr("data-theme","c")
                .appendTo("#media-list");
            $('<a></a>').addClass("anchor" + key)
                .attr("rel","external")
                .attr("href", "?mediaId=" + key + "&cat=" + category)
                .attr("data-url", "?mediaId=" + key + "&cat=" + category)
                .appendTo("#media-list li." + key);

            // Move date to the bottom if you want to sort based on Header Text
            if (category === "ios")
            {
                // HEADER TEXT
                var headerText = obj.name[1];
                $("<h3></h3>").addClass(key).
                    appendTo("li." + key + "a." + key);
                $("h3." + key).html(headerText);

                // SUB HEAD
                var strongPText = obj.topic[0] + " " + obj.topic[1];
                $("<p></p>").addClass("subhead" + key)
                    .attr("style", "font-weight: bold;")
                    .appendTo("li." + key + "a." + key);
                $("p.subhead." + key).html(strongPText);

                // MEDIA DESCRIPTION
                var descText = obj.media[1];
                $("<p></p>").addClass("ui-li-desc" + key)
                    .appendTo('li.'+key+' a.'+key);
                $("p.ui-li-desc." + key).html(descText);

                // DATE
                var dateText = obj.date[1];
                $("<p></p>").addClass("date ui-li-aside" + key)
                    .appendTo('li.'+key+' a.'+key);
                $("p.date.ui-li-aside." + key).html(dateText);

            }
            else if (category === "ios" || category === "android")
            {
                // HEADER TEXT
                var headerText = obj.name;
                $("<h3></h3>").addClass(key)
                    .appendTo('li.'+key+' a.'+key);
                $("h3." + key).html(headerText);

                // SUB HEAD
                var strongPText = "Topic:" + obj.topic;
                $("<p></p>").addClass("subhead " + key)
                    .attr("style", "font-weight: bold;")
                    .appendTo("li" + key + "a." + key);
                $("p.subhead."+key).html(strongPText);

                // MEDIA DESCRIPTION
                var descText = obj.media;
                $("<p></p>").addClass("ui-li-desc "+ key)
                    .appendTo("li." + key + "a."+ key);
                $("p.ui-li-desc." + key).html(descText);

                // DATE
                var dateText = obj.date;
                $('<p></p>').addClass('date ui-li-aside '+key)
                    .appendTo('li.'+key+' a.'+key);
                $('p.date.ui-li-aside.'+key).html(dateText);
            }
        }


        // Sort media list
        var mylist = $("#media-list");
        var listitems = mylist.children("li").get();
        listitems.sort(function(a, b) {
            var compA = $(a).text().toUpperCase();
            var compB = $(b).text().toUpperCase();
            // Currently set to descending date based on the > < symbols
            // return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
            // Set to < > to sort ascending
            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
        });
        $.each(listitems, function(idx, itm)
        {
            mylist.append(itm);
        });

        $("#media-list").listview()
        $("#media-list").listview("refresh");

    }

    if(mediaId > 0)
    {
        showMedia(mediaId);
    }
    function showMedia(id, cat)
    {
        var category = getUrlVars()["cat"];
        var mediaKey = id;
        var value = localStorage.getItem(mediaKey);
        // convert the string back to an object
        var obj = JSON.parse(value);

        $("<div></div>")
            .addClass(mediaKey)
            .appendTo("#content");

    }

    if(op === "edit")
    {
        editMedia(mediaId);
    }

    function editMedia(mediaId){
        $('#pageTitle').html("Edit Media");

        //Grab the data from local storage
        var value = localStorage.getItem(mediaId);
        var item = JSON.parse(value);

        //populate the form fields with current values
        $("#select").selectmenu("refresh");
        $("#date").val(item.author[1]);
        $("#name").val(item.email[1]);
        $("#rating").val(item.date[1]);
        $("input:radio[name=topic]").removeAttr("checked");
        $("input:radio[name=topic]").checkboxradio("refresh");
        setRadio(item.topic[1]);

        //remove initial listener from save button
        $("#submit").unbind("click");

        //Change submit button value to edit button
        $('#submit').val("Edit Media");
        $('#submit').button("refresh");
        $('#projectForm').submit(function() {
            validateForm(mediaId);
        });
    }

    function getRadio(){
        return($('input:radio[name=mtopic]:checked').val());
    }

    function setRadio(myRadio){
        switch(myRadio)
        {
            case "work":
                $('input:radio[name=topic]:nth(0)').attr('checked', true);
                $('input:radio[name=topic]').checkboxradio('refresh');
                break;
            case "school":
                $('input:radio[name=topic]:nth(1)').attr('checked', true);
                $('input:radio[name=topic]').checkboxradio('refresh');
                break;
            case "inspiration":
                $('input:radio[name=topic]:nth(2)').attr('checked', true);
                $('input:radio[name=topic]').checkboxradio('refresh');
                break;
        }
    }

    function deleteMedia()
    {
        var ask = confirm("Are you sure you want to delete this project??");
        if (ask) {
            localStorage.removeItem(mediaId);
            alert("Project was deleted.");
            if (localStorage.length === 0) {
                window.location.href = "index.html";
            } else {
                parent.history.back();
            }
        } else {
            alert("Project was NOT deleted.");
        }
    }

    function clearLocal()
    {
        if (localStorage.length === 0)
        {
            alert("Nothing here to delete.");
        } else
        {
            var ask = confirm("Are you sure you want to delete everything??");
            if (ask) {
                localStorage.clear();
                alert("All Projects Deleted.");
                window.location.href = "index.html";
                return false;
            } else {
                alert("Projects were NOT deleted.");
            }
        }
    }

    function validateForm(mediaId)
    {
        var getType = $("#type").val();
        var getName = $("#name").val();
        var getDate = $("#date").val();

        //Reset error messages
        $(".error").hide();
        var hasError = false;
        $('#errors').empty();
        $('#name').css("border", "none");
        $('#date').css("border", "none");
        $('#select > div').css("border", "none");

        //Get Error messages
        var messageArray = [];

        if (getType === "--Choose Media Type--") {
            $('#select > div').after('<span class="error">Missing Type.</span>');
            var topicError = "Choose media type.";
            $('#select > div').css("border", "3px solid yellow") ;
            hasError = true;
        }

        if (getName === "") {
            $('#name').after('<span class="error">Missing Name.</span>');
            $('#name').css("border", "3px solid yellow") ;
            hasError = true;
        }

        if (getDate === "") {
            $('#date').after('<span class="error">Missing Date.</span>');
            $('#date').css("border", "3px solid yellow") ;
            hasError = true;
        }

        //Set Errors
        if (hasError === true) {
            $('#submit-container').after('<span class="error">Missing Info.</span>');
            event.preventDefault();
            return false;
        } else {
            // If all is validated
            // save data and
            // send key value from editData
            storeData(mediaId);
        }
    }

    function storeData(key)
    {
        //Create new key if one doesn't exist.
        if(!key)
        {
            var id = Math.floor(Math.random()*10000001);
        }else{
            //Use the existing key.
            var id = key;
        }


        // Gather up all form values and labels.
        var newItem = {};
        newItem.type = ["Media Type:", $('#type').val()];
        newItem.name = ["Name:", $('#name').val()];
        newItem.date = ["Date:", $('#date').val()];
        newItem.rating = ["Rating:", $('#rating').val()];
        // Find value of the selected radio button.
        newItem.topic = ["Incentive:", getRadio()];
        newItem.tags = ["Tags:", $('#tags').val()];
        newItem.image = ["Image:", $("#image").val()];
        newItem.text = ["Notes:", $('#text').val()];

        //Save data into local storage
        localStorage.setItem(id, JSON.stringify(newItem));
        alert("Media Saved.");
        parent.history.back();
    }

    function makeTopics()
    {
        $("<select></select>")
            .attr("id", "type")
            .attr("data-theme", "c")
            .attr("data-native-menu",false)
            .appendTo("#select");
        for (var i=0, j=mediaGroups.length; i<j; i++)
        {
            var optText = mediaGroups[i];
            $('<option></option>').attr("value", optText)
                .attr("id", optText)
                .attr("data-theme", "c")
                .appendTo("select#type");
            $("#type option:last-child").html(optText);
        }
        var selectTopics = $("select#type");
        selectTopics.selectmenu();
        selectTopics.selectmenu("refresh");
    }

    function setDate()
    {
        if (!($("#date").val()) )
        {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;//January is 0!
            var yyyy = today.getFullYear();
            if(dd<10){dd='0'+dd;}
            if(mm<10){mm='0'+mm;}
            $('#date').val(mm+'/'+dd+'/'+yyyy);
        }
    }


    makeTopics();
    setDate();

});