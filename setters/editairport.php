<?php
include "../conn.php";

$conn = openCon();

//ran into a problem posting data on my localhost; the data is not attached to the post header, this shouldn't be a problem on your side though

$id = $_POST["id"];
$name = $_POST["name"];
$country = $_POST["country"];
$airports = $_POST["airlines"];
$lat = $_POST["lat"];
$long = $_POST["long"];
$sql = "UPDATE airlines SET name = '" . $name . "', country_id = " . $country . ", latitude = " . $lat . ", longitude = " . $long . " WHERE id = " . $id;
$conn->query($sql);

$sql = "DELETE FROM airport_airline WHERE airport_id = " . $id;

if ($conn->query($sql) === TRUE) {

    foreach ($airlines as $airline) {

        $sql = "INSERT INTO airport_airline (airport_id, airline_id) VALUES ('" . $id . "', " . $airline . ")";
        $conn->query($sql);
    
    }

}

closeCon($conn);
?>