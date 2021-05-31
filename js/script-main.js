var airlines = [];
var airports = [];
var countries = [];
var map;

$(document).ready(function () {

    getAirlines();
    getAirports();
    getCountries();
    focusFirst();

    $("body").on("click", ".list-item-btn", function () {

        var t = $(this).attr("data-t");
        var id = $(this).parents(".table-row").attr("id");
        var type = $(this).parents(".table-ctn").attr("data-t");
        var ctx = this;

        switch (t) {

            case "delete":

                $.post("setters/delete" + type + ".php", {

                    id: id

                }, function (data) {
                    
                    $(ctx).parents(".table-row").remove();

                });

                break;

            case "edit":

                var name;
                var countryID;
                var countryName;
                var airlines = [];
                var typeInner = "airports-to-airline";

                if (type == "airports") {

                    typeInner = "airlines-to-airport";

                }

                for (var i = 0; i < window[type].length; i++) {

                    if (window[type][i].id == id) {

                        name = window[type][i].name;
                        countryID = window[type][i].countryID;
                        countryName = window[type][i].countryName;

                        if (type == "airports") {

                            var lat = window[type][i].latitude;
                            var long = window[type][i].longitude;

                            initMap(".modal-ctn .google-map", { lat: parseFloat(lat), lng: parseFloat(long) });

                        } else {

                            var airports = window[type][i].airports;

                        }

                        i = window[type].length;

                    }

                }

                $(".modal-ctn[data-t='edit-" + type + "'] [name='name']").val(name);
                $(".modal-ctn[data-t='edit-" + type + "'] [name='country'] .select-option[data-val='" + countryID + "']").trigger("click");
                $(".modal-ctn[data-t='edit-" + type + "']").attr("id", id);

                $.get("getters/get" + type + "inner.php", {id: id}, function (data) {

                    var arr = JSON.parse(data);

                    for (var i = 0; i < arr.length; i++) {

                        addTag(arr[i].id, arr[i].name, typeInner);

                    }

                });
                
                openModal("edit-" + type);
                focusFirst();

                break;

        }

    });

});

function tableRowHover() {

    $(".table-ctn tbody tr.new-row").hover(function () {

        var html = "<div class='list-item-btn-ctn inner-center-y fade-in'>";
        html += "<div class='list-item-btn btn blue-background-color relative' data-t='edit'>";
        html += "<i class='fa fa-pencil inner-center'></i>";
        html += "</div>";
        html += "<div class='list-item-btn btn red-background-color relative' data-t='delete'>";
        html += "<i class='fa fa-trash inner-center'></i>";
        html += "</div>";
        html += "</div>";

        $(this).find("td:visible:last").append(html);

    }, function () {

        $(this).find(".list-item-btn-ctn").remove();

    });

}

function editAirline(ctx) {

    var id = $(ctx).parents(".ux-hook").attr("id");
    var name = $(ctx).parents(".ux-hook").find("[name='name']").val();
    var country = $(ctx).parents(".ux-hook").find("[name='country']").attr("data-val");
    var airportsInner = [];

    $(ctx).parents(".ux-hook").find(".tag-ctn .tag").each(function () {

        airportsInner.push($(this).attr("id"));

    });

    $.post("setters/editAirport.php", {

        id: id,
        name: name,
        country: country,
        airports: airportsInner

    }, function (data) {

        var countryISO;

        for (var i = 0; i < countries.length; i++) {

            if (countries[i].id == country) {

                countryISO = countries[i].iso;
                i = countries.length;

            }

        }

        var html = "<td class='secondary-2-border-color list-item-title relative'>" + name + "</td>";
        html += "<td class='secondary-2-border-color list-item-title relative'>" + countryISO + "</td>";

        $("#" + id + ".table-row").html();

        closeModals();

    });

}

function editAirport(ctx) {
    
    var id = $(ctx).parents(".ux-hook").attr("id");
    var name = $(ctx).parents(".ux-hook").find("[name='name']").val();
    var country = $(ctx).parents(".ux-hook").find("[name='country']").attr("data-val");
    var lat = $(ctx).parents(".ux-hook").find("#location-search").attr("data-lat");
    var long = $(ctx).parents(".ux-hook").find("#location-search").attr("data-long");
    var airlinesInner = [];

    $(ctx).parents(".ux-hook").find(".tag-ctn .tag").each(function () {

        airlinesInner.push($(this).attr("id"));

    });

    $.post("setters/editAirline.php", {

        id: id,
        name: name,
        country: country,
        airlines: airlinesInner,
        lat: lat,
        long: long

    }, function () {

        var countryISO;

        for (var i = 0; i < countries.length; i++) {

            if (countries[i].id == country) {

                countryISO = countries[i].iso;
                i = countries.length;

            }

        }

        var html = "<td class='secondary-2-border-color list-item-title relative'>" + name + "</td>";
        html += "<td class='secondary-2-border-color list-item-title relative'>" + countryISO + "</td>";
        html += "<td class='secondary-2-border-color list-item-title relative'>" + lat + "</td>";
        html += "<td class='secondary-2-border-color list-item-title relative'>" + long + "</td>";

        $("#" + id + ".table-row").html();

        closeModals();

    });

}

function addAirline(ctx) {

    var name = $(ctx).parents(".ux-hook").find("[name='name']").val();
    var country = $(ctx).parents(".ux-hook").find("[name='country']").attr("data-val");

    $.post("setters/addAirline.php", {

        name: name,
        country: country

    }, function (data) {

        var parsedData = JSON.parse(data);

        airlines.push(parsedData);

        var html = "<tr id='" + parsedData.id + "' class='table-row new-row secondary-2-border-color list-item green-background-color-hover'>";
        html += "<td class='secondary-2-border-color list-item-title relative'>" + parsedData.name + "</td>";
        html += "<td class='secondary-2-border-color list-item-title relative'>" + parsedData.country + "</td>";
        html += "</tr>";

        $(".table-ctn[data-t='airlines'] .table-body").append(html);
        $(".table-ctn[data-t='airlines']").show();

        tableRowHover();

        $(".new-row").removeClass("new-row");

    });

}

function addAirport(ctx) {

    var name = $(ctx).parents(".ux-hook").find("[name='name']").val();
    var country = $(ctx).parents(".ux-hook").find("[name='country']").attr("data-val");
    var lat = $(ctx).parents(".ux-hook").find("#location-search").attr("data-lat");
    var long = $(ctx).parents(".ux-hook").find("#location-search").attr("data-long");

    $.post("setters/addAirline.php", {

        name: name,
        country: country,
        lat: lat,
        long: long

    }, function (data) {

        var parsedData = JSON.parse(data);

        airlines.push(parsedData);

        var html = "<tr id='" + parsedData.id + "' class='table-row new-row secondary-2-border-color list-item green-background-color-hover'>";
        html += "<td class='secondary-2-border-color list-item-title relative'>" + parsedData.name + "</td>";
        html += "<td class='secondary-2-border-color list-item-title relative'>" + parsedData.country + "</td>";
        html += "<td class='secondary-2-border-color list-item-title relative'>" + parsedData.lat + "</td>";
        html += "<td class='secondary-2-border-color list-item-title relative'>" + parsedData.long + "</td>";
        html += "</tr>";

        $(".table-ctn[data-t='airports'] .table-body").append(html);
        $(".table-ctn[data-t='airports']").show();

        tableRowHover();

        $(".new-row").removeClass("new-row");

    });

}

function getAirlines() {

    loadLoader();

    $.get("getters/getairlines.php", function (data) {

        if (typeof data != "undefined") {

            airlines = JSON.parse(data);

            if (airlines.length > 0) {

                $(".tab-btn[data-t='airports']").removeClass("disabled");

                var html = "";

                for (var i = 0; i < airlines.length; i++) {

                    html += "<tr id='" + airlines[i].id + "' class='table-row new-row secondary-2-border-color list-item green-background-color-hover'>";
                    html += "<td class='secondary-2-border-color list-item-title relative'>" + airlines[i].name + "</td>";
                    html += "<td class='secondary-2-border-color list-item-title relative'>" + airlines[i].countryISO + "</td>";
                    html += "</tr>";

                }

                $(".table-ctn[data-t='airlines'] .table-body tbody").html(html);

                tableRowHover();

                $(".new-row").removeClass("new-row");

            } else {

                $(".table-ctn[data-t='airlines']").hide();

            }

        }

        closeLoader();

    });

}

function getAirports() {

    loadLoader();

    $.get("getters/getairports.php", function (data) {

        if (typeof data != "undefined") {

            airports = JSON.parse(data);

            if (airports.length > 0) {

                var html = "";

                for (var i = 0; i < airports.length; i++) {

                    html += "<tr id='" + airports[i].id + "' class='table-row new-row secondary-2-border-color list-item green-background-color-hover'>";
                    html += "<td class='secondary-2-border-color list-item-title relative'>" + airports[i].name + "</td>";
                    html += "<td class='secondary-2-border-color list-item-title relative'>" + airports[i].countryISO + "</td>";
                    html += "<td class='secondary-2-border-color list-item-title relative'>" + airports[i].latitude + "</td>";
                    html += "<td class='secondary-2-border-color list-item-title relative'>" + airports[i].longitude + "</td>";
                    html += "</tr>";

                }

                $(".table-ctn[data-t='airports'] .table-body tbody").html(html);

                tableRowHover();

                $(".new-row").removeClass("new-row");

            } else {

                $(".table-ctn[data-t='airports']").hide();

            }

        }

        closeLoader();

    });

}

function getCountries() {

    loadLoader();

    $.get("getters/getcountries.php", function (data) {

        if (typeof data != "undefined") {

            countries = JSON.parse(data);

            var html = "";

            for (var i = 0; i < countries.length; i++) {

                html += "<div class='select-option relative blue-background-color-hover' data-val='" + countries[i].id + "'><div class='inner-center-y'>" + countries[i].name + "</div></div>";

            }

            $(".select-ctn[name='country'] .select-inner-ctn").html(html);
            $(".select-ctn[name='country'] .select-inner-ctn .select-option:first").trigger("click");

        }

        closeLoader();

    });

};

function initMap(selector, coords) {

    if (typeof selector == "undefined") {

        selector = ".side-bar .google-map";

    }

    if (typeof coords == "undefined") {

        coords = {lat: 0, lng: 0};

    }

    const map = new google.maps.Map($(selector).get()[0], {

        center: coords,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP

    });

    const input = $(selector).siblings(".location-search").get()[0];

    if (typeof google.maps.places != "undefined") {

        const searchBox = new google.maps.places.SearchBox(input);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        map.addListener("bounds_changed", () => {

            searchBox.setBounds(map.getBounds());

        });

        let markers = [];

        searchBox.addListener("places_changed", () => {

            const places = searchBox.getPlaces();

            if (places.length == 0) {

                return;

            }

            markers.forEach((marker) => {

                marker.setMap(null);

            });

            markers = [];

            const bounds = new google.maps.LatLngBounds();

            places.forEach((place) => {

                if (!place.geometry || !place.geometry.location) {

                    console.log("Returned place contains no geometry");

                    return;

                }

                const icon = {

                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)

                };

                markers.push(

                  new google.maps.Marker({

                      map,
                      icon,
                      title: place.name,
                      position: place.geometry.location

                  })

                );

                $("#location-search").attr("data-long", place.geometry.location.lng()).attr("data-lat", place.geometry.location.lat());

                if (place.geometry.viewport) {

                    bounds.union(place.geometry.viewport);

                } else {

                    bounds.extend(place.geometry.location);

                }

            });

            map.fitBounds(bounds);

        });

    }

}
