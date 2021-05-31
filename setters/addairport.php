<?php
include "../conn.php";

$conn = openCon();
$name = $_POST["name"];
$country = $_POST["country"];
$lat = $_POST["lat"];
$long = $_POST["long"];
$sql = "INSERT INTO airports (name, country_id, latitude, longitude) VALUES ('" . $name . "', " . $country . ", " . $lat . ", " . $long . ")";
$checker = $conn->query($sql);

if ($checker === TRUE) {

    $sql = "SELECT a.id AS id, a.name AS name, a.latitude AS latitude, a.longitude AS longitude, c.iso AS country FROM airports a LEFT JOIN countries c ON c.id = a.country_id WHERE a.id = (SELECT max(id) FROM airports)";
    $result = $conn->query($sql);
    $arr = []; 

    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            $arr = array("id" => $row["id"], "name" => $row["name"], "lat" => $row["latitude"], "long" => $row["longitude"], "country" => $row["country"]);

        }

    }

    echo json_encode($arr);

}

closeCon($conn);
?>