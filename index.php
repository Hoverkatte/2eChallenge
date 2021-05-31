<html>
    <header>

        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="width=device-width, initial-scale=1, user-scalable=no" name="viewport" />
        <title>Challenge</title>

        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        <link href="css/font-awesome.css" rel="stylesheet" type="text/css">

        <link href="css/style-ui.css" rel="stylesheet" type="text/css">
        <link href="css/style-main.css" rel="stylesheet" type="text/css">
        <script src="js/script-ui.js"></script>
        <script src="js/script-ux.js"></script>
        <script src="js/script-main.js"></script>

        <link href="css/theme.css" rel="stylesheet" type="text/css">

        <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA3eh_7XDm99fgz4oZaGBOsQJwLKAOadeA&callback=initMap"></script>

    </header>
    <body class="flex-ctn secondary-1-color">

        <div class="loader-ctn inner-full">
            <div id="loader-particles" class="inner-full"></div>
            <div class="inner-center">
                <div class="inner-ctn">
                    <div class="loader-circle inner-center"></div>
                    <div class="loader-line-mask inner-center">
                        <div class="loader-line"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-body-outer flex-ctn flex-1 flex-column full-height">
            <div class="main-body-inner flex-1">
                <div class="tab-ctn">
                    <div class="flex-1 flex-ctn flex-column">
                        <div class="top-bar">
                            <div data-t="airlines" class="tab-btn relative btn primary-2-background-color">
                                <div class="inner-center">
                                    Airlines
                                </div>
                            </div>
                            <div data-t="airports" class="tab-btn relative btn primary-1-background-color disabled">
                                <div class="inner-center">
                                    Airports
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <div data-t="airlines" class="tab-inner-ctn fade-in selected">
                            <div class="flex-ctn full-height">
                                <div class="side-bar full-height primary-2-background-color full-height padding-ctn ux-hook flex-ctn" data-anchor="addAirline">
                                    <div class="flex-ctn flex-1 flex-column">
                                        <div class="flex-1">
                                            Name:
                                            <div class="seperator secondary-2-border-color"></div>
                                            <input name="name" required class="primary-1-background-color secondary-1-color ux-focus-first" />
                                            <br />
                                            <br />
                                            Country:
                                            <div class="seperator secondary-2-border-color"></div>
                                            <div name="country" class="select-ctn static" data-val="">
                                                <div class="select-title-ctn primary-1-background-color relative">
                                                    <div class="select-title inner-center-y"></div>
                                                    <div class="select-open-btn relative inner-center-y">
                                                        <i class="fa fa-caret-down"></i>
                                                    </div>
                                                </div>
                                                <div class="select-inner-ctn secondary-2-background-color primary-1-border-color"></div>
                                            </div>
                                        </div>
                                        <div class="bot-bar relative">
                                            <div class="add-airline-btn btn inner-full green-background-color ux-anchor">
                                                <div class="inner-center">
                                                    Add Airline
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-ctn flex-1 full-height padding-ctn primary-2-background-color">
                                    <div class="table-ctn relative flex-ctn flex-column" data-t="airlines">
                                        <div class="flex-1 full-height-scroll inner-html-scroll-ctn primary-1-border-color primary-2-background-color">
                                            <table class="table-body search-inner-ctn">
                                                <thead>
                                                    <tr>
                                                        <th class="table-th secondary-2-border-color primary-1-background-color">
                                                            Name
                                                        </th>
                                                        <th class="table-th secondary-2-border-color primary-1-background-color">
                                                            Country
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-t="airports" class="tab-inner-ctn fade-in">
                            <div class="flex-ctn full-height">
                                <div class="side-bar full-height primary-2-background-color full-height padding-ctn ux-hook flex-ctn" data-anchor="addAirport">
                                    <div class="flex-ctn flex-1 flex-column">
                                        <div class="flex-1">
                                            Name:
                                            <div class="seperator secondary-2-border-color"></div>
                                            <input name="name" required class="primary-1-background-color secondary-1-color ux-focus-first" />
                                            <br />
                                            <br />
                                            Country:
                                            <div class="seperator secondary-2-border-color"></div>
                                            <div name="country" class="select-ctn static" data-val="">
                                                <div class="select-title-ctn primary-1-background-color relative">
                                                    <div class="select-title inner-center-y"></div>
                                                    <div class="select-open-btn relative inner-center-y">
                                                        <i class="fa fa-caret-down"></i>
                                                    </div>
                                                </div>
                                                <div class="select-inner-ctn secondary-2-background-color primary-1-border-color"></div>
                                            </div>
                                            <br />
                                            Location:
                                            <div class="seperator secondary-2-border-color"></div>
                                            <input class="location-search primary-1-background-color secondary-1-color" />
                                            <br />
                                            <br />
                                            <div class="google-map"></div>
                                        </div>
                                        <div class="bot-bar relative">
                                            <div class="add-airport-btn btn inner-full green-background-color ux-anchor">
                                                <div class="inner-center">
                                                    Add Airport
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-ctn flex-1 full-height padding-ctn primary-2-background-color">
                                    <div class="table-ctn relative flex-ctn flex-column" data-t="airports">
                                        <div class="flex-1 full-height-scroll inner-html-scroll-ctn primary-1-border-color primary-2-background-color">
                                            <table class="table-body search-inner-ctn">
                                                <thead>
                                                    <tr>
                                                        <th class="table-th secondary-2-border-color primary-1-background-color">
                                                            Name
                                                        </th>
                                                        <th class="table-th secondary-2-border-color primary-1-background-color">
                                                            Country
                                                        </th>
                                                        <th class="table-th secondary-2-border-color primary-1-background-color">
                                                            Latitude
                                                        </th>
                                                        <th class="table-th secondary-2-border-color primary-1-background-color">
                                                            Longitude
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-overlay"></div>

        <div class="modal-ctn inner-center flex-ctn flex-column ux-hook" data-t="edit-airlines" data-anchor="editAirline">
            <div class="modal-top-bar primary-1-background-color relative">
                <h4 class="modal-top-bar-title inner-center-y">
                    Edit Airline
                </h4>
                <div class="modal-close-btn btn relative red-background-color-hover">
                    <i class="fa fa-times inner-center"></i>
                </div>
            </div>
            <div class="modal-inner-ctn primary-2-background-color flex-1">
                <div class="inner-ctn">
                    <div class="flex-ctn row-ctn">
                        <div class="flex-1 relative">
                            <div class="inner-center-y">
                                Name:
                            </div>
                        </div>
                        <div class="flex-2 relative">
                            <input name="name" required class="primary-1-background-color secondary-1-color ux-focus-first" />
                        </div>
                    </div>
                    <div class="seperator secondary-2-border-color"></div>
                    <div class="flex-ctn row-ctn">
                        <div class="flex-1 relative">
                            <div class="inner-center-y">
                                Country:
                            </div>
                        </div>
                        <div class="flex-2 relative">
                            <div name="country" class="select-ctn static" data-val="">
                                <div class="select-title-ctn primary-1-background-color relative">
                                    <div class="select-title inner-center-y"></div>
                                    <div class="select-open-btn relative inner-center-y">
                                        <i class="fa fa-caret-down"></i>
                                    </div>
                                </div>
                                <div class="select-inner-ctn secondary-2-background-color primary-1-border-color"></div>
                            </div>
                        </div>
                    </div>
                    <div class="seperator secondary-2-border-color"></div>
                    <div class="flex-ctn row-ctn">
                        <div class="flex-1 relative">
                            <div class="inner-center-y">
                                Airports:
                            </div>
                        </div>
                        <div class="flex-2 static">
                            <div data-id="id" data-search="name" data-t="json" data-scroll-t="autocomplete" data-var="airports" data-function="addTag" data-scroll-function="scrollingAddHtml" data-n="airports-to-airline" data-scroll-index="1" class="autocomplete-ctn html-scroll-ctn">
                                <input class="primary-1-background-color secondary-1-color" placeholder="Enter Airport Name" />
                                <div class="autocomplete-inner-ctn secondary-2-background-color primary-1-border-color inner-html-scroll-ctn">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tag-ctn" data-n="airports-to-airline"></div>
                </div>
            </div>
            <div class="modal-bot-bar primary-1-background-color relative">
                <div class="modal-btn ux-anchor relative green-background-color">
                    <div class="inner-center">
                        Update
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal-ctn inner-center flex-ctn flex-column ux-hook" data-t="edit-airports" data-anchor="editAirport">
            <div class="modal-top-bar primary-1-background-color relative">
                <h4 class="modal-top-bar-title inner-center-y">
                    Edit Airport
                </h4>
                <div class="modal-close-btn btn relative red-background-color-hover">
                    <i class="fa fa-times inner-center"></i>
                </div>
            </div>
            <div class="modal-inner-ctn primary-2-background-color flex-1">
                <div class="inner-ctn">
                    <div class="flex-ctn row-ctn">
                        <div class="flex-1 relative">
                            <div class="inner-center-y">
                                Name:
                            </div>
                        </div>
                        <div class="flex-2 relative">
                            <input name="name" required class="primary-1-background-color secondary-1-color ux-focus-first" />
                        </div>
                    </div>
                    <div class="seperator secondary-2-border-color"></div>
                    <div class="flex-ctn row-ctn">
                        <div class="flex-1 relative">
                            <div class="inner-center-y">
                                Country:
                            </div>
                        </div>
                        <div class="flex-2 relative">
                            <div name="country" class="select-ctn static" data-val="">
                                <div class="select-title-ctn primary-1-background-color relative">
                                    <div class="select-title inner-center-y"></div>
                                    <div class="select-open-btn relative inner-center-y">
                                        <i class="fa fa-caret-down"></i>
                                    </div>
                                </div>
                                <div class="select-inner-ctn secondary-2-background-color primary-1-border-color"></div>
                            </div>
                        </div>
                    </div>
                    <div class="seperator secondary-2-border-color"></div>
                    <div class="flex-ctn row-ctn">
                        <div class="flex-1 relative">
                            <div class="inner-center-y">
                                Location:
                            </div>
                        </div>
                        <div class="flex-2 relative">
                            <input class="location-search primary-1-background-color secondary-1-color" />
                            <br />
                            <br />
                            <div class="google-map"></div>
                        </div>
                    </div>
                    <div class="seperator secondary-2-border-color"></div>
                    <div class="flex-ctn row-ctn">
                        <div class="flex-1 relative">
                            <div class="inner-center-y">
                                Airlines:
                            </div>
                        </div>
                        <div class="flex-2 static">
                            <div data-id="id" data-search="name" data-t="json" data-scroll-t="autocomplete" data-var="airlines" data-function="addTag" data-scroll-function="scrollingAddHtml" data-n="airlines-to-airport" data-scroll-index="1" class="autocomplete-ctn html-scroll-ctn">
                                <input class="primary-1-background-color secondary-1-color" placeholder="Enter Airline Name" />
                                <div class="autocomplete-inner-ctn secondary-2-background-color primary-1-border-color inner-html-scroll-ctn">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tag-ctn" data-n="airlines-to-airport"></div>
                </div>
            </div>
            <div class="modal-bot-bar primary-1-background-color relative">
                <div class="modal-btn ux-anchor relative green-background-color">
                    <div class="inner-center">
                        Update
                    </div>
                </div>
            </div>
        </div>

    </body>
</html>